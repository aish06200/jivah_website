import type { BrandAsset } from "@/lib/brandAssets";

/** Homepage hero and active-project card photography */
export const marketingAssets: BrandAsset[] = [
  {
    title: "Homepage hero",
    description: "“Better Homes. Familiar Roots.” background",
    path: "/images/hero.png",
    filename: "jivah-homepage-hero.png",
    type: "PNG",
  },
  {
    title: "Active project — Jivah Ganges",
    description: "Homepage active projects card (Konnagar)",
    path: "/images/figma/project-1.jpg",
    filename: "jivah-active-project-ganges.png",
    type: "PNG",
  },
  {
    title: "Active project — Jivah Gardens",
    description: "Homepage active projects card (Nagpur)",
    path: "/images/figma/project-2.jpg",
    filename: "jivah-active-project-gardens.png",
    type: "PNG",
  },
];

export const marketingAssetsZip = {
  path: "/downloads/jivah-homepage-imagery.zip",
  filename: "jivah-homepage-imagery.zip",
  label: "Download all homepage imagery (ZIP)",
};
