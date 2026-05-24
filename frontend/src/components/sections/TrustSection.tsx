"use client";

import Image from "next/image";
import { Quote, ShieldCheck, BadgeCheck } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { testimonials } from "@/lib/testimonials";

export function TrustSection() {
  return (
    <section className="bg-theme-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-theme-heading md:text-4xl">
              Voices from Our Communities
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-theme-body">
              Beneficiaries and neighbors share how integrated support has changed daily life in North Shewa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={0.15 + index * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-theme-border bg-theme-surface shadow-soft transition hover:shadow-md">
                <div className="relative h-44 w-full sm:h-48">
                  <Image
                    src={testimonial.photo}
                    alt={`${testimonial.name}, ${testimonial.role} in ${testimonial.location}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/20 to-transparent" />
                  <Quote className="absolute right-4 top-4 h-8 w-8 text-theme-accent/40" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="flex-1 leading-relaxed text-theme-body">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-theme-border pt-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-theme-accent/30">
                      <Image
                        src={testimonial.photo}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-theme-heading">{testimonial.name}</p>
                      <p className="text-xs font-medium text-theme-accent">{testimonial.role}</p>
                      <p className="text-xs text-theme-body">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-theme-accent/25 bg-theme-accent/10 px-6 py-4 text-sm font-semibold text-theme-heading">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-theme-accent" />
              Registered Charity in Ethiopia
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-theme-accent" />
              Community-Verified Impact
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
