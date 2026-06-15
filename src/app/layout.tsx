import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Maimanah Travels — a premium Hajj & Umrah agency offering guided pilgrimage packages, visa services, ticketing and dedicated spiritual care.",
};

/**
 * Root layout is a pass-through. The <html>/<body> tags live in the
 * locale layout (app/[lang]/layout.tsx) so the `lang` attribute reflects the
 * active locale for SEO and the Bangla font switch.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
