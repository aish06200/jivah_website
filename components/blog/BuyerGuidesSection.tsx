"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { withBase } from "@/lib/base";

export type BuyerGuidePost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
  excerpt: string;
  href: string;
};

const PER_PAGE = 3;

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-ink">
      <span className="size-1.5 shrink-0 rounded-full bg-forest" aria-hidden />
      {label}
    </span>
  );
}

function ArrowButton({
  direction,
  disabled = false,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous articles" : "Next articles"}
      className="flex size-10 items-center justify-center rounded-full border border-line/80 text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className={direction === "next" ? "rotate-180" : undefined}
      >
        <path
          d="M10 3L5 8L10 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function BuyerGuidesSection({ posts }: { posts: BuyerGuidePost[] }) {
  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const safePage = Math.min(page, pageCount - 1);
  const visible = posts.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);
  const showNav = pageCount > 1;

  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
        <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink md:text-[24px]">
          Buyer guides
        </h2>
        {showNav ? (
          <div className="flex gap-2">
            <ArrowButton
              direction="prev"
              disabled={safePage === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            />
            <ArrowButton
              direction="next"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {visible.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line/70 bg-white p-3 transition-shadow hover:shadow-[0_12px_40px_rgba(18,22,29,0.06)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper">
              <Image
                src={withBase(item.image)}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col px-2 pb-3 pt-5">
              <CategoryPill label={item.tag} />
              <h3 className="mt-4 text-[18px] font-medium leading-snug tracking-[-0.02em] text-ink md:text-[20px]">
                {item.title}
              </h3>
              <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted">
                {item.excerpt}
              </p>
              <p className="mt-5 text-[13px] text-muted">
                {item.date} · {item.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
