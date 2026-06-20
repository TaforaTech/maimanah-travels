"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as MlMap } from "maplibre-gl";
import { Icon } from "@/components/ui/Icon";
import {
  mapStages,
  mapComplete,
  MAP_MARKERS,
  MAP_TILE_URL,
  MAP_ATTRIBUTION,
  type MapDua,
} from "@/content/data/hajj-journey";
import type { Locale } from "@/content/i18n/config";

const BN = "০১২৩৪৫৬৭৮৯";
const dig = (n: number, l: Locale) =>
  l === "bn" ? String(n).replace(/[0-9]/g, (d) => BN[+d]) : String(n);

function DuaBox({ dua, locale }: { dua: MapDua; locale: Locale }) {
  return (
    <div className="rounded-xl border border-gold-500/25 bg-black/30 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">{dua.title[locale]}</div>
      <p dir="rtl" lang="ar" className="font-arabic mt-2 text-right text-xl leading-loose text-cream-50">
        {dua.arabic}
      </p>
      <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-navy-100">
        {dua.translation[locale]}
      </p>
      <p className="mt-2 text-xs text-gold-300/80">{dua.source[locale]}</p>
    </div>
  );
}

export function HajjRitesMap({ locale, onRestart }: { locale: Locale; onRestart: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const orbitRaf = useRef<number>(0);
  const bearingRef = useRef(-17);
  const readyRef = useRef(false);
  const pick = useCallback((en: string, bn: string) => (locale === "bn" ? bn : en), [locale]);

  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const total = mapStages.length;
  const stage = mapStages[index];

  // init the map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (disposed || !container) return;

      const map = new maplibregl.Map({
        container,
        style: {
          version: 8,
          sources: {
            sat: {
              type: "raster",
              tiles: [MAP_TILE_URL],
              tileSize: 256,
              maxzoom: 19,
              attribution: MAP_ATTRIBUTION,
            },
          },
          layers: [{ id: "sat", type: "raster", source: "sat" }],
        },
        center: mapStages[0].cam.center,
        zoom: 10,
        pitch: 45,
        bearing: 0,
        attributionControl: false,
      });
      mapRef.current = map;

      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
      map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }), "top-right");

      map.on("load", () => {
        if (disposed) return;
        for (const m of MAP_MARKERS) {
          const wrap = document.createElement("div");
          wrap.style.cssText = "position:relative;cursor:pointer;";
          const dot = document.createElement("div");
          dot.style.cssText = `width:14px;height:14px;border-radius:50%;background:${m.color}33;border:2.5px solid ${m.color};box-shadow:0 0 10px ${m.color}88;`;
          const lbl = document.createElement("div");
          lbl.style.cssText = `position:absolute;bottom:18px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);border:1px solid ${m.color}55;border-radius:5px;padding:2px 7px;font-size:11px;color:${m.color};white-space:nowrap;pointer-events:none;`;
          lbl.textContent = m.label[locale];
          wrap.appendChild(lbl);
          wrap.appendChild(dot);
          new maplibregl.Marker({ element: wrap }).setLngLat(m.lngLat).addTo(map);
        }
        map.resize();
        readyRef.current = true;
        // fly to the first stage
        const c = mapStages[0].cam;
        map.flyTo({ ...c, duration: 1600, essential: true });
      });
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(orbitRaf.current);
      mapRef.current?.remove();
      mapRef.current = null;
      readyRef.current = false;
    };
  }, [locale]);

  // orbit helpers
  const stopOrbit = useCallback(() => cancelAnimationFrame(orbitRaf.current), []);
  const startOrbit = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    stopOrbit();
    const frame = () => {
      bearingRef.current = (bearingRef.current - 0.22) % 360;
      map.setBearing(bearingRef.current);
      orbitRaf.current = requestAnimationFrame(frame);
    };
    orbitRaf.current = requestAnimationFrame(frame);
  }, [stopOrbit]);

  // react to stage changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || done) return;
    stopOrbit();
    const c = stage.cam;
    bearingRef.current = c.bearing;
    const fly = () => map.flyTo({ ...c, duration: 2200, essential: true });
    if (readyRef.current && map.loaded()) fly();
    else map.once("idle", fly);

    let t: ReturnType<typeof setTimeout> | undefined;
    if (stage.mode === "tawaf") t = setTimeout(startOrbit, 2400);
    return () => {
      if (t) clearTimeout(t);
      stopOrbit();
    };
  }, [index, stage, done, startOrbit, stopOrbit]);

  const next = () => {
    if (index === total - 1) {
      stopOrbit();
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };
  const prev = () => {
    if (done) {
      setDone(false);
      return;
    }
    setIndex((i) => Math.max(0, i - 1));
  };

  return (
    <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-navy-950">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {/* mode label (top-left) */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-semibold text-gold-300 backdrop-blur">
        {done ? pick("Completed", "সম্পন্ন") : stage.modeTxt[locale]}
      </div>

      {/* stage panel (right) */}
      <div className="absolute right-0 top-0 z-10 flex h-full w-full items-stretch justify-end p-3 sm:p-5 md:w-[460px]">
        <div className="flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-950/75 shadow-luxury backdrop-blur-xl">
          {done ? (
            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
              <h2 className="text-3xl font-bold text-cream-50">{mapComplete.title[locale]}</h2>
              <p
                className="mt-4 text-sm leading-relaxed text-navy-100"
                dangerouslySetInnerHTML={{ __html: mapComplete.desc[locale] }}
              />
              <div className="mt-5">
                <DuaBox dua={mapComplete.dua} locale={locale} />
              </div>
              <button
                type="button"
                onClick={onRestart}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-navy-950 shadow-soft transition hover:brightness-105"
              >
                <Icon name="arrow" className="h-4 w-4 rotate-180" strokeWidth={2.4} />
                {pick("Restart the journey", "সফর পুনরায় শুরু করুন")}
              </button>
            </div>
          ) : (
            <>
              <div className="border-b border-white/10 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                  {pick("Stage", "ধাপ")} {dig(index + 1, locale)} / {dig(total, locale)}
                </div>
                <h2 className="mt-1.5 text-xl font-bold text-cream-50">{stage.title[locale]}</h2>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                <p
                  className="text-sm leading-relaxed text-navy-100 [&_b]:font-semibold [&_b]:text-cream-50"
                  dangerouslySetInnerHTML={{ __html: stage.desc[locale] }}
                />
                <DuaBox dua={stage.dua} locale={locale} />
              </div>

              {/* dots */}
              <div className="flex flex-wrap gap-1.5 px-6 pb-3 pt-1">
                {mapStages.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={s.title[locale]}
                    aria-current={i === index}
                    className={
                      "h-2 rounded-full transition-all " +
                      (i === index ? "w-6 bg-gold-500" : i < index ? "w-2 bg-navy-500" : "w-2 bg-white/20 hover:bg-white/40")
                    }
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={prev}
                  disabled={index === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-white/5 disabled:opacity-30"
                >
                  <Icon name="arrow" className="h-4 w-4 rotate-180" strokeWidth={2.2} />
                  {pick("Previous", "পূর্ববর্তী")}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-navy-950 shadow-soft transition hover:brightness-105"
                >
                  {index === total - 1 ? pick("Complete ✅", "সম্পূর্ণ ✅") : pick("Next", "পরবর্তী")}
                  {index !== total - 1 && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
