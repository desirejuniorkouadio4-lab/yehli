// URL de base du site pour les liens absolus (canonical, og:image, sitemap…).
// Priorité : variable d'env explicite → domaine de production Vercel (résout
// toujours, même avant qu'un domaine personnalisé ne soit câblé) → domaine
// connecté par défaut (avec www).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.yehli.org")
).replace(/\/$/, "");

// Constantes statiques du site (repli et structure).
// Les valeurs dynamiques (contact, réseaux) proviennent de getSiteSettings().
export const SITE = {
  name: "YEHLI",
  tagline: "L'éducation, une lumière pour changer des vies",
  signature: "Chaque enfant qui apprend est une lumière qui grandit",
  description:
    "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  creator: "Digital Access — Département Digital Web Solution",
  url: SITE_URL,
  contact: {
    email: "contact@yehli.org",
    phone: "+225 07 00 00 00 00",
    whatsapp: "+225 07 00 00 00 00",
    address: "Abidjan, Côte d'Ivoire",
  },
  socials: {
    facebook: "https://facebook.com/yehli.ci",
    instagram: "https://instagram.com/yehli.ci",
    linkedin: "https://linkedin.com/company/yehli",
    youtube: "",
  },
} as const;

/** Numéro WhatsApp au format international sans espaces (pour les liens wa.me). */
export function waNumber(value: string): string {
  return value.replace(/[^\d]/g, "");
}
