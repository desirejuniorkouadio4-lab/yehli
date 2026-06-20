// Génère le favicon + les icônes PWA à partir du logo YEHLI.
// On retire la tagline (illisible en petit) et on centre « Yehli + soleil »
// sur un carré blanc. Lancer : node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "public/images/logo-yehli.png";
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

// 1. Retire le cadre blanc, garde le haut (« Yehli » + soleil), retire la tagline.
const base = await sharp(SRC).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
const { width, height } = base.info;
const cropH = Math.round(height * 0.72); // ~72% du haut = wordmark sans tagline
const wordmark = await sharp(base.data)
  .extract({ left: 0, top: 0, width, height: cropH })
  .trim({ threshold: 12 })
  .toBuffer();

mkdirSync("public/icons", { recursive: true });

async function icon(size, padRatio, out) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const fitted = await sharp(wordmark)
    .resize(inner, inner, { fit: "contain", background: BG })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: fitted, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("✓", out);
}

await icon(192, 0.1, "public/icons/icon-192.png");
await icon(512, 0.1, "public/icons/icon-512.png");
await icon(512, 0.18, "public/icons/icon-maskable-512.png"); // zone de sécurité élargie
await icon(180, 0.1, "src/app/apple-icon.png"); // apple touch icon (auto-détecté)
await icon(512, 0.1, "src/app/icon.png"); // favicon (auto-détecté)
console.log("Terminé.");
