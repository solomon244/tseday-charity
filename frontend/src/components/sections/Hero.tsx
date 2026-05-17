// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { openDonationModal } from "@/lib/ctaEvents";
import { getOptimizedImageSrc } from "@/lib/image";
import { useLang } from "@/components/layout/LangProvider";
import { ORGANIZATION } from "@/lib/constants";
import { heroCopy } from "@/lib/siteCopy";

export function Hero() {
  const { lang, withLang } = useLang();
  const t = heroCopy(lang);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-x-clip bg-gradient-to-br from-tsedey-navy via-[#0b2f4f] to-[#0a3b43] pb-16 pt-[5.5rem] sm:pb-12 sm:pt-24">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-tsedey-orange/20 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-20 right-20 h-72 w-72 rounded-full bg-tsedey-cyan/20 blur-3xl opacity-40" />

      <div className="z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 flex-col items-center space-y-6 text-center sm:space-y-8 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-left shadow-sm backdrop-blur-sm sm:px-4"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-tsedey-orange" aria-hidden />
              <span className="text-xs font-semibold leading-snug text-white sm:text-sm">{t.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-3xl font-heading text-[clamp(1.5rem,4.6vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08] xl:text-6xl"
            >
              {t.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-2xl text-base leading-relaxed text-gray-200 text-pretty sm:text-lg lg:text-xl"
            >
              {t.sub}
            </motion.p>

            {/* Mission-aligned focal points (matches vision/mission pillars; avoids repeating logo tagline) */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex w-full max-w-xl flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Program focus areas"
            >
              {lang === "am"
                ? [
                    { key: "hum", label: "ሰብዓዊ እርዳታ" },
                    { key: "liv", label: "የምግብ ዋስትና እና ክህሎት" },
                    { key: "nut", label: "ምግብ እና ጥንካሬ" },
                  ].map(({ key, label }) => (
                    <li
                      key={key}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 sm:text-xs"
                    >
                      {label}
                    </li>
                  ))
                : ["Emergency relief", "Livelihoods & skills", "Nutrition & resilience"].map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/85 sm:text-xs"
                    >
                      {label}
                    </li>
                  ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 sm:px-5 lg:justify-start"
            >
              <Heart className="h-5 w-5 shrink-0 animate-pulse text-tsedey-orange" aria-hidden />
              <p className="text-left text-sm font-medium text-white sm:text-base">
                <span className="font-bold text-tsedey-red">{t.etbLineBold}</span>
                {t.etbLineSuffix}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={openDonationModal}
                className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-tsedey-red to-tsedey-orange px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-tsedey-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-tsedey-red/30 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                <span className="text-center">{t.donate}</span>
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </button>

              <Link
                href={withLang("/#donation-impact")}
                className="group flex w-full items-center justify-center rounded-2xl border-2 border-white/35 bg-white/10 px-6 py-4 text-center text-base font-bold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/20 sm:w-auto sm:px-8 sm:py-5 sm:text-lg"
              >
                <span className="leading-snug">{t.seeYourImpact}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full max-w-xl pt-2 sm:pt-6"
            >
              <div className="grid grid-cols-3 gap-2 border-b border-white/20 pb-6 sm:gap-4">
                <div className="min-w-0 text-center lg:text-left">
                  <div className="text-lg font-bold tabular-nums text-white sm:text-xl md:text-2xl">10,000+</div>
                  <div className="mt-1 text-[10px] leading-tight text-gray-300 sm:text-xs">{t.statLives}</div>
                </div>
                <div className="min-w-0 text-center lg:text-left">
                  <div className="text-lg font-bold tabular-nums text-white sm:text-xl md:text-2xl">500+</div>
                  <div className="mt-1 text-[10px] leading-tight text-gray-300 sm:text-xs">{t.statVolunteers}</div>
                </div>
                <div className="min-w-0 text-center lg:text-left">
                  <div className="flex items-center justify-center gap-1 text-tsedey-cyan lg:justify-start">
                    <ShieldCheck className="h-4 w-5 shrink-0" aria-hidden />
                    <span className="text-[10px] font-bold uppercase leading-tight tracking-wide sm:text-xs">{t.trusted}</span>
                  </div>
                  <div className="mt-1 text-[10px] leading-tight text-gray-300 sm:text-xs">{t.trustedBy}</div>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-gray-300 sm:text-xs">{t.trustFootnote}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full min-w-0 max-w-md lg:order-last lg:mx-0 lg:max-w-lg lg:-ml-6 xl:max-w-xl xl:-ml-10 xl:pl-6"
          >
            {/* Ambient glow — Tsedey cyan / orange */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-tsedey-cyan/30 via-transparent to-tsedey-orange/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-[110%] max-w-none -translate-x-1/2 rounded-full bg-tsedey-orange/12 blur-3xl lg:w-[130%]"
            />

            <div className="relative">
              {/* Offset color slabs for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-3 hidden h-[72%] w-[78%] rounded-[2rem] bg-gradient-to-br from-tsedey-orange/40 via-tsedey-red/15 to-transparent lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-3 top-14 hidden h-[58%] w-[42%] rounded-[1.75rem] bg-gradient-to-b from-tsedey-cyan/35 to-tsedey-blue/5 lg:block"
              />

              {/* Gradient frame (brand ring) */}
              <div className="relative rounded-[2rem] bg-gradient-to-br from-tsedey-cyan via-white/35 to-tsedey-orange p-[3px] shadow-[0_28px_70px_-18px_rgba(15,43,76,0.72)]">
                <div className="relative overflow-hidden rounded-[1.875rem] bg-tsedey-navy ring-1 ring-white/15">
                  {/* Photo + graded blends */}
                  <div className="group/image relative aspect-[4/5] lg:aspect-[5/6] xl:aspect-square">
                    <Image
                      src={getOptimizedImageSrc("/gallery/photo2.jpg", 1200)}
                      alt="Ethiopian mother and children receiving community support in North Shewa"
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover/image:scale-[1.04] saturate-[1.08]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      priority
                    />

                    {/* Tie image into hero navy + multiply depth */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-tsedey-navy/80 via-tsedey-blue/40 to-transparent mix-blend-multiply"
                    />
                    {/* Warm / cool lift */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-tl from-tsedey-orange/20 via-transparent to-tsedey-cyan/15 mix-blend-soft-light"
                    />
                    {/* Bottom vignette for subject separation */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-tsedey-navy/95 via-tsedey-navy/25 to-transparent opacity-[0.92]"
                    />
                    {/* Cyan rim light */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_95%_8%,rgba(59,163,212,0.5)_0%,transparent_52%)] opacity-90 mix-blend-screen"
                    />
                    {/* Soft inner edge fade (mask-like) */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-[1.875rem] shadow-[inset_0_0_60px_rgba(15,43,76,0.35)]"
                    />
                  </div>

                  {/* Location chip */}
                  <div className="pointer-events-none absolute left-4 top-4 z-20 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/25 bg-tsedey-navy/55 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:left-5 sm:top-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tsedey-cyan/90 to-tsedey-blue">
                      <MapPin className="h-3.5 w-3.5 text-white" aria-hidden />
                    </span>
                    <span className="truncate leading-tight">{ORGANIZATION.location}</span>
                  </div>

                  {/* Impact glass card */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-3 left-4 right-4 z-20 sm:-bottom-5 sm:left-6 sm:right-auto sm:max-w-[240px]"
                  >
                    <div className="overflow-hidden rounded-2xl border border-tsedey-cyan/35 bg-white/[0.94] shadow-[0_18px_40px_-12px_rgba(15,43,76,0.45)] backdrop-blur-xl ring-1 ring-white/60">
                      <div className="h-1 w-full bg-gradient-to-r from-tsedey-red via-tsedey-orange to-tsedey-cyan" aria-hidden />
                      <div className="p-4">
                        <div className="mb-3 flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-tsedey-red/15 via-tsedey-orange/10 to-tsedey-cyan/15 ring-1 ring-tsedey-orange/25">
                            <Heart className="h-5 w-5 text-tsedey-red" aria-hidden />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-tsedey-blue">{t.totalRaised}</p>
                            <p className="font-heading text-xl font-bold tracking-tight text-tsedey-navy">2.3M ETB</p>
                          </div>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-tsedey-light">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-tsedey-cyan via-tsedey-blue to-tsedey-navy transition-[width] duration-500"
                            style={{ width: "72%" }}
                          />
                        </div>
                        <p className="mt-2 text-[10px] leading-snug text-gray-500">{t.impactCardCaption}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center space-y-2 transition-opacity hover:opacity-70"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-xs font-medium uppercase tracking-widest text-gray-300">{t.scrollExplore}</span>
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </div>
      </motion.button>
    </section>
  );
}