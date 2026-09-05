import Link from "next/link";
import { projects } from "@/lib/data";
import type { ProjectStatus } from "@/lib/types";

const statusLinks: { href: string; label: string; status: ProjectStatus }[] = [
  { href: "/#projects", label: "Active", status: "ongoing" },
  { href: "/projects/delivered/", label: "Delivered", status: "completed" },
  { href: "/#projects", label: "Upcoming", status: "upcoming" },
];

export { statusLinks };

function projectLocation(project: (typeof projects)[number]) {
  return project.location.toUpperCase();
}

type Props = {
  onNavigate?: () => void;
};

export function ProjectsMegaMenu({ onNavigate }: Props) {
  return (
    <div className="px-[clamp(1.5rem,5.5vw,5rem)] py-10 md:py-12">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)] md:gap-16 lg:gap-20">
        <div>
          <p className="border-b border-ink/15 pb-3 text-[11px] font-medium tracking-[0.16em] text-ink/55 uppercase">
            Signature Homes
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}/`}
                  onClick={onNavigate}
                  className="group block transition-opacity hover:opacity-60"
                >
                  <span className="text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-ink md:text-[20px]">
                    {project.name}
                  </span>
                  <span className="mt-2 block text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase">
                    {projectLocation(project)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="border-b border-ink/15 pb-3 text-[11px] font-medium tracking-[0.16em] text-ink/55 uppercase">
            All Projects
          </p>
          <ul className="mt-8 space-y-5">
            {statusLinks.map((item) => (
              <li key={item.status}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-ink transition-opacity hover:opacity-60 md:text-[20px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
