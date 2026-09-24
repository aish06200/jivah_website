import Link from "next/link";
import { StoriesCarousel } from "@/components/StoriesCarousel";
import { stories } from "@/lib/data";

const HOME_STORY_IMAGES = [
  "/images/figma/story-1.png",
  "/images/figma/story-2.png",
  "/images/figma/story-3.png",
];

export function BuyerResourcesSection() {
  const journal = stories.slice(0, 3).map((story, i) => ({
    slug: story.slug,
    person: story.person,
    excerpt: story.excerpt,
    category: story.category,
    image: HOME_STORY_IMAGES[i] ?? story.image,
  }));

  return (
    <section id="resources" className="bg-white py-28 md:py-[180px]">
      <div className="site-pad">
        <h2 className="section-heading max-w-[520px] text-ink">Customer stories</h2>
        <p className="body-lede mt-4 max-w-[34rem] text-[16px] text-muted md:mt-5 md:text-[17px]">
          Same cities, better weeks — how mixed-use neighbourhoods changed daily life without a new
          postcode.
        </p>
      </div>

      <StoriesCarousel stories={journal} />

      <div className="site-pad mt-12 md:mt-14">
        <Link
          href="/stories/"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-opacity hover:opacity-80"
        >
          View all stories
          <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
