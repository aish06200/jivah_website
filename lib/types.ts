export type ProjectStatus = "ongoing" | "upcoming" | "completed";

export type FloorPlanInclude = {
  label: string;
  icon: "bed" | "bath" | "living" | "balcony" | "kitchen" | "utility";
};

export type FloorPlan = {
  id: string;
  label: string;
  title: string;
  summary: string;
  image: string;
  carpetArea: string;
  saleableArea: string;
  includes: FloorPlanInclude[];
};

export type ProjectHighlight = {
  title: string;
  body: string;
  icon: string;
  image?: string;
};

export type ProjectFeatured = {
  eyebrow: string;
  headline?: string;
  intro?: string;
  highlights: ProjectHighlight[];
  images: string[];
  priceNote?: string;
};

export type ProjectConnectivity = {
  place: string;
  time: string;
  distance?: string;
  icon?: "school" | "hospital" | "market" | "station" | "highway" | "landmark";
  /** Mapbox coordinates as [longitude, latitude] */
  coordinates?: [number, number];
  /** Shorter label shown on the map pin */
  mapLabel?: string;
};

export type ProjectLocationSection = {
  headline?: string;
  description?: string;
  /** Mapbox coordinates as [longitude, latitude] */
  coordinates?: [number, number];
  zoom?: number;
};

export type ProjectConstructionProgress = {
  percent: number;
  phase: string;
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  city: string;
  status: ProjectStatus;
  typology: string;
  units: string;
  startingPrice: string;
  possession: string;
  rera: string;
  excerpt: string;
  overview: string;
  image: string;
  imageClass?: string;
  gallery: string[];
  residences: { type: string; size: string; note: string }[];
  amenities: { group: string; items: string[] }[];
  connectivity: ProjectConnectivity[];
  locationSection?: ProjectLocationSection;
  constructionProgress?: ProjectConstructionProgress;
  updates: { date: string; title: string; body: string; image?: string }[];
  downloads: { title: string; type: string }[];
  floorPlans?: FloorPlan[];
  featured?: ProjectFeatured;
};

export type Story = {
  slug: string;
  person: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  video?: boolean;
  readTime: string;
  body: string[];
  projectSlug: string;
};

export type LifePillar = {
  slug: string;
  title: string;
  kicker: string;
  body: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  place: string;
  image: string;
};

export type BlogArticleBlock =
  | { type: "heading"; title: string; kicker?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; aspect?: string; credit?: string }
  | { type: "split"; paragraphs: string[]; image: { src: string; alt: string }; imageSide?: "left" | "right" }
  | { type: "callout"; text: string }
  | { type: "imageGrid"; images: { src: string; alt: string }[] }
  | {
      type: "collage";
      items: { src: string; alt: string; label?: string; layout: "tall" | "wide" | "square" | "panorama" }[];
    };

export type BlogArticle = {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
  excerpt: string;
  statement?: string;
  intro: string[];
  sections: BlogArticleBlock[];
};
