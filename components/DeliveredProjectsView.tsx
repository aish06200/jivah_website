import { ProjectsCatalogView } from "@/components/projects/ProjectsCatalogView";
import { projects } from "@/lib/data";

export function DeliveredProjectsView() {
  return <ProjectsCatalogView variant="delivered" allProjects={projects} />;
}
