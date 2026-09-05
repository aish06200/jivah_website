"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, type LanguageCode } from "@/lib/locale";

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 9.5 12 15l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LanguageSelector({
  className = "",
  menuAlign = "right",
}: {
  className?: string;
  menuAlign?: "left" | "right";
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  function selectLanguage(code: LanguageCode) {
    setOpen(false);
    if (code === language) return;
    setLanguage(code);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className="inline-flex items-center gap-1.5 rounded-full border border-line/80 px-3 py-2 text-[14px] font-medium tracking-[-0.01em] text-ink/75 transition hover:border-line hover:text-ink"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.short}</span>
        <ChevronDownIcon />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Choose language"
          className={`absolute top-[calc(100%+0.5rem)] z-[70] min-w-[11.5rem] overflow-hidden rounded-[14px] border border-line/60 bg-white py-1 shadow-[0_16px_40px_rgba(18,22,29,0.12)] ${
            menuAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          {LANGUAGES.map((item) => {
            const selected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[14px] transition hover:bg-paper ${
                  selected ? "text-forest" : "text-ink/80"
                }`}
                onClick={() => selectLanguage(item.code)}
              >
                <span className="font-medium">{item.label}</span>
                {"native" in item && item.native ? (
                  <span className="text-[13px] text-ink/45">{item.native}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export { LANGUAGES, type LanguageCode };
