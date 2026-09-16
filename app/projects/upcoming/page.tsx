import { ProjectsCatalogView } from "@/components/projects/ProjectsCatalogView";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Upcoming projects",
  description:
    "Future Jivah mixed-use neighbourhoods — east-coast corridor and new cities, registration underway.",
};

export default function UpcomingProjectsPage() {
  return <ProjectsCatalogView variant="upcoming" allProjects={projects} />;
}
