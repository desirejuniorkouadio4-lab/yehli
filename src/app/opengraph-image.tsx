import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "YEHLI — L'éducation, une lumière pour changer des vies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1A6B2A 0%, #0f4a1d 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 90,
            width: 180,
            height: 180,
            borderRadius: 9999,
            background: "#F5C518",
            opacity: 0.9,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", fontSize: 120, fontWeight: 800, color: "#ffffff" }}>
          YEHLI
          <div style={{ width: 26, height: 26, borderRadius: 9999, background: "#F5C518", marginLeft: 14, marginTop: 60, display: "flex" }} />
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#d7ead9", marginTop: 24, maxWidth: 900 }}>
          L&apos;éducation, une lumière pour changer des vies
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#F5C518", marginTop: 48, fontWeight: 600 }}>
          ONG éducative · Côte d&apos;Ivoire
        </div>
      </div>
    ),
    { ...size },
  );
}
