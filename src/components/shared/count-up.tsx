"use client";

import * as React from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  /** Valeur à afficher, ex. "300+", "50+", "1 200" */
  value: string;
  /** Durée de l'animation en millisecondes */
  duration?: number;
  className?: string;
};

/**
 * Compteur animé déclenché à l'entrée dans le viewport.
 * Extrait la partie numérique de `value` et conserve préfixe / suffixe.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = String(value).match(/\d[\d\s.,]*\d|\d/);
  const target = match ? Number(match[0].replace(/[^\d.]/g, "")) : null;
  const prefix = match ? value.slice(0, match.index ?? 0) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView || target === null) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}
