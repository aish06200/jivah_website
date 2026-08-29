import Image from "next/image";
import Link from "next/link";
import { ProjectsListing } from "@/components/ProjectsListing";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      <section className="relative h-[72vh] min-h-[440px] overflow-hidden bg-ink">
        <Image
          src="/images/projects-hero.png"
          alt="The entrance to a Jivah Realty neighbourhood"
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
      </section>

      <ProjectsListing />

      <section className="bg-paper py-20 md:py-24">
        <div className="site-pad max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">Looking for a neighbourhood?</h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Tell us the city and the kind of home you need. We will send plans, RERA details and a
            time to walk the site.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex bg-accent px-8 py-3.5 text-lg tracking-wide text-on-accent hover:bg-accent-hover"
          >
            Enquire
          </Link>
        </div>
      </section>
    </div>
  );
}
