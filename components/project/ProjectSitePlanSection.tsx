import Link from "next/link";
import { withBase } from "@/lib/base";
import type { Project } from "@/lib/types";

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3v9m0 0l3.5-3.5M10 12l-3.5-3.5M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  project: Project;
  sitePlanImage: string;
};

export function ProjectSitePlanSection({ project, sitePlanImage }: Props) {
  return (
    <section id="site-plan" className="scroll-mt-24 bg-forest text-white">
      <div className="site-pad grid gap-10 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-16 lg:py-20">
        <img
          src={withBase(sitePlanImage)}
          alt={`${project.name} site plan`}
          className="order-2 block h-auto w-full max-w-full rounded-[16px] md:order-1"
        />

        <div className="order-1 md:order-2">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/70">
            Masterplan
          </p>
          <h2 className="section-heading mt-3 md:leading-[44px] md:text-[40px]">
            Site plan &amp; downloads
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-white/80">
            Floor plans, brochures and compliance documents for {project.name}. MahaRERA{" "}
            {project.rera}.
          </p>

          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {project.downloads.map((item) => (
              <li key={item.title}>
                <Link
                  href="/downloads/"
                  className="group flex items-center justify-between gap-4 py-4 transition hover:text-white/90"
                >
                  <span className="text-[16px] font-medium">{item.title}</span>
                  <span className="flex items-center gap-3 text-[13px] text-white/70">
                    {item.type}
                    <span className="text-white transition group-hover:translate-y-0.5">
                      <DownloadIcon />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[13px] text-white/70">
            <Link href="/rera/" className="underline underline-offset-4 hover:text-white">
              Read our RERA guide
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
