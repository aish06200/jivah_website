"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — strict sequence, no overlap
 *
 *  PHASE 1  FILL   (~3.5s) J fills upward slowly until 100%
 *  PHASE 2  HOLD   (~1s)   full J sits still — nothing moves
 *  PHASE 3  MELT   (~1s)   J drifts away as the white screen fades out
 * ───────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { JivahMark, type PreloaderStage } from "./JivahMark";

const TIMING = {
  fill: 3.5,
  hold: 1,
  melt: 1,
};

const MELT_EASE = [0.45, 0, 0.2, 1] as const;

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<PreloaderStage>("fill");
  const holdTimerRef = useRef<number | null>(null);
  const meltTimerRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  const fillDuration = reduceMotion ? 0.35 : TIMING.fill;
  const holdDuration = reduceMotion ? 0.2 : TIMING.hold;
  const meltDuration = reduceMotion ? 0.25 : TIMING.melt;

  const finishPreloader = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setVisible(false);
  }, []);

  const onFillComplete = useCallback(() => {
    setStage("hold");

    holdTimerRef.current = window.setTimeout(() => {
      setStage("melt");
    }, holdDuration * 1000);
  }, [holdDuration]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const totalMs = (fillDuration + holdDuration + meltDuration + 0.75) * 1000;
    const safetyTimer = window.setTimeout(finishPreloader, totalMs);

    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
      if (meltTimerRef.current) window.clearTimeout(meltTimerRef.current);
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, [fillDuration, holdDuration, meltDuration, finishPreloader]);

  useEffect(() => {
    if (stage !== "melt") return;

    meltTimerRef.current = window.setTimeout(finishPreloader, meltDuration * 1000 + 150);

    return () => {
      if (meltTimerRef.current) window.clearTimeout(meltTimerRef.current);
    };
  }, [stage, meltDuration, finishPreloader]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "melt" ? 0 : 1 }}
          transition={
            stage === "melt"
              ? { duration: meltDuration, ease: MELT_EASE }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (stage === "melt") finishPreloader();
          }}
        >
          <JivahMark
            preloader
            preloaderStage={stage}
            animate={!reduceMotion}
            size={128}
            fillDuration={fillDuration}
            meltDuration={meltDuration}
            onFillComplete={onFillComplete}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
