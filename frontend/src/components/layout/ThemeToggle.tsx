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
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-lg transition-colors ${overlay || solid}`}
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </motion.button>
  );
}