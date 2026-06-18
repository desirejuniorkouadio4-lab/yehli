import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { ArticleVM } from "@/lib/data/types";

export function ArticleCard({ article }: { article: ArticleVM }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <div className="relative aspect-[16/9] overflow-hidden bg-primary-pale">
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {article.category && (
            <Badge variant="yellow" className="absolute left-3 top-3 shadow-sm">
              {article.category.name}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            {article.author && <span className="font-medium">{article.author}</span>}
            {article.author && article.publishedAt && <span aria-hidden="true">·</span>}
            {article.publishedAt && (
              <time dateTime={article.publishedAt.toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
          <h3 className="mt-2 text-lg font-bold leading-snug text-dark transition-colors group-hover:text-primary line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <span className="mt-4 text-sm font-semibold text-primary">Lire l&apos;article →</span>
        </div>
      </article>
    </Link>
  );
}
