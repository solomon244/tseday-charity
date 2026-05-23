// src/app/programs/page.tsx
"use client";

import Link from "next/link";
import {
  Sprout,
  Briefcase,
  Heart,
  GraduationCap,
  Home,
  Droplets,
  ShieldCheck,
  Handshake,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { openDonationModal } from "@/lib/ctaEvents";
import { useLang } from "@/components/layout/LangProvider";

const programs = [
  { id: "agriculture", slug: "sustainable-agriculture", icon: Sprout, title: "Sustainable Agriculture", desc: "Enhancing food security through sustainable farming practices, agricultural training, and access to quality inputs for smallholder farmers.", impact: "500+ farmers trained", iconClass: "text-tsedey-cyan", bgClass: "bg-tsedey-cyan/10 dark:bg-tsedey-cyan/20" },
  { id: "livelihoods", slug: "livelihood-support", icon: Briefcase, title: "Livelihood Support", desc: "Creating economic opportunities through skills development, enterprise creation, vocational training, and employment support for youth and women.", impact: "300+ livelihoods improved", iconClass: "text-tsedey-blue", bgClass: "bg-tsedey-blue/10 dark:bg-tsedey-blue/20" },
  { id: "nutrition", icon: Heart, title: "Nutrition & Health", desc: "Improving nutrition outcomes and access to essential health services for mothers, children, and vulnerable populations through education and support.", impact: "2,000+ beneficiaries reached", iconClass: "text-tsedey-red", bgClass: "bg-tsedey-red/10 dark:bg-tsedey-red/20" },
  { id: "education", icon: GraduationCap, title: "Education & Skills Training", desc: "Providing educational support, literacy programs, and vocational skills training to empower women and youth for sustainable livelihoods.", impact: "800+ students supported", iconClass: "text-tsedey-yellow", bgClass: "bg-tsedey-yellow/10 dark:bg-tsedey-yellow/20" },
  { id: "idp", icon: Home, title: "IDP Support Services", desc: "Delivering integrated humanitarian assistance including shelter, WASH, protection, and livelihood support to internally displaced persons.", impact: "5,000+ IDPs assisted", iconClass: "text-tsedey-orange", bgClass: "bg-tsedey-orange/10 dark:bg-tsedey-orange/20" },
  { id: "wash", icon: Droplets, title: "Water, Sanitation & Hygiene", desc: "Ensuring access to clean water, improved sanitation facilities, and hygiene promotion to prevent disease and improve community health.", impact: "20+ water points established", iconClass: "text-tsedey-navy dark:text-tsedey-cyan", bgClass: "bg-tsedey-navy/10 dark:bg-tsedey-navy/20" },
  {
    id: "gender-protection",
    slug: "gender-protection",
    icon: ShieldCheck,
    title: "Gender Protection",
    desc: "Promoting the safety, dignity, and rights of women, girls, and vulnerable groups through prevention, response, and referral to protection services.",
    impact: "1,200+ people reached with protection messaging",
    iconClass: "text-tsedey-red",
    bgClass: "bg-tsedey-red/10 dark:bg-tsedey-red/20",
  },
  {
    id: "peace-building",
    slug: "peace-building",
    icon: Handshake,
    title: "Peace Building",
    desc: "Strengthening social cohesion through community dialogue, conflict sensitivity training, and reconciliation activities in displacement-affected areas.",
    impact: "40+ community peace dialogues facilitated",
    iconClass: "text-tsedey-blue",
    bgClass: "bg-tsedey-blue/10 dark:bg-tsedey-blue/20",
  },
];

const approach = [
  { icon: Users, title: "Community-Led", desc: "We work with communities to identify needs and co-create solutions that are culturally appropriate and sustainable." },
  { icon: TrendingUp, title: "Evidence-Based", desc: "Our programs are informed by research, data, and continuous monitoring to ensure maximum impact and accountability." },
  { icon: Briefcase, title: "Integrated Approach", desc: "We address multiple dimensions of vulnerability simultaneously for holistic and lasting change." },
];

export default function ProgramsPage() {
  const { withLang } = useLang();

  return (
    <main className="min-h-screen bg-tsedey-light dark:bg-gray-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tsedey-navy via-[#0b2f4f] to-[#0a3b43] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="mb-4 text-4xl font-heading font-bold text-white md:text-5xl">Our Programs</h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-200">
              Integrated interventions addressing the root causes of poverty, displacement, and vulnerability in North Shewa.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Programs" }]} />

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <article id={prog.id} className="group h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${prog.bgClass}`}>
                    <prog.icon className={`h-7 w-7 ${prog.iconClass}`} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-tsedey-navy dark:text-white mb-3 group-hover:text-tsedey-blue transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                    {prog.desc}
                  </p>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center text-tsedey-cyan font-medium">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {prog.impact}
                    </div>
                    {prog.slug && (
                      <Link href={withLang(`/programs/${prog.slug}`)} className="font-semibold text-tsedey-blue hover:underline">
                        View details
                      </Link>
                    )}
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">Our Approach</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">How we deliver sustainable, community-centered impact</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {approach.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-gray-100 bg-tsedey-light p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <item.icon className="w-12 h-12 text-tsedey-navy dark:text-tsedey-cyan mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-tsedey-navy to-tsedey-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-heading font-bold mb-4">Support Our Programs</h2>
            <p className="text-tsedey-cyan mb-8 text-lg">Your contribution helps us expand our reach and deepen our impact in North Shewa.</p>
            <button type="button" onClick={openDonationModal} className="inline-flex items-center space-x-2 bg-white text-tsedey-navy px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
              <span>Make a Donation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}