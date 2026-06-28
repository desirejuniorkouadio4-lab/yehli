"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, ArrowRight, MapPin } from "lucide-react";

type Props = {
  title: string;
  slug: string;
  startDate: string; // ISO
  city?: string | null;
};

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-heading text-3xl font-black tabular-nums text-primary shadow-md sm:h-20 sm:w-20 sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">{label}</span>
    </div>
  );
}

export function EventCountdown({ title, slug, startDate, city }: Props) {
  const target = new Date(startDate).getTime();
  // null jusqu'au montage côté client → évite tout mismatch d'hydratation.
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t?.done) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark to-[#10101e] p-7 text-white shadow-xl sm:p-10">
          <div aria-hidden="true" className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-accent">
                <CalendarClock className="h-4 w-4" />
                Prochain événement
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
              {city && (
                <p className="mt-2 flex items-center gap-1.5 text-white/70">
                  <MapPin className="h-4 w-4" />
                  {city}
                </p>
              )}
              <Link
                href={`/evenements/${slug}`}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-dark transition-transform hover:scale-105"
              >
                S&apos;inscrire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <Unit value={t?.days ?? 0} label="Jours" />
              <Unit value={t?.hours ?? 0} label="Heures" />
              <Unit value={t?.minutes ?? 0} label="Min" />
              <Unit value={t?.seconds ?? 0} label="Sec" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
