export type ProjectStatus = "ongoing" | "upcoming" | "completed";

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
  connectivity: { place: string; time: string }[];
  updates: { date: string; title: string; body: string }[];
  downloads: { title: string; type: string }[];
};

export type Story = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
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
