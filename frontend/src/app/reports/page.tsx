import type { Metadata } from "next";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { annualReports } from "@/lib/content";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Download Tseday Charity annual reports for transparency and institutional accountability.",
  alternates: { canonical: "/reports" },
};

export default function ReportsPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams?.lang);
  const isAm = lang === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">
              {isAm ? "ዓመታዊ ሪፖርቶች" : "Annual Reports"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {isAm
                ? "ግልጽነት እና ተጠያቂነት። የፕሮግራም ውጤት እና የፋይናንስ ማጠቃለያ።"
                : "Transparency and accountability. Download consolidated program and financial highlights."}
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {isAm
                ? "ፋይሎችን በ `public/reports` ውስጥ በመጨመር አገናኞችን ያዘምኑ።"
                : "Add PDF files under `public/reports` and keep the paths below in sync."}
            </p>
          </div>
          <LanguageToggle />
        </div>

        <ul className="space-y-4">
          {annualReports.map((r) => (
            <li
              key={r.year}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-tsedey-blue">{r.year}</p>
                <h2 className="mt-1 text-xl font-heading font-bold text-tsedey-navy dark:text-white">{r.title}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{r.summary}</p>
              </div>
              <a
                href={r.fileUrl}
                download
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-tsedey-navy px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                <FileDown className="h-4 w-4" />
                {isAm ? "አውርድ" : r.fileLabel}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {isAm ? (
            <>
              ለጥያቄዎች{" "}
              <Link href={`/contact?lang=${lang}`} className="font-semibold text-tsedey-blue hover:underline">
                ያግኙን
              </Link>
              ።
            </>
          ) : (
            <>
              Questions?{" "}
              <Link href={`/contact?lang=${lang}`} className="font-semibold text-tsedey-blue hover:underline">
                Contact us
              </Link>
              .
            </>
          )}
        </p>
      </section>
    </main>
  );
}
