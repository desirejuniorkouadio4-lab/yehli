import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { ActionVM } from "@/lib/data/types";

export function ActionCard({ action }: { action: ActionVM }) {
  const Icon = getIcon(action.icon);
  return (
    <Link href={`/nos-actions/${action.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-mid hover:shadow-card-hover">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-dark transition-colors group-hover:text-primary">
          {action.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{action.shortDesc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </article>
    </Link>
  );
}
