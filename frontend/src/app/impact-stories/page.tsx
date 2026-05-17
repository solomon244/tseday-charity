import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ImpactCharts } from "@/components/sections/ImpactCharts";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { successStories } from "@/lib/content";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Impact Stories",
  description: "Explore measurable program impact and beneficiary stories from Tseday Charity interventions in North Shewa, Ethiopia.",
  alternates: { canonical: "/impact-stories" },
};

export default function ImpactStoriesPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams?.lang);
  const isAm = lang === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">
              {isAm ? "ተፅዕኖ እና ታሪኮች" : "Impact & Stories"}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {isAm
                ? "የፕሮግራም ውጤቶችን እና የተጠቃሚዎች ታሪኮችን በቁጥር ይመልከቱ።"
                : "Track program outcomes and beneficiary progress with transparent data."}
            </p>
          </div>
          <LanguageToggle />
        </div>

        <ImpactCharts />

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-heading font-bold text-tsedey-navy dark:text-white">
            {isAm ? "የተጠቃሚ የስኬት ታሪኮች" : "Beneficiary Success Stories"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {successStories.map((story) => (
              <article key={story.slug} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
                <div className="relative h-52 w-full">
                  <Image src={story.image} alt={`${story.beneficiary} success story in ${story.location}`} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-tsedey-navy dark:text-white">{story.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{story.summary}</p>
                  <Link href={`/stories/${story.slug}?lang=${lang}`} className="mt-4 inline-flex font-semibold text-tsedey-blue hover:underline">
                    {isAm ? "ሙሉ ታሪኩን ያንብቡ" : "Read full story"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
