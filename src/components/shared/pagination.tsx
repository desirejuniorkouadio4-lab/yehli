import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | undefined>;
};

function buildHref(basePath: string, params: Record<string, string | undefined>, page: number) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value && key !== "page") sp.set(key, value);
  }
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ currentPage, totalPages, basePath, params = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const from = Math.max(1, currentPage - 2);
  const to = Math.min(totalPages, currentPage + 2);
  for (let i = from; i <= to; i++) pages.push(i);

  const linkBase =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1.5">
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, params, currentPage - 1)}
          className={cn(linkBase, "border border-border text-dark hover:border-primary hover:text-primary")}
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(linkBase, "cursor-not-allowed border border-border text-muted/50")}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {from > 1 && (
        <>
          <Link href={buildHref(basePath, params, 1)} className={cn(linkBase, "text-dark hover:bg-primary-pale")}>
            1
          </Link>
          {from > 2 && <span className="px-1 text-muted">…</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(basePath, params, page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            linkBase,
            page === currentPage
              ? "bg-primary text-white"
              : "text-dark hover:bg-primary-pale",
          )}
        >
          {page}
        </Link>
      ))}

      {to < totalPages && (
        <>
          {to < totalPages - 1 && <span className="px-1 text-muted">…</span>}
          <Link
            href={buildHref(basePath, params, totalPages)}
            className={cn(linkBase, "text-dark hover:bg-primary-pale")}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(basePath, params, currentPage + 1)}
          className={cn(linkBase, "border border-border text-dark hover:border-primary hover:text-primary")}
          aria-label="Page suivante"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(linkBase, "cursor-not-allowed border border-border text-muted/50")}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
