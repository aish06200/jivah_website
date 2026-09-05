import type { LanguageCode } from "@/lib/locale";

const cache = new Map<string, string>();

function cacheKey(text: string, target: LanguageCode) {
  return `${target}:${text}`;
}

export async function translateText(
  text: string,
  target: LanguageCode,
): Promise<string> {
  if (target === "en" || !text.trim()) return text;

  const key = cacheKey(text, target);
  const cached = cache.get(key);
  if (cached) return cached;

  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Translation failed with status ${response.status}`);
  }

  const data = (await response.json()) as [Array<[string]>, ...unknown[]];
  const translated =
    data[0]?.map((part) => part[0]).join("")?.trim() || text;

  cache.set(key, translated);
  return translated;
}

export async function translateMany(
  texts: string[],
  target: LanguageCode,
  concurrency = 8,
): Promise<Map<string, string>> {
  const unique = Array.from(new Set(texts.filter((text) => text.trim())));
  const results = new Map<string, string>();

  for (let index = 0; index < unique.length; index += concurrency) {
    const batch = unique.slice(index, index + concurrency);
    const translated = await Promise.all(
      batch.map(async (text) => {
        const value = await translateText(text, target);
        return [text, value] as const;
      }),
    );

    for (const [source, value] of translated) {
      results.set(source, value);
    }
  }

  return results;
}
