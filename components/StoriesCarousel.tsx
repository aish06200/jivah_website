"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { withBase } from "@/lib/base";

type StoryItem = {
  slug: string;
  person: string;
  excerpt: string;
  image: string;
  category?: string;
};

const HOLD = 6000;

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 28" fill="currentColor" aria-hidden>
      <path d="M0 14.5C0 6.5 5.8 0 14 0v6.5C9.2 6.5 6 10.2 6 14.5H14v13.5H0V14.5Zm18 0C18 6.5 23.8 0 32 0v6.5c-4.8 0-8 3.7-8 8H32v13.5H18V14.5Z" />
    </svg>
  );
}

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

function StoryQuoteCard({
  story,
  className = "",
}: {
  story: StoryItem;
  className?: string;
}) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={`group flex min-h-[320px] flex-col overflow-hidden rounded-[12px] bg-paper ring-1 ring-ink/8 transition-shadow duration-300 hover:shadow-[0_20px_48px_-28px_rgba(18,22,29,0.18)] md:min-h-[360px] md:rounded-[16px] ${className}`}
    >
      <div className="relative h-[120px] shrink-0 overflow-hidden bg-paper sm:h-[132px]">
        <img
          src={withBase(story.image)}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-md saturate-[0.9] transition duration-700 group-hover:scale-[1.15] group-hover:opacity-80"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-paper/75 to-paper" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <QuoteIcon className="size-6 text-forest md:size-7" />
        <p className="body-lede mt-5 flex-1 text-[17px] leading-[1.58] text-ink md:text-[18px] md:leading-[1.62]">
          {story.excerpt}
        </p>
        <div className="mt-7 border-t border-line/70 pt-5">
          <p className="title-ui text-[17px] text-ink md:text-[18px]">{story.person}</p>
          {story.category ? (
            <p className="mt-1.5 text-[13px] font-medium text-muted md:text-[14px]">{story.category}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function CarouselNavButton({
  label,
  onClick,
  variant = "ghost",
  children,
}: {
  label: string;
  onClick: () => void;
  variant?: "ghost" | "primary";
  children: ReactNode;
}) {
  const styles =
    variant === "primary"
      ? "border-forest bg-forest text-white hover:opacity-90"
      : "border-line bg-white text-ink shadow-[0_8px_24px_rgba(18,22,29,0.06)] hover:border-ink/20 hover:bg-ink hover:text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition md:size-11 ${styles}`}
    >
      {children}
    </button>
  );
}

function CarouselControls({
  count,
  index,
  onSelect,
  onPrev,
  onNext,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (count < 2) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-6 md:mt-12">
      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show story ${i + 1} of ${count}`}
            aria-current={i === index ? true : undefined}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
              i === index ? "w-7 bg-forest" : "w-1.5 bg-forest/25 hover:bg-forest/40"
            }`}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <CarouselNavButton label="Previous story" onClick={onPrev}>
          <ChevronLeftIcon />
        </CarouselNavButton>
        <CarouselNavButton label="Next story" onClick={onNext} variant="primary">
          <ChevronRightIcon />
        </CarouselNavButton>
      </div>
    </div>
  );
}

export function StoriesCarousel({ stories }: { stories: StoryItem[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = () => setIndex((current) => (current + 1) % stories.length);
  const goPrev = () => setIndex((current) => (current - 1 + stories.length) % stories.length);

  useEffect(() => {
    if (reduceMotion || paused || stories.length < 2) return;

    const id = window.setInterval(goNext, HOLD);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, stories.length, index]);

  return (
    <div
      className="site-pad mt-10 md:mt-12"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <ul
        className="hidden list-none gap-6 lg:grid lg:grid-cols-3 lg:gap-8"
        aria-label="People’s stories"
      >
        {stories.map((story) => (
          <li key={story.slug} className="min-h-0">
            <StoryQuoteCard story={story} className="h-full" />
          </li>
        ))}
      </ul>

      <div className="lg:hidden" aria-label="People’s stories" aria-roledescription="carousel">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stories[index].slug}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <StoryQuoteCard story={stories[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselControls
          count={stories.length}
          index={index}
          onSelect={setIndex}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>

      <div className="hidden md:block lg:hidden">
        <div
          className="-mx-[clamp(1.5rem,5.5vw,5rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.5rem,5.5vw,5rem)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="People’s stories"
        >
          {stories.map((story) => (
            <StoryQuoteCard
              key={story.slug}
              story={story}
              className="w-[min(88vw,400px)] shrink-0 snap-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
