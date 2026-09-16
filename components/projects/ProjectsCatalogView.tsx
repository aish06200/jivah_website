import Image from "next/image";
import Link from "next/link";
import {
  HomeProjectsCarousel,
  HomeProjectsGrid,
  type HomeProjectCard,
} from "@/components/HomeProjectsCarousel";
import { projectListingYear } from "@/lib/project";
import {
  ACTIVE_FEATURED_SLUGS,
  projectsCatalogPages,
  type ProjectsCatalogVariant,
} from "@/lib/projectsCatalogConfig";
import type { Project } from "@/lib/types";

const CARD_IMAGES: Record<string, Pick<HomeProjectCard, "image">> = {
  "jivah-greens-nashik": {
    image: "/images/figma/project-1.png",
  },
  "jivah-gardens-nagpur": {
    image: "/images/figma/project-2.png",
  },
};

/** Client renders — used only on `/projects/delivered/`. */
const DELIVERED_CARD_IMAGES: Record<string, string> = {
  "jivah-gardens-nagpur": "/images/projects/the-meadows-siliguri.jpg",
  "jivah-courtyard-pune": "/images/projects/manor-gardens-rajarhat.jpg",
  "jivah-grove-nashik": "/images/projects/riverdale-newtown-kolkata.jpg",
  "jivah-terrace-solapur": "/images/projects/oceanview-residences-visakhapatnam.jpg",
  "jivah-haven-kolhapur": "/images/projects/the-meadows-siliguri.jpg",
  "jivah-shade-nagpur": "/images/projects/manor-gardens-rajarhat.jpg",
  "jivah-lattice-aurangabad": "/images/projects/the-meadows-siliguri.jpg",
  "jivah-breeze-goa": "/images/projects/manor-gardens-rajarhat.jpg",
  "jivah-orchard-jalgaon": "/images/projects/the-meadows-siliguri.jpg",
};

/** Delivered catalog labels (e.g. active slug still used as Jivah Gardens on `/projects/active/`). */
const DELIVERED_CARD_NAMES: Record<string, string> = {
  "jivah-gardens-nagpur": "Tamluk Downtown Enclave",
};

const DELIVERED_CARD_CITIES: Record<string, string> = {
  "jivah-gardens-nagpur": "Tamluk",
};

function cardPrice(project: Project): string {
  if (project.status === "upcoming") {
    return project.startingPrice === "To be announced" ? "Coming soon" : project.startingPrice;
  }
  return project.startingPrice;
}

function toHomeProjectCard(project: Project, variant: ProjectsCatalogVariant): HomeProjectCard {
  const activeOverride = variant === "active" ? CARD_IMAGES[project.slug] : undefined;
  const deliveredImage =
    variant === "delivered" ? DELIVERED_CARD_IMAGES[project.slug] : undefined;

  const deliveredName =
    variant === "delivered" ? DELIVERED_CARD_NAMES[project.slug] : undefined;
  const deliveredCity =
    variant === "delivered" ? DELIVERED_CARD_CITIES[project.slug] : undefined;

  return {
    slug: project.slug,
    name: deliveredName ?? project.name,
    city: deliveredCity ?? project.city,
    typology: project.typology,
    startingPrice: cardPrice(project),
    excerpt: project.excerpt,
    image: deliveredImage ?? activeOverride?.image ?? project.image,
    imageClass: project.imageClass,
    linked: true,
  };
}

type Props = {
  variant: ProjectsCatalogVariant;
  allProjects: Project[];
};

export function ProjectsCatalogView({ variant, allProjects }: Props) {
  const config = projectsCatalogPages[variant];
  const listed =
    variant === "active"
      ? ACTIVE_FEATURED_SLUGS.map((slug) => allProjects.find((p) => p.slug === slug)).filter(
          (p): p is Project => Boolean(p),
        )
      : allProjects
          .filter((project) => project.status === config.status)
          .sort((a, b) => {
            const yearA = Number(projectListingYear(a) ?? 0);
            const yearB = Number(projectListingYear(b) ?? 0);
            return yearB - yearA;
          });
  const cards = listed.map((project) => toHomeProjectCard(project, variant));

  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden md:min-h-[480px] lg:min-h-[534px]">
          <Image
            src={config.heroImage}
            alt={config.heroImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1536px) 1600px, 100vw"
            quality={90}
          />
      </section>

      <section className="bg-white py-16 md:py-[120px]">
        <div className="site-pad flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="page-title text-ink">{config.title}</h1>
          <Link
            href={config.cta.href}
            className="shrink-0 self-start rounded-full bg-forest px-6 py-2.5 text-[16px] font-semibold leading-none text-white transition-opacity hover:opacity-80 sm:self-auto md:px-7 md:py-3 md:text-[17px]"
          >
            {config.cta.label}
          </Link>
        </div>

        {cards.length ? (
          variant === "active" ? (
            <HomeProjectsCarousel cards={cards} />
          ) : (
            <HomeProjectsGrid cards={cards} maxItems={variant === "upcoming" ? 4 : 9} />
          )
        ) : (
          <div className="site-pad mt-16 max-w-xl">
            <p className="text-[16px] leading-[1.55] text-muted md:text-[17px]">
              {config.emptyMessage}
            </p>
            {config.secondaryCta ? (
              <Link
                href={config.secondaryCta.href}
                className="mt-6 inline-flex text-[14px] font-semibold text-forest hover:underline"
              >
                {config.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </section>
    </>
  );
}
