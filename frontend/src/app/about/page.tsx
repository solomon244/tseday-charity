// src/app/about/page.tsx
"use client";

import { Eye, Target, Award, Users, Lightbulb, Rocket, Shield, Heart, Building2, MapPin, FileCheck } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { openDonationModal, openVolunteerModal } from "@/lib/ctaEvents";
import { ABOUT_BACKGROUND, ORGANIZATION, MISSION, VISION, ORGANIZATIONAL_GOAL, OBJECTIVES } from "@/lib/constants";

const focusAreas = [
  "Emergency relief",
  "Livelihood support",
  "Skills training",
  "Health & psychosocial services",
  "Agriculture initiatives",
  "Peacebuilding",
  "Employment facilitation",
];

const values = [
  { icon: Heart, title: "Humanity First", desc: "We prioritize human dignity, compassion, and the well-being of all people.", iconClass: "text-tsedey-red", bgClass: "bg-tsedey-red/10 dark:bg-tsedey-red/20" },
  { icon: Shield, title: "Integrity & Accountability", desc: "We act with honesty, uphold ethical standards, and take responsibility for our actions and results.", iconClass: "text-tsedey-navy dark:text-tsedey-cyan", bgClass: "bg-tsedey-navy/10 dark:bg-tsedey-navy/20" },
  { icon: Eye, title: "Transparency", desc: "We operate openly and share information responsibly with stakeholders.", iconClass: "text-tsedey-cyan", bgClass: "bg-tsedey-cyan/10 dark:bg-tsedey-cyan/20" },
  { icon: Users, title: "Collaboration", desc: "We work together with communities, partners, and institutions to achieve sustainable impact.", iconClass: "text-tsedey-blue", bgClass: "bg-tsedey-blue/10 dark:bg-tsedey-blue/20" },
  { icon: Lightbulb, title: "Innovation & Learning", desc: "We promote creative solutions and use research and evidence to continuously improve our work.", iconClass: "text-tsedey-yellow", bgClass: "bg-tsedey-yellow/10 dark:bg-tsedey-yellow/20" },
  { icon: Rocket, title: "Empowerment", desc: "We support women and youth to become self-reliant and agents of change.", iconClass: "text-tsedey-orange", bgClass: "bg-tsedey-orange/10 dark:bg-tsedey-orange/20" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-tsedey-light dark:bg-gray-950 pt-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tsedey-navy via-[#0b2f4f] to-[#0a3b43] py-20 text-white">
        <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About {ORGANIZATION.name}</h1>
            <p className="text-xl text-tsedey-cyan max-w-3xl mx-auto">
              A registered non-profit humanitarian organization serving vulnerable communities across North Shewa and the Amhara Region.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      {/* Background */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <AnimatedSection>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tsedey-navy/10 dark:bg-tsedey-cyan/20">
                    <Building2 className="h-6 w-6 text-tsedey-navy dark:text-tsedey-cyan" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white">Our Background</h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{ABOUT_BACKGROUND}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-tsedey-cyan/20 bg-gradient-to-br from-tsedey-navy to-tsedey-blue p-6 text-white shadow-lg">
                  <h3 className="mb-4 font-heading text-lg font-bold">At a Glance</h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-tsedey-cyan" aria-hidden />
                      <span>
                        <span className="font-semibold text-tsedey-cyan">Headquarters</span>
                        <br />
                        {ORGANIZATION.headquarters}
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-tsedey-cyan" aria-hidden />
                      <span>
                        <span className="font-semibold text-tsedey-cyan">Registered</span>
                        <br />
                        {ORGANIZATION.registeredDate}
                        <br />
                        <span className="text-white/80">{ORGANIZATION.registrationAuthority}</span>
                        <br />
                        <span className="text-white/80">{ORGANIZATION.registrationProclamation}</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-4 font-heading text-lg font-bold text-tsedey-navy dark:text-white">What We Do</h3>
                  <ul className="space-y-2">
                    {focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-tsedey-orange"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-soft border-l-4 border-tsedey-blue h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-8 h-8 text-tsedey-blue" />
                  <h2 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white">Vision</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{VISION}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-soft border-l-4 border-tsedey-orange h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-tsedey-orange" />
                  <h2 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white">Mission</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{MISSION}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Organizational Goal & Objectives */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">Our Goal & Objectives</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-tsedey-light dark:bg-gray-800 p-8 rounded-2xl border border-tsedey-cyan/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-tsedey-cyan" />
                  <h3 className="text-xl font-heading font-bold text-tsedey-navy dark:text-white">Organizational Goal</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{ORGANIZATIONAL_GOAL}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-tsedey-light dark:bg-gray-800 p-8 rounded-2xl border border-tsedey-orange/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-tsedey-orange" />
                  <h3 className="text-xl font-heading font-bold text-tsedey-navy dark:text-white">Key Objective</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{OBJECTIVES[0]}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">The principles that guide every decision, program, and partnership.</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${val.bgClass}`}>
                    <val.icon className={`h-6 w-6 ${val.iconClass}`} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{val.desc}</p>
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
            <h2 className="text-3xl font-heading font-bold mb-4">Join Us in Making a Difference</h2>
            <p className="text-tsedey-cyan mb-8 text-lg">Together, we can build resilient communities in North Shewa.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" onClick={openDonationModal} className="bg-white text-tsedey-navy px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Donate Now
              </button>
              <button type="button" onClick={openVolunteerModal} className="bg-tsedey-orange text-white px-8 py-4 rounded-2xl font-bold hover:bg-tsedey-yellow transition-colors shadow-lg">
                Become a Volunteer
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}