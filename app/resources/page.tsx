import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export const metadata = { title: "Buyer Resources" };

const primaryLinks = [
  {
    href: "/blog/",
    title: "Blogs",
    body: "Guides, updates and practical notes for buyers.",
  },
  {
    href: "/buying-for-investment/",
    title: "Buying for Investment",
    body: "Yield, occupancy and mixed-use neighbourhoods that people actually use.",
  },
] as const;

const tools = [
  {
    href: "/guide/",
    title: "Homebuyer Guide",
    body: "First-time buying, home loans, EMI, documents and RERA — slow questions, clear answers.",
  },
  {
    href: "/downloads/",
    title: "Downloads",
    body: "Brochures, floor plans and RERA certificates, listed by neighbourhood.",
  },
  {
    href: "/rera/",
    title: "RERA",
    body: "MahaRERA numbers for every ongoing project. Upcoming stays ‘registration underway’ until issued.",
  },
] as const;

export default function ResourcesPage() {
  return (
    <div className="bg-white pb-24">
      <PageIntro kicker="Buyer Resources" title="Guides and tools">
        Practical notes for buyers and investors — paperwork, downloads and neighbourhood context.
      </PageIntro>

      <section className="site-pad">
        <div className="grid gap-6 md:grid-cols-2">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[16px] border border-line p-8 transition-colors hover:border-ink/40"
            >
              <h2 className="text-[24px] font-medium leading-8 text-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              <p className="mt-6 text-[13px] tracking-wide text-forest">Read</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-pad mx-auto mt-16 grid max-w-6xl gap-6 border-t border-line pt-16 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-[16px] border border-line p-8 transition-colors hover:border-ink/40"
          >
            <h2 className="text-[24px] font-medium leading-8 text-ink">{tool.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{tool.body}</p>
            <p className="mt-6 text-[13px] tracking-wide text-forest">Read</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
