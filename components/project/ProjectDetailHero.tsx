import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/base";
import type { Project, ProjectStatus } from "@/lib/types";

const statusStyles: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  completed: { label: "Delivered", className: "bg-[#00b364] text-white" },
  ongoing: { label: "Ongoing", className: "bg-forest text-white" },
  upcoming: { label: "Upcoming", className: "bg-white/90 text-ink" },
};

function TypologyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 8.5V16h5v-4.5h4V16h5V8.5L10 3 3 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 9h2M11 9h2M7 12h2M11 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 6.5v7M8 8.5c0-1 .9-1.5 2-1.5s2 .5 2 1.5-1 1.5-2 1.5-2 .5-2 1.5 1 1.5 2 1.5 2-.5 2-1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  project: Project;
  heroImage: string;
  imageClass?: string;
};

export function ProjectDetailHero({ project, heroImage, imageClass }: Props) {
  const soldOut = project.startingPrice === "Sold out";
  const status = soldOut
    ? { label: "Sold out", className: "bg-ink text-white" }
    : statusStyles[project.status];
  const typologyShort = project.typology.replace(/\s*residences?$/i, "");

  const stats = [
    { icon: TypologyIcon, label: "Typology", value: typologyShort },
    { icon: HomesIcon, label: "Homes", value: project.units },
    {
      icon: PriceIcon,
      label: "Starting at",
      value: soldOut ? "Sold out" : project.startingPrice,
    },
  ];

  return (
    <section className="site-pad pt-8 md:pt-10">
      <div className="relative min-h-[min(72svh,560px)] overflow-hidden rounded-[20px] md:min-h-[520px] lg:min-h-[580px]">
        <Image
          src={withBase(heroImage)}
          alt={project.name}
          fill
          priority
          className={`object-cover ${imageClass ?? "object-top"}`}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <span
          className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-[13px] font-medium md:left-8 md:top-8 ${status.className}`}
        >
          {status.label}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 md:flex-row md:items-end md:justify-between md:p-8 lg:p-10">
          <div className="max-w-xl text-white">
            <p className="text-[14px] font-medium leading-5 md:text-[15px]">{project.location}</p>
            <h1 className="mt-1 text-[32px] font-medium leading-[1.15] tracking-[-0.02em] md:text-[48px] md:leading-[52px] lg:text-[56px] lg:leading-[62px]">
              {project.name}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/contact/?project=${project.slug}`}
                className="btn-pill !bg-white !text-ink hover:!opacity-90"
              >
                Get in touch
              </Link>
              <a
                href="#lifestyle"
                className="inline-flex items-center justify-center rounded-full border border-white/70 px-[18px] py-[10px] text-[16px] font-medium leading-4 text-white transition hover:bg-white/10"
              >
                View details
              </a>
            </div>
          </div>

          <div className="w-full shrink-0 rounded-[16px] bg-white p-5 shadow-[0_16px_48px_rgba(18,22,29,0.18)] md:w-[min(100%,440px)] md:p-6">
            <dl className="grid grid-cols-3 gap-4 md:gap-5">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="min-w-0 text-center">
                  <dt className="flex justify-center text-forest">
                    <Icon />
                  </dt>
                  <dd className="mt-2.5 truncate text-[15px] font-semibold leading-5 text-ink md:text-[16px]">
                    {value}
                  </dd>
                  <dd className="mt-1 text-[12px] leading-4 text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
