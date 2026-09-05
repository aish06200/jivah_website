import Image from "next/image";
import Link from "next/link";
import { locations, projects } from "@/lib/data";

export const metadata = { title: "Locations" };

export default function LocationsPage() {
  return (
    <div className="bg-white pb-24">
      <header className="site-pad py-20 text-center md:py-28">
        <p className="text-[13px] tracking-wide text-muted">Cities we call home</p>
        <h1 className="mt-4 font-serif text-[28px] leading-[1.15] md:text-5xl md:text-7xl">Locations</h1>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-muted">
          Emerging markets are not waiting rooms. They are cities with their own weather, work and rituals.
        </p>
      </header>
      <div className="site-pad grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => {
          const here = projects.filter(
            (p) => p.city.toLowerCase().includes(loc.name.split(" ")[0].toLowerCase()) || p.city === loc.name,
          );
          return (
            <article key={loc.slug} id={loc.slug}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={loc.image} alt={loc.name} fill className="object-cover" sizes="33vw" />
              </div>
              <h2 className="mt-5 font-serif text-[22px] leading-[1.25] md:text-3xl">{loc.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{loc.line}</p>
              {here.length > 0 ? (
                <ul className="mt-4 space-y-1 text-sm">
                  {here.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="underline decoration-line underline-offset-4">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
