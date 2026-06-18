import { getIcon } from "@/lib/icons";
import { CountUp } from "@/components/shared/count-up";
import type { ImpactStatVM } from "@/lib/data/types";

export function ImpactStrip({ stats }: { stats: ImpactStatVM[] }) {
  if (!stats.length) return null;
  const items = stats.slice(0, 4);

  return (
    <div className="relative bg-primary py-10 sm:py-12">
      {/* Accent décoratif */}
      <span
        aria-hidden="true"
        className="absolute right-10 top-4 h-20 w-20 rounded-full bg-accent/15 blur-2xl"
      />
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 lg:grid-cols-4">
          {items.map((stat, i) => {
            const Icon = getIcon(stat.icon);
            return (
              <div
                key={stat.label}
                className="relative flex flex-col items-center text-center"
              >
                {/* Séparateur vertical entre les items (desktop) */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/15 lg:block"
                  />
                )}
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </span>
                <CountUp
                  value={stat.value}
                  className="font-heading text-3xl font-bold text-white sm:text-4xl"
                />
                <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60">
                  {stat.label}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
