// src/components/sections/GetInvolved.tsx
"use client";

import { AnimatedSection } from "../shared/AnimatedSection";
import { Heart, HandHelping, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { openDonationModal, openVolunteerModal } from "@/lib/ctaEvents";
import { useLang } from "@/components/layout/LangProvider";
import { getInvolvedCopy } from "@/lib/siteCopy";

const blocks = [
  { id: "donate" as const, icon: Heart, accent: "red" as const },
  { id: "volunteer" as const, icon: HandHelping, accent: "blue" as const },
  { id: "partner" as const, icon: Share2, accent: "cyan" as const },
];

export function GetInvolved() {
  const { withLang, lang } = useLang();
  const copy = getInvolvedCopy(lang);
  const contactHref = withLang("/contact");

  return (
    <section id="get-involved" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-tsedey-navy dark:text-white mb-4">
              {copy.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {copy.subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {blocks.map((block, i) => {
            const item = copy.actions[i];
            const iconBg =
              block.accent === "red"
                ? "bg-tsedey-red/10 dark:bg-tsedey-red/20"
                : block.accent === "cyan"
                  ? "bg-tsedey-cyan/10 dark:bg-tsedey-cyan/20"
                  : "bg-tsedey-blue/10 dark:bg-tsedey-blue/20";
            const iconColor =
              block.accent === "red"
                ? "text-tsedey-red dark:text-tsedey-orange"
                : block.accent === "cyan"
                  ? "text-tsedey-cyan"
                  : "text-tsedey-blue dark:text-tsedey-cyan";

            return (
              <AnimatedSection key={block.id} delay={i * 0.1}>
                <div className="group flex h-full flex-col rounded-xl border border-gray-100 bg-tsedey-light p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-soft dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <div
                    className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${iconBg}`}
                  >
                    <block.icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-tsedey-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                    {item.desc}
                  </p>
                  <Link
                    href={contactHref}
                    onClick={(e) => {
                      if (block.id === "donate") {
                        e.preventDefault();
                        openDonationModal();
                      } else if (block.id === "volunteer") {
                        e.preventDefault();
                        openVolunteerModal();
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-tsedey-blue hover:underline dark:text-tsedey-cyan"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-16 bg-gradient-to-r from-tsedey-navy to-tsedey-blue rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-heading font-bold mb-3">{copy.bannerTitle}</h3>
            <p className="text-tsedey-cyan mb-6 max-w-xl mx-auto text-sm">
              {copy.bannerSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" onClick={openDonationModal} className="bg-white text-tsedey-navy px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                {copy.bannerDonate}
              </button>
              <button type="button" onClick={openVolunteerModal} className="bg-tsedey-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-tsedey-yellow transition-colors">
                {copy.bannerVolunteer}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
