import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { withBase } from "@/lib/base";
import { getBlogListingPosts } from "@/lib/blog";

export const metadata = { title: "Blog" };

const posts = getBlogListingPosts();
const featuredPost = posts[0];
const latestPosts = posts.slice(1, 5);
const gridPosts = posts.slice(2, 5);

function CategoryPill({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] ${
        light ? "bg-white/95 text-ink shadow-sm" : "bg-paper text-ink"
      }`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-forest" aria-hidden />
      {label}
    </span>
  );
}

function ArrowButton({
  direction,
  disabled = false,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
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

export default function BlogPage() {
  return (
    <div className="bg-white pb-24">
      <PageIntro kicker="Resources" title="Real estate insights">
        Practical guides for buyers — loans, RERA, documents and what to look for on a site visit.
      </PageIntro>

      <div className="site-pad space-y-16 md:space-y-20 lg:space-y-24">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <Link
            href={featuredPost.href}
            className="group relative block min-h-[320px] overflow-hidden rounded-[24px] bg-paper sm:min-h-[380px] lg:min-h-[460px]"
          >
            <Image
              src={withBase(featuredPost.image)}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
              <CategoryPill label={featuredPost.tag} light />
              <h2 className="mt-4 max-w-2xl text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-white md:text-[clamp(1.5rem,2.4vw,2rem)] md:leading-[1.15]">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-[14px] text-white/75">
                {featuredPost.date} · {featuredPost.readTime}
              </p>
            </div>
          </Link>

          <div className="flex flex-col justify-center">
            <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink md:text-[24px]">Latest posts</h2>
            <ul className="mt-6 flex flex-col gap-6 md:gap-8">
              {latestPosts.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="group flex gap-4">
                    <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-paper md:size-20">
                      <Image
                        src={withBase(item.image)}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-0.5">
                      <p className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink transition-opacity group-hover:opacity-60 md:text-[16px]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[13px] text-muted">
                        {item.date} · {item.readTime}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
            <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink md:text-[24px]">Buyer guides</h2>
            <div className="flex gap-2">
              <ArrowButton direction="prev" disabled />
              <ArrowButton direction="next" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {gridPosts.map((item) => (
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
                  <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted">{item.excerpt}</p>
                  <p className="mt-5 text-[13px] text-muted">
                    {item.date} · {item.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
