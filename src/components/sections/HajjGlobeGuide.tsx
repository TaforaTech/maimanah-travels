"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import { Icon } from "@/components/ui/Icon";
import { stations, PLACES, type Dua, type FocusId } from "@/content/data/hajj-journey";
import type { Locale } from "@/content/i18n/config";

/* ---------------- helpers ---------------- */

const BN = "০১২৩৪৫৬৭৮৯";
const dig = (n: number, l: Locale) =>
  l === "bn" ? String(n).replace(/[0-9]/g, (d) => BN[+d]) : String(n);
const DEG = Math.PI / 180;
/** Longitude offset calibrated to the land_ocean_ice_cloud texture. */
const LNG_OFFSET = -90;
const FLIGHT_MS = 6500;
const smooth = (p: number) => p * p * (3 - 2 * p);

type GlobeApi = {
  focus: (id: FocusId, instant?: boolean) => void;
  fly: (from: FocusId, to: FocusId, onProgress: (p: number) => void) => Promise<void>;
  setHero: (hero: boolean) => void;
};

/* ---------------- the WebGL globe ---------------- */

function useGlobe(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const apiRef = useRef<GlobeApi | null>(null);
  const labelRefs = useRef<Record<FocusId, HTMLDivElement | null>>({ dhaka: null, mecca: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const T = await import("three");
      if (disposed || !canvas) return;

      const parent = canvas.parentElement!;
      const size = { w: parent.clientWidth, h: parent.clientHeight };

      const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(size.w, size.h, false);

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(42, size.w / size.h, 0.1, 100);
      camera.position.set(0, 0, 2.55);

      // lights
      scene.add(new T.AmbientLight(0xffffff, 0.9));
      const sun = new T.DirectionalLight(0xffffff, 0.7);
      sun.position.set(5, 3, 5);
      scene.add(sun);

      // earth group (everything that should rotate together)
      const group = new T.Group();
      scene.add(group);

      const tex = await new T.TextureLoader().loadAsync("/textures/earth-blue-marble.jpg");
      if (disposed) return;
      tex.colorSpace = T.SRGBColorSpace;
      const earth = new T.Mesh(
        new T.SphereGeometry(1, 96, 96),
        new T.MeshPhongMaterial({ map: tex, shininess: 8, specular: 0x223322 }),
      );
      group.add(earth);

      // atmosphere rim glow
      const atmo = new T.Mesh(
        new T.SphereGeometry(1.06, 64, 64),
        new T.ShaderMaterial({
          transparent: true,
          side: T.BackSide,
          uniforms: {},
          vertexShader:
            "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
          fragmentShader:
            "varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 2.2); gl_FragColor = vec4(0.36,0.78,0.62,1.0) * i; }",
        }),
      );
      scene.add(atmo);

      // stars
      const starGeo = new T.BufferGeometry();
      const starPos = new Float32Array(1800 * 3);
      for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 90;
      starGeo.setAttribute("position", new T.BufferAttribute(starPos, 3));
      const stars = new T.Points(
        starGeo,
        new T.PointsMaterial({ color: 0xffffff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.85 }),
      );
      scene.add(stars);

      const latLng = (lat: number, lng: number, r = 1) => {
        const phi = (90 - lat) * DEG;
        const theta = (lng + LNG_OFFSET) * DEG;
        return new T.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        );
      };
      const vecs: Record<FocusId, THREE.Vector3> = {
        dhaka: latLng(PLACES.dhaka.lat, PLACES.dhaka.lng),
        mecca: latLng(PLACES.mecca.lat, PLACES.mecca.lng),
      };

      // location dots
      (Object.keys(vecs) as FocusId[]).forEach((id) => {
        const dot = new T.Mesh(
          new T.SphereGeometry(0.018, 16, 16),
          new T.MeshBasicMaterial({ color: 0xf0d690 }),
        );
        dot.position.copy(vecs[id].clone().multiplyScalar(1.005));
        group.add(dot);
      });

      // flight arc + plane
      const arcMat = new T.LineBasicMaterial({ color: 0xf0d690, transparent: true, opacity: 0.9 });
      const arc = new T.Line(new T.BufferGeometry(), arcMat);
      arc.visible = false;
      group.add(arc);

      // A modern twin-engine passenger jet (fuselage along +X, nose +X, wings span Z, up +Y).
      const buildPlane = () => {
        const g = new T.Group();
        const wh = new T.MeshPhongMaterial({ color: 0xf7f7fa, shininess: 80, side: T.DoubleSide });
        const gd = new T.MeshPhongMaterial({ color: 0xd4af37, shininess: 70 });
        const gr = new T.MeshPhongMaterial({ color: 0x0f6b4f, shininess: 70, side: T.DoubleSide });
        const dk = new T.MeshPhongMaterial({ color: 0x10100f, shininess: 40 });
        const mt = new T.MeshPhongMaterial({ color: 0xcfd3d8, shininess: 110 });
        const bl = new T.MeshBasicMaterial({ color: 0x9fd6ff });
        const cp = new T.MeshPhongMaterial({ color: 0x16202b, shininess: 120 });

        // smooth tapered fuselage via a lathed profile, then laid along +X
        const profile = [
          [0.0, -0.30],
          [0.011, -0.27],
          [0.024, -0.21],
          [0.036, -0.11],
          [0.042, 0.02],
          [0.042, 0.15],
          [0.036, 0.23],
          [0.022, 0.29],
          [0.008, 0.32],
          [0.0, 0.33],
        ].map(([r, y]) => new T.Vector2(r, y));
        const fuse = new T.Mesh(new T.LatheGeometry(profile, 28), wh);
        fuse.rotation.z = -Math.PI / 2; // profile top (+Y) -> nose (+X)
        g.add(fuse);

        // swept, tapered lifting surface; span along +Z, chord along X, thin in Y
        const surface = (
          rootC: number,
          tipC: number,
          span: number,
          sweep: number,
          thick: number,
          mat: THREE.Material = wh,
        ) => {
          const s = new T.Shape();
          s.moveTo(0, rootC * 0.5);
          s.lineTo(span, rootC * 0.5 - sweep);
          s.lineTo(span, rootC * 0.5 - sweep - tipC);
          s.lineTo(0, -rootC * 0.5);
          s.closePath();
          const geo = new T.ExtrudeGeometry(s, { depth: thick, bevelEnabled: false, steps: 1 });
          geo.translate(0, 0, -thick / 2);
          const m = new T.Mesh(geo, mat);
          // local X(span)->Z, Y(chord)->X, Z(thick)->Y
          m.quaternion.setFromAxisAngle(new T.Vector3(1, 1, 1).normalize(), (-2 * Math.PI) / 3);
          return m;
        };

        // main wings with dihedral + upturned winglets
        [1, -1].forEach((side) => {
          const pivot = new T.Group();
          const wing = surface(0.15, 0.05, 0.32, 0.17, 0.012);
          pivot.add(wing);
          const tip = surface(0.05, 0.022, 0.05, 0.03, 0.01, gr);
          tip.position.z = 0.32;
          tip.rotation.x = -1.0; // raked winglet
          pivot.add(tip);
          pivot.position.set(0.01, -0.018, side * 0.036);
          pivot.scale.z = side;
          pivot.rotation.x = side * -0.09; // dihedral, both tips up
          g.add(pivot);
        });

        // horizontal stabilizers
        [1, -1].forEach((side) => {
          const pivot = new T.Group();
          pivot.add(surface(0.07, 0.026, 0.14, 0.08, 0.009));
          pivot.position.set(-0.235, 0.012, side * 0.02);
          pivot.scale.z = side;
          pivot.rotation.x = side * -0.04;
          g.add(pivot);
        });

        // swept vertical tail fin
        const finPivot = new T.Group();
        finPivot.add(surface(0.12, 0.05, 0.16, 0.11, 0.009, gr));
        finPivot.position.set(-0.235, 0.03, 0);
        finPivot.rotation.x = -Math.PI / 2; // span +Z -> up +Y
        g.add(finPivot);
        const finLogo = new T.Mesh(new T.BoxGeometry(0.05, 0.07, 0.004), gd);
        finLogo.position.set(-0.26, 0.13, 0);
        g.add(finLogo);

        // underwing turbofan engines
        [0.155, -0.155].forEach((z) => {
          const cowl = new T.Mesh(new T.CylinderGeometry(0.027, 0.025, 0.13, 18), mt);
          cowl.rotation.z = Math.PI / 2;
          cowl.position.set(0.05, -0.05, z);
          g.add(cowl);
          const band = new T.Mesh(new T.CylinderGeometry(0.0275, 0.026, 0.03, 18), gr);
          band.rotation.z = Math.PI / 2;
          band.position.set(0.0, -0.05, z);
          g.add(band);
          const lip = new T.Mesh(new T.TorusGeometry(0.027, 0.005, 10, 20), gd);
          lip.rotation.y = Math.PI / 2;
          lip.position.set(0.115, -0.05, z);
          g.add(lip);
          const inlet = new T.Mesh(new T.CircleGeometry(0.022, 18), dk);
          inlet.rotation.y = Math.PI / 2;
          inlet.position.set(0.114, -0.05, z);
          g.add(inlet);
          const exhaust = new T.Mesh(new T.ConeGeometry(0.02, 0.05, 16), dk);
          exhaust.rotation.z = -Math.PI / 2;
          exhaust.position.set(-0.04, -0.05, z);
          g.add(exhaust);
          const pylon = new T.Mesh(new T.BoxGeometry(0.06, 0.04, 0.012), wh);
          pylon.position.set(0.04, -0.028, z);
          g.add(pylon);
        });

        // cockpit glass + gold cheatline + cabin windows
        const cockpit = new T.Mesh(new T.SphereGeometry(0.036, 16, 12), cp);
        cockpit.scale.set(1.5, 0.8, 0.85);
        cockpit.position.set(0.235, 0.012, 0);
        g.add(cockpit);
        [0.0445, -0.0445].forEach((z) => {
          const line = new T.Mesh(new T.BoxGeometry(0.42, 0.012, 0.003), gd);
          line.position.set(0.0, 0.012, z);
          g.add(line);
          for (let wx = -0.16; wx <= 0.18; wx += 0.035) {
            const win = new T.Mesh(new T.BoxGeometry(0.01, 0.012, 0.002), bl);
            win.position.set(wx, 0.012, z + (z > 0 ? 0.001 : -0.001));
            g.add(win);
          }
        });
        return g;
      };

      const plane = buildPlane();
      plane.scale.setScalar(0.25);
      plane.visible = false;
      group.add(plane);
      const _up = new T.Vector3();
      const _right = new T.Vector3();
      const _basis = new T.Matrix4();

      // orientation that brings a local unit vector to face the camera (+Z), keeping north up
      const faceQuat = (v: THREE.Vector3) => {
        const yaw = Math.atan2(v.x, v.z);
        const qy = new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), -yaw);
        const v1 = v.clone().applyQuaternion(qy);
        const pitch = Math.atan2(v1.y, v1.z);
        const qx = new T.Quaternion().setFromAxisAngle(new T.Vector3(1, 0, 0), pitch);
        return qx.multiply(qy);
      };
      const targets: Record<FocusId, THREE.Quaternion> = {
        dhaka: faceQuat(vecs.dhaka.clone().normalize()),
        mecca: faceQuat(vecs.mecca.clone().normalize()),
      };

      // state
      let mode: "hero" | "focus" | "flight" = "hero";
      let target = targets.dhaka.clone();
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let idleSpin = true;
      const flight = {
        active: false,
        t0: 0,
        from: targets.dhaka.clone(),
        to: targets.mecca.clone(),
        curve: null as THREE.QuadraticBezierCurve3 | null,
        onProgress: (() => {}) as (p: number) => void,
        resolve: () => {},
      };

      // pointer drag rotates the globe
      const yAxis = new T.Vector3(0, 1, 0);
      const xAxis = new T.Vector3(1, 0, 0);
      const onDown = (e: PointerEvent) => {
        dragging = true;
        idleSpin = false;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        group.quaternion
          .premultiply(new T.Quaternion().setFromAxisAngle(yAxis, dx * 0.005))
          .premultiply(new T.Quaternion().setFromAxisAngle(xAxis, dy * 0.005));
      };
      const onUp = (e: PointerEvent) => {
        dragging = false;
        if (mode !== "hero") target = group.quaternion.clone();
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}
      };
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointerleave", onUp);

      // labels
      const placeLabel = (id: FocusId) => {
        const el = labelRefs.current[id];
        if (!el) return;
        const w = vecs[id].clone().applyQuaternion(group.quaternion);
        const front = w.z > 0.12;
        const pr = w.clone().multiplyScalar(1.02).project(camera);
        const x = (pr.x * 0.5 + 0.5) * size.w;
        const y = (-pr.y * 0.5 + 0.5) * size.h;
        el.style.opacity = front && mode !== "hero" ? "1" : "0";
        el.style.transform = `translate(-50%,-140%) translate(${x}px, ${y}px)`;
      };

      // render loop
      const spinStep = new T.Quaternion().setFromAxisAngle(yAxis, 0.0012);
      let raf = 0;
      const tick = () => {
        stars.rotation.y += 0.0003;
        if (flight.active && flight.curve) {
          const p = Math.min(1, (performance.now() - flight.t0) / FLIGHT_MS);
          const e = smooth(p);
          group.quaternion.slerpQuaternions(flight.from, flight.to, e);
          const pos = flight.curve.getPointAt(p);
          plane.position.copy(pos);
          if (p < 0.999) {
            const tan = flight.curve.getTangentAt(p).normalize();
            _up.copy(pos).normalize();
            _right.crossVectors(tan, _up).normalize();
            _up.crossVectors(_right, tan).normalize();
            _basis.makeBasis(tan, _up, _right); // nose(+X)→travel, up(+Y)→radial
            plane.setRotationFromMatrix(_basis);
          }
          flight.onProgress(p);
          if (p >= 1) {
            flight.active = false;
            mode = "focus";
            target = flight.to.clone();
            plane.visible = false;
            flight.resolve();
          }
        } else if (mode === "hero" && idleSpin && !dragging) {
          group.quaternion.premultiply(spinStep);
        } else if (!dragging) {
          group.quaternion.slerp(target, 0.07);
        }
        placeLabel("dhaka");
        placeLabel("mecca");
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      const onResize = () => {
        size.w = parent.clientWidth;
        size.h = parent.clientHeight;
        camera.aspect = size.w / size.h;
        camera.updateProjectionMatrix();
        renderer.setSize(size.w, size.h, false);
      };
      window.addEventListener("resize", onResize);

      apiRef.current = {
        setHero: (hero) => {
          mode = hero ? "hero" : "focus";
          idleSpin = hero;
          if (!hero) target = group.quaternion.clone();
        },
        focus: (id, instant) => {
          mode = "focus";
          idleSpin = false;
          target = targets[id].clone();
          if (instant) group.quaternion.copy(target);
        },
        fly: (from, to, onProgress) =>
          new Promise<void>((resolve) => {
            const start = vecs[from].clone().multiplyScalar(1.012);
            const end = vecs[to].clone().multiplyScalar(1.012);
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.42);
            const curve = new T.QuadraticBezierCurve3(start, mid, end);
            arc.geometry.dispose();
            arc.geometry = new T.BufferGeometry().setFromPoints(curve.getPoints(96));
            arc.visible = true;
            plane.visible = true;
            mode = "flight";
            idleSpin = false;
            flight.curve = curve;
            flight.from = group.quaternion.clone();
            flight.to = targets[to].clone();
            flight.onProgress = onProgress;
            flight.resolve = () => resolve();
            flight.t0 = performance.now();
            flight.active = true;
          }),
      };

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointerleave", onUp);
        renderer.dispose();
        tex.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [canvasRef]);

  return { apiRef, labelRefs };
}

