import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryPlayBadge } from "@/components/StoryPlayBadge";
import { withBase } from "@/lib/base";
import { stories, projects } from "@/lib/data";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  return { title: story ? `${story.person} · People’s stories` : "Story" };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const project = projects.find((p) => p.slug === story.projectSlug);

  return (
    <article className="bg-white pb-24">
      <header className="site-pad mx-auto max-w-3xl py-16 md:py-24">
        <p className="text-[11px] tracking-[0.16em] uppercase text-muted">
          <Link href="/stories" className="hover:text-ink">
            People’s stories
          </Link>
          {" · "}
          {story.category} · {story.date} · {story.readTime}
        </p>
        <h1 className="page-title mt-4 text-ink">{story.title}</h1>
        <p className="mt-6 text-lg text-muted">{story.person}</p>
      </header>
      <div className="relative mx-auto aspect-[16/9] w-[min(100%,42rem)] overflow-hidden rounded-lg bg-paper">
        <Image
          src={withBase(story.image)}
          alt={story.person}
          fill
          className={`object-cover ${story.video ? "object-center" : "object-top"}`}
          sizes="28rem"
        />
        {story.video ? <StoryPlayBadge /> : null}
      </div>
      <div className="site-pad mx-auto max-w-2xl space-y-6 py-16 text-[17px] leading-relaxed text-muted">
        {story.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {project ? (
          <p className="pt-4">
            <Link
              href={`/projects/${story.projectSlug}`}
              className="text-[13px] tracking-wide text-ink underline-offset-4 hover:underline"
            >
              See the neighbourhood
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}
