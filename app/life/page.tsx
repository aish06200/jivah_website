import Image from "next/image";
import { lifePillars } from "@/lib/data";

export const metadata = { title: "The Jivah Life" };

export default function LifePage() {
  return (
    <div className="bg-white">
      <header className="site-pad py-20 text-center md:py-28">
        <p className="text-[13px] tracking-wide text-muted">How people live</p>
        <h1 className="mt-4 font-serif text-[28px] leading-[1.15] md:text-5xl md:text-7xl">The Jivah Life</h1>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-muted">
          Not an amenity catalogue. A picture of Tuesday — children on the lawn, milk downstairs, elders in the shade, a walk that does not need a car.
        </p>
      </header>

      <div className="space-y-0">
        {lifePillars.map((pillar, i) => (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative min-h-[420px]">
              <Image src={pillar.image} alt={pillar.title} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="flex flex-col justify-center bg-paper px-8 py-16 md:px-16">
              <p className="font-serif text-2xl text-muted">{pillar.kicker}.</p>
              <h2 className="mt-4 font-serif text-[22px] leading-[1.25] md:text-4xl">{pillar.title}</h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">{pillar.body}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
