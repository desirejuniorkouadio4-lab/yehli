import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YEHLI — L'éducation, une lumière pour changer des vies",
    short_name: "YEHLI",
    description:
      "ONG ivoirienne dédiée à l'éducation et à l'épanouissement des enfants et des jeunes.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "fr",
    dir: "ltr",
    background_color: "#ffffff",
    theme_color: "#1A6B2A",
    categories: ["education", "nonprofit"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Faire un don", url: "/faire-un-don" },
      { name: "Demander une intervention", url: "/demander-une-intervention" },
      { name: "Formations", url: "/formations" },
    ],
  };
}
