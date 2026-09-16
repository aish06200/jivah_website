import { ProjectsCatalogView } from "@/components/projects/ProjectsCatalogView";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Active projects",
  description:
    "Ongoing Jivah neighbourhoods — mixed-use homes under construction across Maharashtra and beyond.",
};

export default function ActiveProjectsPage() {
  return <ProjectsCatalogView variant="active" allProjects={projects} />;
}
