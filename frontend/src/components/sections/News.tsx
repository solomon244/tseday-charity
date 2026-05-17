// src/components/sections/News.tsx
"use client";

import { AnimatedSection } from "../shared/AnimatedSection";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { newsArticles } from "@/lib/content";
import { useLang } from "@/components/layout/LangProvider";
import { newsSectionCopy } from "@/lib/siteCopy";

export function News() {
  const { withLang, lang } = useLang();
  const t = newsSectionCopy(lang);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {t.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t.subtitle}
              </p>
            </div>
            <Link
              href={withLang("/news")}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline mt-4 md:mt-0"
            >
              {t.viewAll} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {newsArticles.map((item, index) => (
            <AnimatedSection key={item.slug} delay={index * 0.1}>
              <Link
                href={withLang(`/news/${item.slug}`)}
                className="group block bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center text-6xl">
                  {item.imageEmoji}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </span>
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}