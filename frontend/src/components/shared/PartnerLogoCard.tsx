import Image from "next/image";
import type { Partner } from "@/lib/content";

export function PartnerLogoCard({ partner, className = "" }: { partner: Partner; className?: string }) {
  return (
    <div
      className={`flex h-[140px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-5 shadow-sm transition hover:border-tsedey-cyan/40 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${className}`}
      title={partner.name}
    >
      {partner.logo ? (
        <div className="relative h-20 w-full max-w-[160px]">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain object-center"
            sizes="160px"
          />
        </div>
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-tsedey-navy to-tsedey-blue text-sm font-bold text-white">
          {partner.abbr}
        </div>
      )}
      <p className="mt-3 line-clamp-2 text-center text-xs font-semibold leading-snug text-gray-700 dark:text-gray-200">
        {partner.name}
      </p>
    </div>
  );
}
