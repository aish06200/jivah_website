import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/base";
import type { Project } from "@/lib/types";

type Props = {
  project: Project;
};

export function ProjectConstructionProgressSection({ project }: Props) {
  if (!project.updates.length) return null;

  const progress = project.constructionProgress;
  const isComplete = project.status === "completed";

  return (
    <section id="construction-progress" className="scroll-mt-24 border-t border-line bg-white py-14 md:py-20 lg:py-24">
      <div className="site-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <div>
              <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#8a6a3d]">On site</p>
              <h2 className="section-heading mt-4 text-ink">
                {isComplete ? "Project timeline" : "Construction progress"}
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-muted md:text-[16px]">
                {isComplete ? (
                  <>
                    How {project.name} came together — from structure to handover.{" "}
                    <span className="font-medium text-ink">{project.possession}</span>.
                  </>
                ) : (
                  <>
                    Monthly updates from the {project.name} site team. Target possession{" "}
                    <span className="font-medium text-ink">{project.possession}</span>.
                  </>
                )}
              </p>

              {!isComplete ? (
                <Link href="/enquire/" className="btn-pill btn-forest mt-8">
                  Book a site visit
                </Link>
              ) : null}
            </div>

            {progress ? (
              <div className="mt-8 rounded-[16px] border border-line bg-paper/40 p-5 md:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
                      Current phase
                    </p>
                    <p className="mt-1 text-[18px] font-medium text-ink md:text-[20px]">{progress.phase}</p>
                  </div>
                  <p className="text-[32px] font-medium leading-none tracking-[-0.03em] text-forest md:text-[36px]">
                    {progress.percent}
                    <span className="text-[18px]">%</span>
                  </p>
                </div>
                <div
                  className="mt-5 h-2 overflow-hidden rounded-full bg-[#e8e2d8]"
                  role="progressbar"
                  aria-valuenow={progress.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Construction ${progress.percent}% complete`}
                >
                  <div
                    className="h-full rounded-full bg-forest transition-[width] duration-700"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="self-start lg:col-span-7">
            <ol className="relative h-fit border-l border-[#e8e2d8] pl-8 md:pl-10">
              {project.updates.map((update, index) => (
                <li key={`${update.date}-${update.title}`} className="relative pb-10 last:pb-0">
                  <span
                    className={`absolute -left-8 top-2 size-2.5 -translate-x-1/2 rounded-full md:-left-10 ${
                      index === 0 ? "bg-forest ring-4 ring-white" : "bg-[#c9bfb0] ring-4 ring-white"
                    }`}
                    aria-hidden
                  />

                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_200px] md:items-start md:gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                    <div>
                      <time className="text-[13px] font-medium tracking-[0.04em] text-muted">
                        {update.date}
                      </time>
                      <h3 className="mt-1.5 text-[18px] font-medium leading-snug text-ink md:text-[20px]">
                        {update.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[15px] leading-[1.65] text-muted md:text-[16px]">
                        {update.body}
                      </p>
                    </div>

                    {update.image ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-paper md:aspect-[5/4]">
                        <Image
                          src={withBase(update.image)}
                          alt={`${update.title} — ${project.name}`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 240px, 100vw"
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
