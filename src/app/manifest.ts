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
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Faire un don", url: "/faire-un-don" },
      { name: "Demander une intervention", url: "/demander-une-intervention" },
      { name: "Formations", url: "/formations" },
    ],
  };
}
