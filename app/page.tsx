import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HeroVideo } from "@/components/HeroVideo";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsStrip } from "@/components/StatsStrip";
import { projects, stories } from "@/lib/data";

export default function Home() {
  const journal = stories.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-ink">
        <HeroVideo />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="relative z-10 flex min-h-[88vh] flex-col items-start justify-end site-pad pb-12 pt-16 text-left md:pb-16">
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] text-on-accent sm:text-5xl md:text-6xl">
            Better living,
            <br />
            without leaving home
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed tracking-[0.08em] uppercase text-on-accent/90 md:text-lg">
            Mixed-use neighbourhoods in the cities people already call home
          </p>
          <Link
            href="/#contact"
            className="mt-10 bg-accent px-8 py-3.5 text-lg tracking-wide text-on-accent hover:bg-accent-hover"
          >
            Enquire
          </Link>
        </div>
      </section>

      <StatsStrip />

      <section id="projects" className="bg-white py-20 md:py-28">
        <div className="site-pad flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[12px] tracking-[0.16em] uppercase text-muted">Projects</p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] md:text-5xl">New neighbourhoods</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              From planned communities to compact urban blocks — homes drawn around grocers, gardens and the school run.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 text-[13px] tracking-wide text-ink"
          >
            See all
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M5 2.5 9.5 7 5 11.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="site-pad mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <PhilosophySection />

      <section id="stories" className="bg-white py-20 md:py-28">
        <div className="site-pad flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] tracking-[0.16em] uppercase text-muted">Neighbourhoods</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl">Blogs</h2>
          </div>
          <Link href="/stories" className="text-[13px] tracking-wide text-ink underline-offset-4 hover:underline">
            View all
          </Link>
        </div>
        <div className="site-pad mt-12 grid gap-8 sm:grid-cols-3 md:gap-10">
          {journal.map((story) => (
            <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-muted">{story.category}</p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">{story.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden">
        <Image
          src="/images/contact-gate.png"
          alt="The entrance to a Jivah neighbourhood at dusk"
          fill
          className="object-cover object-[25%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="relative z-10 site-pad py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
            <div className="bg-white p-8 md:p-10 lg:col-start-2">
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">Contact Us</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
