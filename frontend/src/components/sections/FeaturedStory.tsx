"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { openDonationModal } from "@/lib/ctaEvents";
import { getOptimizedImageSrc } from "@/lib/image";

export function FeaturedStory() {
  return (
    <section className="bg-tsedey-light py-16 dark:bg-gray-950 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-tsedey-navy dark:text-white md:text-4xl">
              A Story of Hope
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              One family, one community, and one act of compassion that changed everything.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-soft dark:border-gray-700 dark:bg-gray-900 md:grid-cols-2">
            <div className="relative min-h-[300px]">
              <Image
                src={getOptimizedImageSrc("/gallery/photo3.jpg", 1000)}
                alt="Ethiopian family smiling after receiving support"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                After displacement, Hana and her children faced days without stable food or school supplies. Through your support, they received emergency nutrition, school materials, and small business coaching. Today, her children are back in class, and Hana now runs a small produce stand that supports her family with dignity.
              </p>
              <p className="mt-4 text-sm font-medium text-tsedey-blue dark:text-tsedey-cyan">
                &ldquo;We were seen, supported, and given a chance to stand again.&rdquo;
              </p>
              <button
                type="button"
                onClick={openDonationModal}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-tsedey-navy/20 bg-white px-6 py-3 font-bold text-tsedey-navy transition-colors hover:bg-tsedey-light dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Help More Families
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
