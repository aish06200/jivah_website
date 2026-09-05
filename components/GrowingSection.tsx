"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   hover / focus a state
 *    0ms   other states fade 1 → 0.38 (280ms)
 * ───────────────────────────────────────────────────────── */

import { useState } from "react";
import { indiaStatePaths } from "@/lib/indiaOutline";

type StateId = "kolkata" | "odisha" | "andhra";

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

const EAST_STATES = indiaStatePaths.filter((state) => state.highlight);

/** North → south ramp: lighter tints so states read on the forest section bg. */
const STATE_FILL: Record<string, string> = {
  "West Bengal": "#8ab5a3",
  Orissa: "#a8cdb9",
  "Odisha": "#a8cdb9",
  "Andhra Pradesh": "#e8e0cc",
};

const FADE =
  "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), fill 280ms cubic-bezier(0.22, 1, 0.36, 1)";

export function GrowingSection() {
  const [activeId, setActiveId] = useState<StateId | null>(null);

  return (
    <section id="locations" className="bg-forest text-white">
      <div className="site-pad py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-y-10 lg:gap-y-12">
          <div className="flex flex-col gap-y-8 lg:flex-row lg:items-stretch lg:gap-x-16 xl:gap-x-20">
            <div className="flex flex-col gap-y-2 lg:max-w-[36rem] lg:shrink-0">
              <h2 className="section-heading text-white">
                Growing along the east coast
              </h2>
              <p className="max-w-[34ch] text-[16px] leading-[1.55] text-white/70 md:text-[17px]">
                Mixed-use neighbourhoods in West Bengal, Odisha and Andhra
                Pradesh.
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center lg:justify-end">
              <EastCoastMark
                activeId={activeId}
                onSelect={setActiveId}
                onLeave={() => setActiveId(null)}
              />
            </div>
          </div>

          <div className="w-full border-t border-white/20 pt-6 md:pt-8">
            <div className="grid gap-6 sm:grid-cols-3 sm:gap-8 md:gap-10 lg:gap-12">
              {TYPES.map((type, i) => (
                <div key={type.id} className="min-w-0">
                  <span className="text-[12px] font-medium tabular-nums tracking-[0.14em] text-white/40 md:text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[22px] font-medium leading-none tracking-[-0.03em] md:text-[28px]">
                    {type.name}
                  </p>
                  <p className="mt-2 text-[16px] leading-[26px] text-white/70">
                    {type.body}
                  </p>
                </div>
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
  onSelect,
  onLeave,
}: {
  activeId: StateId | null;
  onSelect: (id: StateId) => void;
  onLeave: () => void;
}) {
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
        </defs>
        {EAST_STATES.map((state) => {
          const linked = STATE_TO_PLACE[state.name];
          const on = linked === activeId;
          const fill = STATE_FILL[state.name] ?? "url(#locations-fill)";
          return (
            <path
              key={state.name}
              d={state.d}
              fill={fill}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={state.name === "Orissa" ? "Odisha" : state.name}
              aria-pressed={on}
              style={{
                opacity: activeId === null || on ? 1 : 0.38,
                outline: "none",
                transition: FADE,
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
      </svg>
    </div>
  );
}
