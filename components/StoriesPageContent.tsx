"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoryPlayBadge } from "@/components/StoryPlayBadge";
import { withBase } from "@/lib/base";
import type { Story } from "@/lib/types";

const FILTERS = [
  "All",
  "Jivah Greens · Nashik",
  "Jivah Gardens · Nagpur",
  "Jivah Park · Solapur",
  "Jivah Ridge · Pune",
  "Jivah Orchard · Kolhapur",
  "Jivah Ghat · Sambhajinagar",
] as const;

const STORY_STATS: Record<string, { value: string; label: string }[]> = {
  "anaya-rohan-kulkarni-nashik": [
    { value: "3 BHK", label: "Home chosen" },
    { value: "Same city", label: "Family stayed" },
  ],
  "sneha-patil-nagpur": [
    { value: "2 BHK", label: "First home" },
    { value: "Wardha Road", label: "Nagpur address" },
  ],
  "vikram-shah-solapur": [
    { value: "1 year", label: "Since handover" },
    { value: "Daily", label: "Courtyard use" },
  ],
  "meera-joshi-pune": [
    { value: "2 BHK", label: "East Pune" },
    { value: "18 min", label: "To Kharadi" },
  ],
  "aditya-more-kolhapur": [
    { value: "Villa", label: "Garden home" },
    { value: "Orchard", label: "Trees retained" },
  ],
  "asha-pawar-sambhajinagar": [
    { value: "2 BHK", label: "First salary" },
    { value: "6 min", label: "To bus hub" },
  ],
};

const INITIAL_COUNT = 4;
const LOAD_STEP = 3;

function ReadStoryLink({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[14px] font-semibold text-forest transition group-hover:gap-3 ${className}`}
    >
      Read story
      <span aria-hidden>→</span>
    </span>
  );
}

function StoryStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">{stat.label}</dt>
          <dd className="mt-1 text-[28px] font-medium leading-none tracking-[-0.03em] text-ink md:text-[32px]">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function FeaturedStoryCard({ story }: { story: Story }) {
  const stats = STORY_STATS[story.slug] ?? [];

  return (
    <Link
      href={`/stories/${story.slug}/`}
      className="group grid overflow-hidden rounded-[20px] border border-line bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-0"
    >
      <div className="flex flex-col p-6 md:p-8 lg:p-10 xl:p-12">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a6a3d]">{story.category}</p>
        <ReadStoryLink className="mt-6" />
        <h2 className="section-heading mt-6 text-ink">{story.title}</h2>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-muted md:text-[17px]">{story.excerpt}</p>
        <p className="mt-6 text-[15px] font-medium text-ink">{story.person}</p>
        {stats.length ? <StoryStats stats={stats} /> : null}
      </div>

      <div className="relative min-h-[240px] bg-paper sm:min-h-[320px] lg:min-h-[420px]">
        <Image
          src={withBase(story.image)}
          alt={story.person}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] ${story.video ? "object-center" : "object-top"}`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
        {story.video ? <StoryPlayBadge /> : null}
      </div>
    </Link>
  );
}

function StoryGridCard({ story }: { story: Story }) {
  const stats = STORY_STATS[story.slug]?.[0];

  return (
    <Link
      href={`/stories/${story.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-white"
    >
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">{story.category}</p>
        <ReadStoryLink className="mt-5" />
        <h3 className="mt-5 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-ink transition group-hover:text-forest md:text-[24px]">
          {story.title}
        </h3>
        {stats ? (
          <p className="mt-6 text-[26px] font-medium leading-none tracking-[-0.03em] text-forest md:text-[28px]">
            {stats.value}
          </p>
        ) : null}
      </div>

      <div className="relative aspect-[16/10] bg-paper">
        <Image
          src={withBase(story.image)}
          alt={story.person}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${story.video ? "object-center" : "object-top"}`}
          sizes="(min-width: 1024px) 33vw, 50vw"
        />
        {story.video ? <StoryPlayBadge /> : null}
      </div>
    </Link>
  );
}

