"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

type FeedbackVariant = "success" | "error" | "info";

const styles: Record<
  FeedbackVariant,
  {
    icon: typeof CheckCircle2;
    ring: string;
    iconWrap: string;
    iconColor: string;
    title: string;
    body: string;
    panel: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    ring: "ring-green-200/80 dark:ring-green-800/60",
    iconWrap: "bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/50 dark:to-emerald-950/40",
    iconColor: "text-green-600 dark:text-green-400",
    title: "text-green-950 dark:text-green-50",
    body: "text-green-800/90 dark:text-green-200/90",
    panel: "border-green-200/80 bg-green-50/80 dark:border-green-900/50 dark:bg-green-950/30",
  },
  error: {
    icon: AlertCircle,
    ring: "ring-red-200/80 dark:ring-red-900/60",
    iconWrap: "bg-gradient-to-br from-red-100 to-rose-50 dark:from-red-950/50 dark:to-rose-950/40",
    iconColor: "text-red-600 dark:text-red-400",
    title: "text-red-950 dark:text-red-50",
    body: "text-red-800/90 dark:text-red-200/90",
    panel: "border-red-200/80 bg-red-50/80 dark:border-red-900/50 dark:bg-red-950/30",
  },
  info: {
    icon: Info,
    ring: "ring-tsedey-cyan/30 dark:ring-tsedey-cyan/20",
    iconWrap: "bg-gradient-to-br from-tsedey-cyan/15 to-tsedey-blue/10 dark:from-tsedey-cyan/20 dark:to-tsedey-navy/40",
    iconColor: "text-tsedey-blue dark:text-tsedey-cyan",
    title: "text-tsedey-navy dark:text-white",
    body: "text-gray-600 dark:text-gray-300",
    panel: "border-tsedey-cyan/25 bg-tsedey-light/80 dark:border-tsedey-cyan/20 dark:bg-gray-800/50",
  },
};

type FeedbackMessageCardProps = {
  variant: FeedbackVariant;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Compact strip for inline form errors */
  compact?: boolean;
  className?: string;
};

export function FeedbackMessageCard({
  variant,
  title,
  description,
  children,
  compact = false,
  className = "",
}: FeedbackMessageCardProps) {
  const s = styles[variant];
  const Icon = s.icon;

  if (compact) {
    return (
      <div
        role={variant === "error" ? "alert" : "status"}
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${s.panel} ${className}`}
      >
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.iconColor}`} aria-hidden />
        <div className="min-w-0 text-left">
          <p className={`text-sm font-semibold ${s.title}`}>{title}</p>
          {description ? <p className={`mt-0.5 text-sm ${s.body}`}>{description}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role={variant === "error" ? "alert" : "status"}
      className={`text-center ${className}`}
    >
      <div
        className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ring-4 ${s.ring} ${s.iconWrap}`}
      >
        <Icon className={`h-9 w-9 ${s.iconColor}`} strokeWidth={2} aria-hidden />
      </div>
      <h3 className={`font-heading text-2xl font-bold tracking-tight ${s.title}`}>{title}</h3>
      {description ? (
        <p className={`mx-auto mt-2 max-w-sm text-base leading-relaxed ${s.body}`}>{description}</p>
      ) : null}
      {children ? <div className="mt-6 space-y-4">{children}</div> : null}
    </motion.div>
  );
}
