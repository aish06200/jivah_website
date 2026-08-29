export function StatusBadge({ status }: { status: "ongoing" | "upcoming" | "completed" }) {
  const label = { ongoing: "Ongoing", upcoming: "Upcoming", completed: "Completed" }[status];
  return (
    <span className="inline-flex border border-forest/30 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-forest">
      {label}
    </span>
  );
}
