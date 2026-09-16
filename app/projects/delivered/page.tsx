import { DeliveredProjectsView } from "@/components/DeliveredProjectsView";

export const metadata = {
  title: "Recent deliveries",
  description:
    "Completed Jivah neighbourhoods — mixed-use homes handed over with groceries, gardens and everyday life built in.",
};

export default function DeliveredProjectsPage() {
  return (
    <div className="bg-white">
      <DeliveredProjectsView />
    </div>
  );
}
