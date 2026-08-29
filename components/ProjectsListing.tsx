"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import type { Project, ProjectStatus } from "@/lib/types";

const filters: { id: "all" | ProjectStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ongoing", label: "Ongoing" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
];

const statusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

function sizeRange(project: Project): string {
  const nums: number[] = [];
  for (const residence of project.residences) {
    const matches = residence.size.match(/[\d,]+(?:\.\d+)?/g);
    if (!matches) continue;
    for (const match of matches) {
      const n = Number(match.replace(/,/g, ""));
      if (Number.isFinite(n)) nums.push(n);
    }
  }
  if (!nums.length) return "";
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const fmt = (n: number) => n.toLocaleString("en-IN");
  return min === max ? fmt(min) : `${fmt(min)}–${fmt(max)}`;
}

export function ProjectsListing() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [filter],
  );

  return (
    <div className="bg-white">
      <section className="site-pad flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl leading-[1.12] md:text-6xl">New neighbourhoods</h1>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Mixed-use homes drawn around grocers, gardens and the school run — in Nashik, Nagpur,
            Pune, Kolhapur, Chhatrapati Sambhajinagar and Solapur.
          </p>
        </div>
        <nav aria-label="Filter projects" className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:items-end md:gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`text-[13px] tracking-[0.14em] uppercase transition-colors ${
                filter === f.id ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </section>

      <section className="site-pad pb-24">
        {list.length === 0 ? (
          <p className="py-16 text-muted">No neighbourhoods in this group yet.</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
            {list.map((project) => {
              const sizes = sizeRange(project);
              return (
                <article key={project.slug} className="group flex flex-col">
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={project.name}
                    className="relative block aspect-[8/5] overflow-hidden bg-paper"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${project.imageClass ?? ""}`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </Link>

                  <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="font-serif text-3xl leading-none md:text-4xl">{project.name}</h2>
                      <p className="mt-2 text-sm text-muted">{project.location}</p>
                      <div className="my-4 h-px w-16 bg-accent" />
                      <p className="text-sm text-muted">
                        {project.typology} · {project.units}
                      </p>
                      {sizes ? (
                        <p className="mt-2 text-sm tracking-wide text-ink">
                          {sizes} <span className="text-[11px] tracking-[0.16em] uppercase text-muted">sq.ft</span>
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                      <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
                        {statusLabel[project.status]}
                      </p>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex bg-accent px-6 py-2.5 text-[13px] tracking-wide text-on-accent hover:bg-accent-hover"
                      >
                        Know more
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
