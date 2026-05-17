// src/components/sections/Values.tsx
"use client";

import { AnimatedSection } from "../shared/AnimatedSection";
import { Heart, Shield, Eye, Users, Lightbulb, Rocket } from "lucide-react";
import { CORE_VALUES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  shield: Shield,
  eye: Eye,
  users: Users,
  lightbulb: Lightbulb,
  rocket: Rocket,
};

export function Values() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide every aspect of our work and decision-making.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_VALUES.map((value, index) => {
            const Icon = iconMap[value.icon] || Heart;
            const colors = ["red", "blue", "green", "purple", "yellow", "orange"];
            const color = colors[index % colors.length];
            
            return (
              <AnimatedSection key={value.id} delay={index * 0.1}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}