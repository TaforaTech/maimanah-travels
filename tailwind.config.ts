import type { Config } from "tailwindcss";

/**
 * Maimanah Travels — design tokens (Tailwind v3).
 * Mirrors the palette/tokens that previously lived in the `@theme` block of
 * globals.css. Colors are declared as hex so opacity modifiers (bg-white/10)
 * work, while the same values are also exposed as CSS variables in globals.css
 * for the hand-written gradient/pattern classes.
 */
export default {
  content: ["./src/**/*.{ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Green (primary) — the `navy-*` scale carries the green family.
        navy: {
          950: "#06241b",
          900: "#0f4c3a",
          800: "#16624f",
          700: "#1e7a63",
          600: "#2a9178",
          500: "#3da98e",
          100: "#d5e8e1",
          50: "#eef6f2",
        },
        // Gold (accent)
        gold: {
          700: "#c19a2e",
          600: "#b8962e",
          500: "#d4af37",
          400: "#e9c46a",
          300: "#f0d690",
          100: "#faf0d6",
        },
        // WhatsApp brand green
        whatsapp: {
          DEFAULT: "#25d366",
          dark: "#1ebe5d",
        },
        // Neutrals
        cream: {
          50: "#fafaf8",
          100: "#f2f2ed",
        },
        ink: "#1a1a1a",
        muted: "#5b5b57",
        line: "#e6e3db",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", '"Times New Roman"', "serif"],
        bangla: ["var(--font-bangla)", "var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-arabic)", '"Traditional Arabic"', '"Scheherazade New"', "serif"],
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      boxShadow: {
        luxury: "0 18px 50px -12px rgba(15, 76, 58, 0.25)",
        soft: "0 8px 30px -10px rgba(15, 76, 58, 0.15)",
      },
      spacing: {
        section: "5.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
