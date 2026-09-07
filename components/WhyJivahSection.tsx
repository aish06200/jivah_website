"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   accordion row clicked — plus → minus
 *   40ms   answer opens, height 0 → auto
 *
 * 4500ms   photo carousel: current fade 1 → 0, next 0 → 1 (700ms)
 *    0ms   dot clicked — fade to that photo
 * ───────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { withBase } from "@/lib/base";

const PANEL = {
  spring: { type: "spring" as const, stiffness: 380, damping: 36 },
};

const CAROUSEL = {
  hold: 4500,     // ms each photo stays
  fade: 0.7,      // seconds to crossfade
};

const J_MASK = "/images/figma/why-jivah-j-mask.png";
/** Figma Union node 103:17 — 558 × 691 */
const J_MASK_ASPECT = 558 / 691;

const maskStyle = {
  WebkitMaskImage: `url(${withBase(J_MASK)})`,
  maskImage: `url(${withBase(J_MASK)})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskMode: "alpha",
  maskMode: "alpha",
} as const;

const SLIDES = [
  {
    src: "/images/why-jivah-courtyard.jpg",
    alt: "Families and elders in a Jivah neighbourhood courtyard",
    objectPosition: "object-[28%_center]",
  },
  {
    src: "/images/why-jivah-family.jpg",
    alt: "A grandfather laughing with two grandchildren at home",
    objectPosition: "object-center",
  },
  {
    src: "/images/why-jivah-street.jpg",
    alt: "Families walking a mixed-use street with groceries and a pharmacy downstairs",
    objectPosition: "object-center",
  },
] as const;

const POINTS = [
  {
    id: "essentials",
    title: "Everyday essentials just steps away",
    body: "Groceries and medicines sit on the ground floor — a short walk, not a drive across town.",
    icon: CartIcon,
  },
  {
    id: "family",
    title: "Designed for family life",
    body: "Homes, open space and neighbours in one frame — built for children, elders and the Tuesday in between.",
    icon: FamilyIcon,
  },
  {
    id: "audience",
    title: "Who we build for",
    body: "Families upgrading without leaving. First-time buyers. Investors looking at high-growth towns.",
    icon: PeopleIcon,
  },
] as const;

export function WhyJivahSection() {
  const [open, setOpen] = useState<string | null>("family");

  return (
    <section id="why-jivah" className="relative overflow-hidden bg-white text-ink">
      <div className="site-pad relative z-10 grid gap-10 pt-16 pb-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-[94px] lg:pb-[160px] xl:gap-20">
        <WhyPhotoCarousel />

        <div className="flex w-full max-w-[600px] flex-col md:max-w-none lg:max-w-[640px]">
          <p className="text-[14px] leading-4 text-ink">Why Jivah</p>
          <h2 className="section-heading mt-4 text-ink">
            <Link href="/why-jivah" className="transition-opacity hover:opacity-50">
              Philosophy
            </Link>
          </h2>
          <p className="mt-6 text-[18px] leading-[26px] text-muted md:text-[19px] md:leading-[28px]">
            People shouldn’t have to leave their hometown to live better. Mixed-use neighbourhoods in West
            Bengal, Andhra Pradesh and Odisha — homes with everyday life already downstairs.
          </p>

          <div className="mt-10 border-t border-line/70">
          {POINTS.map((point) => {
            const Icon = point.icon;
            const isOpen = open === point.id;
            return (
              <div key={point.id} className="border-b border-line/70">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left md:gap-5"
                  onClick={() => setOpen(isOpen ? null : point.id)}
                >
                  <PointIconBadge>
                    <Icon />
                  </PointIconBadge>
                  <span className="flex-1 text-[16px] font-medium leading-[22px] text-ink md:text-[18px] md:leading-[26px]">
                    {point.title}
                  </span>
                  <span aria-hidden className="text-[22px] leading-none text-ink">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={PANEL.spring}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-16 text-[16px] leading-[24px] text-muted md:pl-[68px]">
                        {point.body}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, CAROUSEL.hold);
    return () => window.clearInterval(id);
  }, [paused, index]);

  return (
    <div className="relative mx-auto w-full sm:max-w-[320px] md:max-w-[400px] lg:ml-12 lg:mr-auto lg:max-w-[min(100%,558px)] xl:ml-16">
      <figure
        className="relative w-full drop-shadow-[0_24px_60px_rgba(18,22,29,0.1)]"
        style={{ aspectRatio: J_MASK_ASPECT }}
        aria-roledescription="carousel"
        aria-label="Life in a Jivah neighbourhood"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="absolute -inset-px bg-forest" style={maskStyle} aria-hidden />

        <div className="absolute inset-0" style={maskStyle}>
          {SLIDES.map((slide, i) => (
            <motion.img
              key={slide.src}
              src={withBase(slide.src)}
              alt={i === index ? slide.alt : ""}
              initial={{ opacity: i === 0 ? 1 : 0 }}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: CAROUSEL.fade, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 h-full w-full object-cover ${slide.objectPosition}`}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-[10%] bottom-[4.5%] z-[2] flex justify-center gap-2 pb-1 pt-4">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
              aria-current={i === index ? true : undefined}
              className={`pointer-events-auto h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                i === index ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </figure>
    </div>
  );
}

function PointIconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-forest text-white shadow-[0_10px_24px_-16px_rgba(12,123,84,0.85)]">
      {children}
    </span>
  );
}

function CartIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2ZM6.06 6h12.94l-1.5 6H7.56L6.06 6ZM5.02 4H2v2h2l3.6 14.25c.13.55.62.94 1.19.94h9.71c.55 0 1.03-.38 1.15-.91L21 7H6.8L5.77 4H5.02Z" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3L12 3Z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
    </svg>
  );
}
