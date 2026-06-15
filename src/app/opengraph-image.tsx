import { ImageResponse } from "next/og";
import { site } from "@/content/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F4C3A 0%, #16624F 60%, #06241B 100%)",
          color: "#FAFAF8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #E9C46A, #B8962E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F4C3A",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 30, letterSpacing: 6, color: "#E9C46A", textTransform: "uppercase" }}>
            {site.name}
          </div>
        </div>
        <div style={{ marginTop: 40, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Simplify Your Sacred Journey to the House of Allah
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#D5E8E1" }}>
          Premium Hajj &amp; Umrah · Visa · Ticketing
        </div>
      </div>
    ),
    { ...size },
  );
}
