import Image from "next/image";
import Link from "next/link";
import { EditorialLabel } from "@/components/blog/EditorialLabel";
import { withBase } from "@/lib/base";
import { getBlogListingPosts } from "@/lib/blog";

const posts = getBlogListingPosts();
const featuredPost = posts[0];
const secondaryPosts = posts.slice(1, 3);
const morePosts = posts.slice(2);

function StoryMeta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <p className="editorial-label mt-5 text-[10px] tracking-[0.16em] text-muted/80">
      {date} · {readTime}
    </p>
  );
}

function EditorialCard({
  href,
  image,
  tag,
  title,
  excerpt,
  date,
  readTime,
  priority = false,
  size = "default",
}: {
  href: string;
  image: string;
  tag: string;
  title: string;
  excerpt?: string;
  date: string;
  readTime: string;
  priority?: boolean;
  size?: "default" | "large";
}) {
  const titleClass =
    size === "large"
      ? "font-editorial mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.04] tracking-[-0.03em] text-ink"
      : "font-editorial mt-4 text-[clamp(1.35rem,2.2vw,1.875rem)] leading-[1.08] tracking-[-0.025em] text-ink";

  return (
    <Link href={href} className="group block">
      <div
        className={`relative overflow-hidden bg-[#efefef] ${
          size === "large" ? "aspect-[16/10] md:aspect-[2/1]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={withBase(image)}
          alt=""
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          sizes={size === "large" ? "100vw" : "(min-width: 1024px) 33vw, 50vw"}
          priority={priority}
        />
      </div>
      <div className={size === "large" ? "py-8 md:py-10" : "pt-6"}>
        <EditorialLabel>{tag}</EditorialLabel>
        <h2 className={`${titleClass} transition-opacity duration-300 group-hover:opacity-65`}>{title}</h2>
        {excerpt ? (
          <p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-muted md:text-[17px]">{excerpt}</p>
        ) : null}
        <StoryMeta date={date} readTime={readTime} />
      </div>
    </Link>
  );
}

export function BlogIndexContent() {
  return (
    <div className="bg-white pb-24 md:pb-32">
      <header className="site-pad border-b border-ink/10 py-14 md:py-20">
        <EditorialLabel>Resources</EditorialLabel>
        <h1 className="font-editorial mt-5 max-w-4xl text-[clamp(2.75rem,7vw,5rem)] leading-[0.92] tracking-[-0.04em] text-ink">
          The Journal
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-muted md:text-[18px]">
          Guides on buying, neighbourhoods and investment — written for people who want clarity before they commit.
        </p>
      </header>

      <section>
        <Link href={featuredPost.href} className="group block">
          <div className="relative aspect-[4/5] max-h-[88vh] bg-[#efefef] sm:aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src={withBase(featuredPost.image)}
              alt=""
              fill
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
              sizes="100vw"
              priority
            />
          </div>
          <div className="site-pad py-10 md:mx-auto md:max-w-4xl md:py-14 md:text-center lg:py-16">
            <EditorialLabel>{featuredPost.tag}</EditorialLabel>
            <h2 className="font-editorial mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.035em] text-ink transition-opacity duration-300 group-hover:opacity-65">
              {featuredPost.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.7] text-muted md:text-[18px]">
              {featuredPost.excerpt}
            </p>
            <StoryMeta date={featuredPost.date} readTime={featuredPost.readTime} />
          </div>
        </Link>
      </section>

      <hr className="editorial-rule" />

      {secondaryPosts.length > 0 ? (
        <section className="site-pad grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20 lg:gap-20 lg:py-24">
          {secondaryPosts.map((post) => (
            <EditorialCard key={post.slug} {...post} />
          ))}
        </section>
      ) : null}

      {morePosts.length > 0 ? (
        <section className="site-pad pb-8">
          <div className="border-t border-ink/10 pt-14 md:pt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-editorial text-[clamp(2rem,3.5vw,2.75rem)] leading-none tracking-[-0.03em] text-ink">
                More to read
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-muted">
                Practical notes on RERA, mixed-use neighbourhoods and the paperwork before you book.
              </p>
            </div>

            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
              {morePosts.map((post) => (
                <EditorialCard key={post.slug} {...post} excerpt={post.excerpt} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
