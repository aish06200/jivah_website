import type { Project, ProjectCatalogCategory, ProjectStatus } from "./types";

export function uniqueImages(project: Project): string[] {
  return Array.from(new Set([project.image, ...project.gallery]));
}

export function homesCount(units: string): number | null {
  const n = parseInt(units.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

export const statusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function projectCatalogCategory(project: Project): ProjectCatalogCategory {
  if (project.catalogCategory) return project.catalogCategory;
  const everyday = project.amenities.find((a) => a.group === "Everyday");
  const hasRetail = everyday?.items.some((item) =>
    /grocer|pharmacy|clinic|mart/i.test(item),
  );
  return hasRetail ? "Mixed-use" : "Residential";
}

/** Year shown on delivered / upcoming cards (from possession or update dates). */
export function projectListingYear(project: Project): string | null {
  const fromPossession = project.possession.match(/\b(20\d{2})\b/);
  if (fromPossession) return fromPossession[1];
  const fromUpdate = project.updates[0]?.date.match(/\b(20\d{2})\b/);
  return fromUpdate ? fromUpdate[1] : null;
}

export function nextProject(projects: Project[], slug: string): Project | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return undefined;
  return projects[(i + 1) % projects.length];
}

export function similarProjects(all: Project[], slug: string, count = 3): Project[] {
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0) return all.slice(0, count);
  return [...all.slice(i + 1), ...all.slice(0, i)].slice(0, count);
}
