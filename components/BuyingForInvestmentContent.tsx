import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { IconFeatureSection, type IconFeatureItem } from "@/components/IconFeatureSection";
import { StoryPlayBadge } from "@/components/StoryPlayBadge";
import { withBase } from "@/lib/base";
import { projects, stories } from "@/lib/data";
import type { Project, ProjectStatus } from "@/lib/types";

const statusStyles: Record<ProjectStatus, { label: string; className: string }> = {
  completed: { label: "Delivered", className: "bg-[#00b364] text-white" },
  ongoing: { label: "Ongoing", className: "bg-forest text-white" },
  upcoming: { label: "Upcoming", className: "bg-white/95 text-ink shadow-sm" },
};

function OccupancyIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2ZM6.06 6h12.94l-1.5 6H7.56L6.06 6ZM5.02 4H2v2h2l3.6 14.25c.13.55.62.94 1.19.94h9.71c.55 0 1.03-.38 1.15-.91L21 7H6.8L5.77 4H5.02Z" />
    </svg>
  );
}

function MixedUseIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 21V8l9-4 9 4v13h-6v-7H9v7H3Zm2-2h2v-2H5v2Zm0-4h2v-2H5v2Zm0-4h2V9H5v2Zm4 8h2v-2H9v2Zm0-4h2v-2H9v2Zm0-4h2V9H9v2Zm4 8h2v-2h-2v2Zm0-4h2v-2h-2v2Zm0-4h2V9h-2v2Z" />
    </svg>
  );
}

function ReraIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z" />
    </svg>
  );
}

function EmergingCityIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

function DemandIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
    </svg>
  );
}

function DeliveredIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-1 15-4-4 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7Z" />
    </svg>
  );
}

const compareProjectSlugs = [
  "jivah-greens-nashik",
  "jivah-gardens-nagpur",
] as const;

const investmentReasons: {
  title: string;
  body: string;
  iconSrc: string;
}[] = [
  {
    title: "Long-term ownership",
    body: "Own a quality home in a growing location for your future and your family.",
    iconSrc: "/images/figma/investment/icon-pool.svg",
  },
  {
    title: "Future family use",
    body: "Plan today for your family's needs — schools, healthcare and everyday convenience.",
    iconSrc: "/images/figma/investment/icon-bed.svg",
  },
  {
    title: "Potential rental demand",
    body: "Choose projects in well-connected areas with everyday retail and services.",
    iconSrc: "/images/figma/investment/icon-smart.svg",
  },
  {
    title: "Early entry into a growing location",
    body: "Get in early as infrastructure and neighbourhoods take shape.",
    iconSrc: "/images/figma/investment/icon-energy.svg",
  },
];

const investmentFeatures: {
  title: string;
  body: string;
  icon: ComponentType;
}[] = [
  {
    title: "Occupancy over brochures",
    body: "We build mixed-use neighbourhoods where ground-floor retail actually opens — yield next to real footfall, not amenity decks that stay empty.",
    icon: OccupancyIcon,
  },
  {
    title: "Mixed-use footfall",
    body: "Everyday shops, clinics and grocers on the ground floor — leased to operators who serve residents first.",
    icon: MixedUseIcon,
  },
  {
    title: "RERA clarity",
    body: "RERA numbers, timelines and prices are published. If it cannot be said slowly, it should not be part of the pitch.",
    icon: ReraIcon,
  },
  {
    title: "Emerging cities",
    body: "West Bengal, Andhra Pradesh and Odisha — high-growth towns where families upgrade without leaving.",
    icon: EmergingCityIcon,
  },
  {
    title: "Long-term demand",
    body: "Investors who want sustained occupancy and neighbourhoods people actually use — not a metro copy-paste.",
    icon: DemandIcon,
  },
  {
    title: "Finished neighbourhoods",
    body: "Delivered projects with operating grocers and evening courtyards — proof before promise.",
    icon: DeliveredIcon,
  },
];

const investmentMarketLabel = "West Bengal";

const comparisonRows = [
  { label: "Development type", key: "developmentType" },
  { label: "Location stage", key: "locationStage" },
] as const;

type ComparisonRowKey = (typeof comparisonRows)[number]["key"];

function isMixedUseProject(project: Project) {
  const text = `${project.excerpt} ${project.overview}`.toLowerCase();
  return text.includes("mixed-use") || text.includes("mixed use");
}

