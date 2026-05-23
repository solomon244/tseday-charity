import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ArrowLeft } from "lucide-react";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { PartnerLogoCard } from "@/components/shared/PartnerLogoCard";
import { partners } from "@/lib/content";
import { getLang } from "@/lib/i18n";
import { getOptimizedImageSrc } from "@/lib/image";

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
    <main className="min-h-screen bg-tsedey-light dark:bg-gray-950">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-tsedey-navy via-[#0b2f4f] to-[#0a3b43] pt-24 pb-20 text-white">
        <Image
          src={getOptimizedImageSrc("/gallery/volunteers-planting.jpg", 1600)}
          alt=""
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tsedey-navy/95 via-tsedey-navy/80 to-tsedey-navy/60" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-tsedey-cyan">
                <Handshake className="h-4 w-4" />
                {isAm ? "ትብብር" : "Collaboration"}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
                {isAm ? "አጋሮቻችን" : "Our Partners"}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-200">
                {isAm
                  ? "ከመንግስት፣ ከጤና አገልግሎት እና ከማህበረሰብ ተቋሳት ጋር በመተባበር በሰሜን ሸዋ ጥንካራ እና ዘላለማዊ ተስፋ እንገንባለን።"
                  : "We are promoting integrated humanitarian and development partnerships among communities, government institutions, and civil society across the Amhara Region."}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {isAm ? "ዋና ዋና አጋሮቻችን" : "Our major partners"}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {partners.map((p) => (
              <PartnerLogoCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-tsedey-navy dark:text-white md:text-3xl">
            {isAm ? "የትብብር ዝርዝር" : "Partnership Profiles"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {partners.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-start gap-4">
                  {p.logo ? (
                    <div className="relative h-14 w-14 shrink-0">
                      <Image src={p.logo} alt="" fill className="object-contain" sizes="56px" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tsedey-navy/10 font-bold text-tsedey-navy dark:bg-tsedey-blue/20 dark:text-tsedey-cyan">
                      {p.abbr}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-tsedey-blue">{p.type}</p>
                    <h3 className="mt-1 text-lg font-heading font-bold text-tsedey-navy dark:text-white">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{p.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={lang === "am" ? "/?lang=am" : "/"}
              className="inline-flex items-center gap-2 text-sm font-semibold text-tsedey-blue hover:text-tsedey-navy dark:hover:text-tsedey-cyan"
            >
              <ArrowLeft className="h-4 w-4" />
              {isAm ? "ወደ መነሻ ተመለስ" : "Back to home"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
