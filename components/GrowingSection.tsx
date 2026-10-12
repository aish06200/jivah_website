"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { indiaPins, indiaStatePaths } from "@/lib/indiaOutline";

type StateId = "kolkata" | "odisha" | "andhra";

const TIMING = {
  heading: 0.12,
  coastDraw: 0.4,
  coastDrawDuration: 1.1,
  stateBase: 0.52,
  stateStagger: 0.46,
  journeyStart: 0.92,
  journeyDuration: 2.35,
  typesStart: 0.9,
  typeStagger: 0.08,
  typeDuration: 0.55,
  divider: 0.28,
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

/** Label pill center — on the state shape, not above the pin. */
const MAP_LABEL_CENTER: Record<StateId, { x: number; y: number }> = {
  kolkata: { x: 518, y: 378 },
  odisha: { x: 358, y: 468 },
  andhra: { x: 195, y: 718 },
};

const MAP_LABEL_WIDTH: Record<StateId, number> = {
  kolkata: 118,
  odisha: 72,
  andhra: 128,
};

const STATE_BLURBS: Record<StateId, string> = {
  kolkata: "Neighbourhoods taking shape near Kolkata and the delta.",
  odisha: "Coastal towns and inland hubs across Odisha.",
  andhra: "Growing corridors along Andhra’s east coast.",
};

const COAST_IDS: StateId[] = ["kolkata", "odisha", "andhra"];

const COAST_PATH = `M ${indiaPins.kolkata.x} ${indiaPins.kolkata.y} C 480 380, 410 440, ${indiaPins.odisha.x} ${indiaPins.odisha.y} S 240 620, ${indiaPins.andhra.x} ${indiaPins.andhra.y}`;

const STATE_FILL: Record<string, string> = {
  "West Bengal": "#ddd8cf",
  Orissa: "#e2ddd4",
  Odisha: "#e2ddd4",
  "Andhra Pradesh": "#e8e3da",
};

const STATE_FILL_ACTIVE = "#d6703e";
const STATE_STROKE_ACTIVE = "#8f3d1c";

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
  const explorePausedRef = useRef(false);
  const inSection = useInView(sectionRef, { once: true, margin: "-12% 0px" });
  const reduceMotion = useReducedMotion();
  const motionOn = inSection && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const mapY = useTransform(scrollYProgress, [0, 0.45, 1], [12, 0, -10]);

  useEffect(() => {
    if (!motionOn) return;

    const ms = (seconds: number) => seconds * 1000;
    const journeyEnd = TIMING.journeyStart + TIMING.journeyDuration;
    const journeyTimers = [
      setTimeout(() => setActiveId("kolkata"), ms(TIMING.journeyStart)),
      setTimeout(() => setActiveId("odisha"), ms(TIMING.journeyStart + TIMING.journeyDuration * 0.4)),
      setTimeout(() => setActiveId("andhra"), ms(TIMING.journeyStart + TIMING.journeyDuration * 0.76)),
      setTimeout(() => setActiveId(null), ms(journeyEnd + 0.25)),
    ];

    return () => {
      journeyTimers.forEach(clearTimeout);
    };
  }, [motionOn]);

  const setHighlight = (id: StateId | null) => {
    explorePausedRef.current = true;
    setActiveId(id);
  };

  const toggleHighlight = (id: StateId) => {
    explorePausedRef.current = true;
    setActiveId((current) => (current === id ? null : id));
  };

  const handleLeave = () => {
    if (!explorePausedRef.current) setActiveId(null);
  };

  return (
    <section id="locations" ref={sectionRef} className="bg-[#f5f4f0] text-ink">
      <div className="site-pad py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-y-10 lg:gap-y-12">
          <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-14 xl:gap-x-20">
            <motion.div
              className="flex flex-col gap-y-5 lg:max-w-[34rem] lg:shrink-0"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: TIMING.heading, duration: 0.6, ease: EASE }}
            >
              <div>
                <p className="text-[13px] font-medium tracking-[0.12em] text-muted uppercase">
                  Where we build
                </p>
                <h2 className="section-heading mt-2 text-ink md:text-[40px] md:leading-[1.1] md:whitespace-nowrap">
                  Growing along the east coast
                </h2>
              </div>

              <div className="relative min-h-[3.1em] max-w-[36ch]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={activeId ?? "default"}
                    className="text-[16px] leading-[1.55] text-muted md:text-[17px]"
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

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="East coast states">
                {COAST_IDS.map((id) => {
                  const active = activeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => toggleHighlight(id)}
                      className={`rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition ${
                        active
                          ? "bg-forest text-white shadow-sm"
                          : "bg-white text-ink ring-1 ring-line/80 hover:ring-forest/30"
                      }`}
                    >
                      {PIN_LABELS[id]}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex min-h-[240px] flex-1 items-center justify-center lg:min-h-[320px] lg:justify-end">
              <EastCoastMark
                activeId={activeId}
                motionOn={motionOn}
                inView={inSection}
                reduceMotion={!!reduceMotion}
                mapY={reduceMotion ? undefined : mapY}
                onHighlight={setHighlight}
                onToggle={toggleHighlight}
                onLeave={handleLeave}
              />
            </div>
          </div>

          <div className="w-full pt-2 md:pt-4">
            <motion.div
              className="mb-6 h-px origin-left bg-line md:mb-8"
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
                  <span className="text-[12px] font-medium tabular-nums tracking-[0.14em] text-muted md:text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[22px] font-medium leading-none tracking-[-0.03em] text-ink md:text-[28px]">
                    {type.name}
                  </p>
                  <p className="mt-2 text-[16px] leading-[26px] text-muted">{type.body}</p>
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
  mapY,
  onHighlight,
  onToggle,
  onLeave,
}: {
  activeId: StateId | null;
  motionOn: boolean;
  inView: boolean;
  reduceMotion: boolean;
  mapY?: MotionValue<number>;
  onHighlight: (id: StateId) => void;
  onToggle: (id: StateId) => void;
  onLeave: () => void;
}) {
  const journeySamples = useMemo(() => sampleSvgPath(COAST_PATH, 48), []);
  const journeyTimes = useMemo(
    () => journeySamples.map((_, i) => i / (journeySamples.length - 1)),
    [journeySamples],
  );
  const coastFlowDelay = TIMING.coastDraw + TIMING.coastDrawDuration;

  const stateIndex = (id: StateId) => COAST_IDS.indexOf(id);

  return (
    <motion.div
      className="relative z-10 flex w-full justify-center overflow-visible lg:justify-end"
      style={mapY ? { y: mapY } : undefined}
    >
      <svg
        viewBox="-360 8 1040 1080"
        preserveAspectRatio="xMaxYMid meet"
        className="h-[220px] w-auto max-w-full overflow-visible sm:h-[260px] md:h-[300px] lg:h-[340px]"
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
            <stop offset="0%" stopColor="#ddd8cf" />
            <stop offset="52%" stopColor="#e2ddd4" />
            <stop offset="100%" stopColor="#e8e3da" />
          </linearGradient>
          <filter id="state-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#d6703e" floodOpacity="0.45" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#12161d" floodOpacity="0.15" />
          </filter>
        </defs>

        <motion.g
          animate={motionOn ? { y: [0, -4, 0] } : undefined}
          transition={
            motionOn
              ? {
                  y: {
                    delay: coastFlowDelay + 0.35,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
              : undefined
          }
        >
          {motionOn ? (
            <>
              <motion.path
                d={COAST_PATH}
                fill="none"
                stroke="#12161d"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.12 }}
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
              <motion.path
                d={COAST_PATH}
                fill="none"
                stroke="#d48452"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeDasharray="4 12"
                initial={{ pathLength: 0, opacity: 0, strokeDashoffset: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.45, 0.35],
                  strokeDashoffset: [0, -32],
                }}
                transition={{
                  pathLength: {
                    delay: TIMING.coastDraw,
                    duration: TIMING.coastDrawDuration,
                    ease: EASE,
                  },
                  opacity: {
                    delay: TIMING.coastDraw,
                    duration: 0.45,
                    times: [0, 0.6, 1],
                  },
                  strokeDashoffset: {
                    delay: coastFlowDelay,
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                pointerEvents="none"
                aria-hidden
              />
            </>
          ) : (
            <path
              d={COAST_PATH}
              fill="none"
              stroke="#12161d"
              strokeOpacity={inView ? 0.1 : 0}
              strokeWidth={1.25}
              strokeLinecap="round"
              pointerEvents="none"
              aria-hidden
            />
          )}

          {EAST_STATES.map((state) => {
            const linked = STATE_TO_PLACE[state.name];
            const on = linked === activeId;
            const fill = on ? STATE_FILL_ACTIVE : (STATE_FILL[state.name] ?? "url(#locations-fill)");
            const dimmed = activeId !== null && !on;
            const idx = stateIndex(linked);
            const revealDelay = TIMING.stateBase + idx * TIMING.stateStagger;

            return (
              <motion.path
                key={state.name}
                d={state.d}
                fill={fill}
                stroke={on ? STATE_STROKE_ACTIVE : "#cfc9bf"}
                strokeWidth={on ? 2.25 : 1}
                filter={on ? "url(#state-glow)" : undefined}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={state.name === "Orissa" ? "Odisha" : state.name}
                aria-pressed={on}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={
                  inView
                    ? {
                        opacity: dimmed ? 0.28 : 1,
                        scale: on ? 1.045 : 1,
                      }
                    : { opacity: 0, scale: 0.94 }
                }
                transition={{
                  opacity: { delay: revealDelay, duration: 0.5, ease: EASE },
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
                onPointerEnter={() => onHighlight(linked)}
                onFocus={() => onHighlight(linked)}
                onClick={() => onToggle(linked)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(linked);
                  }
                }}
              />
            );
          })}

          {motionOn ? (
            <motion.circle
              r={4}
              fill="#d48452"
              initial={{
                cx: journeySamples[0]?.x ?? indiaPins.kolkata.x,
                cy: journeySamples[0]?.y ?? indiaPins.kolkata.y,
                opacity: 0,
              }}
              animate={{
                cx: journeySamples.map((p) => p.x),
                cy: journeySamples.map((p) => p.y),
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                cx: {
                  delay: TIMING.journeyStart,
                  duration: TIMING.journeyDuration,
                  ease: [0.35, 0, 0.2, 1],
                  times: journeyTimes,
                },
                cy: {
                  delay: TIMING.journeyStart,
                  duration: TIMING.journeyDuration,
                  ease: [0.35, 0, 0.2, 1],
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
                  r={on ? 20 : 0}
                  fill="none"
                  stroke="#d6703e"
                  strokeWidth={2}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    on
                      ? motionOn
                        ? { opacity: [0.55, 0], scale: [0.9, 1.55] }
                        : { opacity: 0.35, scale: 1.2 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                />
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={on ? 10 : 6}
                  fill="white"
                  stroke={on ? STATE_STROKE_ACTIVE : "#b8b0a4"}
                  strokeWidth={on ? 3 : 1.5}
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    delay: pinDelay,
                    type: "spring",
                    stiffness: 380,
                    damping: 22,
                  }}
                />
                <circle cx={pin.x} cy={pin.y} r={on ? 4 : 2.75} fill={on ? "#d6703e" : "#9a9084"} />
                {(() => {
                  const label = MAP_LABEL_CENTER[id];
                  const w = MAP_LABEL_WIDTH[id];
                  const h = 26;
                  const dimmed = activeId !== null && !on;
                  return (
                    <motion.g
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={
                        inView
                          ? { opacity: dimmed ? 0.45 : 1, y: 0 }
                          : { opacity: 0, y: 6 }
                      }
                      transition={{ duration: 0.4, ease: EASE, delay: pinDelay + 0.05 }}
                    >
                      <rect
                        x={label.x - w / 2}
                        y={label.y - h / 2}
                        width={w}
                        height={h}
                        rx={h / 2}
                        fill="white"
                        stroke={on ? STATE_STROKE_ACTIVE : "#d8d4cc"}
                        strokeWidth={on ? 1.5 : 1}
                      />
                      <text
                        x={label.x}
                        y={label.y + 4}
                        textAnchor="middle"
                        fill={on ? STATE_STROKE_ACTIVE : "#4a4f57"}
                        fontSize={11}
                        fontWeight={on ? 700 : 600}
                        style={{ fontFamily: "var(--font-jivah-ui, system-ui, sans-serif)" }}
                      >
                        {PIN_LABELS[id]}
                      </text>
                    </motion.g>
                  );
                })()}
              </g>
            );
          })}
        </motion.g>
      </svg>
    </motion.div>
  );
}
