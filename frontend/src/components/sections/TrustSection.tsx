"use client";

import { ShieldCheck, BadgeCheck } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const testimonials = [
  {
    quote:
      "When drought hit our area, Tsedey arrived with food and school support. They did not just visit once, they stayed with us.",
    name: "Meseret A.",
    location: "Debre Birhan, North Shewa",
  },
  {
    quote:
      "Our youth training group gained skills and confidence to earn income. Families now believe in tomorrow again.",
    name: "Abebe T.",
    location: "Efrata Gidim District",
  },
];

export function TrustSection() {
  return (
    <section className="bg-white py-16 dark:bg-gray-900 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-tsedey-navy dark:text-white md:text-4xl">
              Voices from Our Communities
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Beneficiaries and neighbors share how integrated support has changed daily life in North Shewa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={0.2 + index * 0.1}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-200">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="font-semibold text-tsedey-navy dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-tsedey-cyan/30 bg-tsedey-cyan/10 px-6 py-4 text-sm font-semibold text-tsedey-navy dark:bg-tsedey-navy/40 dark:text-gray-100">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Registered Charity in Ethiopia
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Community-Verified Impact
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
