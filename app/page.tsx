import Link from "next/link";
import { BuyerResourcesSection } from "@/components/BuyerResourcesSection";
import { GrowingSection } from "@/components/GrowingSection";
import { Hero } from "@/components/Hero";
import { HeroMetricsSection } from "@/components/HeroMetricsSection";
import { HomeProjectsCarousel } from "@/components/HomeProjectsCarousel";
import { IntentBanner } from "@/components/IntentBanner";
import { WhyJivahSection } from "@/components/WhyJivahSection";
import { projects } from "@/lib/data";
import { ACTIVE_FEATURED_SLUGS } from "@/lib/projectsCatalogConfig";

const HOME_PROJECT_IMAGES: Record<(typeof ACTIVE_FEATURED_SLUGS)[number], string> = {
  "jivah-greens-nashik": "/images/figma/project-1.png",
  "jivah-gardens-nagpur": "/images/figma/project-2.png",
};

export default function Home() {
  const cards = ACTIVE_FEATURED_SLUGS.map((slug) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) throw new Error(`Missing project: ${slug}`);
    return { ...project, image: HOME_PROJECT_IMAGES[slug], linked: true as const };
  });

  return (
    <>
      <Hero />
      <HeroMetricsSection />

      <section id="projects" className="bg-white py-16 md:py-[120px]">
        <div className="site-pad flex items-center justify-between gap-6">
          <h2 className="title-ui-page text-ink">Active projects</h2>
          <Link
            href="/projects/active/"
            className="shrink-0 rounded-full bg-forest px-6 py-2.5 text-[16px] font-semibold leading-none text-white transition-opacity hover:opacity-80 md:px-7 md:py-3 md:text-[17px]"
          >
            View active projects
          </Link>
        </div>

        <HomeProjectsCarousel cards={cards} />
      </section>

      <WhyJivahSection />
      <GrowingSection />
      <BuyerResourcesSection />
      <IntentBanner />
    </>
  );
}

