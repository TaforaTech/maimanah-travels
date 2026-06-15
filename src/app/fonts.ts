import { Inter, Cormorant_Garamond, Noto_Sans_Bengali } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const bangla = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
  display: "swap",
});

export const fontVars = `${inter.variable} ${display.variable} ${bangla.variable}`;
