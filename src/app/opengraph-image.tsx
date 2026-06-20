import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "YEHLI — L'éducation, une lumière pour changer des vies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Photo du hero servie par le site (CDN) ; Satori la récupère au moment du
// rendu. URL absolue → aucun asset embarqué, donc la fonction edge reste
// légère (sous la limite de taille de Vercel) et le rendu reste fiable.
const HERO_IMAGE = "https://yehli.org/images/hero-enfants.jpg";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%" }}>
        {/* Photo de fond (enfants) — comme la section hero.
            next/og (Satori) impose <img> ; next/image n'y fonctionne pas. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "630px", objectFit: "cover" }}
        />
        {/* Voiles d'assombrissement pour la lisibilité du texte */}
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "rgba(16,18,26,0.68)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.84) 50%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        {/* Contenu */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 10,
              border: "1px solid rgba(255,255,255,0.30)",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#F5C518" }} />
            <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#ffffff" }}>
              ONG éducative · Côte d&apos;Ivoire
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 30,
              maxWidth: 940,
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.12,
            }}
          >
            <span style={{ color: "#ffffff" }}>Chaque enfant qui apprend est une</span>
            <span style={{ color: "#F5C518", marginLeft: 20, marginRight: 20 }}>lumière</span>
            <span style={{ color: "#ffffff" }}>qui grandit</span>
          </div>

          <div style={{ display: "flex", marginTop: 28, maxWidth: 840, fontSize: 30, color: "rgba(255,255,255,0.92)" }}>
            YEHLI accompagne les enfants, les jeunes et les éducateurs de Côte d&apos;Ivoire.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
