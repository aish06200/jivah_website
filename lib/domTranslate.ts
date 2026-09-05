import type { LanguageCode } from "@/lib/locale";
import { translateMany } from "@/lib/translate";

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "SVG",
  "CANVAS",
  "TEXTAREA",
]);

const SKIP_SELECTOR =
  "[data-notranslate], .notranslate, [contenteditable='true'], input, textarea, select";

const ATTRIBUTE_NAMES = ["aria-label", "placeholder", "title"] as const;

function shouldSkipNode(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return true;

  let element: Element | null = parent;
  while (element) {
    if (SKIP_TAGS.has(element.tagName)) return true;
    if (element.matches(SKIP_SELECTOR)) return true;
    element = element.parentElement;
  }

  return false;
}

function shouldTranslateText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (/^[\d₹$€£+\-().,%/\s]+$/.test(trimmed)) return false;
  return /[A-Za-z]/.test(trimmed);
}

export async function translatePage(target: LanguageCode) {
  if (target === "en" || typeof document === "undefined") return;

  const textEntries: Array<{ node: Text; value: string }> = [];
  const attributeTargets: Array<{ element: Element; name: string; value: string }> =
    [];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (shouldSkipNode(node)) continue;

    const value = node.textContent ?? "";
    if (!shouldTranslateText(value)) continue;

    textEntries.push({ node, value });
  }

  for (const name of ATTRIBUTE_NAMES) {
    document.querySelectorAll(`[${name}]`).forEach((element) => {
      if (element.matches(SKIP_SELECTOR)) return;
      if (element.closest(SKIP_SELECTOR)) return;

      const value = element.getAttribute(name);
      if (!value || !shouldTranslateText(value)) return;

      attributeTargets.push({ element, name, value });
    });
  }

  const sourceTexts = [
    ...textEntries.map((entry) => entry.value),
    ...attributeTargets.map((entry) => entry.value),
  ];

  const translations = await translateMany(sourceTexts, target);

  textEntries.forEach(({ node, value }) => {
    const translated = translations.get(value);
    if (translated) node.textContent = translated;
  });

  attributeTargets.forEach(({ element, name, value }) => {
    const translated = translations.get(value);
    if (translated) element.setAttribute(name, translated);
  });

  document.documentElement.lang = target;
}
