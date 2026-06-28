"use client";

import { useEffect, useRef, useState } from "react";
import { Target, TrendingUp } from "lucide-react";

type Props = {
  label: string;
  description?: string;
  current: number;
  target: number;
  unit?: string;
};

export function GoalProgress({ label, description, current, target, unit }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  // Anime à l'entrée dans le viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Compteur animé
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * current));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, current]);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-7 text-white shadow-xl shadow-primary/20 sm:p-10"
        >
          {/* Halo décoratif */}
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Target className="h-6 w-6 text-accent" />
              </span>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">{label}</h2>
            </div>

            {description && <p className="mt-3 max-w-2xl text-pretty text-white/85">{description}</p>}

            {/* Chiffres */}
            <div className="mt-7 flex items-end justify-between gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl font-black tabular-nums sm:text-5xl">{count}</span>
                <span className="text-lg text-white/70">/ {target} {unit}</span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold">
                <TrendingUp className="h-4 w-4 text-accent" />
                {pct}%
              </span>
            </div>

            {/* Barre */}
            <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light ease-out [transition:width_1500ms_ease-out]"
                style={{ width: visible ? `${pct}%` : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
