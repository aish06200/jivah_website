"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { withBase } from "@/lib/base";
import type { Project, ProjectFeatured } from "@/lib/types";

type Props = {
  project: Project;
  featured: ProjectFeatured;
};

const BG_VECTOR = "/images/figma/project-detail/featured/lifestyle-bg-vector.svg";
const LIFESTYLE_ICON = "/images/figma/project-detail/featured/lifestyle-icon.svg";

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 6.5 15 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarouselNavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition hover:border-white hover:bg-white hover:text-[#265943]"
    >
      {children}
    </button>
  );
}

export function ProjectFeaturedSection({ project, featured }: Props) {
  const highlights = featured.highlights;
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % highlights.length);
  }, [highlights.length]);

  const goPrev = useCallback(() => {
    setActive((current) => (current - 1 + highlights.length) % highlights.length);
  }, [highlights.length]);

  const headline = featured.headline ?? "World-class amenities";
  const intro = featured.intro ?? project.excerpt;
  const activeHighlight = highlights[active];
  const image = withBase(
    activeHighlight.image ?? featured.images[active] ?? featured.images[0],
  );

  return (
    <section
      id="featured"
      className="relative scroll-mt-24 overflow-hidden bg-[#265943] py-20 md:py-24 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={withBase(BG_VECTOR)}
          alt=""
          className="amenity-bg-drift absolute left-0 top-12 h-auto w-[min(1011px,90vw)] max-w-none opacity-90 motion-reduce:animate-none lg:-left-24"
        />
        <div className="amenity-header-glow absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-[#00b364]/20 blur-2xl motion-reduce:animate-none lg:blur-3xl" />
      </div>

      <div className="site-pad relative z-10">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
            <div className="flex items-center justify-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden motion-safe:animate-pulse">
                <img src={withBase(LIFESTYLE_ICON)} alt="" className="size-5" aria-hidden />
              </span>
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                {featured.eyebrow}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="section-heading tracking-[-0.04em] text-white md:tracking-[-0.06em] lg:leading-[1.2] lg:text-[52px]">
                {headline}
              </h2>
              {intro ? (
                <p className="mx-auto max-w-2xl text-[16px] leading-[1.4] tracking-[-0.01em] text-white/80 md:text-[18px]">
                  {intro}
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-[1400px] overflow-x-clip pb-24 md:pb-28 lg:pb-32"
            aria-roledescription="carousel"
            aria-label={`${project.name} amenity highlights`}
          >
            <article
              key={activeHighlight.title}
              aria-label={`${activeHighlight.title}. Slide ${active + 1} of ${highlights.length}.`}
              className="group motion-safe:animate-[amenity-card-in_0.45s_ease-out]"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  goNext();
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  goPrev();
                }
              }}
            >
              <div className="relative">
                <div className="amenity-card-cut relative h-[min(56vh,520px)] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:h-[min(62vh,580px)] lg:h-[min(68vh,640px)]">
                  <Image
                    src={image}
                    alt={`${project.name} — ${activeHighlight.title}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1400px) 1400px, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
                </div>

                <div className="absolute inset-x-4 bottom-0 z-10 translate-y-1/2 sm:inset-x-6 md:inset-x-10 lg:inset-x-12">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                    <div className="min-w-0 w-full max-w-2xl rounded-[16px] bg-white p-5 shadow-[0_16px_48px_rgba(18,22,29,0.18)] md:p-6">
                      <h3 className="text-[26px] font-medium leading-[1.3] tracking-[-0.01em] text-ink md:text-[32px] lg:text-[36px]">
                        {activeHighlight.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.65] text-muted md:text-[16px] lg:text-[17px]">
                        {activeHighlight.body}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center justify-start gap-3 sm:justify-end lg:gap-4">
                      <CarouselNavButton label="Previous highlight" onClick={goPrev}>
                        <ChevronLeftIcon />
                      </CarouselNavButton>

                      <div className="flex items-center justify-center gap-2">
                        {highlights.map((item, index) => (
                          <button
                            key={item.title}
                            type="button"
                            aria-label={`Go to ${item.title}`}
                            aria-current={index === active ? true : undefined}
                            onClick={() => setActive(index)}
                            className={`h-1.5 rounded-full transition-[width,background-color,transform] duration-300 ${
                              index === active
                                ? "w-7 scale-100 bg-white"
                                : "w-1.5 scale-90 bg-white/40 hover:scale-100 hover:bg-white/65"
                            }`}
                          />
                        ))}
                      </div>

                      <CarouselNavButton label="Next highlight" onClick={goNext}>
                        <ChevronRightIcon />
                      </CarouselNavButton>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
