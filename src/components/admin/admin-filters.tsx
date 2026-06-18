import Link from "next/link";
import { Suspense } from "react";
import { SearchBox } from "@/components/forms/search-box";
import { STATUS_LABELS } from "./status-badge";
import { cn } from "@/lib/utils";

function pill(active: boolean) {
  return cn(
    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
    active ? "bg-primary text-white" : "bg-white border border-border text-body hover:border-primary-mid",
  );
}

export function AdminFilters({
  basePath,
  statuses,
  active,
  search = true,
}: {
  basePath: string;
  statuses: string[];
  active?: string;
  search?: boolean;
}) {
  const href = (status?: string) => (status ? `${basePath}?status=${status}` : basePath);
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-1.5">
        <Link href={href()} className={pill(!active)}>
          Tous
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={href(s)} className={pill(active === s)}>
            {STATUS_LABELS[s] ?? s}
          </Link>
        ))}
      </div>
      {search && (
        <Suspense fallback={<div className="h-11 lg:w-64" />}>
          <SearchBox paramKey="q" placeholder="Rechercher…" className="lg:w-64" />
        </Suspense>
      )}
    </div>
  );
}
