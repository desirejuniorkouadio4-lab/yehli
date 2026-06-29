// Génère le tracé SVG exact de la Côte d'Ivoire à partir de Natural Earth 50m,
// + les positions projetées des villes. Sortie : src/lib/civ-map-data.ts
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const file = readdirSync(".").find((f) => f.startsWith("_ne-") && f.endsWith(".geojson"));
const gj = JSON.parse(readFileSync(file, "utf8"));

const feat = gj.features.find((f) => {
  const p = f.properties;
  const names = [p.NAME, p.ADMIN, p.NAME_LONG, p.SOVEREIGNT, p.GEOUNIT].filter(Boolean).map((s) => s.toLowerCase());
  return names.some((n) => n.includes("ivoire") || n.includes("ivory"));
});
if (!feat) throw new Error("Côte d'Ivoire introuvable dans le GeoJSON");

// Récupère le plus grand anneau (continent, hors petites îles)
const polys = feat.geometry.type === "Polygon" ? [feat.geometry.coordinates] : feat.geometry.coordinates;
let ring = [];
for (const poly of polys) {
  const outer = poly[0];
  if (outer.length > ring.length) ring = outer;
}

// Projection équirectangulaire corrigée en longitude par cos(latitude moyenne)
const lons = ring.map((p) => p[0]);
const lats = ring.map((p) => p[1]);
const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
const latMin = Math.min(...lats), latMax = Math.max(...lats);
const midLat = ((latMin + latMax) / 2) * (Math.PI / 180);
const kx = Math.cos(midLat);

const PAD = 16;
const TARGET = 600;
const wRaw = (lonMax - lonMin) * kx;
const hRaw = latMax - latMin;
const scale = (TARGET - PAD * 2) / Math.max(wRaw, hRaw);
const W = Math.round(wRaw * scale + PAD * 2);
const H = Math.round(hRaw * scale + PAD * 2);

function project(lon, lat) {
  const x = PAD + (lon - lonMin) * kx * scale;
  const y = PAD + (latMax - lat) * scale;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

// Tracé du pays
const path =
  ring
    .map(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ") + " Z";

// Villes d'intervention (coordonnées réelles)
const CITIES = [
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
const cities = CITIES.map((c) => {
  const [x, y] = project(c.lon, c.lat);
  return { name: c.name, x, y, hq: !!c.hq };
});

const out = `// Généré par scripts/gen-civ-map.mjs — tracé réel (Natural Earth 50m).
export const CIV_VIEWBOX = "0 0 ${W} ${H}";
export const CIV_PATH = "${path}";
export type MapCity = { name: string; x: number; y: number; hq: boolean };
export const CIV_CITIES: MapCity[] = ${JSON.stringify(cities, null, 2)};
`;
writeFileSync("src/lib/civ-map-data.ts", out);
console.log(`✓ src/lib/civ-map-data.ts — viewBox ${W}x${H}, ${ring.length} points, ${cities.length} villes`);
console.log("Abidjan:", cities.find((c) => c.name === "Abidjan"));
console.log("Korhogo (nord):", cities.find((c) => c.name === "Korhogo"));
