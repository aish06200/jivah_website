import type { ReactNode } from "react";
import Link from "next/link";
import type { HomeProjectCard } from "@/components/HomeProjectsCarousel";
import { withBase } from "@/lib/base";

function LaunchBadge({ year }: { year?: string | null }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-forest md:text-[13px]">
      <span className="size-1.5 rounded-full bg-forest" aria-hidden />
      Coming soon
      {year ? <span className="font-medium normal-case tracking-normal text-muted">· {year}</span> : null}
    </span>
  );
}

function CardLink({
  project,
  className,
  children,
}: {
  project: HomeProjectCard;
  className?: string;
  children: ReactNode;
}) {
  const label = `${project.name}, ${project.city}, ${project.startingPrice}`;

  if (project.linked) {
    return (
      <Link href={`/projects/${project.slug}`} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <div aria-label={label} className={className}>
      {children}
    </div>
  );
}

function FeaturedUpcomingCard({ project }: { project: HomeProjectCard }) {
  return (
    <CardLink
      project={project}
      className="group grid overflow-hidden rounded-[12px] bg-paper ring-1 ring-ink/8 transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(15,23,20,0.35)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:rounded-[16px]"
    >
      <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[420px]">
        <img
          src={withBase(project.image)}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] ${project.imageClass ?? ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink/10" />
      </div>

      <div className="flex flex-col justify-center gap-5 p-6 md:p-10 lg:p-12">
        <LaunchBadge year={project.launchYear} />
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-medium text-muted md:text-[15px]">{project.city}</p>
          <h2 className="title-ui text-[28px] text-ink md:text-[36px] lg:text-[40px]">
            {project.name}
          </h2>
        </div>
        <p className="max-w-[42ch] text-[16px] leading-[1.55] text-muted md:text-[17px]">{project.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink md:text-[14px]">
            {project.typology}
          </span>
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-forest transition-transform duration-300 group-hover:translate-x-0.5 md:text-[15px]">
            View project
            <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </CardLink>
  );
}

function UpcomingTileCard({ project, index }: { project: HomeProjectCard; index: number }) {
  return (
    <CardLink
      project={project}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[12px] bg-paper ring-1 ring-ink/8 transition-shadow duration-300 hover:shadow-[0_20px_48px_-26px_rgba(15,23,20,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
        <img
          src={withBase(project.image)}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] ${project.imageClass ?? ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold tabular-nums tracking-[0.12em] text-ink/70 backdrop-blur-sm md:left-5 md:top-5 md:text-[12px]">
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <LaunchBadge year={project.launchYear} />
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-medium text-muted md:text-[14px]">{project.city}</p>
          <h3 className="title-ui text-[20px] text-ink md:text-[22px]">{project.name}</h3>
        </div>
        <p className="line-clamp-3 flex-1 text-[15px] leading-[1.5] text-muted md:text-[16px]">{project.excerpt}</p>
        <p className="text-[13px] font-medium text-ink/55 md:text-[14px]">{project.typology}</p>
      </div>
    </CardLink>
  );
}

export function UpcomingProjectsGrid({ cards }: { cards: HomeProjectCard[] }) {
  if (!cards.length) return null;

  const [featured, ...rest] = cards;

  return (
    <div className="site-pad mt-12 lg:mt-16">
      <FeaturedUpcomingCard project={featured} />

      {rest.length ? (
        <ul
          className="mt-8 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-8"
          aria-label="More upcoming launches"
        >
          {rest.map((project, i) => (
            <li key={project.slug} className="min-h-0">
              <UpcomingTileCard project={project} index={i} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
