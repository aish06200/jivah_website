import Image from "next/image";
import Link from "next/link";
import { stories } from "@/lib/data";

export const metadata = { title: "Blogs" };

const categories = [
  "All",
  "Jivah Greens · Nashik",
  "Jivah Courtyard · Nagpur",
  "Jivah Park · Solapur",
  "Jivah Ridge · Pune",
  "Jivah Orchard · Kolhapur",
  "Jivah Ghat · Sambhajinagar",
];

export default function StoriesPage() {
  return (
    <div className="bg-white pb-24">
      <header className="site-pad py-20 text-center md:py-28">
        <p className="text-[13px] tracking-wide text-muted">From the neighbourhoods</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Blogs</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          Notes from the projects — plans, possession, and how each neighbourhood is actually lived.
        </p>
      </header>
      <div className="site-pad mb-12 flex flex-wrap justify-center gap-3 text-[13px] text-muted">
        {categories.map((c) => (
          <span key={c} className="border border-line px-4 py-1.5">
            {c}
          </span>
        ))}
      </div>
      <div className="site-pad grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="33vw"
              />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-muted">
              {story.category} · {story.date}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight">{story.title}</h2>
            <p className="mt-2 text-sm text-muted">{story.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
