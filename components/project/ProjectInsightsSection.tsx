import Link from "next/link";
import { withBase } from "@/lib/base";
import { InsightsArticles, type InsightArticle } from "@/components/project/InsightsArticles";
import type { Story } from "@/lib/types";

export type { InsightArticle };

const INSIGHT_IMAGES = [
  "/images/figma/project-detail/insights/insight-1.png",
  "/images/figma/project-detail/insights/insight-2.png",
  "/images/figma/project-detail/insights/insight-3.png",
];

const INSIGHT_TAGS = ["Tips", "Guides", "Updates"];

type Props = {
  articles: InsightArticle[];
};

export function ProjectInsightsSection({ articles }: Props) {
  return (
    <section id="insights" className="scroll-mt-24 border-t border-line bg-white py-14 md:py-20 lg:py-28">
      <div className="site-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center">
                <img
                  src={withBase("/images/figma/project-detail/insights/blog-icon.svg")}
                  alt=""
                  className="size-5"
                  aria-hidden
                />
              </span>
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-[#3e545d]">Blog</p>
            </div>
            <h2 className="section-heading mt-3 text-ink lg:text-[52px]">
              Real estate insights
            </h2>
            <p className="mt-2 text-[17px] leading-[1.55] text-muted md:text-[18px]">
              Stay ahead in the property market with expert advice and updates
            </p>
          </div>

          <Link
            href="/stories/"
            className="btn-pill btn-forest shrink-0 self-start px-8 py-4 text-[16px] font-semibold lg:self-auto"
          >
            Read all articles
          </Link>
        </div>

        <InsightsArticles articles={articles} />
      </div>
    </section>
  );
}

export function buildInsightArticles(stories: Story[]): InsightArticle[] {
  return stories.slice(0, 3).map((story, index) => ({
    ...story,
    displayImage: INSIGHT_IMAGES[index] ?? story.image,
    tag: INSIGHT_TAGS[index] ?? "Stories",
  }));
}
