import type { Project, ProjectConnectivity } from "@/lib/types";
import { getProjectCoordinates } from "@/lib/location";
import { ProjectLocationMap } from "@/components/project/ProjectLocationMap";

type Props = {
  project: Project;
};

function ProximityIcon({ icon }: { icon: ProjectConnectivity["icon"] }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };

  switch (icon) {
    case "school":
      return (
        <svg {...props}>
          <path d="M4 10.5 12 6l8 4.5-8 4.5-8-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 12v4.5L12 20l6-3.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...props}>
          <path d="M12 4v16M6 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "market":
      return (
        <svg {...props}>
          <path d="M4 10h16l-1.5 10H5.5L4 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "station":
      return (
        <svg {...props}>
          <rect x="3" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 8V6h10v2M8 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "highway":
      return (
        <svg {...props}>
          <path d="M4 18l4-12h8l4 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

const DEFAULT_ICONS: ProjectConnectivity["icon"][] = [
  "station",
  "landmark",
  "market",
  "highway",
];

const MAP_CLASS =
  "min-h-[280px] w-full overflow-hidden rounded-[12px] bg-[#f5f0e8] shadow-[0_1px_0_rgba(18,22,29,0.04)] sm:min-h-[320px] lg:h-full lg:min-h-[480px]";

export function ProjectLocationSection({ project }: Props) {
  const headline = project.locationSection?.headline ?? "Everything important, within reach.";
  const description =
    project.locationSection?.description ??
    `${project.name} is located in ${project.location} with easy access to schools, healthcare, markets and transport.`;

  const coordinates = getProjectCoordinates(project.locationSection, project.city);
  const zoom = project.locationSection?.zoom ?? 12.5;
  const mapPois = project.connectivity
    .filter((item): item is typeof item & { coordinates: [number, number] } => Boolean(item.coordinates))
    .map((item) => ({
      coordinates: item.coordinates,
      label: item.mapLabel ?? item.place,
      icon: item.icon,
    }));

  return (
    <section id="location" className="scroll-mt-24 bg-white py-14 md:py-20 lg:py-24">
      <div className="site-pad">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
          <div className="w-full max-w-none lg:max-w-md">
            <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#8a6a3d]">
              Location
            </p>
            <h2 className="section-heading mt-4 text-ink">
              {headline}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-muted md:text-[16px]">
              {description}
            </p>

            <ul className="mt-8 divide-y divide-[#e8e2d8] border-y border-[#e8e2d8]">
              {project.connectivity.map((item, index) => {
                const icon = item.icon ?? DEFAULT_ICONS[index % DEFAULT_ICONS.length];

                return (
                  <li key={item.place} className="flex items-center gap-4 py-4 first:pt-5 last:pb-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f5f0e8] text-ink">
                      <ProximityIcon icon={icon} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium text-ink md:text-[16px]">{item.place}</p>
                      <div className="mt-1 flex items-center gap-4 text-[14px] text-muted">
                        {item.distance ? <span>{item.distance}</span> : null}
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <ProjectLocationMap
            center={coordinates}
            zoom={zoom}
            projectLabel={project.name}
            pois={mapPois}
            className={MAP_CLASS}
          />
        </div>
      </div>
    </section>
  );
}
