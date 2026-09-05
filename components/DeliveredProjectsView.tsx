import Image from "next/image";
import Link from "next/link";
import {
  buildInsightArticles,
  ProjectInsightsSection,
} from "@/components/project/ProjectInsightsSection";
import { withBase } from "@/lib/base";
import { projects, stories } from "@/lib/data";
import type { Project } from "@/lib/types";

const LIFESTYLE_ICON = "/images/figma/project-detail/featured/lifestyle-icon.svg";
const CARD_ARROW = "/images/figma/project-detail/featured/card-arrow-right.svg";
const BG_VECTOR = "/images/figma/project-detail/featured/lifestyle-bg-vector.svg";
const DELIVERED_HERO_IMAGE = "/images/delivered-hero.jpg";

function DeliveredProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group relative block h-[320px] overflow-hidden rounded-[16px] sm:h-[360px] lg:h-[410px]"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${project.imageClass ?? "object-center"}`}
        sizes="(min-width: 1024px) 680px, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/47" />
      <span className="absolute right-6 top-6 flex size-14 items-center justify-center rounded-full bg-white transition group-hover:bg-white/90">
        <img src={withBase(CARD_ARROW)} alt="" className="size-6" aria-hidden />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
        <h3 className="text-[28px] font-medium leading-[1.4] tracking-[-0.01em] text-white md:text-[32px]">
          {project.name}
        </h3>
        <p className="mt-1 max-w-xl text-[16px] leading-[1.4] tracking-[-0.01em] text-white/80 md:text-[18px]">
          {project.excerpt}
        </p>
      </div>
    </Link>
  );
}

export function DeliveredProjectsView() {
  const delivered = projects.filter((project) => project.status === "completed");
  const insightArticles = buildInsightArticles(stories);

  return (
    <>
      <section className="site-pad pb-2 pt-6 md:pt-8">
        <div className="relative min-h-[380px] overflow-hidden rounded-[26px] md:min-h-[480px] lg:min-h-[534px]">
          <Image
            src={DELIVERED_HERO_IMAGE}
            alt="Delivered projects"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1536px) 1600px, 100vw"
            quality={100}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-[112px]">
        <img
          src={withBase(BG_VECTOR)}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-48 top-12 h-auto w-[min(1011px,90vw)] max-w-none opacity-40 lg:-left-24"
        />

        <div className="site-pad relative z-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="flex items-center justify-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center">
                  <img src={withBase(LIFESTYLE_ICON)} alt="" className="size-5" aria-hidden />
                </span>
                <p className="text-[16px] font-semibold tracking-[-0.01em] text-[#3e545d]">Lifestyle</p>
              </div>
              <h2 className="text-[36px] font-medium leading-[1.12] tracking-[-0.04em] text-ink md:text-[44px] lg:text-[52px] lg:leading-[1.2] lg:tracking-[-0.06em]">
                Delivered Projects
              </h2>
              <p className="max-w-2xl text-[16px] leading-[1.4] tracking-[-0.01em] text-muted md:text-[18px]">
                Discover neighbourhoods already handed over — mixed-use homes where groceries,
                gardens and everyday life are part of the plan.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-10">
              {delivered.length ? (
                delivered.map((project) => (
                  <DeliveredProjectCard key={project.slug} project={project} />
                ))
              ) : (
                <p className="col-span-full py-16 text-center text-muted">
                  No delivered neighbourhoods yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProjectInsightsSection articles={insightArticles} />
    </>
  );
}
