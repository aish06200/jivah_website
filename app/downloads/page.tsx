import { projects } from "@/lib/data";

export const metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <div className="site-pad mx-auto max-w-3xl py-20 md:py-28">
      <h1 className="font-serif text-5xl">Downloads</h1>
      <p className="mt-6 text-sm text-muted">Brochures, floor plans and RERA certificates by project.</p>
      <div className="mt-12 space-y-10">
        {projects.map((p) => (
          <section key={p.slug}>
            <h2 className="font-serif text-2xl">
              {p.name} · {p.city}
            </h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {p.downloads.map((d) => (
                <li key={d.title} className="flex justify-between py-4 text-sm">
                  <span>{d.title}</span>
                  <span className="text-muted">{d.type}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