/* ---------------- dua card ---------------- */

function DuaCard({ d, locale }: { d: Dua; locale: Locale }) {
  return (
    <div className="rounded-xl border border-gold-500/20 bg-navy-950/40 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">{d.title[locale]}</div>
      <p dir="rtl" lang="ar" className="font-arabic mt-2 whitespace-pre-line text-right text-xl leading-loose text-cream-50">
        {d.arabic}
      </p>
      <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-navy-100">{d.translation[locale]}</p>
      <p className="mt-2 text-xs text-gold-300/80">{d.reference[locale]}</p>
    </div>
  );
}

/* ---------------- main ---------------- */

export function HajjGlobeGuide({ locale, onEnterRites }: { locale: Locale; onEnterRites: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { apiRef, labelRefs } = useGlobe(canvasRef);
  const pick = useCallback((en: string, bn: string) => (locale === "bn" ? bn : en), [locale]);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [flying, setFlying] = useState(false);
  const [progress, setProgress] = useState(0);

  // The globe phase covers only Dhaka → Ihram → flight → Makkah arrival.
  const STG = stations.slice(0, 2);
  const station = STG[index];

  // keep the globe focused on the active station (except while flying)
  useEffect(() => {
    if (started && !flying) apiRef.current?.focus(station.focus);
  }, [started, flying, station.focus, apiRef]);

  const begin = () => {
    setStarted(true);
    apiRef.current?.setHero(false);
    apiRef.current?.focus("dhaka");
  };

  const advance = async () => {
    if (station.flight) {
      setFlying(true);
      setProgress(0);
      await apiRef.current?.fly("dhaka", "mecca", (p) => setProgress(Math.round(p * 100)));
      setFlying(false);
      setIndex((i) => i + 1);
      return;
    }
    // arrival → hand off to the satellite rites map
    onEnterRites();
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />

      {/* location labels (positioned by the globe loop) */}
      {(["dhaka", "mecca"] as FocusId[]).map((id) => (
        <div
          key={id}
          ref={(el) => {
            labelRefs.current[id] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-gold-500/30 bg-navy-950/70 px-3 py-1 text-xs font-semibold text-cream-50 opacity-0 backdrop-blur transition-opacity"
        >
          {PLACES[id].emoji} {PLACES[id].label[locale]}
        </div>
      ))}

      {/* ---------- intro hero ---------- */}
      {!started && (
        <div className="absolute inset-0 z-20 grid place-items-center p-5">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-navy-950/55 p-8 text-center shadow-luxury backdrop-blur-xl">
            <div className="text-4xl">🕋</div>
            <h2 className="mt-3 text-3xl font-bold text-cream-50">
              {pick("Hajj Journey Guide", "হজ্জ যাত্রা গাইড")}
            </h2>
            <p className="mt-2 text-sm font-semibold text-gold-400">
              {pick("Bangladesh", "বাংলাদেশ")} ✈ {pick("Makkah al-Mukarramah", "মক্কা মুকাররমা")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-100">
              {pick(
                "Begin your spiritual journey to the Holy Land. Follow every step — from entering Ihram at home to arriving in Makkah — with its supplications in Arabic and Bangla.",
                "পবিত্র ভূমির দিকে আপনার আধ্যাত্মিক যাত্রা শুরু করুন। ইহরাম পরিধান থেকে শুরু করে মক্কায় পৌঁছানো পর্যন্ত প্রতিটি ধাপ আরবি ও বাংলা দোয়াসহ অনুসরণ করুন।",
              )}
            </p>
            <button
              type="button"
              onClick={begin}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-sm font-bold text-navy-950 shadow-soft transition hover:brightness-105"
            >
              {pick("Start the journey", "যাত্রা শুরু করুন")} ✈
            </button>
            <p className="mt-4 text-xs text-navy-100/70">
              {pick("Drag to rotate the globe", "গ্লোব ঘোরাতে মাউস টেনে ধরুন")}
            </p>
          </div>
        </div>
      )}

      {/* ---------- flight HUD ---------- */}
      {flying && (
        <div className="absolute inset-x-0 bottom-0 z-20 p-5">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-navy-950/70 px-6 py-4 text-cream-50 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wide text-navy-100">{pick("Departure", "রওনা")}</div>
              <div className="text-sm font-semibold">{PLACES.dhaka.label[locale]}</div>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-[11px] text-navy-100">
                <span>{pick("Flight progress", "উড়ানের অগ্রগতি")}</span>
                <span className="font-semibold text-gold-300">{dig(progress, locale)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-gold-gradient transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 text-center text-[11px] text-navy-100">{pick("≈ 6 hour flight", "≈ ৬ ঘণ্টার ফ্লাইট")}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-wide text-navy-100">{pick("Destination", "গন্তব্য")}</div>
              <div className="text-sm font-semibold">{PLACES.mecca.label[locale]}</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- station panel ---------- */}
      {started && !flying && (
        <>
          {/* scrollable card on the right */}
          <div className="absolute right-0 top-0 z-10 flex h-full w-full items-stretch justify-end p-3 sm:p-5 md:w-[460px]">
            <div className="flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-950/70 shadow-luxury backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 pb-4 pt-14 md:pt-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-400">
                  <Icon name={station.icon} className="h-4 w-4" strokeWidth={1.8} />
                  {station.phase[locale]}
                </div>
                <h2 className="mt-1.5 text-2xl font-bold text-cream-50">{station.title[locale]}</h2>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {station.intro && (
                  <p className="text-sm leading-relaxed text-navy-100">{station.intro[locale]}</p>
                )}

                {station.details?.map((d, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-gradient text-sm font-bold text-navy-950">
                      {dig(i + 1, locale)}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-cream-50">{d.title[locale]}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-navy-100">{d.body[locale]}</p>
                    </div>
                  </div>
                ))}

                {station.duas?.map((d, i) => (
                  <DuaCard key={`dua-${i}`} d={d} locale={locale} />
                ))}

                {station.dhikr && (
                  <div className="rounded-full bg-gold-500/10 px-4 py-2 text-center text-sm font-semibold text-gold-300">
                    {station.dhikr[locale]}
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={advance}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-navy-950 shadow-soft transition hover:brightness-105"
                >
                  {station.cta[locale]}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
