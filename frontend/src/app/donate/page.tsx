import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate",
  description: "Donate to Tseday Charity Association and help deliver food assistance, livelihoods support, and resilience programs in North Shewa, Ethiopia.",
  alternates: {
    canonical: "/donate",
  },
};

export default function DonatePage() {
  const donateActionSchema = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Donate to Tseday Charity Association",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.tsedeycharity.org/donate",
      inLanguage: "en",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    recipient: {
      "@type": "Organization",
      name: "Tseday Charity Association",
      url: "https://www.tsedeycharity.org",
    },
  };

  return (
    <main className="min-h-screen bg-tsedey-light px-4 pb-16 pt-28 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateActionSchema) }}
      />
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-soft dark:bg-gray-900">
        <h1 className="mb-4 text-3xl font-heading font-bold text-tsedey-navy dark:text-white">Donate to Tseday Charity Association</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Your donation supports vulnerable families across North Shewa through emergency nutrition, livelihoods training, and long-term resilience programs.
        </p>
        <Link
          href="/#get-involved"
          className="inline-flex rounded-xl bg-tsedey-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-tsedey-navy"
        >
          Continue to Donation Options
        </Link>
      </section>
    </main>
  );
}
