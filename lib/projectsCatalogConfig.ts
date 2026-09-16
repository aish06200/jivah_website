import type { ProjectStatus } from "./types";

export type ProjectsCatalogVariant = "active" | "delivered" | "upcoming";

/** Same pair as homepage `#projects` — two large active-style cards. */
export const ACTIVE_FEATURED_SLUGS = [
  "jivah-greens-nashik",
  "jivah-gardens-nagpur",
] as const;

type CatalogPageConfig = {
  variant: ProjectsCatalogVariant;
  status: ProjectStatus;
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  emptyMessage: string;
};

export const projectsCatalogPages: Record<ProjectsCatalogVariant, CatalogPageConfig> = {
  active: {
    variant: "active",
    status: "ongoing",
    title: "Active projects",
    description:
      "Neighbourhoods under construction today — mixed-use homes where groceries, gardens and family life share the same address.",
    heroImage: "/images/figma/project-detail/hero.png",
    heroImageAlt: "Jivah Ganges, Konnagar",
    cta: { href: "/projects/delivered/", label: "View delivered projects" },
    secondaryCta: { href: "/projects/upcoming/", label: "See what’s next" },
    emptyMessage: "No active projects at the moment. Check back soon or speak with our team.",
  },
  delivered: {
    variant: "delivered",
    status: "completed",
    title: "Recent deliveries",
    description:
      "We don’t just build — we hand over neighbourhoods you can live in. Explore completed Jivah projects: mixed-use, designed for comfort, built to last.",
    heroImage: "/images/delivered-hero.jpg",
    heroImageAlt: "Delivered Jivah neighbourhood",
    cta: { href: "/projects/active/", label: "View active projects" },
    secondaryCta: { href: "/projects/upcoming/", label: "Upcoming launches" },
    emptyMessage: "No delivered neighbourhoods yet.",
  },
  upcoming: {
    variant: "upcoming",
    status: "upcoming",
    title: "Upcoming projects",
    description:
      "The next mixed-use neighbourhoods along our east-coast corridor — registration underway until MahaRERA numbers are issued.",
    heroImage: "/images/banner-interior.jpg",
    heroImageAlt: "Upcoming Jivah neighbourhood",
    cta: { href: "/projects/active/", label: "View active projects" },
    secondaryCta: { href: "/contact/", label: "Register interest" },
    emptyMessage: "New launches will be listed here. Register interest to hear first.",
  },
};

export const PROJECT_CATALOG_FILTERS = ["All", "Residential", "Mixed-use", "Plotted"] as const;

export type ProjectCatalogFilter = (typeof PROJECT_CATALOG_FILTERS)[number];
