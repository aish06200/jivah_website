import { notFound } from "next/navigation";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { blogArticles, getBlogArticle } from "@/lib/blog";

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  return { title: article ? article.title : "Blog" };
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  return <BlogArticleContent article={article} />;
}
