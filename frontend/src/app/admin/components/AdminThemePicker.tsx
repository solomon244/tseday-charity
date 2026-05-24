"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Check, ChevronDown, Monitor, Moon, Palette, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { ADMIN_ACCENTS } from "./adminTheme";
import { useAdminPreferences } from "./AdminPreferencesProvider";

const MODES = [
  { id: "light" as const, label: "Light", icon: Sun },
  { id: "dark" as const, label: "Dark", icon: Moon },
  { id: "system" as const, label: "System", icon: Monitor },
];

export function AdminThemePicker({ compact }: { compact?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { accent, setAccent } = useAdminPreferences();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
          compact ? "w-10" : "w-28",
        )}
        aria-hidden
      />
    );
  }

  const activeMode = theme ?? "system";
  const ModeIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800",
          compact ? "h-10 w-10 justify-center px-0" : "h-10 px-3 py-2",
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Theme and appearance settings"
      >
        <ModeIcon className="h-4 w-4 text-[var(--admin-accent)]" />
        {!compact ? (
          <>
            <span>Theme</span>
            <ChevronDown className={cn("h-4 w-4 opacity-60 transition", open && "rotate-180")} />
          </>
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Theme settings"
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <Palette className="h-4 w-4 text-[var(--admin-accent)]" />
              Appearance
            </div>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">Color mode and dashboard accent</p>
          </div>

          <div className="p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Mode
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {MODES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-medium transition",
                    activeMode === id
                      ? "bg-[var(--admin-accent)] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 p-3 dark:border-gray-800">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Accent
            </p>
            <ul className="space-y-1">
              {ADMIN_ACCENTS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setAccent(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                      accent === item.id
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/60",
                    )}
                  >
                    <span
                      className="h-8 w-8 shrink-0 rounded-lg border border-white/20 shadow-inner"
                      style={{ backgroundColor: item.swatch }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
                      <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </span>
                    </span>
                    {accent === item.id ? (
                      <Check className="h-4 w-4 shrink-0 text-[var(--admin-accent)]" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
