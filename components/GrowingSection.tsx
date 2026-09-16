"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — scroll into #locations (once)
 *
 *    0ms   section crosses viewport threshold
 *  120ms   heading + default blurb fade up
 *  280ms   divider line grows left → right
 *  400ms   coast path draws (1.1s)
 *  520ms   WB state + pin (spring)
 *  920ms   journey dot departs Kolkata (2s along arc)
 *  980ms   Odisha state + pin
 * 1460ms   Andhra state + pin
 * 2520ms   journey dot fades; map rests (hover to explore)
 *  900ms   type columns rise (80ms stagger, parallel with map)
 * ───────────────────────────────────────────────────────── */

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { indiaPins, indiaStatePaths } from "@/lib/indiaOutline";

type StateId = "kolkata" | "odisha" | "andhra";

const TIMING = {
  heading: 0.12,
  divider: 0.28,
  coastDraw: 0.4,
  coastDrawDuration: 1.1,
  stateBase: 0.52,
  stateStagger: 0.46,
  journeyStart: 0.92,
  journeyDuration: 2,
  typesStart: 0.9,
  typeStagger: 0.08,
  typeDuration: 0.55,
};

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPES = [
  {
    id: "mixed-use",
    name: "Mixed-use",
    body: "Groceries and a pharmacy downstairs.",
  },
  {
    id: "residential",
    name: "Residential",
    body: "Homes planned around family life.",
  },
  {
    id: "plotted",
    name: "Plotted",
    body: "A plot in a town, not a vacant field.",
  },
] as const;

const STATE_TO_PLACE: Record<string, StateId> = {
  "West Bengal": "kolkata",
  Orissa: "odisha",
  "Andhra Pradesh": "andhra",
};

const EAST_STATES = indiaStatePaths
  .filter((state) => state.highlight)
  .sort((a, b) => {
    const placeA = STATE_TO_PLACE[a.name];
    const placeB = STATE_TO_PLACE[b.name];
    return indiaPins[placeA].y - indiaPins[placeB].y;
  });

const PIN_LABELS: Record<StateId, string> = {
  kolkata: "West Bengal",
  odisha: "Odisha",
  andhra: "Andhra Pradesh",
};

const STATE_BLURBS: Record<StateId, string> = {
  kolkata: "Neighbourhoods taking shape near Kolkata and the delta.",
  odisha: "Coastal towns and inland hubs across Odisha.",
  andhra: "Growing corridors along Andhra’s east coast.",
};

const COAST_IDS: StateId[] = ["kolkata", "odisha", "andhra"];

const COAST_PATH = `M ${indiaPins.kolkata.x} ${indiaPins.kolkata.y} C 480 380, 410 440, ${indiaPins.odisha.x} ${indiaPins.odisha.y} S 240 620, ${indiaPins.andhra.x} ${indiaPins.andhra.y}`;

const STATE_FILL: Record<string, string> = {
  "West Bengal": "#8ab5a3",
  Orissa: "#a8cdb9",
  Odisha: "#a8cdb9",
  "Andhra Pradesh": "#e8e0cc",
};

function sampleSvgPath(d: string, count: number): { x: number; y: number }[] {
  if (typeof document === "undefined") {
    return COAST_IDS.map((id) => indiaPins[id]);
  }
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  const len = path.getTotalLength();
  if (len === 0 || count < 2) {
    return COAST_IDS.map((id) => indiaPins[id]);
  }
  return Array.from({ length: count }, (_, i) => {
    const pt = path.getPointAtLength((len * i) / (count - 1));
    return { x: pt.x, y: pt.y };
  });
}

