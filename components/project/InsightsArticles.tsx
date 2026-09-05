"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { withBase } from "@/lib/base";
import type { Story } from "@/lib/types";

export type InsightArticle = Story & {
  displayImage: string;
  tag: string;
};

const HOLD = 5500;

function InsightCard({ article, className = "" }: { article: InsightArticle; className?: string }) {
  return (
    <Link href={`/stories/${article.slug}/`} className={`group block ${className}`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] bg-paper sm:max-w-[340px] sm:mx-auto lg:max-w-none lg:mx-0 lg:aspect-[440/287]">
        <Image
          src={withBase(article.displayImage)}
          alt=""
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[18px] font-medium leading-snug tracking-[-0.02em] text-ink transition group-hover:text-forest lg:text-[20px]">
            {article.title}
          </h3>
          <p className="mt-1 text-[15px] text-muted lg:text-[16px]">{article.date}</p>
        </div>
        <span className="shrink-0 rounded-full bg-ink/5 px-5 py-2.5 text-[14px] font-semibold text-ink">
          {article.tag}
        </span>
      </div>
    </Link>
  );
}

export function InsightsArticles({ articles }: { articles: InsightArticle[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused || articles.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % articles.length);
    }, HOLD);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, articles.length, index]);

  if (!articles.length) return null;

  return (
    <>
      <div
        className="mt-10 lg:hidden"
        aria-label="Real estate insights"
        aria-roledescription="carousel"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="relative min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={articles[index]?.slug ?? index}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <InsightCard article={articles[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {articles.length > 1 ? (
          <div className="mt-8 flex justify-center gap-2">
            {articles.map((article, i) => (
              <button
                key={article.slug}
                type="button"
                aria-label={`Show article ${i + 1} of ${articles.length}: ${article.title}`}
                aria-current={i === index ? true : undefined}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === index ? "w-7 bg-forest" : "w-1.5 bg-forest/25 hover:bg-forest/40"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-3">
        {articles.map((article) => (
          <InsightCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
