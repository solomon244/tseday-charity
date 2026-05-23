import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { fetchPublishedImpactStories, fetchPublishedImpactStoryBySlug } from "@/lib/fetchImpactStories";
import { getLang } from "@/lib/i18n";

type PageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export async function generateStaticParams() {
  const stories = await fetchPublishedImpactStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = await fetchPublishedImpactStoryBySlug(params.slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/stories/${story.slug}` },
  };
}

export default async function StoryDetailPage({ params, searchParams }: PageProps) {
  const story = await fetchPublishedImpactStoryBySlug(params.slug);
  if (!story) notFound();
  const isAm = getLang(searchParams?.lang) === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <LanguageToggle />
        </div>
        <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">{story.title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{story.location} - {story.program}</p>
        <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl">
          <Image src={story.image} alt={`${story.beneficiary} in ${story.location}`} fill className="object-cover" />
        </div>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-200">{story.summary}</p>
        <h2 className="mt-8 text-xl font-bold text-tsedey-navy dark:text-white">{isAm ? "ዋና ውጤቶች" : "Key Outcomes"}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-200">
          {story.outcome.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
