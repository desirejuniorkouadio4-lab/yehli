import { cn } from "@/lib/utils";

type LogoProps = {
  /** "color" pour les fonds clairs, "white" pour les fonds verts / sombres */
  variant?: "color" | "white";
  /** Inclure le slogan complet sous la marque */
  full?: boolean;
  className?: string;
};

const SOURCES = {
  color: { mark: "/images/logo-yehli-mark.svg", full: "/images/logo-yehli.svg" },
  white: { mark: "/images/logo-yehli-white-mark.svg", full: "/images/logo-yehli-white.svg" },
} as const;

/**
 * Logo officiel YEHLI (rendu vectoriel net à toute taille).
 * La hauteur se contrôle via `className` (ex. `h-11`).
 */
export function Logo({ variant = "color", full = false, className }: LogoProps) {
  const src = SOURCES[variant][full ? "full" : "mark"];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="YEHLI — L'éducation, une lumière pour changer des vies"
      className={cn("w-auto select-none", full ? "h-16" : "h-11", className)}
      draggable={false}
    />
  );
}
