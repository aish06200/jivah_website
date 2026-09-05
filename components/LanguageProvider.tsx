"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translatePage } from "@/lib/domTranslate";
import {
  LOCALE_STORAGE_KEY,
  readStoredLanguage,
  type LanguageCode,
} from "@/lib/locale";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  translating: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    const stored = readStoredLanguage();
    setLanguageState(stored);
    document.documentElement.lang = stored;

    if (stored === "en") return;

    const run = async () => {
      setTranslating(true);
      try {
        await translatePage(stored);
      } catch {
        // Keep English content if translation fails.
      } finally {
        setTranslating(false);
      }
    };

    const timer = window.setTimeout(() => {
      void run();
    }, 700);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const setLanguage = useCallback((code: LanguageCode) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
    document.documentElement.lang = code;
    window.location.reload();
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      translating,
    }),
    [language, setLanguage, translating],
  );

  return (
    <LanguageContext.Provider value={value}>
      {translating ? (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center pt-3">
          <span className="rounded-full bg-ink/85 px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white">
            Translating…
          </span>
        </div>
      ) : null}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
