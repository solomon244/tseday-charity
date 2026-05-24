// Our Partners — PETCO-style logo slider (6 major partners)
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PartnerLogoCard } from "@/components/shared/PartnerLogoCard";
import { useLang } from "@/components/layout/LangProvider";
import { partners } from "@/lib/content";
import { partnersSectionCopy } from "@/lib/siteCopy";

const AUTOPLAY_MS = 5000;

function useItemsPerView() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setCount(4);
      else if (window.matchMedia("(min-width: 768px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function PartnersSection() {
  const { lang, withLang } = useLang();
  const copy = partnersSectionCopy(lang);
  const perView = useItemsPerView();
  const maxStart = Math.max(0, partners.length - perView);
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      setStart((s) => {
        if (dir === 1) return s >= maxStart ? 0 : s + 1;
        return s <= 0 ? maxStart : s - 1;
      });
    },
    [maxStart],
  );

  useEffect(() => {
    if (paused || maxStart === 0) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go, maxStart]);

  useEffect(() => {
    setStart((s) => Math.min(s, maxStart));
  }, [maxStart]);

  const visible = partners.slice(start, start + perView);

  return (
    <section className="border-y border-theme-border bg-theme-surface py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-tsedey-navy dark:text-white md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
              {copy.subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* PETCO-style logo slider */}
        <div
          className="relative mt-10 md:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute -left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-tsedey-navy shadow-md transition hover:bg-tsedey-light dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:-left-4"
            aria-label="Previous partners"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute -right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-tsedey-navy shadow-md transition hover:bg-tsedey-light dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:-right-4"
            aria-label="Next partners"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="overflow-hidden px-8 sm:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${start}-${perView}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="grid gap-4"
                style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
              >
                {visible.map((p) => (
                  <PartnerLogoCard key={p.id} partner={p} className="h-[150px]" hoverReveal />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Partner slides">
            {Array.from({ length: maxStart + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === start}
                onClick={() => setStart(i)}
                className={`h-2 rounded-full transition-all ${
                  i === start ? "w-8 bg-tsedey-orange" : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600"
                }`}
                aria-label={`Show partners ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.15}>
          <div className="mt-10 text-center">
            <Link
              href={withLang("/partners")}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-tsedey-navy px-6 py-2.5 text-sm font-bold text-tsedey-navy transition hover:bg-tsedey-navy hover:text-white dark:border-tsedey-cyan dark:text-tsedey-cyan dark:hover:bg-tsedey-cyan dark:hover:text-tsedey-navy"
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
