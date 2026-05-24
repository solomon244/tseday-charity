// src/components/layout/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  /** Use on dark hero / transparent navbar so the control stays visible in light theme */
  variant?: "default" | "overlay";
};

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const overlay =
    variant === "overlay"
      ? "border border-white/25 bg-white/15 text-white hover:bg-white/25 shadow-sm backdrop-blur-sm"
      : "";

  const solid =
    variant === "default"
      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      : "";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`rounded-lg p-2 transition-colors ${overlay || solid}`}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </motion.button>
  );
}
