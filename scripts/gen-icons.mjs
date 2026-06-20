// Génère les icônes PNG de la PWA à partir du design de l'icône YEHLI
// (carré vert + soleil jaune). Lancer : node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const sun = `
  <circle cx="32" cy="32" r="10.5" fill="#F5C518"/>
  <g stroke="#F5C518" stroke-width="3.6" stroke-linecap="round">
    <line x1="47.5" y1="32" x2="52.5" y2="32"/>
    <line x1="42.96" y1="42.96" x2="46.5" y2="46.5"/>
    <line x1="32" y1="47.5" x2="32" y2="52.5"/>
    <line x1="21.04" y1="42.96" x2="17.5" y2="46.5"/>
    <line x1="16.5" y1="32" x2="11.5" y2="32"/>
    <line x1="21.04" y1="21.04" x2="17.5" y2="17.5"/>
    <line x1="32" y1="16.5" x2="32" y2="11.5"/>
    <line x1="42.96" y1="21.04" x2="46.5" y2="17.5"/>
  </g>`;

// Icône standard : carré vert arrondi + soleil.
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#1A6B2A"/>${sun}</svg>`;
// Icône maskable : pleine (pas d'arrondi), l'OS applique son propre masque ;
// le soleil reste dans la zone de sécurité (40% central).
const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1A6B2A"/>${sun}</svg>`;

mkdirSync("public/icons", { recursive: true });

async function render(svg, size, out) {
  await sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toFile(out);
  console.log("✓", out);
}

await render(rounded, 192, "public/icons/icon-192.png");
await render(rounded, 512, "public/icons/icon-512.png");
await render(full, 512, "public/icons/icon-maskable-512.png");
// Apple touch icon : Next le détecte automatiquement dans app/.
await render(rounded, 180, "src/app/apple-icon.png");
console.log("Terminé.");
