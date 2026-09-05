export const LOCALE_STORAGE_KEY = "jivah-locale";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "Hindi", short: "HI", native: "हिन्दी" },
  { code: "bn", label: "Bengali", short: "BN", native: "বাংলা" },
  { code: "or", label: "Odia", short: "OR", native: "ଓଡ଼ିଆ" },
  { code: "te", label: "Telugu", short: "TE", native: "తెలుగు" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}

export function readStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLanguageCode(stored) ? stored : "en";
}
