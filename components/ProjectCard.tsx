import Link from "next/link";
import type { Project } from "@/lib/types";
import { withBase } from "@/lib/base";

const statusLabel: Record<Project["status"], string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function ProjectCard({ project }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-paper md:aspect-square"
    >
      {/* Native img: next/image fill + lazy-load often fails to paint on iOS. */}
      <img
        src={withBase(project.image)}
        alt={project.name}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${project.imageClass ?? ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
        <p className="text-[10px] tracking-[0.16em] uppercase text-on-accent/80">
          {statusLabel[project.status]} · {project.city}
        </p>
        <h3 className="mt-1 font-serif text-2xl text-on-accent md:text-2xl">{project.name}</h3>
      </div>
    </Link>
  );
}
