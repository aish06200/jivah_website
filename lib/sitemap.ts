import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog";
import { projects, stories } from "@/lib/data";

/** Production origin — override with SITE_URL or NEXT_PUBLIC_SITE_URL at build time. */
export function getSiteOrigin(): string {
  const raw =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://jivahrealty.com";
  return raw.replace(/\/$/, "");
}

function absoluteUrl(path: string): string {
  const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");
  const segment = path === "/" || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const withTrailingSlash = segment.endsWith("/") ? segment : `${segment}/`;
  return `${getSiteOrigin()}${basePath}${withTrailingSlash}`;
}

const STATIC_PATHS = [
  "/",
  "/about/",
  "/blog/",
  "/buying-for-investment/",
  "/channel-partner/",
  "/contact/",
  "/disclaimer/",
  "/downloads/",
  "/enquire/",
  "/guide/",
  "/life/",
  "/locations/",
  "/login/",
  "/partners/",
  "/privacy/",
  "/rera/",
  "/resources/",
  "/services/",
  "/stories/",
  "/terms/",
  "/why-jivah/",
  "/projects/active/",
  "/projects/delivered/",
  "/projects/upcoming/",
  "/projects/jivah-courtyard-nagpur/",
] as const;

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const storyEntries: MetadataRoute.Sitemap = stories.map((story) => ({
    url: absoluteUrl(`/stories/${story.slug}/`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    ...staticEntries,
    ...projectEntries,
    ...blogEntries,
    ...storyEntries,
  ]) {
    byUrl.set(entry.url, entry);
  }

  return [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
}
