"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/base";
import type { FloorPlan, FloorPlanInclude } from "@/lib/types";

type Props = {
  plans: FloorPlan[];
};

function IncludeIcon({ icon }: { icon: FloorPlanInclude["icon"] }) {
  const props = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", "aria-hidden": true as const };

  switch (icon) {
    case "bed":
      return (
        <svg {...props}>
          <path d="M3 12V16M17 12V16M3 12h14M5 12V9a2 2 0 012-2h6a2 2 0 012 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M3 8V6a1 1 0 011-1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "bath":
      return (
        <svg {...props}>
          <path d="M4 10h12v2a3 3 0 01-3 3H7a3 3 0 01-3-3v-2Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 10V7a2 2 0 012-2h1M14 6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "living":
      return (
        <svg {...props}>
          <path d="M4 14V8l6-4 6 4v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M8 14v-3h4v3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "balcony":
      return (
        <svg {...props}>
          <path d="M4 14h12M6 14V8h8v6M8 8V5M12 8V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...props}>
          <rect x="4" y="5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7 9h2M11 9h2M7 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "utility":
      return (
        <svg {...props}>
          <rect x="5" y="4" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export function ProjectFloorPlansSection({ plans }: Props) {
  const [activeId, setActiveId] = useState(plans[0]?.id ?? "");
  const active = plans.find((plan) => plan.id === activeId) ?? plans[0];

  if (!active) return null;

  return (
    <section id="floor-plans" className="scroll-mt-24 bg-white py-14 md:py-20 lg:py-24">
      <div className="site-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <p className="editorial-label text-forest">Choose your home</p>
            <h2 className="section-heading mt-3 max-w-sm text-ink">
              Thoughtful layouts for modern living.
            </h2>
          </div>

          <div className="order-2 w-full lg:order-1 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="relative min-h-[min(88vw,480px)] w-full overflow-hidden rounded-2xl bg-paper lg:min-h-0 lg:overflow-visible lg:rounded-none lg:bg-transparent">
              <Image
                key={active.id}
                src={withBase(active.image)}
                alt={`${active.title} floor plan`}
                width={1024}
                height={819}
                className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4 lg:static lg:h-auto lg:w-full lg:p-0"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>

          <div className="order-3 lg:col-span-5 lg:col-start-8 lg:row-start-2">
            <div key={active.id} aria-live="polite">
              <div className="inline-flex gap-1" role="tablist" aria-label="Floor plan type">
                {plans.map((plan) => {
                  const selected = plan.id === active.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(plan.id)}
                      className={`rounded-lg px-7 py-2.5 text-[14px] font-medium transition md:px-9 md:text-[15px] ${
                        selected
                          ? "bg-forest text-white"
                          : "bg-[#ece6dc] text-[#5c4a32] hover:bg-[#e3dacf]"
                      }`}
                    >
                      {plan.label}
                    </button>
                  );
                })}
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-6 md:mt-8 md:gap-10">
                <div>
                  <dt className="text-[13px] text-muted">Carpet Area</dt>
                  <dd className="mt-1 text-[20px] font-medium text-ink md:text-[22px]">{active.carpetArea}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-muted">Saleable Area</dt>
                  <dd className="mt-1 text-[20px] font-medium text-ink md:text-[22px]">{active.saleableArea}</dd>
                </div>
              </dl>

              <div className="mt-8 md:mt-10">
                <p className="text-[15px] font-medium text-ink md:text-[16px]">Includes</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 md:mt-4 md:gap-4">
                  {active.includes.map((item) => (
                    <li
                      key={item.label}
                      className="flex flex-col gap-2.5 rounded-2xl border border-line/60 bg-paper p-4 md:flex-row md:items-center md:gap-3 md:rounded-xl md:px-4 md:py-3.5"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-forest shadow-[0_2px_8px_rgba(18,22,29,0.06)]">
                        <IncludeIcon icon={item.icon} />
                      </span>
                      <span className="text-[14px] font-medium leading-snug text-ink md:text-[15px]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/downloads/" className="btn-pill btn-forest mt-8 md:mt-10">
                View Floor Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