export function GrowingSection() {
  const [activeId, setActiveId] = useState<StateId | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inSection = useInView(sectionRef, { once: true, margin: "-12% 0px" });
  const reduceMotion = useReducedMotion();
  const motionOn = inSection && !reduceMotion;

  return (
    <section id="locations" ref={sectionRef} className="bg-forest text-white">
      <div className="site-pad py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-y-10 lg:gap-y-12">
          <div className="flex flex-col gap-y-8 lg:flex-row lg:items-stretch lg:gap-x-16 xl:gap-x-20">
            <motion.div
              className="flex flex-col gap-y-2 lg:max-w-[36rem] lg:shrink-0"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: TIMING.heading, duration: 0.6, ease: EASE }}
            >
              <h2 className="section-heading text-white">
                Growing along the east coast
              </h2>
              <div className="relative min-h-[3.1em] max-w-[34ch]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={activeId ?? "default"}
                    className="text-[16px] leading-[1.55] text-white/70 md:text-[17px]"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    {activeId
                      ? STATE_BLURBS[activeId]
                      : "Mixed-use neighbourhoods in West Bengal, Odisha and Andhra Pradesh."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="flex flex-1 items-center justify-center lg:justify-end">
              <EastCoastMark
                activeId={activeId}
                motionOn={motionOn}
                inView={inSection}
                reduceMotion={!!reduceMotion}
                onSelect={setActiveId}
                onLeave={() => setActiveId(null)}
              />
            </div>
          </div>

          <div className="w-full pt-6 md:pt-8">
            <motion.div
              className="mb-6 h-px origin-left bg-white/20 md:mb-8"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={inSection ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: TIMING.divider, duration: 0.75, ease: EASE }}
              aria-hidden
            />
            <div className="grid gap-6 sm:grid-cols-3 sm:gap-8 md:gap-10 lg:gap-12">
              {TYPES.map((type, i) => (
                <motion.div
                  key={type.id}
                  className="min-w-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={inSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{
                    delay: TIMING.typesStart + i * TIMING.typeStagger,
                    duration: TIMING.typeDuration,
                    ease: EASE,
                  }}
                >
                  <span className="text-[12px] font-medium tabular-nums tracking-[0.14em] text-white/40 md:text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[22px] font-medium leading-none tracking-[-0.03em] md:text-[28px]">
                    {type.name}
                  </p>
                  <p className="mt-2 text-[16px] leading-[26px] text-white/70">
                    {type.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EastCoastMark({
  activeId,
  motionOn,
  inView,
  reduceMotion,
  onSelect,
  onLeave,
}: {
  activeId: StateId | null;
  motionOn: boolean;
  inView: boolean;
  reduceMotion: boolean;
  onSelect: (id: StateId) => void;
  onLeave: () => void;
}) {
  const journeySamples = useMemo(() => sampleSvgPath(COAST_PATH, 36), []);
  const journeyTimes = useMemo(
    () => journeySamples.map((_, i) => i / (journeySamples.length - 1)),
    [journeySamples],
  );

  const stateIndex = (id: StateId) => COAST_IDS.indexOf(id);

  return (
    <div className="flex shrink-0 justify-center overflow-visible lg:justify-end">
      <svg
        viewBox="-360 8 1040 1080"
        preserveAspectRatio="xMaxYMin meet"
        className="h-[180px] w-auto overflow-visible sm:h-[210px] md:h-[240px] lg:h-[280px]"
        role="img"
        aria-label="West Bengal, Odisha and Andhra Pradesh"
        onPointerLeave={onLeave}
      >
        <defs>
          <linearGradient
            id="locations-fill"
            gradientUnits="userSpaceOnUse"
            x1="80"
            y1="40"
            x2="320"
            y2="980"
          >
            <stop offset="0%" stopColor="#8ab5a3" />
            <stop offset="52%" stopColor="#a8cdb9" />
            <stop offset="100%" stopColor="#e8e0cc" />
          </linearGradient>
          <filter id="state-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {motionOn ? (
          <motion.path
            d={COAST_PATH}
            fill="none"
            stroke="white"
            strokeWidth={1.75}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.28 }}
            transition={{
              pathLength: {
                delay: TIMING.coastDraw,
                duration: TIMING.coastDrawDuration,
                ease: EASE,
              },
              opacity: { delay: TIMING.coastDraw, duration: 0.35 },
            }}
            pointerEvents="none"
            aria-hidden
          />
        ) : (
          <path
            d={COAST_PATH}
            fill="none"
            stroke="white"
            strokeOpacity={inView ? 0.22 : 0}
            strokeWidth={1.5}
            strokeLinecap="round"
            pointerEvents="none"
            aria-hidden
          />
        )}

        {EAST_STATES.map((state) => {
          const linked = STATE_TO_PLACE[state.name];
          const on = linked === activeId;
          const fill = STATE_FILL[state.name] ?? "url(#locations-fill)";
          const dimmed = activeId !== null && !on;
          const idx = stateIndex(linked);
          const revealDelay = TIMING.stateBase + idx * TIMING.stateStagger;

          return (
            <motion.path
              key={state.name}
              d={state.d}
              fill={fill}
              stroke={on ? "rgba(255,255,255,0.5)" : "transparent"}
              strokeWidth={on ? 1.25 : 0}
              filter={on ? "url(#state-glow)" : undefined}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={state.name === "Orissa" ? "Odisha" : state.name}
              aria-pressed={on}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={
                inView
                  ? {
                      opacity: dimmed ? 0.42 : 1,
                      scale: on && motionOn ? 1.02 : 1,
                    }
                  : { opacity: 0, scale: 0.92 }
              }
              transition={{
                opacity: {
                  delay: revealDelay,
                  duration: 0.5,
                  ease: EASE,
                },
                scale: {
                  delay: revealDelay,
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                },
              }}
              style={{
                outline: "none",
                transformOrigin: `${indiaPins[linked].x}px ${indiaPins[linked].y}px`,
              }}
              onPointerEnter={() => onSelect(linked)}
              onFocus={() => onSelect(linked)}
              onClick={() => onSelect(linked)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(linked);
                }
              }}
            />
          );
        })}

        {motionOn ? (
          <motion.circle
            r={5}
            fill="white"
            initial={{
              cx: journeySamples[0]?.x ?? indiaPins.kolkata.x,
              cy: journeySamples[0]?.y ?? indiaPins.kolkata.y,
              opacity: 0,
            }}
            animate={{
              cx: journeySamples.map((p) => p.x),
              cy: journeySamples.map((p) => p.y),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              cx: {
                delay: TIMING.journeyStart,
                duration: TIMING.journeyDuration,
                ease: "linear",
                times: journeyTimes,
              },
              cy: {
                delay: TIMING.journeyStart,
                duration: TIMING.journeyDuration,
                ease: "linear",
                times: journeyTimes,
              },
              opacity: {
                delay: TIMING.journeyStart,
                duration: TIMING.journeyDuration + 0.35,
                times: [0, 0.08, 0.88, 1],
                ease: "easeInOut",
              },
            }}
            pointerEvents="none"
            aria-hidden
          />
        ) : null}

        {(Object.keys(indiaPins) as StateId[]).map((id) => {
          const pin = indiaPins[id];
          const on = activeId === id;
          const idx = stateIndex(id);
          const pinDelay = TIMING.stateBase + idx * TIMING.stateStagger + 0.08;

          return (
            <g key={id} pointerEvents="none" aria-hidden>
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r={on ? 16 : 0}
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  on && motionOn
                    ? { opacity: [0.45, 0], scale: [0.85, 1.35] }
                    : { opacity: 0, scale: 0.6 }
                }
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
              />
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r={on ? 7 : 5.5}
                fill="white"
                initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={
                  inView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  delay: pinDelay,
                  type: "spring",
                  stiffness: 380,
                  damping: 22,
                }}
              />
              <circle cx={pin.x} cy={pin.y} r={2.5} fill={on ? "#0c7b54" : "#fafbfa"} />
              <text
                x={pin.x}
                y={pin.y - 16}
                textAnchor="middle"
                fill="#fafbfa"
                fontSize={11}
                fontWeight={500}
                style={{
                  opacity: on ? 0.95 : 0,
                  transition: "opacity 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {PIN_LABELS[id]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
