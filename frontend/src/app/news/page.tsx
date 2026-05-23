import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { getLang } from "@/lib/i18n";
import { fetchPublishedNews } from "@/lib/fetchNews";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, program updates, and stories from Tseday Charity in North Shewa, Ethiopia.",
  alternates: { canonical: "/news" },
};

type PageProps = {
  searchParams?: { q?: string; tag?: string; lang?: string };
};

export default async function NewsPage({ searchParams }: PageProps) {
  const lang = getLang(searchParams?.lang);
  const isAm = lang === "am";
  const q = (searchParams?.q ?? "").trim().toLowerCase();
  const tag = (searchParams?.tag ?? "").trim();

  const newsArticles = await fetchPublishedNews();
  const newsTagList = Array.from(new Set(newsArticles.flatMap((a) => a.tags))).sort();

  const filtered = newsArticles.filter((a) => {
    const matchTag = !tag || a.tags.includes(tag);
    const blob = `${a.title} ${a.excerpt} ${a.body.join(" ")}`.toLowerCase();
    const matchQ = !q || blob.includes(q);
    return matchTag && matchQ;
  });

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">
              {isAm ? "ዜና እና ዝመናዎች" : "News & Updates"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {isAm
                ? "የፕሮግራም ዝመናዎች እና ታሪኮች። በመለያ ይጣሩ።"
                : "Program announcements and field updates. Filter by topic or search."}
            </p>
          </div>
          <LanguageToggle />
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <form
            action="/news"
            method="get"
            className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
          >
            <input type="hidden" name="lang" value={lang} />
            {tag ? <input type="hidden" name="tag" value={tag} /> : null}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                defaultValue={searchParams?.q ?? ""}
                placeholder={isAm ? "ይፈልጉ..." : "Search articles..."}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm focus:border-tsedey-blue focus:outline-none focus:ring-2 focus:ring-tsedey-blue/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-tsedey-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              {isAm ? "ፈልግ" : "Search"}
            </button>
          </form>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            href={`/news?lang=${lang}${q ? `&q=${encodeURIComponent(searchParams?.q ?? "")}` : ""}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              !tag
                ? "bg-tsedey-navy text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:border-tsedey-blue dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            }`}
          >
            {isAm ? "ሁሉም" : "All"}
          </Link>
          {newsTagList.map((t) => (
            <Link
              key={t}
              href={`/news?tag=${encodeURIComponent(t)}&lang=${lang}${q ? `&q=${encodeURIComponent(searchParams?.q ?? "")}` : ""}`}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                tag === t
                  ? "bg-tsedey-blue text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-tsedey-blue dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              {t.replace(/-/g, " ")}
            </Link>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-6xl dark:from-primary-900/30 dark:to-primary-800/30">
                <span aria-hidden>{item.imageEmoji}</span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="rounded-full bg-primary-100 px-2 py-0.5 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
                    {item.category}
                  </span>
                </div>
                <h2 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tg) => (
                    <span
                      key={tg}
                      className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/news/${item.slug}?lang=${lang}`}
                  className="mt-4 inline-flex font-semibold text-tsedey-blue hover:underline"
                >
                  {isAm ? "ዝርዝር ያንብቡ" : "Read more"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-gray-600 dark:text-gray-300">
            {isAm ? "ምንም ውጤት አልተገኘም። የፍለጋ ቃላትን ይለውጡ።" : "No articles match your filters. Try another search or tag."}
          </p>
        ) : null}
      </section>
    </main>
  );
}
