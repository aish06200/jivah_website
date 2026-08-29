"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   strip enters the viewport
 *   50ms   first cell rises; Homes counts 0 → 4,200
 *  150ms   Neighbourhoods counts 0 → 24
 *  250ms   Cities counts 0 → 12
 *  350ms   Years counts 0 → 18
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  duration: 1400, // count-up length
  stagger: 100, // ms between cells
};

const LIST = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const CELL = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 30 },
  },
};

const stats = [
  { value: 4200, label: "Homes" },
  { value: 24, label: "Neighbourhoods" },
  { value: 12, label: "Cities" },
  { value: 18, label: "Years" },
] as const;

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });

  return (
    <section ref={ref} className="bg-paper">
      <div className="site-pad py-14 md:py-20">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          variants={LIST}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={CELL}
              className={[
                "min-w-0",
                i % 2 === 1 ? "border-l border-line pl-7 sm:pl-10" : "pr-7 sm:pr-10",
                i >= 2 ? "border-t border-line pt-10 md:border-t-0 md:pt-0" : "",
                i > 0 ? "md:border-l md:border-line md:pl-10 lg:pl-12" : "",
                i < 3 ? "md:pr-10 lg:pr-12" : "md:pr-0",
                i === 2 ? "md:pl-10 lg:pl-12" : "",
              ].join(" ")}
            >
              <p className="font-serif text-5xl font-medium leading-none tracking-tight text-ink md:text-6xl lg:text-[4.35rem]">
                <CountUp to={stat.value} delay={TIMING.stagger * i} play={inView} />
              </p>
              <p className="mt-2.5 max-w-44 text-sm leading-snug text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ to, delay, play }: { to: number; delay: number; play: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!play) return;

    let frame = 0;
    let timeout = 0;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timeout = window.setTimeout(() => {
      if (reduce) {
        setN(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / TIMING.duration);
        const eased = 1 - (1 - t) ** 3;
        setN(Math.round(eased * to));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [to, delay, play]);

  return <span className="tabular-nums">{n.toLocaleString("en-IN")}</span>;
}
