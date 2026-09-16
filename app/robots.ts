import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/sitemap";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");
  const sitemap = `${getSiteOrigin()}${basePath}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap,
  };
}
