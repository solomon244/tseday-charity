import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { newsArticles } from "@/lib/content";
import { getLang } from "@/lib/i18n";

type PageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
  };
}

export default function NewsArticlePage({ params, searchParams }: PageProps) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();
  const lang = getLang(searchParams?.lang);
  const isAm = lang === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <LanguageToggle />
        </div>
        <Link
          href={`/news?lang=${lang}`}
          className="text-sm font-semibold text-tsedey-blue hover:underline"
        >
          ← {isAm ? "ወደ ዜና ዝርዝር" : "Back to news"}
        </Link>
        <div className="mt-6 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 text-7xl dark:from-primary-900/30 dark:to-primary-800/30">
          <span aria-hidden>{article.imageEmoji}</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {article.date}
          </span>
          <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
            {article.category}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">{article.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((tg) => (
            <span
              key={tg}
              className="rounded-md bg-gray-200/80 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              #{tg}
            </span>
          ))}
        </div>
        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          {article.body.map((para, i) => (
            <p key={i} className="mb-4 text-gray-700 dark:text-gray-200">
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
