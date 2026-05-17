// src/components/sections/QuickStats.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Users, TrendingUp, Award, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "people received food, education, and healthcare support",
    iconClass: "text-tsedey-blue",
  },
  {
    icon: Heart,
    value: "500+",
    label: "volunteers mobilized across North Shewa communities",
    iconClass: "text-tsedey-red",
  },
  {
    icon: Award,
    value: "50+",
    label: "communities reached with long-term resilience programs",
    iconClass: "text-tsedey-orange",
  },
  {
    icon: TrendingUp,
    value: "75%",
    label: "of supported households reported improved income stability",
    iconClass: "text-tsedey-cyan",
  },
];

export function QuickStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const parseStatValue = (value: string) => {
    const suffix = value.replace(/[0-9.,]/g, "");
    const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    return { numericValue, suffix };
  };

  return (
    <section ref={sectionRef} className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="h-full rounded-2xl bg-tsedey-light p-6 text-center transition-all hover:-translate-y-1 hover:shadow-soft dark:bg-gray-800/50">
                <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.iconClass}`} />
                <div className="text-2xl font-bold text-tsedey-navy dark:text-white md:text-3xl">
                  <CountUp
                    target={parseStatValue(stat.value).numericValue}
                    suffix={parseStatValue(stat.value).suffix}
                    isVisible={isVisible}
                  />
                </div>
                <div className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return <>{value.toLocaleString()}{suffix}</>;
}