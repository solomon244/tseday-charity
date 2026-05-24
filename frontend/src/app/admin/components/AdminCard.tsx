import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AdminCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function AdminCard({ children, className, padding = "md" }: AdminCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200/80 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900",
        paddingClass[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminPanelHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-lg font-heading font-bold text-tsedey-navy dark:text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
