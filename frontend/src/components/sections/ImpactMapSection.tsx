"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin, Users } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { impactLocations, locationMapUrl, regionEmbedUrl } from "@/lib/impactLocations";
import { cn } from "@/lib/cn";

export function ImpactMapSection() {
  const [activeId, setActiveId] = useState<string>(impactLocations[0]?.id ?? "");
  const active = impactLocations.find((l) => l.id === activeId) ?? impactLocations[0];

  return (
    <section className="border-t border-theme-border bg-theme-muted py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-theme-accent">Where we work</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-theme-heading md:text-4xl">
              Rooted in North Shewa, Amhara Region
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-theme-body">
              From Debre Birhan to surrounding woredas, our teams deliver food security, livelihoods, health, and
              resilience programs alongside local communities.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-border bg-theme-surface px-3 py-1.5 text-xs font-semibold text-theme-heading">
                <MapPin className="h-3.5 w-3.5 text-theme-accent" aria-hidden />
                {impactLocations.length} active areas
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-border bg-theme-surface px-3 py-1.5 text-xs font-semibold text-theme-heading">
                <Users className="h-3.5 w-3.5 text-theme-accent" aria-hidden />
                50+ communities reached
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="sr-only">
            Tap a map pin or location chip to explore where Tseday Charity programs operate in North Shewa.
          </p>

          <div className="overflow-hidden rounded-2xl border border-theme-border bg-theme-surface shadow-soft">
            <div className="relative aspect-[4/3] w-full sm:aspect-[21/9]">
              <iframe
                title="Map of North Shewa and Amhara Region program areas"
                src={regionEmbedUrl()}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-theme-surface/40 via-transparent to-theme-surface/10" />

              {impactLocations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveId(loc.id)}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-full"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  aria-label={`${loc.name} — ${loc.programs.slice(0, 2).join(", ")}`}
                  aria-pressed={activeId === loc.id}
                >
                  <span
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg transition-all",
                      activeId === loc.id
                        ? "scale-110 bg-theme-accent text-white ring-4 ring-theme-accent/25"
                        : "bg-theme-accent/95 text-white group-hover:scale-105",
                    )}
                  >
                    <MapPin className="h-4 w-4" />
                    {activeId === loc.id ? (
                      <span className="absolute -bottom-1 h-2.5 w-2.5 animate-pulse rounded-full bg-theme-accent ring-2 ring-white" />
                    ) : null}
                  </span>
                </button>
              ))}

              {active ? (
                <div className="absolute bottom-3 left-3 right-3 z-20 rounded-xl border border-theme-border/80 bg-theme-surface/95 p-4 shadow-lg backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-sm sm:p-5">
                  <p className="font-heading text-base font-bold text-theme-heading sm:text-lg">{active.name}</p>
                  <p className="mt-0.5 text-xs text-theme-body sm:text-sm">{active.district}, Amhara Region</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {active.programs.map((p) => (
                      <li
                        key={p}
                        className="rounded-full bg-theme-muted px-2.5 py-0.5 text-[11px] font-medium text-theme-heading sm:text-xs"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={locationMapUrl(active)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-theme-accent hover:underline sm:text-sm"
                  >
                    View on map
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="border-t border-theme-border px-4 py-4 sm:px-5">
              <div
                className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Program areas in North Shewa"
              >
                {impactLocations.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    role="tab"
                    aria-selected={activeId === loc.id}
                    onClick={() => setActiveId(loc.id)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                      activeId === loc.id
                        ? "bg-theme-accent text-white shadow-sm"
                        : "border border-theme-border bg-theme-muted text-theme-body hover:border-theme-accent/40 hover:text-theme-heading",
                    )}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-theme-body sm:text-xs">
                Map data ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-theme-accent hover:underline"
                >
                  OpenStreetMap
                </a>{" "}
                contributors
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-theme-accent px-6 py-2.5 text-sm font-bold text-theme-accent transition hover:bg-theme-accent hover:text-white"
            >
              Explore our programs
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
