import Image from "next/image";
import { withBase } from "@/lib/base";

const HERO_IMAGE = "/images/contact-gate.png";

export function ContactHero() {
  return (
    <section className="site-pad pt-8 md:pt-10">
      <h1 className="sr-only">Contact Us</h1>

      <div className="relative h-[240px] overflow-hidden rounded-[20px] sm:h-[340px] md:h-auto md:min-h-[520px] lg:min-h-[580px]">
        <Image
          src={withBase(HERO_IMAGE)}
          alt="The entrance to a Jivah Realty neighbourhood"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
