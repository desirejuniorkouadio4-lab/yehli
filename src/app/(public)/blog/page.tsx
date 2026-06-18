import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ArticleCard } from "@/components/cards/article-card";
import { SearchBox } from "@/components/forms/search-box";
import { Pagination } from "@/components/shared/pagination";
import { getArticles, getCategories } from "@/lib/data/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & ressources",
  description:
    "Articles de vulgarisation scientifique, réflexions pédagogiques et actualités de YEHLI : physique-chimie, intelligence artificielle, environnement, éducation inclusive et pensée critique.",
  alternates: { canonical: "/blog" },
};

const PAGE_SIZE = 9;

type Props = {
  searchParams: { category?: string; tag?: string; search?: string; page?: string };
};

export default async function BlogPage({ searchParams }: Props) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [{ items, total }, categories] = await Promise.all([
    getArticles({
      category: searchParams.category,
      tag: searchParams.tag,
      search: searchParams.search,
      page,
      pageSize: PAGE_SIZE,
    }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const activeCategory = searchParams.category;

  const categoryHref = (slug?: string) => {
    const sp = new URLSearchParams();
    if (slug) sp.set("category", slug);
    if (searchParams.search) sp.set("search", searchParams.search);
    const qs = sp.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Blog", href: "/blog" }]}
        badge="Blog & ressources"
        title="Le blog de YEHLI"
        subtitle="Comprendre, s'inspirer, agir : nos ressources de vulgarisation scientifique et nos réflexions sur l'éducation."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Link
                href={categoryHref()}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  !activeCategory
                    ? "bg-primary text-white"
                    : "bg-primary-pale text-primary hover:bg-primary-mid",
                )}
              >
                Toutes
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={categoryHref(cat.slug)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeCategory === cat.slug
                      ? "bg-primary text-white"
                      : "bg-primary-pale text-primary hover:bg-primary-mid",
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Suspense fallback={<div className="h-11 w-full max-w-xs rounded-full bg-surface" />}>
              <SearchBox placeholder="Rechercher un article…" className="w-full lg:max-w-xs" />
            </Suspense>
          </div>

          {items.length > 0 ? (
            <>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/blog"
                params={{ category: searchParams.category, search: searchParams.search, tag: searchParams.tag }}
              />
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
              <Newspaper className="h-12 w-12 text-muted" />
              <p className="text-lg font-semibold text-dark">Aucun article trouvé</p>
              <p className="max-w-md text-pretty text-muted">
                Aucun article ne correspond à votre recherche pour le moment.
              </p>
              <Link href="/blog" className="font-semibold text-primary hover:text-primary-light">
                Voir tous les articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
