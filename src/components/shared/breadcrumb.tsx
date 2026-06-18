import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";

export type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  items: Crumb[];
  className?: string;
  /** Variante claire pour les en-têtes sur fond vert */
  light?: boolean;
};

export function Breadcrumb({ items, className, light = false }: BreadcrumbProps) {
  const allItems: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <JsonLd data={breadcrumbLd} />
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm",
          light ? "text-white/75" : "text-muted",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "transition-colors",
              light ? "hover:text-white" : "hover:text-primary",
            )}
          >
            Accueil
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "hover:text-white" : "hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={cn("font-medium", light ? "text-white" : "text-dark")}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
