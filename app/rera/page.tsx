import { projects } from "@/lib/data";

export const metadata = { title: "RERA" };

export default function ReraPage() {
  return (
    <div className="site-pad mx-auto max-w-3xl py-20 md:py-28">
      <h1 className="font-serif text-5xl">RERA</h1>
      <p className="mt-8 text-[16px] leading-relaxed text-muted">
        All ongoing Jivah projects are registered under MahaRERA. Upcoming projects remain listed as registration underway until a number is issued. We do not accept bookings before registration.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {projects.map((p) => (
          <li key={p.slug} className="flex flex-wrap justify-between gap-4 py-5 text-sm">
            <span>
              {p.name}, {p.city}
            </span>
            <span className="text-muted">{p.rera}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
