// src/components/sections/Impact.tsx
"use client";

import { AnimatedSection } from "../shared/AnimatedSection";
import { Users, TrendingUp, Award, Globe, Heart, Sprout } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "People Supported", description: "Direct beneficiaries across North Shewa" },
  { icon: TrendingUp, value: "75%", label: "Improved Livelihoods", description: "Of participants report better income" },
  { icon: Award, value: "50+", label: "Communities Reached", description: "Villages and IDP sites served" },
  { icon: Globe, value: "500+", label: "Active Volunteers", description: "Dedicated community members" },
  { icon: Heart, value: "2,000+", label: "Nutrition Support", description: "Mothers and children reached" },
  { icon: Sprout, value: "500+", label: "Farmers Trained", description: "In sustainable agriculture practices" },
];

export function Impact() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Measurable change in the lives of vulnerable communities across North Shewa
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all">
                <stat.icon className="w-10 h-10 mb-4 text-primary-200" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-primary-200 text-sm">{stat.description}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Story Highlight */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Success Story: From Vulnerability to Resilience
                </h3>
                <p className="text-primary-100 mb-4">
                  &ldquo;Before Tsedey&apos;s support, I struggled to feed my family.
                  Through their agriculture training and seed support,
                  I now grow enough to sell at market and send my children to school.&rdquo;
                </p>
                <p className="text-primary-200 font-medium">
                  — Aster M., Program Beneficiary, North Shewa
                </p>
              </div>
              <div className="bg-white/20 rounded-xl h-48 flex items-center justify-center">
                <span className="text-primary-200">📷 Success story photo</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}