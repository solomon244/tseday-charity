"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getOptimizedImageSrc } from "@/lib/image";

const imageItems = [
  {
    src: "/gallery/volunteers-planting.jpg",
    title: "Community-led Agriculture",
    description: "Volunteers and farmers collaborate on climate-resilient food production.",
    alt: "Volunteers and local farmers planting crops together in North Shewa",
  },
  {
    src: "/gallery/food-distribution.jpg",
    title: "Emergency Nutrition Support",
    description: "Families receive immediate food support during times of crisis.",
    alt: "Food distribution team delivering emergency nutrition support to families",
  },
  {
    src: "/gallery/photo2.jpg",
    title: "Family-centered Care",
    description: "Mothers and children are supported through integrated community services.",
    alt: "Mother and children participating in a community support program",
  },
];

const videoItems = [
  {
    src: "/gallery/training-session.mp4",
    title: "Women Skills Training",
    description: "Practical training sessions that build confidence and income opportunities.",
    poster: "/gallery/photo3.jpg",
  },
  {
    src: "/gallery/agriculture-demo.mp4",
    title: "Farming Demonstration",
    description: "Hands-on guidance on sustainable farming for long-term food security.",
    poster: "/gallery/hero.jpg",
  },
];

export function GalleryShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="bg-white py-16 dark:bg-gray-900 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-tsedey-navy dark:text-white md:text-4xl">
              Field Stories in Images & Video
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              See how your support reaches Ethiopian communities through food assistance, skills training, and long-term resilience programs.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imageItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={getOptimizedImageSrc(item.src, 900)}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-tsedey-navy dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {videoItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={0.2 + index * 0.1}>
              <article className="overflow-hidden rounded-2xl border border-gray-200 bg-tsedey-light shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="relative">
                  {activeVideo === item.title ? (
                    <video className="h-full w-full" controls preload="metadata" poster={item.poster} autoPlay>
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(item.title)}
                      className="relative block w-full overflow-hidden"
                      aria-label={`Play ${item.title}`}
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={getOptimizedImageSrc(item.poster, 1100)}
                          alt={`${item.title} video thumbnail`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-tsedey-navy">
                          <PlayCircle className="h-4 w-4" />
                          Play Video Story
                        </span>
                      </span>
                    </button>
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Video Story
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-tsedey-navy dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
