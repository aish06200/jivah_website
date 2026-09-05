"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { withBase } from "@/lib/base";

/** Figma Union node 103:17 — 558 × 691 */
export const J_MARK_SRC = "/images/figma/j-mark-figma-103-17.png";
export const J_MARK_ASPECT = 558 / 691;

export type PreloaderStage = "fill" | "hold" | "melt";

const DEFAULT_FILL = {
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Steady slow fill — constant speed from bottom to top */
const PRELOADER_FILL_EASE = "linear" as const;
const PRELOADER_MELT_EASE = [0.45, 0, 0.2, 1] as const;

function JMarkShape({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`bg-forest ${className}`}
      style={{
        width,
        height,
        WebkitMaskImage: `url(${withBase(J_MARK_SRC)})`,
        maskImage: `url(${withBase(J_MARK_SRC)})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export function JivahMark({
  className = "",
  size = 64,
  animate = true,
  preloader = false,
  preloaderStage = "fill",
  fillDuration = DEFAULT_FILL.duration,
  meltDuration = 2,
  fillEase = DEFAULT_FILL.ease,
  onFillComplete,
  onMeltComplete,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  preloader?: boolean;
  preloaderStage?: PreloaderStage;
  fillDuration?: number;
  meltDuration?: number;
  fillEase?: readonly [number, number, number, number];
  onFillComplete?: () => void;
  onMeltComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;
  const width = size;
  const height = (size * 691) / 558;
  const fillDoneRef = useRef(false);
  const meltDoneRef = useRef(false);
  const fillTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!preloader || shouldAnimate) return;

    onFillComplete?.();
    const timer = window.setTimeout(() => {
      onMeltComplete?.();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [preloader, shouldAnimate, onFillComplete, onMeltComplete]);

  useEffect(() => {
    if (!preloader || !shouldAnimate || preloaderStage !== "fill") return;

    fillTimerRef.current = window.setTimeout(() => {
      if (fillDoneRef.current) return;
      fillDoneRef.current = true;
      onFillComplete?.();
    }, fillDuration * 1000 + 150);

    return () => {
      if (fillTimerRef.current) window.clearTimeout(fillTimerRef.current);
    };
  }, [preloader, shouldAnimate, preloaderStage, fillDuration, onFillComplete]);

  if (preloader && shouldAnimate) {
    return (
      <div className={`relative ${className}`} style={{ width, height }} aria-hidden>
        {preloaderStage === "fill" ? (
          <JMarkShape width={width} height={height} className="opacity-[0.12]" />
        ) : null}

        {/* Phase 1 — load: clip reveal only. Unmounts when fill finishes. */}
        {preloaderStage === "fill" ? (
          <motion.div
            key="preloader-fill"
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: fillDuration, ease: PRELOADER_FILL_EASE }}
            onAnimationComplete={() => {
              if (fillDoneRef.current) return;
              fillDoneRef.current = true;
              onFillComplete?.();
            }}
          >
            <JMarkShape width={width} height={height} />
          </motion.div>
        ) : null}

        {/* Phase 2 & 3 — full J: hold still, then melt. Separate from fill. */}
        {preloaderStage === "hold" || preloaderStage === "melt" ? (
          <motion.div
            key="preloader-loaded"
            className="absolute inset-0"
            initial={false}
            animate={
              preloaderStage === "melt"
                ? { y: 14, scale: 0.96 }
                : { y: 0, scale: 1 }
            }
            transition={
              preloaderStage === "melt"
                ? { duration: meltDuration, ease: PRELOADER_MELT_EASE }
                : { duration: 0 }
            }
            onAnimationComplete={(definition) => {
              if (
                preloaderStage !== "melt" ||
                meltDoneRef.current ||
                typeof definition !== "object" ||
                !definition ||
                !("y" in definition)
              ) {
                return;
              }
              meltDoneRef.current = true;
              onMeltComplete?.();
            }}
          >
            <JMarkShape width={width} height={height} />
          </motion.div>
        ) : null}
      </div>
    );
  }

  if (preloader) {
    return (
      <div className={`relative ${className}`} style={{ width, height }} aria-hidden>
        <JMarkShape width={width} height={height} />
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      aria-hidden
      initial={
        shouldAnimate
          ? { clipPath: "inset(100% 0 0 0)", opacity: 0.35, scale: 0.96, filter: "blur(1px)" }
          : false
      }
      animate={{
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: fillDuration,
        ease: fillEase,
      }}
    >
      <JMarkShape width={width} height={height} />
    </motion.div>
  );
}

export function JivahLogoLockup({
  animate = true,
  showWordmark = true,
  markSize = 88,
}: {
  animate?: boolean;
  showWordmark?: boolean;
  markSize?: number;
}) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;

  return (
    <div className="flex items-center gap-4 md:gap-5">
      <JivahMark size={markSize * 0.82} animate={animate} className="md:hidden" />
      <JivahMark size={markSize} animate={animate} className="hidden md:block" />

      {showWordmark ? (
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-left"
        >
          <p className="text-[clamp(1.75rem,4vw,2.125rem)] font-bold leading-none tracking-[-0.04em] text-ink">
            JIVAH
          </p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.34em] text-muted md:text-[12px]">
            Realty
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}
