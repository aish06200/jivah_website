import type { Project, ProjectStatus } from "./types";

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
