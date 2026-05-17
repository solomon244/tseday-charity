import type { Metadata } from "next";
import { Suspense } from "react";
import { VolunteerStatusLookup } from "./VolunteerStatusLookup";

export const metadata: Metadata = {
  title: "Volunteer application status",
  description: "Track your Tseday Charity volunteer application status using your reference ID.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/volunteer/status" },
};

export default function VolunteerStatusPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
          <div className="mx-auto max-w-lg px-4 py-12 text-center text-gray-600 dark:text-gray-300">Loading…</div>
        </main>
      }
    >
      <VolunteerStatusLookup />
    </Suspense>
  );
}
