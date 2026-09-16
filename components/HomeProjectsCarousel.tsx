import Link from "next/link";
import { withBase } from "@/lib/base";

export type HomeProjectCard = {
  slug: string;
  name: string;
  city: string;
  typology: string;
  startingPrice: string;
  excerpt: string;
  image: string;
  imageClass?: string;
  linked: boolean;
};

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20H4v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardArrowButton() {
  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-[0_4px_14px_rgba(12,123,84,0.35)] transition-transform duration-300 group-hover:translate-x-1 md:size-12"
      aria-hidden
    >
      <svg className="size-[18px] md:size-5" viewBox="0 0 16 16" fill="none">
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ProjectCardBody({
  project,
  compact = false,
}: {
  project: HomeProjectCard;
  compact?: boolean;
}) {
  return (
    <>
      <div
        className={`relative overflow-hidden rounded-[8px] bg-paper ${
          compact
            ? "h-[280px] sm:h-[300px] md:h-[340px] lg:h-[380px]"
            : "h-[360px] w-full md:h-[538px]"
        }`}
      >
        <img
          src={withBase(project.image)}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.04] ${project.imageClass ?? ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-colors duration-500 group-hover:from-ink/90" />

        <div
          className={`absolute inset-x-0 bottom-0 p-5 md:p-6 ${
            compact ? "flex flex-col gap-4" : "flex items-end justify-between gap-4"
          }`}
        >
          <div className={`flex min-w-0 flex-col gap-4 ${compact ? "" : "flex-1"}`}>
            <p
              className={`font-semibold leading-none tracking-[-0.03em] ${
                compact ? "text-[20px] md:text-[24px]" : "text-[24px] md:text-[40px]"
              } ${
                project.startingPrice === "Sold out" || project.startingPrice === "Coming soon"
                  ? "text-white/80"
                  : "text-white"
              }`}
            >
              {project.startingPrice}
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent font-medium leading-4 text-white ${
                  compact ? "px-2.5 py-1.5 text-[12px]" : "px-3.5 py-2 text-[16px]"
                }`}
              >
                <HomeIcon className={`text-white/80 ${compact ? "size-3" : "size-4"}`} />
                {project.typology}
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent font-medium leading-4 text-white ${
                  compact ? "px-2.5 py-1.5 text-[12px]" : "px-3.5 py-2 text-[16px]"
                }`}
              >
                <PinIcon className={`text-white/80 ${compact ? "size-3" : "size-4"}`} />
                {project.city}
              </span>
            </div>
          </div>
          {!compact ? <CardArrowButton /> : null}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2
          className={`font-medium leading-[1.15] tracking-[-0.03em] text-ink ${
            compact ? "text-[18px] md:text-[20px]" : "text-[22px] md:text-[28px]"
          }`}
        >
          {project.name}
        </h2>
        <p
          className={`leading-[26px] text-muted ${
            compact
              ? "line-clamp-2 text-[14px] md:text-[15px]"
              : "max-w-[min(100%,420px)] text-[16px] md:max-w-[480px] md:text-[17px]"
          }`}
        >
          {project.excerpt}
        </p>
      </div>
    </>
  );
}

function ProjectCard({
  project,
  className,
  compact = false,
}: {
  project: HomeProjectCard;
  className?: string;
  compact?: boolean;
}) {
  const cardClassName = `group flex min-w-0 flex-col gap-3 md:gap-4 ${className ?? "w-full"}`;
  const cardLabel = `${project.name}, ${project.startingPrice}, ${project.city}`;

  if (project.linked) {
    return (
      <Link href={`/projects/${project.slug}`} aria-label={cardLabel} className={cardClassName}>
        <ProjectCardBody project={project} compact={compact} />
      </Link>
    );
  }

  return (
    <div aria-label={cardLabel} className={cardClassName}>
      <ProjectCardBody project={project} compact={compact} />
    </div>
  );
}

const GRID_MAX_DEFAULT = 9;

export function HomeProjectsGrid({
  cards,
  maxItems = GRID_MAX_DEFAULT,
}: {
  cards: HomeProjectCard[];
  maxItems?: number;
}) {
  const items = cards.slice(0, maxItems);

  return (
    <div
      className="site-pad mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
      aria-label="Jivah projects"
    >
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} compact />
      ))}
    </div>
  );
}

export function HomeProjectsCarousel({ cards }: { cards: HomeProjectCard[] }) {
  return (
    <>
      <div className="site-pad mt-16 flex flex-col gap-10 md:hidden">
        {cards.map((project) => (
          <ProjectCard key={project.slug} project={project} className="w-full" />
        ))}
      </div>

      <div
        className="site-pad mt-16 hidden w-full gap-10 md:flex md:gap-[50px]"
        aria-label="Jivah projects"
      >
        {cards.map((project) => (
          <ProjectCard key={project.slug} project={project} className="min-w-0 flex-1" />
        ))}
      </div>
    </>
  );
}
