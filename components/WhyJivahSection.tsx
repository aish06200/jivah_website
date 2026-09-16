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
    id: "place",
    title: "Rooted in place",
    body: "Every city and neighbourhood has its own character, routines and aspirations. We seek to understand that context and create developments that belong there—not repeat the same formula everywhere.",
    icon: PlaceIcon,
  },
  {
    id: "life",
    title: "Designed around real life",
    body: "Good design should make everyday life work better. We consider how people move through a space, use it throughout the day and adapt it as their needs change.",
    icon: FamilyIcon,
  },
  {
    id: "connection",
    title: "Space for connection",
    body: "Buildings do not create community on their own. But thoughtful common areas, open spaces and active environments can make it easier for people to meet, interact and feel part of a place.",
    icon: PeopleIcon,
  },
  {
    id: "future",
    title: "Built for what comes next",
    body: "Families grow. Businesses evolve. Neighbourhoods change. We plan spaces to remain useful and relevant through the years—not only impressive at launch.",
    icon: FutureIcon,
  },
] as const;

export function WhyJivahSection() {
  const [open, setOpen] = useState<string | null>("place");

  return (
    <section id="why-jivah" className="relative overflow-hidden bg-white text-ink">
      <div className="site-pad relative z-10 grid gap-10 pt-16 pb-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-[94px] lg:pb-[160px] xl:gap-20">
        <WhyPhotoCarousel />

        <div className="flex w-full max-w-[600px] flex-col md:max-w-none lg:max-w-[640px]">
          <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-ink">
            Our philosophy
          </p>
          <h2 className="section-heading mt-4 text-ink">
            <Link href="/why-jivah" className="transition-opacity hover:opacity-50">
              Better living begins with better decisions
            </Link>
          </h2>
          <p className="mt-6 text-[18px] leading-[26px] text-muted md:text-[19px] md:leading-[28px]">
            Better living, closer to home is not one project format or a fixed list of amenities. It shapes
            how we choose locations, plan spaces and consider the people and neighbourhoods around them.
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

          <p className="mt-10 text-[17px] font-medium leading-[26px] text-ink md:text-[18px] md:leading-[28px]">
            This is what better living, closer to home means to us.
          </p>
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

function PlaceIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function FutureIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7 1.93 0 3.68.79 4.95 2.05L19 4.05A9.011 9.011 0 0 0 13 3Zm-2 14a9 9 0 0 0 9-9h3l-3.89-3.89-.07-.14L15 12h3c0 3.87-3.13 7-7 7a8.96 8.96 0 0 1-4.95-1.95L5 19.95A9.011 9.011 0 0 0 11 17Z" />
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
