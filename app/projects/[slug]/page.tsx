import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquireForm } from "@/components/EnquireForm";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { projects } from "@/lib/data";
import { similarProjects, statusLabel, uniqueImages } from "@/lib/project";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.name ?? "Project" };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const images = uniqueImages(project);
  const similar = similarProjects(projects, project.slug);
  const soldOut = project.startingPrice === "Sold out";
  const features = project.amenities.flatMap((group) => group.items);

  const specs = [
    { label: "Homes", value: project.units },
    { label: "Typology", value: project.typology },
    { label: "Status", value: soldOut ? "Sold out" : statusLabel[project.status] },
    { label: "Possession", value: project.possession },
  ];

  return (
    <article className="bg-white">
      <div className="site-pad pt-8 md:pt-12">
        <nav className="text-[12px] tracking-wide text-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{project.name}</li>
          </ol>
        </nav>

        <header className="mt-8 flex flex-col gap-6 border-b border-line pb-8 md:mt-10 md:flex-row md:items-end md:justify-between md:pb-10">
          <div>
            <h1 className="font-serif text-4xl leading-[1.08] md:text-6xl">{project.name}</h1>
            <p className="mt-3 text-sm text-muted md:text-base">{project.location}</p>
          </div>
          <p className="font-serif text-3xl md:text-4xl">
            {soldOut ? "Sold out" : `From ${project.startingPrice}`}
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <ProjectMedia
            images={images}
            name={project.name}
            status={project.status}
            soldOut={soldOut}
          />
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-8 border-y border-line py-6 md:mt-10 md:grid-cols-4 md:py-8">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[11px] tracking-[0.16em] uppercase text-muted">{spec.label}</dt>
              <dd className="mt-2 text-sm md:text-base">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="site-pad grid gap-14 py-14 md:grid-cols-12 md:gap-16 md:py-20">
        <div className="md:col-span-7">
          <section>
            <h2 className="font-serif text-3xl md:text-4xl">Overview</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{project.excerpt}</p>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">{project.overview}</p>
          </section>

          <section className="mt-14 border-t border-line pt-14">
            <h2 className="font-serif text-3xl md:text-4xl">Residences</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {project.residences.map((r) => (
                <div key={r.type} className="grid gap-1 py-6 md:grid-cols-[160px_1fr_140px]">
                  <p className="font-serif text-2xl">{r.type}</p>
                  <p className="text-sm leading-relaxed text-muted">{r.note}</p>
                  <p className="text-sm md:text-right">{r.size}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-3xl md:text-4xl">Features</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-3xl md:text-4xl">Location</h2>
            <p className="mt-3 text-sm text-muted">{project.location}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {project.connectivity.map((c) => (
                <li key={c.place} className="flex justify-between gap-6 py-4 text-sm">
                  <span>{c.place}</span>
                  <span className="text-muted">{c.time}</span>
                </li>
              ))}
            </ul>
          </section>

          {project.updates.length > 0 ? (
            <section className="mt-14">
              <h2 className="font-serif text-3xl md:text-4xl">On site</h2>
              <div className="mt-8 space-y-8">
                {project.updates.map((u) => (
                  <div key={u.title}>
                    <p className="text-[12px] tracking-[0.16em] uppercase text-muted">{u.date}</p>
                    <h3 className="mt-2 font-serif text-2xl">{u.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{u.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-14 border-t border-line pt-10">
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted">Downloads</p>
            <ul className="mt-4 space-y-2 text-sm">
              {project.downloads.map((d) => (
                <li key={d.title}>
                  {d.title} <span className="text-muted">{d.type}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              MahaRERA {project.rera}
              {" · "}
              <Link href="/rera" className="text-ink underline-offset-4 hover:underline">
                RERA guide
              </Link>
            </p>
          </section>
        </div>

        <aside className="md:col-span-5">
          <div className="border border-line bg-paper p-6 md:sticky md:top-28 md:p-8">
            <h2 className="font-serif text-3xl">Visit this neighbourhood</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Tell us how you live. We will suggest a time to walk the site.
            </p>
            <div className="mt-8">
              <EnquireForm defaultProject={project.slug} wide />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 ? (
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="site-pad">
            <h2 className="font-serif text-3xl md:text-4xl">Other neighbourhoods</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, i) => (
                <Link key={item.slug} href={`/projects/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.imageClass ?? ""}`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="absolute left-4 top-4 font-mono text-[12px] tracking-wide text-white drop-shadow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl md:text-3xl">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.city}
                    {" · "}
                    {item.startingPrice === "Sold out" ? "Sold out" : `From ${item.startingPrice}`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
