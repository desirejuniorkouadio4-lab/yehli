// Génère les variantes du logo YEHLI à partir du SVG source horizontal.
// Exécuter : node scripts/gen-logos.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const SOURCE = "docs/yehli-logo-horizontal-hd.svg";
if (!existsSync(SOURCE)) {
  console.error(`Source introuvable : ${SOURCE}`);
  process.exit(1);
}

const src = readFileSync(SOURCE, "utf8");
mkdirSync("public/images", { recursive: true });

const stripTagline = (svg) => svg.replace(/\s*<text[\s\S]*?<\/text>/g, "");
const cropToMark = (svg) =>
  svg
    .replace(/width="1424"\s+height="785"\s*/, "")
    .replace(/viewBox="0 0 1424 785"/, 'viewBox="18 18 1388 724"');

// 1) Logo complet (couleur + slogan) — usage OpenGraph / fonds clairs
writeFileSync("public/images/logo-yehli.svg", src);

// 2) Marque couleur sans slogan — navbar
writeFileSync("public/images/logo-yehli-mark.svg", cropToMark(stripTagline(src)));

// 3) Marque blanche (mot blanc + soleil jaune conservé) — footer / fonds verts
const white = src
  .replace(/fill="#00713D"/g, 'fill="#FFFFFF"')
  .replace(/fill="#111111"/g, 'fill="#FFFFFF"');
writeFileSync("public/images/logo-yehli-white-mark.svg", cropToMark(stripTagline(white)));

// 4) Logo blanc complet (avec slogan) — bandeaux verts pleine largeur
writeFileSync("public/images/logo-yehli-white.svg", white);

console.log("✓ Variantes du logo générées dans public/images/");
