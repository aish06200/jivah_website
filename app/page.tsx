import Link from "next/link";
import { BuyerResourcesSection } from "@/components/BuyerResourcesSection";
import { GrowingSection } from "@/components/GrowingSection";
import { Hero } from "@/components/Hero";
import { HeroMetricsSection } from "@/components/HeroMetricsSection";
import { IntentBanner } from "@/components/IntentBanner";
import { WhyJivahSection } from "@/components/WhyJivahSection";
import { withBase } from "@/lib/base";
import { projects } from "@/lib/data";

const HOME_PROJECTS = [
  {
    slug: "jivah-greens-nashik",
    image: "/images/figma/project-1.png",
    imageClass: "object-[center_32%]",
  },
  {
    slug: "jivah-gardens-nagpur",
    image: "/images/figma/project-2.png",
    imageClass: "object-bottom",
  },
] as const;

const DUMMY_HOME_PROJECT = {
  slug: "jivah-courtyard-pune",
  name: "Jivah Courtyard",
  city: "Pune",
  typology: "2 & 3 BHK",
  startingPrice: "Coming soon",
  excerpt: "A new mixed-use neighbourhood taking shape — register interest for early updates.",
  image: "/images/figma/project-3.png",
  imageClass: "object-center",
} as const;

export default function Home() {
  const cards = [
    ...HOME_PROJECTS.map((item) => {
      const project = projects.find((p) => p.slug === item.slug);
      if (!project) throw new Error(`Missing project: ${item.slug}`);
      return { ...project, image: item.image, imageClass: item.imageClass, linked: true as const };
    }),
    { ...DUMMY_HOME_PROJECT, linked: false as const },
  ];

  return (
    <>
      <Hero />
      <HeroMetricsSection />

      <section id="projects" className="bg-white py-16 md:py-[120px]">
        <div className="site-pad flex items-center justify-between gap-6">
          <h2 className="page-title text-ink">
            Projects
          </h2>
          <Link
            href="#projects"
            className="shrink-0 rounded-full bg-forest px-6 py-2.5 text-[16px] font-semibold leading-none text-white transition-opacity hover:opacity-80 md:px-7 md:py-3 md:text-[17px]"
          >
            View active projects
          </Link>
        </div>

        <div className="site-pad mt-16 flex w-full max-w-full flex-col gap-10 md:flex-row md:gap-[50px] md:overflow-x-auto md:pb-2 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
          {cards.map((project) => {
            const cardClassName =
              "group flex w-full flex-col gap-4 md:w-[min(80vw,615px)] md:shrink-0";
            const cardLabel = `${project.name}, ${project.startingPrice}, ${project.city}`;
            const cardContent = (
              <>
                <div className="relative h-[360px] overflow-hidden rounded-[8px] bg-paper md:h-[538px]">
                  <img
                    src={withBase(project.image)}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${project.imageClass ?? "object-center"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-colors duration-500 group-hover:from-ink/90" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 md:p-6">
                    <p
                      className={`text-[24px] font-semibold leading-none tracking-[-0.03em] md:text-[40px] ${
                        project.startingPrice === "Sold out" || project.startingPrice === "Coming soon"
                          ? "text-white/80"
                          : "text-white"
                      }`}
                    >
                      {project.startingPrice}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent px-3.5 py-2 text-[16px] font-medium leading-4 text-white">
                        <HomeIcon className="size-4 text-white/80" />
                        {project.typology}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent px-3.5 py-2 text-[16px] font-medium leading-4 text-white">
                        <PinIcon className="size-4 text-white/80" />
                        {project.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[22px] font-medium leading-[1.15] tracking-[-0.03em] text-ink md:text-[28px]">
                    {project.name}
                  </h3>
                  <p className="text-[16px] leading-[26px] text-muted md:text-[17px]">
                    {project.excerpt}
                  </p>
                </div>
              </>
            );

            if (project.linked) {
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  aria-label={cardLabel}
                  className={cardClassName}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={project.slug} aria-label={cardLabel} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      <WhyJivahSection />
      <GrowingSection />
      <BuyerResourcesSection />
      <IntentBanner />
    </>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20H4v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

