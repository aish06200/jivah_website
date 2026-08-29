"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jivah-loaded")) {
      setDone(true);
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(timer);
          sessionStorage.setItem("jivah-loaded", "1");
          window.setTimeout(() => setDone(true), 380);
          return 100;
        }
        const step = p < 68 ? 3 : p < 90 ? 1.4 : 0.8;
        return Math.min(100, p + step);
      });
    }, 28);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-[3px] bg-forest" style={{ width: `${progress}%` }} />
          <div className="mt-auto flex items-end justify-between px-6 pb-8 md:px-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-muted">Jivah Realty</p>
            <p className="font-serif text-7xl tabular-nums text-ink md:text-8xl">
              {String(Math.round(progress)).padStart(2, "0")}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
