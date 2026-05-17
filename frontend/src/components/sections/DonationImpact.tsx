"use client";

import { HeartHandshake, BookOpenCheck, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { openDonationModal } from "@/lib/ctaEvents";

const impactOptions = [
  {
    amount: "100 ETB",
    impact: "Feeds a family with urgent meals",
    icon: HeartHandshake,
    cardClass: "bg-white dark:bg-gray-800",
  },
  {
    amount: "500 ETB",
    impact: "Supports education with school essentials",
    icon: BookOpenCheck,
    cardClass: "bg-tsedey-light dark:bg-gray-800/80",
  },
  {
    amount: "1000 ETB",
    impact: "Transforms a life through sustained support",
    icon: Sparkles,
    cardClass: "bg-white dark:bg-gray-800",
  },
];

export function DonationImpact() {
  return (
    <section id="donation-impact" className="bg-white py-16 dark:bg-gray-900 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-tsedey-navy dark:text-white md:text-4xl">
              Your Donation Creates Immediate Impact
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Choose an amount and see exactly how your generosity changes lives.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {impactOptions.map((item, index) => (
            <AnimatedSection key={item.amount} delay={0.1 + index * 0.1}>
              <div className={`h-full rounded-2xl border border-gray-200 p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 ${item.cardClass}`}>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tsedey-cyan/15 text-tsedey-blue dark:bg-tsedey-cyan/20 dark:text-tsedey-cyan">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-extrabold text-tsedey-navy dark:text-white">{item.amount}</p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{item.impact}</p>
                <button
                  type="button"
                  onClick={openDonationModal}
                  className="mt-6 inline-flex rounded-lg bg-tsedey-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-tsedey-blue"
                >
                  Donate this amount
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
