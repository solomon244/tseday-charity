"use client";

import { DonationForm } from "@/components/shared/DonationForm";

export function DonatePageClient() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-gray-900 sm:p-8">
      <DonationForm />
    </div>
  );
}
