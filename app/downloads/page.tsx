import Link from "next/link";
import { BrandAssetsList } from "@/components/BrandAssetsList";
import { MarketingImageryList } from "@/components/MarketingImageryList";
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
      <p className="mt-6 text-sm text-muted">
        Brand logos, homepage photography, plus brochures, floor plans and RERA certificates by
        project.
      </p>

      <div className="mt-14 space-y-16 md:space-y-20">
        <BrandAssetsList />

        <MarketingImageryList />

        <section aria-labelledby="project-downloads-heading">
          <h2
            id="project-downloads-heading"
            className="text-[22px] font-medium leading-8 text-ink md:text-[24px]"
          >
            Project documents
          </h2>
          <p className="mt-2 text-sm text-muted">
            Brochures and compliance files for each neighbourhood.
          </p>
          <div className="mt-10 space-y-10">
            {projects.map((p) => (
              <section key={p.slug}>
                <h3 className="text-[18px] font-medium leading-7 text-ink md:text-[20px]">
                  {p.name} · {p.city}
                </h3>
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
        </section>
      </div>
    </div>
  );
}