function getComparisonValue(project: Project, key: ComparisonRowKey): string {
  switch (key) {
    case "developmentType":
      return isMixedUseProject(project) ? "Mixed-use" : "Residential";
    case "locationStage":
      if (project.status === "completed") return "Operational";
      if (project.status === "upcoming") return "Under Development";
      return project.constructionProgress && project.constructionProgress.percent >= 35
        ? "Operational"
        : "Under Development";
  }
}

const comparisonGrid =
  "grid grid-cols-[minmax(160px,220px)_repeat(2,minmax(0,1fr))]";

function CompareIcon({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2.5 inline-flex size-9 items-center justify-center text-muted/75 [&_svg]:size-7">
      {children}
    </span>
  );
}

function PriceCompareIcon() {
  return (
    <CompareIcon>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="10" />
        <path d="M16 10v12M12 14h6a2 2 0 1 1 0 4h-4" />
      </svg>
    </CompareIcon>
  );
}

function PossessionCompareIcon() {
  return (
    <CompareIcon>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="6" y="8" width="20" height="18" rx="2" />
        <path d="M6 14h20M11 6v4M21 6v4" />
      </svg>
    </CompareIcon>
  );
}

function TypeCompareIcon() {
  return (
    <CompareIcon>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 26V10l10-5 10 5v16" />
        <path d="M11 26v-6h10v6" />
      </svg>
    </CompareIcon>
  );
}

function StageCompareIcon() {
  return (
    <CompareIcon>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M16 26s8-6.5 8-12a8 8 0 1 0-16 0c0 5.5 8 12 8 12Z" />
        <circle cx="16" cy="14" r="2.5" />
      </svg>
    </CompareIcon>
  );
}

type PropertyComparisonRow = {
  label: string;
  icon: ComponentType;
  getValue: (project: Project) => string;
  getDetail?: (project: Project) => string;
};

const propertyComparisonRows: PropertyComparisonRow[] = [
  {
    label: "Entry price",
    icon: PriceCompareIcon,
    getValue: (project) =>
      project.startingPrice === "Sold out" ? "Sold out" : project.startingPrice,
    getDetail: () => "Starting price*",
  },
  {
    label: "Development type",
    icon: TypeCompareIcon,
    getValue: (project) => getComparisonValue(project, "developmentType"),
    getDetail: () => investmentMarketLabel,
  },
  {
    label: "Possession",
    icon: PossessionCompareIcon,
    getValue: (project) => project.possession.replace(/^Handed over /i, ""),
    getDetail: (project) => `${statusStyles[project.status].label} project`,
  },
  {
    label: "Location stage",
    icon: StageCompareIcon,
    getValue: (project) => getComparisonValue(project, "locationStage"),
    getDetail: () => investmentMarketLabel,
  },
];

function ComparisonRowLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink md:text-[14px]">
      {children}
    </p>
  );
}

