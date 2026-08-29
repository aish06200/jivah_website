import Image from "next/image";
import Link from "next/link";
import { leaders, u, values } from "@/lib/data";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="bg-white">
      <header className="site-pad py-20 text-center md:py-28">
        <p className="text-[13px] tracking-wide text-muted">Meet</p>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Jivah</h1>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-muted">
          Bringing a better standard of residential living to emerging markets without asking people to leave the places they call home.
        </p>
      </header>

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
        <h2 className="font-serif text-4xl">Our story</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">
          Jivah began with a refusal: that a good home should only exist in a metro, and that everyone else should commute toward it. We build mixed-use neighbourhoods in Nashik, Nagpur, Kolhapur, Solapur and the edges of Pune — cities with their own weather, work and rituals.
        </p>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">
          The brief is everyday life. A grocer that opens. A pharmacy on the ground floor. A courtyard that is used at dusk. Residences drawn for children, elders and the Tuesday errand, not for a brochure of unused amenities.
        </p>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl">Philosophy</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
            Everyday before spectacle. If it does not make a family Tuesday easier, it does not belong in the budget.
          </p>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-4xl py-20">
        <h2 className="font-serif text-4xl">Approach to development</h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          We start with how people already live in a city, then draw the ground floor, the garden and the apartment around that sequence. Retail is leased to operators who serve residents first. RERA numbers, timelines and prices are published. Urgency is not a strategy.
        </p>
      </section>

      <section className="bg-paper py-20">
        <div className="site-pad mx-auto max-w-5xl">
          <h2 className="font-serif text-4xl">Leadership</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {leaders.map((person) => (
              <article key={person.name}>
                <div className="aspect-[3/4] bg-line" />
                <h3 className="mt-5 font-serif text-2xl">{person.name}</h3>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-pad mx-auto max-w-4xl py-20">
        <h2 className="font-serif text-4xl">Values</h2>
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
          href="/#contact"
          className="mt-12 inline-flex bg-accent px-6 py-3 text-[13px] text-on-accent hover:bg-accent-hover"
        >
          Enquire
        </Link>
      </section>
    </div>
  );
}
