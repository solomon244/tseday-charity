import type { Metadata } from "next";
import { Building2, Handshake } from "lucide-react";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { partners } from "@/lib/content";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Partners",
  description: "Organizations and institutions collaborating with Tseday Charity across North Shewa.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams?.lang);
  const isAm = lang === "am";

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-tsedey-blue">
              <Handshake className="h-4 w-4" />
              {isAm ? "ትብብር" : "Collaboration"}
            </p>
            <h1 className="mt-2 text-3xl font-heading font-bold text-tsedey-navy dark:text-white md:text-4xl">
              {isAm ? "አጋሮቻችን" : "Our Partners"}
            </h1>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              {isAm
                ? "ከመንግስት፣ ከጤና አገልግሎት እና ከማህበረሰብ ተቋማት ጋር የምንሰራው የጋራ ተጽዕኖ።"
                : "We co-create impact with government, health systems, cooperatives, and civil society networks."}
            </p>
          </div>
          <LanguageToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tsedey-navy/10 text-tsedey-navy dark:bg-tsedey-blue/20 dark:text-tsedey-cyan">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-tsedey-blue">{p.type}</p>
                  <h2 className="mt-1 text-lg font-heading font-bold text-tsedey-navy dark:text-white">{p.name}</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
