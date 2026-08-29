import Image from "next/image";
import Link from "next/link";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="bg-paper lg:grid lg:min-h-[82vh] lg:grid-cols-2 lg:items-stretch">
      <div className="flex flex-col justify-center site-pad py-24 md:py-32">
        <h2 className="font-serif text-3xl leading-[1.15] md:text-5xl">Philosophy</h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
          Everyday before spectacle. A grocer that opens. A courtyard used at dusk. Homes drawn for children, elders and the school run — not a brochure of unused amenities. We build in Nashik, Nagpur, Pune, Kolhapur, Chhatrapati Sambhajinagar and Solapur, so people do not have to leave the city they already belong to.
        </p>
        <Link
          href="/about"
          className="mt-10 inline-flex w-fit text-lg tracking-wide text-ink underline-offset-4 hover:underline"
        >
          About us
        </Link>
      </div>

      <div className="relative min-h-[60vh] overflow-hidden lg:min-h-full">
        <Image
          src="/images/philosophy-gate.png"
          alt="The entrance to a Jivah neighbourhood"
          fill
          className="object-cover object-right"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </section>
  );
}
