"use client";

import { useState } from "react";
import { HajjGlobeGuide } from "./HajjGlobeGuide";
import { HajjRitesMap } from "./HajjRitesMap";
import type { Locale } from "@/content/i18n/config";

/**
 * Two-phase Hajj experience:
 *  1. a 3D Earth globe — Dhaka → Ihram → flight → arrival in Makkah
 *  2. a 3D satellite map of the holy sites — every rite, step by step
 */
export function HajjExperience({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<"globe" | "map">("globe");
  // `key` forces a fresh globe (back to the intro) when restarting from the map.
  const [run, setRun] = useState(0);

  return phase === "globe" ? (
    <HajjGlobeGuide key={run} locale={locale} onEnterRites={() => setPhase("map")} />
  ) : (
    <HajjRitesMap
      locale={locale}
      onRestart={() => {
        setRun((r) => r + 1);
        setPhase("globe");
      }}
    />
  );
}
