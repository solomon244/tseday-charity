"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useSearchParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { getLang, withLang as mergeLang } from "@/lib/i18n";

export type LangContextValue = {
  lang: Lang;
  isAm: boolean;
  withLang: (href: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const lang = useMemo(
    () => getLang(searchParams.get("lang") ?? undefined),
    [searchParams],
  );

  const withLangCb = useCallback((href: string) => mergeLang(href, lang), [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      isAm: lang === "am",
      withLang: withLangCb,
    }),
    [lang, withLangCb],
  );

  useEffect(() => {
    document.documentElement.lang = lang === "am" ? "am" : "en";
    document.documentElement.classList.toggle("lang-am", lang === "am");
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    return {
      lang: "en",
      isAm: false,
      withLang: (href: string) => mergeLang(href, "en"),
    };
  }
  return ctx;
}
