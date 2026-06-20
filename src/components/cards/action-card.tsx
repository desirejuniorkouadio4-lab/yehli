import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { ActionVM } from "@/lib/data/types";

export function ActionCard({ action }: { action: ActionVM }) {
  const Icon = getIcon(action.icon);
  return (
    <Link href={`/nos-actions/${action.slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_12px_32px_-4px_rgba(26,107,42,0.18)]">
        {/* Voile vert qui monte au survol */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-primary/8 to-transparent transition-all duration-500 group-hover:h-full"
        />

        {/* Icône — grossit et passe en vert plein */}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
          <Icon className="h-7 w-7" />
        </span>

        <h3 className="relative mt-4 text-base font-bold leading-snug text-dark transition-colors duration-300 group-hover:text-primary">
          {action.title}
        </h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{action.shortDesc}</p>

        <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </article>
    </Link>
  );
}
