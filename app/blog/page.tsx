import Image from "next/image";
import Link from "next/link";
import { BuyerGuidesSection } from "@/components/blog/BuyerGuidesSection";
import { PageIntro } from "@/components/PageIntro";
import { withBase } from "@/lib/base";
import { getBlogArticle, getBlogListingPosts } from "@/lib/blog";

export const metadata = { title: "Blog" };

const posts = getBlogListingPosts();
const featuredPost = posts[0];
const featuredArticle = getBlogArticle(featuredPost.slug);
const latestPosts = posts.slice(1);
const buyerGuidePosts = posts.slice(5);
const showBuyerGuides = buyerGuidePosts.length > 0;

type ListingPost = (typeof posts)[number];

function CategoryPill({
  label,
  light = false,
  className = "",
}: {
  label: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] ${
        light ? "bg-white/95 text-ink shadow-sm" : "bg-paper text-ink"
      } ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-forest" aria-hidden />
      {label}
    </span>
  );
}

function FeaturedPostCard({
  post,
  previewParagraphs,
}: {
  post: ListingPost;
  previewParagraphs: string[];
}) {
  return (
    <article className="flex w-full min-w-0 flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
      <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden rounded-[8px] bg-paper lg:aspect-auto lg:h-full lg:min-h-[min(68vh,620px)] lg:sticky lg:top-[calc(69px+2rem)]">
        <Image
          src={withBase(post.image)}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      <div className="flex min-w-0 w-full flex-col justify-center lg:py-2">
        <div className="w-full min-w-0 max-w-none">
          <CategoryPill label={post.tag} />
          <h3 className="card-title mt-5 text-[22px] leading-[1.2] text-ink md:text-[28px] md:leading-[1.15]">
            {post.title}
          </h3>

          <div className="mt-6 space-y-4 border-t border-line/60 pt-6">
            <p className="body-lede text-[17px] font-medium text-ink md:text-[19px] md:leading-[1.6]">
              {post.excerpt}
            </p>
            {previewParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="body-lede text-[16px] text-muted md:text-[18px] md:leading-[1.62]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-line/40 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <p className="text-[13px] tabular-nums text-muted md:text-[14px]">
              {post.date} · {post.readTime}
            </p>
            <Link
              href={post.href}
              className="inline-flex w-fit items-center justify-center rounded-full bg-forest px-7 py-3 text-[15px] font-semibold leading-none text-white transition-opacity hover:opacity-85 md:px-8 md:py-3.5 md:text-[16px]"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: ListingPost }) {
  return (
    <Link href={post.href} className="group flex h-full min-w-0 flex-col gap-4 md:gap-5">
      <div className="relative h-[240px] overflow-hidden rounded-[8px] bg-paper sm:h-[260px] md:h-[300px] lg:h-[340px]">
        <Image
          src={withBase(post.image)}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-colors duration-500 group-hover:from-ink/90" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 md:p-6">
          <CategoryPill label={post.tag} light />
          <p className="text-[13px] tabular-nums text-white/75 md:text-[14px]">
            {post.date} · {post.readTime}
          </p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 px-0.5 pb-1 pt-0.5 md:gap-3.5 md:px-1">
        <h3 className="card-title text-[20px] leading-[1.2] text-ink transition-opacity group-hover:opacity-70 md:text-[22px] lg:text-[24px]">
          {post.title}
        </h3>
        <p className="body-lede line-clamp-2 text-[16px] text-muted md:text-[18px] md:leading-[1.58]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-white pb-24">
      <PageIntro kicker="Resources" title="Real estate insights">
        Guides for first-time buyers and families in emerging cities — RERA, mixed-use, planning early
        and choosing a home that works for the years ahead.
      </PageIntro>

      <div className="site-pad space-y-16 md:space-y-20 lg:space-y-24">
        <section aria-label="Featured article" className="w-full min-w-0">
          <FeaturedPostCard
            post={featuredPost}
            previewParagraphs={featuredArticle?.intro.slice(0, 2) ?? []}
          />
        </section>

        {latestPosts.length > 0 ? (
          <section
            aria-labelledby="latest-posts-heading"
            className="border-t border-line/50 pt-12 md:pt-16 lg:pt-20"
          >
            <h2
              id="latest-posts-heading"
              className="text-[24px] font-medium tracking-[-0.02em] text-ink md:text-[28px]"
            >
              Latest posts
            </h2>
            <ul className="mt-10 grid list-none gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:mt-14 lg:gap-12 xl:gap-14">
              {latestPosts.map((item) => (
                <li key={item.slug} className="min-h-0 py-1 md:py-2">
                  <PostCard post={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {showBuyerGuides ? <BuyerGuidesSection posts={buyerGuidePosts} /> : null}
      </div>
    </div>
  );
}