function QuoteCard({ story }: { story: Story }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col justify-between rounded-[16px] bg-paper p-7 md:p-9">
      <blockquote className="text-[20px] font-medium leading-[1.45] tracking-[-0.02em] text-ink md:text-[22px]">
        “{story.excerpt}”
      </blockquote>
      <footer className="mt-8 border-t border-line pt-6">
        <p className="text-[15px] font-medium text-ink">{story.person}</p>
        <p className="mt-1 text-[13px] text-muted">{story.category}</p>
      </footer>
    </div>
  );
}

function QuoteMarqueeCard({ story }: { story: Story }) {
  return (
    <figure className="flex h-full min-h-[220px] flex-col justify-between rounded-[16px] border border-line bg-white p-6 md:min-h-[240px] md:p-7">
      <blockquote className="text-[16px] leading-[1.6] text-ink md:text-[17px]">“{story.excerpt}”</blockquote>
      <figcaption className="mt-6">
        <p className="text-[14px] font-semibold text-ink">{story.person}</p>
        <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-muted">{story.category}</p>
      </figcaption>
    </figure>
  );
}

type Props = {
  stories: Story[];
};

export function StoriesPageContent({ stories }: Props) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredStories = useMemo(() => {
    if (activeFilter === "All") return stories;
    return stories.filter((story) => story.category === activeFilter);
  }, [activeFilter, stories]);

  const featuredStory = filteredStories[0];
  const gridStories = filteredStories.slice(1);
  const visibleGridStories = gridStories.slice(0, visibleCount);
  const canLoadMore = visibleCount < gridStories.length;

  const handleFilterChange = (filter: (typeof FILTERS)[number]) => {
    setActiveFilter(filter);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <div className="bg-white pb-24 md:pb-32">
      <header className="site-pad border-b border-line pb-10 pt-14 md:pb-14 md:pt-20">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a6a3d]">People&apos;s stories</p>
        <h1 className="section-heading mt-4 max-w-3xl text-ink md:mt-5">
          Success stories from homeowners like you
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-muted md:text-[18px]">
          Filter to find the most relevant accounts from families, first-time buyers and investors across
          our neighbourhoods.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact/" className="btn-pill btn-forest px-7 py-3.5 text-[15px] font-semibold">
            Schedule a visit
          </Link>
          <Link
            href="/guide/"
            className="btn-pill border border-line bg-white px-7 py-3.5 text-[15px] font-semibold text-ink hover:bg-paper"
          >
            Homebuyer guide
          </Link>
        </div>
      </header>

      <div className="site-pad border-b border-line py-6 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Filter by project</p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                    isActive
                      ? "bg-forest text-white"
                      : "border border-line bg-white text-muted hover:border-forest/30 hover:text-ink"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="site-pad py-10 md:py-14">
        {featuredStory ? (
          <FeaturedStoryCard story={featuredStory} />
        ) : (
          <p className="rounded-[16px] border border-line bg-paper px-6 py-10 text-center text-muted">
            No stories match this filter yet.
          </p>
        )}

        {visibleGridStories.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3">
            {visibleGridStories.map((story, index) => {
              if ((index + 1) % 3 === 0) {
                return <QuoteCard key={`quote-${story.slug}`} story={story} />;
              }
              return <StoryGridCard key={story.slug} story={story} />;
            })}
          </div>
        ) : null}

        {canLoadMore ? (
          <div className="mt-10 flex justify-center md:mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + LOAD_STEP)}
              className="btn-pill border border-line bg-white px-8 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-paper"
            >
              Load more
            </button>
          </div>
        ) : null}
      </div>

      <section className="border-t border-line bg-paper py-14 md:py-20">
        <div className="site-pad">
          <h2 className="section-heading max-w-xl text-ink">What residents are saying</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-muted md:text-[17px]">
            In their own words — how everyday life feels once the boxes are unpacked.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stories.map((story) => (
              <QuoteMarqueeCard key={`marquee-${story.slug}`} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-pad py-14 md:py-20">
        <div className="rounded-[20px] bg-forest px-8 py-12 text-center text-white md:px-12 md:py-16">
          <h2 className="section-heading text-white">Ready to find your neighbourhood?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.6] text-white/80 md:text-[17px]">
            Walk a sample apartment, meet the site team, and see how mixed-use living works in your city.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="btn-pill btn-white px-7 py-3.5 text-[15px] font-semibold">
              Schedule a visit
            </Link>
            <Link
              href="/projects/jivah-greens-nashik/"
              className="btn-pill border border-white/40 px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
