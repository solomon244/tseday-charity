import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Partner } from "@/lib/content";
import { cn } from "@/lib/cn";

type PartnerLogoCardProps = {
  partner: Partner;
  className?: string;
  /** Carousel mode: hide name until hover overlay */
  hoverReveal?: boolean;
};

function partnerHref(partner: Partner): string {
  if (partner.url) return partner.url;
  return `/partners#${partner.id}`;
}

export function PartnerLogoCard({ partner, className = "", hoverReveal = false }: PartnerLogoCardProps) {
  const href = partnerHref(partner);
  const external = Boolean(partner.url?.startsWith("http"));

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex h-[140px] flex-col items-center justify-center overflow-hidden rounded-xl border border-theme-border bg-theme-surface px-4 py-5 shadow-sm transition hover:border-theme-accent/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        className,
      )}
      aria-label={`${partner.name} — ${partner.type}`}
    >
      {partner.logo ? (
        <div className="relative z-[1] h-20 w-full max-w-[160px] transition group-hover:scale-105 group-hover:opacity-90">
          <Image
            src={partner.logo}
            alt=""
            fill
            className="object-contain object-center"
            sizes="160px"
          />
        </div>
      ) : (
        <div className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-theme-heading to-theme-accent text-sm font-bold text-white transition group-hover:scale-105">
          {partner.abbr}
        </div>
      )}

      {!hoverReveal ? (
        <p className="relative z-[1] mt-3 line-clamp-2 text-center text-xs font-semibold leading-snug text-theme-body">
          {partner.name}
        </p>
      ) : null}

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-theme-heading/90 px-4 text-center text-white transition",
          hoverReveal
            ? "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      >
        <p className="text-sm font-bold leading-snug">{partner.name}</p>
        <p className="text-xs text-white/80">{partner.type}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          {external ? "Visit website" : "View profile"}
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
