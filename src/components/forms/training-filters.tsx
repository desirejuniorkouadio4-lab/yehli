"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { PillSelect } from "./floating-fields";
import { cn } from "@/lib/utils";

type Props = {
  themes: string[];
  audiences: string[];
  formats: string[];
};

export function TrainingFilters({ themes, audiences, formats }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [isPending, startTransition] = useTransition();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      startTransition(() =>
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }),
      );
    },
    [params, pathname, router],
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      if (search !== (params.get("search") ?? "")) setParam("search", search);
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const audience = params.get("audience") ?? "";
  const format = params.get("format") ?? "";
  const theme = params.get("theme") ?? "";

  const activeCount = [search, audience, format, theme].filter(Boolean).length;

  const reset = () => {
    setSearch("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
      {/* Barre de recherche */}
      <div className="relative">
        {isPending ? (
          <Loader2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted" />
        ) : (
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        )}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une formation…"
          aria-label="Rechercher une formation"
          className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Séparateur */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filtrer par
      </div>

      {/* Public cible - pills */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-dark">Public</p>
        <PillSelect
          options={audiences as string[]}
          value={audience}
          onChange={(v) => setParam("audience", v)}
          allLabel="Tous"
        />
      </div>

      {/* Format - pills */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-dark">Format</p>
        <PillSelect
          options={formats as string[]}
          value={format}
          onChange={(v) => setParam("format", v)}
          allLabel="Tous"
        />
      </div>

      {/* Thématique - select (liste trop longue pour des pills) */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-dark">Thématique</p>
        <select
          aria-label="Filtrer par thématique"
          value={theme}
          onChange={(e) => setParam("theme", e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Toutes les thématiques</option>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Réinitialiser */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-error/40 py-2 text-sm font-medium text-error transition-colors hover:bg-error/5",
          )}
        >
          <X className="h-4 w-4" />
          Effacer les filtres
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
            {activeCount}
          </span>
        </button>
      )}
    </div>
  );
}
