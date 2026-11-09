import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { event } from "@/data/event";

export const alt = `${event.name} · ${event.subtitle} — ${event.dateLong}, ${event.timeLong}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir (WhatsApp, Facebook, etc.), generada en el build. */
export default async function OpengraphImage() {
  const poster = await readFile(join(process.cwd(), "public/images/afiche-share.jpg"));
  const posterSrc = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(80% 120% at 0% 0%, rgba(245,182,66,0.25), transparent 55%), radial-gradient(80% 120% at 100% 100%, rgba(214,76,143,0.3), transparent 55%), #0E0B11",
          color: "#F7EFE6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px" }}>
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#F5B642", textTransform: "uppercase" }}>
            {event.eyebrow}
          </div>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.95, marginTop: 20, letterSpacing: -2 }}>
            GRAN
          </div>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>CACHIMBEADA</div>
          <div style={{ fontSize: 28, marginTop: 22, letterSpacing: 6, opacity: 0.85 }}>
            INGENIERÍA ECONÓMICA 2026
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 30,
              fontWeight: 700,
              color: "#0E0B11",
              background: "#F5B642",
              borderRadius: 999,
              padding: "12px 28px",
              alignSelf: "flex-start",
            }}
          >
            {event.dateLabel} · {event.timeLabel}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 50 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc}
            width={400}
            height={537}
            alt=""
            style={{ borderRadius: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
