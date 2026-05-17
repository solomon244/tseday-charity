// src/components/sections/ProgramHighlights.tsx
"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { 
  Sprout, Briefcase, Heart, GraduationCap, 
  Home, Droplets, ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/layout/LangProvider";

const programs = [
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    desc: "Families increase harvests through climate-smart farming training, seeds, and community-led support systems.",
    iconClass: "text-tsedey-cyan",
    bgClass: "bg-tsedey-cyan/10 dark:bg-tsedey-cyan/20",
  },
  {
    icon: Briefcase,
    title: "Livelihood Support",
    desc: "Women and youth build stable incomes through vocational training, mentorship, and micro-enterprise opportunities.",
    iconClass: "text-tsedey-blue",
    bgClass: "bg-tsedey-blue/10 dark:bg-tsedey-blue/20",
  },
  {
    icon: Heart,
    title: "Nutrition & Health",
    desc: "Mothers and children receive nutrition assistance, referrals, and preventive care that protects vulnerable lives.",
    iconClass: "text-tsedey-red",
    bgClass: "bg-tsedey-red/10 dark:bg-tsedey-red/20",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    desc: "Students stay in school with essential supplies while youth gain employable skills for long-term self-reliance.",
    iconClass: "text-tsedey-yellow",
    bgClass: "bg-tsedey-yellow/10 dark:bg-tsedey-yellow/20",
  },
  {
    icon: Home,
    title: "IDP Support",
    desc: "Displaced families receive emergency relief, safe shelter pathways, and recovery services to rebuild with dignity.",
    iconClass: "text-tsedey-orange",
    bgClass: "bg-tsedey-orange/10 dark:bg-tsedey-orange/20",
  },
  {
    icon: Droplets,
    title: "WASH",
    desc: "Communities gain cleaner water access, improved sanitation, and hygiene training that reduces preventable disease.",
    iconClass: "text-tsedey-navy dark:text-tsedey-cyan",
    bgClass: "bg-tsedey-navy/10 dark:bg-tsedey-navy/20",
  },
];

export function ProgramHighlights() {
  const { withLang } = useLang();
  const programsHref = withLang("/programs");

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Integrated interventions addressing the root causes of poverty, displacement, and vulnerability.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <Link
                href={programsHref}
                aria-label={`Learn more about ${prog.title}`}
                className="group block h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-tsedey-cyan/30 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${prog.bgClass}`}>
                  <prog.icon className={`h-6 w-6 ${prog.iconClass}`} />
                </div>
                <h3 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white mb-2 group-hover:text-tsedey-blue transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {prog.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tsedey-blue dark:text-tsedey-cyan">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <div className="mt-12 text-center">
            <Link href={programsHref} className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-tsedey-red to-tsedey-orange px-8 py-3.5 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <span>View All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}