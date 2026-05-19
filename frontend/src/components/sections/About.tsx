// src/components/sections/About.tsx
"use client";

import { AnimatedSection } from "../shared/AnimatedSection";
import { Target, Eye, Award } from "lucide-react";
import { ABOUT_BACKGROUND, VISION, MISSION } from "@/lib/constants";

const aboutIntro = ABOUT_BACKGROUND.split(". ").slice(0, 2).join(". ") + ".";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    description: MISSION,
    color: "blue",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: VISION,
    color: "orange",
  },
  {
    icon: Award,
    title: "Our Values",
    description: "Guided by Humanity First, Integrity, Transparency, Collaboration, Innovation, and Empowerment.",
    color: "red",
  },
];

export function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {aboutIntro}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 bg-${pillar.color}-100 dark:bg-${pillar.color}-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <pillar.icon className={`w-7 h-7 text-${pillar.color}-600 dark:text-${pillar.color}-400`} />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}