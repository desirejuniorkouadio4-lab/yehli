import { cn } from "@/lib/utils";

type WaveSeparatorProps = {
  /** Couleur de la section au-dessus (la vague « déborde » vers le bas) */
  topColor?: string;
  /** Couleur de la section en dessous */
  bottomColor?: string;
  className?: string;
  /** Inverser la courbure */
  flip?: boolean;
};

/**
 * Séparateur en vague SVG douce entre deux sections
 * (alternance fond blanc / fond vert pâle), conforme à la charte (section 2.5).
 */
export function WaveSeparator({
  topColor = "#FFFFFF",
  bottomColor = "#EAF4EC",
  className,
  flip = false,
}: WaveSeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full leading-[0]", className)}
      style={{ backgroundColor: bottomColor }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("block h-[44px] w-full sm:h-[72px]", flip && "-scale-x-100")}
        role="presentation"
      >
        <path
          d="M0,0 L0,52 C160,98 340,98 720,58 C1100,18 1280,18 1440,52 L1440,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}
