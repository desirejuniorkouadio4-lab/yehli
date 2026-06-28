"use client";

import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

// ── Projection (lat/lon → coordonnées SVG) ──────────────────
const LON_MIN = -8.7;
const LON_MAX = -2.4;
const LAT_MIN = 4.2;
const LAT_MAX = 10.85;
const W = 620;
const H = 640;

function proj(lat: number, lon: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return [x, y];
}

// Contour simplifié de la Côte d'Ivoire (waypoints lat/lon, sens horaire)
const BORDER: [number, number][] = [
  [10.3, -8.0], [10.5, -7.0], [10.2, -6.2], [10.0, -5.5], [9.5, -5.4],
  [10.0, -4.6], [9.7, -3.2], [9.4, -2.8], [8.6, -2.62], [7.6, -2.6],
  [6.9, -3.0], [6.2, -2.78], [5.3, -3.2], [5.25, -4.0], [4.95, -4.8],
  [4.6, -5.6], [4.35, -6.6], [4.6, -7.1], [4.4, -7.5], [5.1, -7.6],
  [5.9, -7.6], [6.5, -8.5], [7.4, -8.42], [8.0, -8.2], [8.6, -7.9],
  [9.4, -7.9], [10.0, -8.2],
];

const BORDER_PATH =
  BORDER.map(([lat, lon], i) => {
    const [x, y] = proj(lat, lon);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";

// ── Villes d'intervention ───────────────────────────────────
type City = { name: string; lat: number; lon: number; hq?: boolean };
const CITIES: City[] = [
  { name: "Abidjan", lat: 5.35, lon: -4.02, hq: true },
  { name: "Yamoussoukro", lat: 6.82, lon: -5.28 },
  { name: "Bouaké", lat: 7.69, lon: -5.03 },
  { name: "Daloa", lat: 6.88, lon: -6.45 },
  { name: "Korhogo", lat: 9.46, lon: -5.63 },
  { name: "Man", lat: 7.41, lon: -7.55 },
  { name: "San-Pédro", lat: 4.75, lon: -6.64 },
  { name: "Gagnoa", lat: 6.13, lon: -5.95 },
  { name: "Abengourou", lat: 6.73, lon: -3.49 },
  { name: "Bondoukou", lat: 8.04, lon: -2.8 },
];

export function InterventionMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          badge="Notre présence"
          title="YEHLI sur tout le territoire"
          subtitle="Nos ateliers, formations et interventions rayonnent dans les villes de Côte d'Ivoire, au plus près des élèves et des enseignants."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Carte */}
          <div className="relative mx-auto w-full max-w-lg">
            <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`} className="h-auto w-full" role="img" aria-label="Carte des villes d'intervention de YEHLI en Côte d'Ivoire">
              {/* Silhouette du pays */}
              <path d={BORDER_PATH} className="fill-primary/10 stroke-primary/40" strokeWidth={2.5} strokeLinejoin="round" />

              {/* Marqueurs */}
              {CITIES.map((c, i) => {
                const [x, y] = proj(c.lat, c.lon);
                const isActive = active === i;
                return (
                  <g
                    key={c.name}
                    transform={`translate(${x},${y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {/* Pulsation */}
                    <circle r={c.hq ? 11 : 8} className={c.hq ? "fill-accent/30" : "fill-primary/25"}>
                      <animate attributeName="r" values={`${c.hq ? 11 : 8};${c.hq ? 20 : 15};${c.hq ? 11 : 8}`} dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    {/* Point */}
                    <circle r={c.hq ? 7 : 5} className={c.hq ? "fill-accent stroke-white" : "fill-primary stroke-white"} strokeWidth={2} />
                    {/* Label */}
                    <text
                      x={0}
                      y={c.hq ? -16 : -12}
                      textAnchor="middle"
                      className={`fill-dark font-sans font-bold transition-opacity ${isActive || c.hq ? "opacity-100" : "opacity-0"}`}
                      style={{ fontSize: c.hq ? 15 : 13 }}
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Liste des villes */}
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
              <MapPin className="h-4 w-4" />
              {CITIES.length} villes touchées
            </p>
            <ul className="grid grid-cols-2 gap-2.5">
              {CITIES.map((c, i) => (
                <li
                  key={c.name}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active === i
                      ? "border-primary/40 bg-primary-pale text-primary"
                      : "border-border bg-white text-dark"
                  }`}
                >
                  {c.hq ? (
                    <Star className="h-4 w-4 shrink-0 fill-accent text-accent" />
                  ) : (
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  )}
                  <span className="truncate">
                    {c.name}
                    {c.hq && <span className="ml-1 text-xs font-normal text-muted">(siège)</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              Votre ville n&apos;est pas encore dans la liste ?{" "}
              <a href="/demander-une-intervention" className="font-semibold text-primary hover:underline">
                Sollicitez une intervention
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
