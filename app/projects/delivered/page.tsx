import { DeliveredProjectsView } from "@/components/DeliveredProjectsView";

export const metadata = { title: "Delivered Projects" };

export default function DeliveredProjectsPage() {
  return (
    <div className="bg-white">
      <DeliveredProjectsView />
    </div>
  );
}
