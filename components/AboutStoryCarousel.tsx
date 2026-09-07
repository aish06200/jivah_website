"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { withBase } from "@/lib/base";

type AboutStorySlide = {
  kicker: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageClassName?: string;
  imageGradient?: string;
  cta?: { href: string; label: string };
};

const SLIDES: AboutStorySlide[] = [
  {
    kicker: "Vision",
    title: "A better life shouldn't require leaving the city you call home.",
    paragraphs: [
      "Thoughtfully planned neighbourhoods across West Bengal, Andhra Pradesh and Odisha — homes with everyday life already downstairs.",
    ],
    image: "/images/hero-ganges.png",
    imageAlt: "Jivah Ganges neighbourhood entrance with illuminated signage",
  },
  {
    kicker: "Why Jivah",
    title: "Adopting a design-first approach",
    paragraphs: [
      "We start with how people live in a city — ground floor, garden and home in that order. Retail for residents first; RERA, timelines and prices published.",
    ],
    image: "/images/figma/about/design-first.png",
    imageAlt: "Modern Jivah homes with warm timber cladding",
    imageClassName: "object-left",
    cta: { href: "/why-jivah/", label: "Our philosophy" },
  },
];

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
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[#172023] shadow-[0_8px_24px_rgba(18,22,29,0.08)] transition hover:border-[#172023]/20 hover:bg-[#172023] hover:text-white"
    >
      {children}
    </button>
  );
}

function SectionKicker({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[#3e545d]">
      <Image
        src={withBase("/images/figma/about/section-icon.svg")}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
      <p className="text-[16px] font-semibold tracking-[-0.01em]">{children}</p>
    </div>
  );
}

export function AboutStoryCarousel() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActive((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-[112px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <Image
          src={withBase("/images/figma/about/vector-bg.svg")}
          alt=""
          width={1011}
          height={1054}
          className="absolute right-0 top-12 w-[min(1011px,85vw)] max-w-none opacity-[0.06] lg:-right-24"
        />
      </div>

      <div className="site-pad relative">
        <div
          className="relative mx-auto w-full max-w-[1400px] lg:pb-32"
          aria-roledescription="carousel"
          aria-label="Vision and Why Jivah"
        >
          <article
            key={slide.kicker}
            aria-label={`${slide.kicker}. Slide ${active + 1} of ${SLIDES.length}.`}
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
            <div className="relative flex flex-col gap-6 lg:block lg:gap-0">
              <div className="amenity-card-cut relative h-[220px] overflow-hidden shadow-[0_24px_60px_rgba(18,22,29,0.14)] sm:h-[min(52vh,480px)] sm:min-h-[280px] lg:h-[min(62vh,600px)]">
                <Image
                  src={withBase(slide.image)}
                  alt={slide.imageAlt}
                  fill
                  className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] ${slide.imageClassName ?? ""}`}
                  sizes="(min-width: 1400px) 1400px, 100vw"
                  priority={active === 0}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      slide.imageGradient ??
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 45%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>

              <div className="relative z-10 lg:absolute lg:inset-x-10 lg:bottom-0 lg:translate-y-1/2">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                  <div className="w-full max-w-[720px] rounded-[20px] border border-line/40 bg-white p-6 shadow-[0_16px_48px_rgba(18,22,29,0.18)] md:p-8">
                    <SectionKicker>{slide.kicker}</SectionKicker>
                    <h2 className="section-heading mt-3 text-[#172023] md:text-[36px]">
                      {slide.title}
                    </h2>
                    {slide.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="mt-4 text-[16px] leading-[1.55] tracking-[-0.01em] text-[#172023]/50 md:text-[17px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {slide.cta ? (
                      <Link
                        href={slide.cta.href}
                        className="btn-pill btn-forest mt-6 inline-flex px-8 py-[17px] text-[16px]"
                      >
                        {slide.cta.label}
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 items-center justify-start gap-3 lg:justify-end lg:gap-4">
                    <CarouselNavButton label="Previous story" onClick={goPrev}>
                      <ChevronLeftIcon />
                    </CarouselNavButton>

                    <div className="flex items-center justify-center gap-2">
                      {SLIDES.map((item, index) => (
                        <button
                          key={item.kicker}
                          type="button"
                          aria-label={`Go to ${item.kicker}`}
                          aria-current={index === active ? true : undefined}
                          onClick={() => setActive(index)}
                          className={`h-1.5 rounded-full transition-[width,background-color,transform] duration-300 ${
                            index === active
                              ? "w-7 scale-100 bg-forest"
                              : "w-1.5 scale-90 bg-[#172023]/20 hover:scale-100 hover:bg-[#172023]/35"
                          }`}
                        />
                      ))}
                    </div>

                    <CarouselNavButton label="Next story" onClick={goNext}>
                      <ChevronRightIcon />
                    </CarouselNavButton>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
