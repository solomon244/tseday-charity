"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type LanguageToggleProps = {
  /** Readable on transparent navbar over dark hero (light system theme) */
  variant?: "default" | "overlay";
};

export function LanguageToggle({ variant = "default" }: LanguageToggleProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("lang") === "am" ? "am" : "en";

  const buildHref = (lang: "en" | "am") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    return `${pathname}?${params.toString()}`;
  };

  const shell =
    variant === "overlay"
      ? "border-white/35 bg-white/10 backdrop-blur-md dark:bg-black/25 dark:border-white/25"
      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900";

  const inactive =
    variant === "overlay"
      ? "text-white/85 hover:text-white hover:bg-white/10"
      : "text-gray-600 dark:text-gray-300";

  return (
    <div className={`inline-flex rounded-full border p-1 text-sm shadow-sm ${shell}`}>
      <Link
        href={buildHref("en")}
        className={`rounded-full px-3 py-1 font-semibold transition-colors ${active === "en" ? "bg-tsedey-navy text-white" : inactive}`}
      >
        EN
      </Link>
      <Link
        href={buildHref("am")}
        className={`rounded-full px-3 py-1 font-semibold transition-colors ${active === "am" ? "bg-tsedey-navy text-white" : inactive}`}
      >
        AM
      </Link>
    </div>
  );
}
