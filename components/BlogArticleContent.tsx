import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/base";
import type { BlogArticle, BlogArticleBlock } from "@/lib/types";

function GoBackLink() {
  return (
    <Link
      href="/blog/"
      className="group inline-flex items-center gap-3 text-[15px] font-medium text-ink transition-opacity hover:opacity-70"
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M8.5 2.5L4 7l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Go Back
    </Link>
  );
}

function ArticleBlock({ block }: { block: BlogArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h3 className="article-section-title">{block.title}</h3>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="mt-1 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-forest" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return <p className="font-medium text-ink">{block.text}</p>;
    case "split":
      return (
        <div className="space-y-5">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    default:
      return null;
  }
}

type Props = {
  article: BlogArticle;
};

const TEXT_ONLY_BLOCKS = new Set(["heading", "paragraph", "list", "callout", "split"]);

export function BlogArticleContent({ article }: Props) {
  return (
    <article className="bg-white pb-16 md:pb-24">
      <div className="site-pad pt-8 md:pt-12 lg:pt-14">
        <div className="mx-auto max-w-[920px]">
          <GoBackLink />

          <header className="mt-10 md:mt-12">
            <Link
              href="/blog/"
              className="editorial-label transition-opacity hover:opacity-70"
            >
              Blog
            </Link>
            <h1 className="font-editorial mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.06] tracking-[-0.03em] text-ink md:mt-6">
              {article.title}
            </h1>
            <p className="article-byline mt-5 md:mt-6">
              {article.date}
              <span aria-hidden> • </span>
              Written by {article.author}
            </p>
          </header>

          <figure className="mt-10 md:mt-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#ececec] md:rounded-[28px]">
              <Image
                src={withBase(article.image)}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 920px, 100vw"
                priority
              />
            </div>
          </figure>
        </div>
      </div>

      <div className="site-pad pt-12 md:pt-16 lg:pt-20">
        <div className="article-prose mx-auto max-w-[920px]">
          {article.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {article.sections
            .filter((block) => TEXT_ONLY_BLOCKS.has(block.type))
            .map((block, index) => {
            const isHeading = block.type === "heading";
            return (
              <div
                key={`${block.type}-${index}`}
                className={isHeading ? "mt-12 md:mt-14" : "mt-6 md:mt-7"}
              >
                <ArticleBlock block={block} />
              </div>
            );
          })}

          <aside className="article-cta-banner mt-16 flex flex-col items-center md:mt-20">
            <h2 className="font-editorial text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08] tracking-[-0.03em] text-white">
              Talk to our team, today.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.65] text-white/78 md:text-[17px]">
              Questions after reading? We walk buyers through RERA, loans and site visits — at your pace.
            </p>
            <Link
              href="/contact/?type=home-buyer"
              className="btn-pill btn-white mt-8 inline-flex px-8 py-3.5 text-[15px] font-semibold"
            >
              Schedule a visit
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
