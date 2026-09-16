import { StoriesCarousel } from "@/components/StoriesCarousel";
import { stories } from "@/lib/data";

const HOME_STORY_IMAGES = [
  "/images/figma/story-1.png",
  "/images/figma/story-2.png",
  "/images/figma/story-3.png",
];

export function BuyerResourcesSection() {
  const journal = stories.slice(0, 3).map((story, i) => ({
    ...story,
    image: HOME_STORY_IMAGES[i] ?? story.image,
  }));

  return (
    <section id="resources" className="bg-white py-28 md:py-[180px]">
      <div className="site-pad">
        <h2 className="section-heading max-w-[520px] text-ink">
          Customer stories
        </h2>
      </div>

      <StoriesCarousel stories={journal} />
    </section>
  );
}
