"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StoryPlayBadge } from "@/components/StoryPlayBadge";
import { withBase } from "@/lib/base";

type StoryItem = {
  slug: string;
  person: string;
  excerpt: string;
  image: string;
};

const HOLD = 5500;

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
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_8px_24px_rgba(18,22,29,0.08)] transition hover:border-ink/20 hover:bg-ink hover:text-white"
    >
      {children}
    </button>
  );
}

function StoryCard({ story, className = "" }: { story: StoryItem; className?: string }) {
  return (
    <Link href={`/stories/${story.slug}`} className={`block ${className}`}>
      <div className="relative h-[240px] overflow-hidden rounded-lg bg-paper md:h-[320px]">
        <img
          src={withBase(story.image)}
          alt={story.person}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <StoryPlayBadge />
      </div>
      <h3 className="mt-8 text-[24px] font-medium leading-8 text-ink">{story.person}</h3>
      <p className="mt-2.5 max-w-[496px] text-[18px] leading-[26px] text-muted">{story.excerpt}</p>
    </Link>
  );
}

export function StoriesCarousel({ stories }: { stories: StoryItem[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = () => {
    setIndex((current) => (current + 1) % stories.length);
  };

  const goPrev = () => {
    setIndex((current) => (current - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    if (reduceMotion || paused || stories.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % stories.length);
    }, HOLD);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, stories.length, index]);

  return (
    <>
      <div
        className="site-pad mt-10 md:hidden"
        aria-label="People’s stories"
        aria-roledescription="carousel"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stories[index].slug}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <StoryCard story={stories[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {stories.length > 1 ? (
            <CarouselNavButton label="Previous story" onClick={goPrev}>
              <ChevronLeftIcon />
            </CarouselNavButton>
          ) : null}

          <div className="flex items-center justify-center gap-2">
            {stories.map((story, i) => (
              <button
                key={story.slug}
                type="button"
                aria-label={`Show story ${i + 1} of ${stories.length}: ${story.person}`}
                aria-current={i === index ? true : undefined}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "w-7 bg-forest" : "w-1.5 bg-forest/25 hover:bg-forest/40"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          {stories.length > 1 ? (
            <CarouselNavButton label="Next story" onClick={goNext}>
              <ChevronRightIcon />
            </CarouselNavButton>
          ) : null}
        </div>
      </div>

      <div
        className="mt-10 hidden gap-10 overflow-x-auto px-[clamp(1.5rem,5.5vw,5rem)] pb-2 [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden"
        aria-label="People’s stories"
      >
        {stories.map((story) => (
          <StoryCard
            key={story.slug}
            story={story}
            className="w-[min(80vw,600px)] shrink-0 first:w-[min(80vw,560px)]"
          />
        ))}
      </div>
    </>
  );
}
