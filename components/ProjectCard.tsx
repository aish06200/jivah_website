import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const statusLabel: Record<Project["status"], string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

export function ProjectCard({ project }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-paper"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${project.imageClass ?? ""}`}
        sizes="(min-width: 1024px) 33vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-[10px] tracking-[0.16em] uppercase text-on-accent/80">
          {statusLabel[project.status]} · {project.city}
        </p>
        <h3 className="mt-1 font-serif text-xl text-on-accent md:text-2xl">{project.name}</h3>
      </div>
    </Link>
  );
}
