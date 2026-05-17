"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { withLang } = useLang();

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-200 bg-white/90 py-3 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                {isLast || !item.href ? (
                  <span className="font-medium text-tsedey-navy dark:text-white">{item.label}</span>
                ) : (
                  <Link href={withLang(item.href)} className="transition-colors hover:text-tsedey-blue dark:hover:text-tsedey-cyan">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
