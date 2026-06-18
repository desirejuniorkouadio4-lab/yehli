// Constantes statiques du site (repli et structure).
// Les valeurs dynamiques (contact, réseaux) proviennent de getSiteSettings().
export const SITE = {
  name: "YEHLI",
  tagline: "L'éducation, une lumière pour changer des vies",
  signature: "Chaque enfant qui apprend est une lumière qui grandit",
  description:
    "YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  creator: "Digital Access — Département Digital Web Solution",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yehli.org",
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