function ComparisonStatCell({
  icon: Icon,
  value,
  detail,
}: {
  icon: ComponentType;
  value: string;
  detail?: string;
}) {
  return (
    <div className="flex flex-col items-center px-2 text-center sm:px-4">
      <Icon />
      <p className="max-w-[12rem] text-[16px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[17px]">
        {value}
      </p>
      {detail ? (
        <p className="mt-1 max-w-[12rem] text-[13px] leading-snug text-muted md:text-[14px]">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

function MobileCompareCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-line/60 bg-white shadow-[0_8px_24px_rgba(18,22,29,0.06)]">
      <Link href={`/projects/${project.slug}/`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden bg-paper">
          <img
            src={withBase(project.image)}
            alt={project.name}
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] ${project.imageClass ?? ""}`}
          />
        </div>
        <div className="border-b border-line/50 px-5 py-4 text-center">
          <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-ink group-hover:text-forest">
            {project.name}
          </p>
        </div>
      </Link>

      <dl className="divide-y divide-line/50">
        {propertyComparisonRows.map((row) => {
          const detail = row.getDetail?.(project);

          return (
            <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-4">
              <dt className="max-w-[42%] text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
                {row.label}
              </dt>
              <dd className="min-w-0 text-right">
                <p className="text-[16px] font-medium leading-snug tracking-[-0.01em] text-ink">
                  {row.getValue(project)}
                </p>
                {detail ? (
                  <p className="mt-1 text-[13px] leading-snug text-muted">{detail}</p>
                ) : null}
              </dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

function InvestmentOpportunitiesSection() {
  const compareProjects = compareProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <section id="opportunities" className="bg-white py-20 md:py-28 lg:py-[112px]">
      <div className="site-pad">
        <div className="mx-auto flex max-w-[1400px] justify-center">
          <div className="flex w-fit max-w-[680px] flex-col items-center gap-3 text-center md:gap-4">
            <SectionKicker icon="/images/figma/about/section-icon.svg" centered>
              Compare projects
            </SectionKicker>
            <h2 className="section-heading md:text-[clamp(2rem,4vw,3.25rem)] md:leading-[1.2] md:tracking-[-0.06em] text-ink">
              Which Jivah project fits your investment plan?
            </h2>
            <p className="max-w-[632px] text-[18px] leading-[1.4] tracking-[-0.01em] text-ink/50">
              Two active neighbourhoods side by side — configuration, pricing and features in one
              view.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <div className="site-pad lg:hidden">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
            {compareProjects.map((project) => (
              <MobileCompareCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
        <div className="border-b border-line/50 bg-white">
          <div className="site-pad">
            <div className="mx-auto w-full max-w-[1400px] overflow-x-auto">
              <div className={`${comparisonGrid} min-w-[680px] pb-10 pt-4`} role="row">
                <div aria-hidden />

                {compareProjects.map((project) => {
                  return (
                    <div key={project.slug} className="px-4 md:px-6" role="columnheader">
                      <Link href={`/projects/${project.slug}/`} className="group block text-center">
                        <div className="relative mx-auto aspect-[16/10] max-w-[300px] overflow-hidden rounded-2xl bg-paper">
                          <img
                            src={withBase(project.image)}
                            alt={project.name}
                            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] ${project.imageClass ?? ""}`}
                          />
                        </div>
                        <div className="mx-auto mt-6 flex max-w-[260px] items-center gap-3">
                          <span className="h-px flex-1 bg-line/50" aria-hidden />
                          <p className="text-[15px] font-bold uppercase tracking-[0.12em] text-ink group-hover:text-forest md:text-[16px]">
                            {project.name}
                          </p>
                          <span className="h-px flex-1 bg-line/50" aria-hidden />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div role="table" aria-label="Jivah project comparison">
          {propertyComparisonRows.map((row, rowIndex) => (
            <div
              key={row.label}
              className={`border-b border-line/50 ${rowIndex % 2 === 1 ? "bg-paper" : "bg-white"}`}
              role="row"
            >
              <div className="site-pad">
                <div className="mx-auto w-full max-w-[1400px] overflow-x-auto">
                  <div
                    className={`${comparisonGrid} min-w-[680px] py-4 md:py-5 items-center`}
                  >
                    <div className="self-center px-4 md:px-6" role="rowheader">
                      <ComparisonRowLabel>{row.label}</ComparisonRowLabel>
                    </div>

                    {compareProjects.map((project) => (
                      <div
                        key={`${project.slug}-${row.label}`}
                        className="flex justify-center px-4 md:px-6"
                        role="cell"
                      >
                        <ComparisonStatCell
                          icon={row.icon}
                          value={row.getValue(project)}
                          detail={row.getDetail?.(project)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="site-pad">
        <div className="mx-auto max-w-[1400px]">
          <p className="mt-8 text-center text-[13px] leading-[1.45] text-muted md:mt-10">
            *Indicative starting prices. RERA registration numbers and timelines on each project page.
          </p>

          <div className="mt-6 flex justify-center md:mt-8">
            <Link
              href="/contact/?type=home-buyer&intent=investment"
              className="btn-pill btn-forest inline-flex h-[52px] items-center justify-center px-8 text-[16px]"
            >
              Compare projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestorProofSection() {
  const story = stories.find((item) => item.slug === "sneha-patil-nagpur");
  if (!story) return null;

  return (
    <section className="bg-paper py-20 md:py-28 lg:py-[112px]">
      <div className="site-pad">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Link
            href={`/stories/${story.slug}/`}
            className="group relative aspect-[4/3] overflow-hidden rounded-[20px] bg-white shadow-[0_4px_5px_rgba(0,0,0,0.07)] lg:aspect-auto lg:min-h-[420px]"
          >
            <Image
              src={withBase(story.image)}
              alt={story.person}
              fill
              className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            {story.video ? <StoryPlayBadge /> : null}
          </Link>

          <div className="max-w-xl">
            <SectionKicker icon="/images/figma/about/blog-icon.svg">Investor story</SectionKicker>
            <h2 className="section-heading mt-3 md:text-[clamp(1.75rem,3vw,2.5rem)] md:leading-[1.15] md:tracking-[-0.03em] text-ink">
              {story.title}
            </h2>
            <p className="mt-5 text-[20px] leading-[1.5] text-ink/80">&ldquo;{story.excerpt}&rdquo;</p>
            <p className="mt-4 text-[16px] leading-[1.6] text-muted">{story.body[0]}</p>
            <p className="mt-6 text-[15px] font-medium text-ink">
              {story.person}
              <span className="font-normal text-muted"> · {story.category}</span>
            </p>
            <Link
              href={`/stories/${story.slug}/`}
              className="btn-pill btn-forest mt-8 inline-flex px-8 py-[17px] text-[16px]"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentReasonsSection() {
  const items: IconFeatureItem[] = investmentReasons.map((reason) => ({
    title: reason.title,
    body: reason.body,
    iconSrc: reason.iconSrc,
  }));

  return (
    <IconFeatureSection
      cardLayout="stacked"
      kicker="Compare by goal"
      title="One clearer way to compare."
      description="Match your investment goal to the Jivah neighbourhood that fits — then compare projects side by side in one view."
      items={items}
      columns={4}
    />
  );
}

function InvestmentClosingSection() {
  return (
    <section className="bg-forest py-16 text-white md:py-20">
      <div className="site-pad">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 text-center md:gap-8">
          <h2 className="section-heading max-w-[640px] md:text-[clamp(1.75rem,3vw,2.75rem)] md:leading-[1.15] md:tracking-[-0.03em]">
            Ready to shortlist a project?
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-white/80">
            Talk to us about ongoing and upcoming neighbourhoods — or download brochures and RERA
            certificates before you decide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact/?type=home-buyer&intent=investment"
              className="btn-pill btn-white inline-flex h-[52px] min-w-[220px] items-center justify-center px-8 text-[16px]"
            >
              Get in touch
            </Link>
            <Link
              href="/downloads/"
              className="btn-pill inline-flex h-[52px] min-w-[220px] items-center justify-center border border-white/70 bg-transparent px-8 text-[16px] font-medium text-white hover:bg-white/10 hover:opacity-100"
            >
              Download brochures
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionKicker({
  icon,
  children,
  centered = false,
}: {
  icon: string;
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 text-[#3e545d] ${centered ? "justify-center" : ""}`}
    >
      <Image
        src={withBase(icon)}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
      />
      <p className="text-[16px] font-semibold tracking-[-0.01em]">{children}</p>
    </div>
  );
}

export function BuyingForInvestmentContent() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={withBase("/images/figma/investment/hero.png")}
          alt="Jivah Realty neighbourhood entrance at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/11" aria-hidden />

        <div className="site-pad relative flex min-h-[100svh] flex-col items-center justify-start pb-24 pt-[20vh] md:pt-[24vh]">
          <div className="flex max-w-[640px] flex-col items-center gap-8 text-center md:gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[28px] font-medium leading-[1.12] tracking-[-0.04em] text-white/95 md:text-[clamp(2.25rem,5vw,4rem)] md:leading-[1.05]">
                Invest where real life is growing
              </h1>
              <p className="text-[18px] leading-[26px] text-white">
                Make your living experience even more memorable.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact/?type=home-buyer&intent=investment"
                className="btn-pill btn-white inline-flex h-[52px] min-w-[148px] items-center justify-center px-8 text-[16px]"
              >
                Get in touch
              </Link>
              <Link
                href="#opportunities"
                className="inline-flex h-[52px] min-w-[148px] items-center justify-center rounded-full border border-white/70 bg-transparent px-8 text-[16px] font-medium leading-4 text-white transition hover:bg-white/10"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <IconFeatureSection
        kicker="Featured property"
        title="Why Jivah may belong in your portfolio?"
        description="Emerging cities, finished neighbourhoods and mixed-use bases leased to operators who serve residents first — neighbourhoods designed for occupancy, not just brochures."
        items={investmentFeatures.map((feature) => ({
          title: feature.title,
          body: feature.body,
          icon: feature.icon,
        }))}
      />

      <InvestmentOpportunitiesSection />

      <InvestmentClosingSection />

      <InvestorProofSection />

      <InvestmentReasonsSection />
    </div>
  );
}
