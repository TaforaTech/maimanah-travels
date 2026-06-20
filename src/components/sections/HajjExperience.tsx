"use client";

import { useState } from "react";
import Link from "next/link";
import { HajjGlobeGuide } from "./HajjGlobeGuide";
import { HajjRitesMap } from "./HajjRitesMap";
import { Logo } from "@/components/layout/Logo";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";

/**
 * Two-phase, full-screen Hajj experience (no site chrome):
 *  1. a 3D Earth globe — Dhaka → Ihram → flight → arrival in Makkah
 *  2. a 3D satellite map of the holy sites — every rite, step by step
 */
export function HajjExperience({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<"globe" | "map">("globe");
  // `key` forces a fresh globe (back to the intro) when restarting from the map.
  const [run, setRun] = useState(0);

  return (
    <div className="relative">
      {/* Brand logo — the only chrome on this page */}
      <Link
        href={localePath("/", locale)}
        aria-label="Maimanah Travels — home"
        className="fixed left-5 top-5 z-[60] transition-opacity hover:opacity-80"
      >
        <Logo variant="light" className="h-9 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:h-10" />
      </Link>

      {phase === "globe" ? (
        <HajjGlobeGuide key={run} locale={locale} onEnterRites={() => setPhase("map")} />
      ) : (
        <HajjRitesMap
          locale={locale}
          onRestart={() => {
            setRun((r) => r + 1);
            setPhase("globe");
          }}
        />
      )}
    </div>
  );
}
