"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   overlay fades in (ink 0 → 0.92)
 *   40ms   image scales 0.98 → 1 and fades in
 *  Esc / backdrop  overlay fades out
 * ───────────────────────────────────────────────────────── */

const OVERLAY = {
  initial: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
  spring: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

const FRAME = {
  initial: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  spring: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function ProjectLightbox({
  images,
  index,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number | null;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = index !== null;
  const src = open ? images[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && src ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-ink/92"
          initial={OVERLAY.initial}
          animate={OVERLAY.show}
          exit={OVERLAY.exit}
          transition={OVERLAY.spring}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery"
        >
          <div className="flex items-center justify-between px-6 py-5 text-[12px] tracking-[0.16em] uppercase text-on-accent/80">
            <span>
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={onClose} className="tracking-[0.16em] hover:text-on-accent">
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 pb-10">
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-on-accent/70 hover:text-on-accent"
              aria-label="Previous image"
            >
              <Arrow dir="left" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={src}
                className="relative h-full w-full max-w-6xl"
                initial={FRAME.initial}
                animate={FRAME.show}
                exit={FRAME.exit}
                transition={FRAME.spring}
              >
                <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={onNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-on-accent/70 hover:text-on-accent"
              aria-label="Next image"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      {dir === "left" ? (
        <path d="M17 6 9 14l8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M11 6l8 8-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
