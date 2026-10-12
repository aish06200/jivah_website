export type BrandAsset = {
  title: string;
  description?: string;
  path: string;
  filename: string;
  type: string;
};

/** Logos and marks for press, partners and internal use */
export const brandAssets: BrandAsset[] = [
  {
    title: "Logo — header / nav",
    description: "Stacked mark with JIVAH Realty on light backgrounds (transparent PNG)",
    path: "/images/figma/logo-nav-lockup.png",
    filename: "jivah-logo-nav-lockup.png",
    type: "PNG",
  },
  {
    title: "Logo — hero / footer",
    description: "Wordmark for dark footer blocks",
    path: "/images/figma/logo-hero.png",
    filename: "jivah-logo-hero.png",
    type: "PNG",
  },
  {
    title: "Logo — lockup",
    description: "Stacked mark with JIVAH Realty on dark field",
    path: "/images/figma/logo-lockup.png",
    filename: "jivah-logo-lockup.png",
    type: "PNG",
  },
  {
    title: "Brand mark — bars",
    description: "Terracotta icon for social and avatars",
    path: "/images/figma/j-mark-preloader.png",
    filename: "jivah-mark-bars.png",
    type: "PNG",
  },
  {
    title: "Brand mark — vector",
    description: "Twin-bar SVG",
    path: "/images/figma/j-mark-revised.svg",
    filename: "jivah-mark-bars.svg",
    type: "SVG",
  },
];

export const brandAssetsZip = {
  path: "/downloads/jivah-brand-assets.zip",
  filename: "jivah-brand-assets.zip",
  label: "Download all brand assets (ZIP)",
};
