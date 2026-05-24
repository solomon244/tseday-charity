// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-extracted palette
        tsedey: {
          navy: "#0f2b4c",     // Deep blue (primary)
          blue: "#1e56a0",     // Medium blue
          cyan: "#3ba3d4",     // Light blue
          red: "#e03c31",      // Red accent
          orange: "#B8600A",   // Accessible orange accent
          yellow: "#fbb03b",   // Yellow accent
          brown: "#5c3a21",    // Brown/dark accent
          light: "#f0f7fc",    // Background tint
          surface: "#ffffff",  // Card background
        },
        primary: {
          DEFAULT: "#0f2b4c",
          foreground: "#ffffff",
          50: "#e6f0fa",
          100: "#cce1f5",
          200: "#99c3eb",
          300: "#66a5e1",
          400: "#3387d7",
          500: "#1e56a0",
          600: "#0f2b4c",
          700: "#0a1d33",
          800: "#050f1a",
          900: "#02080d",
        },
        accent: {
          DEFAULT: "#B8600A",
          foreground: "#ffffff",
          red: "#e03c31",
          yellow: "#fbb03b",
          cyan: "#3ba3d4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-hero": "radial-gradient(circle at 70% 30%, #f0f7fc 0%, #e6f0fa 40%, #d4e4f7 100%)",
        "radial-card": "radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(15, 43, 76, 0.08)",
        glow: "0 0 30px rgba(59, 163, 212, 0.15)",
      },
      backgroundColor: {
        "theme-page": "var(--theme-page-bg)",
        "theme-surface": "var(--theme-surface)",
        "theme-muted": "var(--theme-muted)",
      },
      textColor: {
        "theme-heading": "var(--theme-heading)",
        "theme-body": "var(--theme-body)",
        "theme-accent": "var(--theme-accent)",
      },
      borderColor: {
        "theme-border": "var(--theme-border)",
        "theme-accent": "var(--theme-accent)",
      },
      fill: {
        "theme-page": "var(--theme-page-bg)",
        "theme-surface": "var(--theme-surface)",
        "theme-muted": "var(--theme-muted)",
      },
    },
  },
  plugins: [],
};

export default config;