import { notFound } from "next/navigation";
import { ProjectConstructionProgressSection } from "@/components/project/ProjectConstructionProgressSection";
import { ProjectDetailHero } from "@/components/project/ProjectDetailHero";
import { ProjectFeaturedSection } from "@/components/project/ProjectFeaturedSection";
import { ProjectFloorPlansSection } from "@/components/project/ProjectFloorPlansSection";
import {
  buildInsightArticles,
  ProjectInsightsSection,
} from "@/components/project/ProjectInsightsSection";
import { ProjectLifestyleSection } from "@/components/project/ProjectLifestyleSection";
import { ProjectLocationSection } from "@/components/project/ProjectLocationSection";
import { ProjectSitePlanSection } from "@/components/project/ProjectSitePlanSection";
import { projects, stories } from "@/lib/data";
import { uniqueImages } from "@/lib/project";
import type { Project } from "@/lib/types";

const FIGMA_HERO = "/images/figma/project-detail/hero.png";
const FIGMA_SITE_PLAN = "/images/figma/project-detail/site-plan.png";
const FIGMA_LIFESTYLE_EXTERIOR = "/images/figma/project-detail/lifestyle-exterior.png";
const FIGMA_LIFESTYLE_POOL = "/images/figma/project-detail/lifestyle-pool.png";
const FIGMA_LIFESTYLE_COMMUNITY = "/images/figma/project-detail/lifestyle-community.png";
const FIGMA_LIFESTYLE_WALKWAY = "/images/figma/project-detail/lifestyle-walkway.png";

const GARDENS_DETAIL_HERO = "/images/jivah-gardens-detail-hero.jpg";

function projectHeroImage(slug: string, fallback: string): string {
  if (slug === "jivah-greens-nashik") return FIGMA_HERO;
  if (slug === "jivah-gardens-nagpur") return GARDENS_DETAIL_HERO;
  return fallback;
}

function projectSitePlanImage(slug: string, fallback: string): string {
  return slug === "jivah-greens-nashik" ? FIGMA_SITE_PLAN : fallback;
}

function projectLifestyleImages(slug: string, project: Project): string[] {
  const base = uniqueImages(project);
  if (slug === "jivah-greens-nashik") {
    return [
      FIGMA_LIFESTYLE_EXTERIOR,
      FIGMA_LIFESTYLE_COMMUNITY,
      FIGMA_LIFESTYLE_POOL,
      FIGMA_LIFESTYLE_WALKWAY,
    ];
  }
  if (slug === "jivah-gardens-nagpur") {
    return [
      "/images/jivah-gardens-lifestyle-exterior.jpg",
      "/images/jivah-gardens-lifestyle-yoga.jpg",
      "/images/jivah-gardens-lifestyle-courtyard.jpg",
      "/images/jivah-gardens-lifestyle-amenities.jpg",
    ];
  }
  return base.slice(0, 4);
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.name ?? "Project" };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const heroImage = projectHeroImage(project.slug, project.image);
  const sitePlanImage = projectSitePlanImage(project.slug, project.image);
  const lifestyleImages = projectLifestyleImages(project.slug, project);
  const insightArticles = buildInsightArticles(stories);

  return (
    <article className="overflow-x-clip bg-white">
      <ProjectDetailHero
        project={project}
        heroImage={heroImage}
        imageClass={project.imageClass}
      />

      <ProjectLifestyleSection project={project} images={lifestyleImages} />

      {project.floorPlans?.length ? (
        <ProjectFloorPlansSection plans={project.floorPlans} />
      ) : null}

      {project.featured ? (
        <ProjectFeaturedSection project={project} featured={project.featured} />
      ) : null}

      <ProjectLocationSection project={project} />

      <ProjectSitePlanSection project={project} sitePlanImage={sitePlanImage} />

      <ProjectConstructionProgressSection project={project} />

      <ProjectInsightsSection articles={insightArticles} />
    </article>
  );
}
