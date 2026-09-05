import Link from "next/link";
import { projects } from "@/lib/data";

export const metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <div className="site-pad mx-auto max-w-3xl py-20 md:py-28">
      <p className="text-[13px] tracking-wide text-muted">
        <Link href="/resources" className="hover:text-ink">
          Buyer Resources
        </Link>
        {" / "}
        Downloads
      </p>
      <h1 className="page-title mt-4 text-ink">Downloads</h1>
      <p className="mt-6 text-sm text-muted">Brochures, floor plans and RERA certificates by project.</p>
      <div className="mt-12 space-y-10">
        {projects.map((p) => (
          <section key={p.slug}>
            <h2 className="text-[24px] font-medium leading-8 text-ink">
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
