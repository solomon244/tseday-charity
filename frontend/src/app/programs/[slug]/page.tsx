import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { getLang } from "@/lib/i18n";
import { programDetails } from "@/lib/content";

type PageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return programDetails.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const program = programDetails.find((item) => item.slug === params.slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.shortDescription,
    alternates: { canonical: `/programs/${program.slug}` },
  };
}

export default function ProgramDetailPage({ params, searchParams }: PageProps) {
  const program = programDetails.find((item) => item.slug === params.slug);
  if (!program) notFound();
  const isAm = getLang(searchParams?.lang) === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article className="lg:col-span-2">
          <div className="mb-6 flex justify-end">
            <LanguageToggle />
          </div>
          <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">{program.title}</h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300">{program.shortDescription}</p>
          <h2 className="mt-8 text-xl font-bold text-tsedey-navy dark:text-white">{isAm ? "የፕሮግራሙ ግቦች" : "Program Goals"}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-200">
            {program.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-bold text-tsedey-navy dark:text-white">{isAm ? "የቅርብ ጊዜ ዝማኔዎች" : "Recent Updates"}</h2>
          <div className="mt-4 space-y-4">
            {program.updates.map((update) => (
              <div key={update.date + update.title} className="rounded-xl bg-white p-4 shadow-soft dark:bg-gray-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-tsedey-blue">{update.date}</p>
                <h3 className="mt-1 font-bold text-tsedey-navy dark:text-white">{update.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{update.note}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-2xl bg-white p-4 shadow-soft dark:bg-gray-900">
          <h3 className="mb-3 text-lg font-bold text-tsedey-navy dark:text-white">{isAm ? "የፕሮግራም አካባቢ" : "Program Location"}</h3>
          <div className="overflow-hidden rounded-xl">
            <iframe
              title={`${program.title} location map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(program.mapQuery)}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{program.location}</p>
        </aside>
      </section>
    </main>
  );
}
