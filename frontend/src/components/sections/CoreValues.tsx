// src/components/sections/CoreValues.tsx
"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Heart, Shield, Eye, Users, Lightbulb, Rocket } from "lucide-react";

const values = [
  { icon: Heart, title: "Humanity First", desc: "We prioritize human dignity, compassion, and the well-being of all people.", color: "tsedey-red" },
  { icon: Shield, title: "Integrity & Accountability", desc: "We act with honesty, uphold ethical standards, and take responsibility for our actions and results.", color: "tsedey-navy" },
  { icon: Eye, title: "Transparency", desc: "We operate openly and share information responsibly with stakeholders.", color: "tsedey-cyan" },
  { icon: Users, title: "Collaboration", desc: "We work together with communities, partners, and institutions to achieve sustainable impact.", color: "tsedey-blue" },
  { icon: Lightbulb, title: "Innovation & Learning", desc: "We promote creative solutions and use research and evidence to continuously improve our work.", color: "tsedey-yellow" },
  { icon: Rocket, title: "Empowerment", desc: "We support women and youth to become self-reliant and agents of change.", color: "tsedey-orange" },
];

export function CoreValues() {
  return (
    <section className="py-20 bg-tsedey-light dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide every decision, program, and partnership.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all border-t-4 border-tsedey-light dark:border-gray-800">
                <div className={`w-10 h-10 bg-${val.color}/10 dark:bg-${val.color}/20 rounded-lg flex items-center justify-center mb-4`}>
                  <val.icon className={`w-5 h-5 text-${val.color}`} />
                </div>
                <h3 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}