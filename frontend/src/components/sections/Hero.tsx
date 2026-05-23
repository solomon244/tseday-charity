// src/components/sections/Hero.tsx — split layout: content + image showcase
"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { openDonationModal } from "@/lib/ctaEvents";
import { getOptimizedImageSrc } from "@/lib/image";
import { useLang } from "@/components/layout/LangProvider";
import { getHeroSlides } from "@/lib/heroSlides";
import { heroCopy } from "@/lib/siteCopy";

const AUTOPLAY_MS = 7000;
const SLIDE_TRANSITION_MS = 500;

export function Hero() {
  const { lang, withLang } = useLang();
  const slides = getHeroSlides(lang);
  const t = heroCopy(lang);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slideCount = slides.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    setIndex(0);
  }, [lang]);

  useEffect(() => {
    setIndex((i) => (i >= slideCount ? 0 : i));
  }, [slideCount]);

  useEffect(() => {
    if (paused || slideCount < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, slideCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = slides[index];

  return (
    <section
      className="relative mt-20 w-full overflow-hidden border-b border-gray-200 bg-tsedey-navy dark:border-gray-800"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      <div className="grid min-h-[min(100dvh-5rem,920px)] lg:grid-cols-2">
        {/* —— Content panel (always readable) —— */}
        <div className="relative z-10 flex flex-col justify-between bg-gradient-to-br from-tsedey-navy via-[#0b2f4f] to-[#0a3b43] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-tsedey-orange" aria-hidden />
              {t.badge}
            </motion.div>

            <div className="relative min-h-[10.5rem] sm:min-h-[11.5rem]">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <div
                    key={s.id}
                    className={`transition-opacity ease-out ${
                      active
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-0 opacity-0"
                    }`}
                    style={{ transitionDuration: `${SLIDE_TRANSITION_MS}ms` }}
                    aria-hidden={!active}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-tsedey-cyan sm:text-sm">
                      {s.kicker}
                    </p>
                    <h1 className="font-heading text-[clamp(1.65rem,4.2vw,2.85rem)] font-extrabold leading-[1.12] tracking-tight text-white text-balance">
                      {s.title}
                    </h1>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-300 text-pretty sm:text-lg">
                      {s.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200"
            >
              <span className="font-bold text-tsedey-orange">{t.etbLineBold}</span>
              {t.etbLineSuffix}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button
                type="button"
                onClick={openDonationModal}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-tsedey-red to-tsedey-orange px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-tsedey-red/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.donate}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden />
              </button>
              <Link
                href={withLang("/programs")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-white/35 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {lang === "am" ? "ፕሮግራሞቻችን" : "Our Programs"}
              </Link>
            </motion.div>
          </div>

          {/* Stats + trust */}
          <div className="mt-10 space-y-6">
            <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-6">
              <div>
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">10,000+</p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-400 sm:text-xs">{t.statLives}</p>
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">500+</p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-400 sm:text-xs">{t.statVolunteers}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-bold text-tsedey-cyan sm:text-base">
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
                  {t.trusted}
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-400 sm:text-xs">{t.trustedBy}</p>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="ml-1 hidden text-xs font-medium tabular-nums text-white/60 sm:inline">
                  {String(index + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`${s.kicker}`}
                    onClick={() => goTo(i)}
                    className="group relative flex h-8 w-8 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all ${
                        i === index ? "w-7 bg-tsedey-orange" : "w-1.5 bg-white/40 group-hover:bg-white/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* —— Image panel —— */}
        <div className="relative min-h-[44vh] overflow-hidden bg-[#061525] sm:min-h-[50vh] lg:min-h-full">
          {slides.map((s, i) => {
            const active = i === index;
            if (!active) return null;
            return (
              <div key={s.id} className="absolute inset-0 z-[1]">
                <Image
                  src={getOptimizedImageSrc(s.image, 1920)}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            );
          })}

          {/* Slide label + progress */}
          <div className="absolute bottom-0 left-0 right-0 z-[3] p-4 sm:p-5 lg:p-6">
            <div className="flex items-end justify-between gap-3">
              <p className="max-w-[70%] truncate rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm">
                {slide.kicker}
              </p>
              <span className="shrink-0 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold tabular-nums text-white">
                {index + 1}/{slides.length}
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
              <div
                key={`progress-${index}-${paused}`}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-tsedey-cyan to-tsedey-orange"
                style={
                  paused
                    ? { transform: "scaleX(1)" }
                    : {
                        animation: reduceMotion
                          ? "none"
                          : `hero-slide-progress ${AUTOPLAY_MS}ms linear forwards`,
                      }
                }
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-[4] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white shadow-lg transition hover:bg-black/80 sm:left-4"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-[4] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white shadow-lg transition hover:bg-black/80 sm:right-4"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition hover:text-white/80 lg:left-[25%]"
        aria-label={t.scrollExplore}
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">{t.scrollExplore}</span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-1 w-1 rounded-full bg-white/80"
          />
        </span>
      </button>
    </section>
  );
}
