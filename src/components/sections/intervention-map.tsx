"use client";

import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { CIV_VIEWBOX, CIV_PATH, CIV_CITIES } from "@/lib/civ-map-data";

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
          {/* Carte réelle de la Côte d'Ivoire */}
          <div className="relative mx-auto w-full max-w-xl">
            <svg viewBox={CIV_VIEWBOX} className="h-auto w-full" role="img" aria-label="Carte des villes d'intervention de YEHLI en Côte d'Ivoire">
              {/* Silhouette du pays (tracé géographique réel) */}
              <path d={CIV_PATH} className="fill-primary/10 stroke-primary/50" strokeWidth={2.5} strokeLinejoin="round" />

              {/* Marqueurs des villes */}
              {CIV_CITIES.map((c, i) => {
                const isActive = active === i;
                return (
                  <g
                    key={c.name}
                    transform={`translate(${c.x},${c.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {/* Halo pulsant */}
                    <circle r={c.hq ? 10 : 7} className={c.hq ? "fill-accent/30" : "fill-primary/25"}>
                      <animate attributeName="r" values={`${c.hq ? 10 : 7};${c.hq ? 19 : 14};${c.hq ? 10 : 7}`} dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    {/* Point */}
                    <circle r={c.hq ? 7 : 5} className={c.hq ? "fill-accent stroke-white" : "fill-primary stroke-white"} strokeWidth={2} />
                    {/* Étiquette */}
                    <text
                      x={0}
                      y={c.hq ? -15 : -11}
                      textAnchor="middle"
                      className={`fill-dark font-sans font-bold transition-opacity ${isActive || c.hq ? "opacity-100" : "opacity-0"}`}
                      style={{ fontSize: c.hq ? 15 : 13, paintOrder: "stroke", stroke: "white", strokeWidth: 3, strokeLinejoin: "round" }}
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
              {CIV_CITIES.length} villes touchées
            </p>
            <ul className="grid grid-cols-2 gap-2.5">
              {CIV_CITIES.map((c, i) => (
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
