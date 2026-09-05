import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { leaders, u, values } from "@/lib/data";

export const metadata = { title: "Why Jivah" };

export default function WhyJivahPage() {
  return (
    <div className="bg-white">
      <PageIntro kicker="Jivah Philosophy" title="People shouldn’t have to leave their hometown to live better">
        Jivah develops thoughtfully designed residential communities in emerging growth markets — West
        Bengal, Andhra Pradesh and Odisha.
      </PageIntro>

      <div className="relative h-[60vh] min-h-[360px]">
        <Image
          src={u("photo-1600585154340-be6161a56a0c")}
          alt="A Jivah neighbourhood"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <section className="site-pad mx-auto max-w-3xl py-20">
        <h2 className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[52px]">Another possibility</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">
          Jivah is building another possibility. We develop thoughtfully planned residential communities across
          West Bengal, Andhra Pradesh and Odisha — so people do not have to leave their hometown to enjoy a
          better quality of life.
        </p>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">
          Our projects bring together well-designed homes, open spaces, modern amenities and everyday convenience—so families can upgrade their lifestyle while staying connected to where they belong.
        </p>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-4xl">
          <h2 className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[52px]">What we will not build</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
            Everyday before spectacle. If it does not make a family Tuesday easier, it does not belong in the budget.
          </p>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-4xl py-20">
        <h2 className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[52px]">How we build</h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          We start with how people already live in a city, then draw the ground floor, the garden and the apartment around that sequence. Retail is leased to operators who serve residents first. RERA numbers, timelines and prices are published. Urgency is not a strategy.
        </p>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-5xl">
          <h2 className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[52px]">Leadership</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {leaders.map((person) => (
              <article key={person.name}>
                <div className="aspect-[3/4] bg-line" />
                <h3 className="mt-5 text-[24px] font-medium leading-8">{person.name}</h3>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-4xl py-20">
        <h2 className="text-[36px] font-medium leading-[1.18] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[52px]">Values</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {values.map((v, i) => (
            <div key={v.title} className="grid gap-3 py-8 md:grid-cols-[88px_1fr]">
              <p className="font-serif text-2xl text-muted">{String(i + 1).padStart(2, "0")}.</p>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="btn-pill mt-12"
        >
          Talk to us
        </Link>
      </section>
    </div>
  );
}
