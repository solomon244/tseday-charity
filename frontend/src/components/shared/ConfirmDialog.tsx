"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, X } from "lucide-react";

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  /** Highlighted name or detail (e.g. article title) */
  highlight?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  highlight,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, loading, onOpenChange]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => !loading && onOpenChange(false)}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-900 dark:ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-red-100 bg-gradient-to-r from-red-50 via-orange-50/80 to-white px-6 py-5 dark:border-red-950/50 dark:from-red-950/40 dark:via-gray-900 dark:to-gray-900">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 ring-4 ring-red-100/80 dark:bg-red-950/60 dark:ring-red-900/40">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h2 id={titleId} className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  <p id={descId} className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onOpenChange(false)}
                  className="shrink-0 rounded-lg p-1.5 text-gray-500 transition hover:bg-black/5 hover:text-gray-800 disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {highlight ? (
              <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Item</p>
                <p className="mt-1 truncate font-medium text-tsedey-navy dark:text-white">{highlight}</p>
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-2 px-6 py-5 sm:flex-row sm:justify-end sm:gap-3">
              <button
                ref={cancelRef}
                type="button"
                disabled={loading}
                onClick={() => onOpenChange(false)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => void onConfirm()}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 disabled:opacity-60 dark:bg-red-600 dark:hover:bg-red-500"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Deleting...
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
