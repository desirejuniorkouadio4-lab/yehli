"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/select";

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
      startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    },
    [params, pathname, router],
  );

  // Recherche avec léger anti-rebond.
  useEffect(() => {
    const handle = setTimeout(() => {
      if (search !== (params.get("search") ?? "")) setParam("search", search);
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasFilters =
    Boolean(search) ||
    Boolean(params.get("theme")) ||
    Boolean(params.get("audience")) ||
    Boolean(params.get("format"));

  const reset = () => {
    setSearch("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.5fr,1fr,1fr,1fr]">
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
            className="h-11 w-full rounded-md border border-border bg-white pl-10 pr-4 text-[0.9375rem] text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Select
          aria-label="Filtrer par thématique"
          value={params.get("theme") ?? ""}
          onChange={(e) => setParam("theme", e.target.value)}
        >
          <option value="">Toutes les thématiques</option>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filtrer par public"
          value={params.get("audience") ?? ""}
          onChange={(e) => setParam("audience", e.target.value)}
        >
          <option value="">Tous les publics</option>
          {audiences.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filtrer par format"
          value={params.get("format") ?? ""}
          onChange={(e) => setParam("format", e.target.value)}
        >
          <option value="">Tous les formats</option>
          {formats.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </Select>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={reset}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light"
        >
          <X className="h-4 w-4" />
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
