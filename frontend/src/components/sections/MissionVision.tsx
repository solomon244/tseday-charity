// src/components/sections/MissionVision.tsx
"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Target, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/layout/LangProvider";

export function MissionVision() {
  const { withLang } = useLang();

  return (
    <section className="py-20 bg-tsedey-light dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">
              Our Purpose
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Guided by compassion, driven by action, committed to lasting change in North Shewa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-soft h-full border-l-4 border-tsedey-blue">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-8 h-8 text-tsedey-blue" />
                <h3 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white">Vision</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A resilient and self-reliant community where vulnerable populations, especially internally displaced persons, women, and youth, have sustainable livelihoods, improved nutrition, and access to essential services.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-soft h-full border-l-4 border-tsedey-orange">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-tsedey-orange" />
                <h3 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white">Mission</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To improve the lives of vulnerable and displaced communities in North Shewa by delivering integrated humanitarian assistance, promoting livelihood opportunities, enhancing nutrition through sustainable agriculture, and strengthening community resilience through partnerships, innovation, and inclusive development.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center">
            <Link href={withLang("/about")} className="inline-flex items-center space-x-2 text-tsedey-blue dark:text-tsedey-cyan font-semibold hover:underline group">
              <span>Learn more about our approach</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}