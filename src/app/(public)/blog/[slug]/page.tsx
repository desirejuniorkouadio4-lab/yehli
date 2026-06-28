import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { RichContent } from "@/components/shared/rich-content";
import { SocialShare } from "@/components/shared/social-share";
import { Avatar } from "@/components/shared/avatar";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ArticleComments } from "@/components/blog/article-comments";
import { getApprovedComments } from "@/lib/data/comments";
import { getArticles, getArticleBySlug, getRelatedArticles } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/config/site";

type Props = { params: { slug: string } };

export const revalidate = 3600;

export async function generateStaticParams() {
  const { items } = await getArticles({ pageSize: 1000 });
  return items.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.slug, article.category?.slug, 3);
  const comments = await getApprovedComments(article.id);
  const url = `${SITE.url}/blog/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    image: article.coverImage ?? undefined,
    datePublished: article.publishedAt?.toISOString(),
    author: { "@type": "Organization", name: article.author ?? "YEHLI" },
    publisher: { "@type": "Organization", name: "YEHLI" },
    mainEntityOfPage: url,
  };

  return (
    <article className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: article.title, href: `/blog/${article.slug}` },
            ]}
            className="mb-6"
          />
          {article.category && (
            <Link href={`/blog?category=${article.category.slug}`}>
              <Badge variant="yellow">{article.category.name}</Badge>
            </Link>
          )}
          <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.15] text-dark sm:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            {article.author && (
              <span className="flex items-center gap-2">
                <Avatar name={article.author} size={32} className="h-8 w-8 text-xs" />
                <span className="font-medium text-dark">{article.author}</span>
              </span>
            )}
            {article.publishedAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={article.publishedAt.toISOString()}>
                  {formatDate(article.publishedAt)}
                </time>
              </span>
            )}
          </div>
        </div>

        {article.coverImage && (
          <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-primary-pale">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr,320px]">
          <div className="mx-auto w-full max-w-3xl lg:mx-0">
            <RichContent html={article.content} />
            {article.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog?tag=${tag.slug}`}
                    className="rounded-full bg-surface px-3 py-1 text-sm text-muted transition-colors hover:bg-primary-pale hover:text-primary"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
            <div className="mt-8 border-t border-border pt-6">
              <SocialShare url={url} title={article.title} />
            </div>

            <ArticleComments articleId={article.id} articleSlug={article.slug} comments={comments} />
          </div>

          <aside className="space-y-8">
            {related.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-dark">À lire aussi</h2>
                <ul className="mt-4 space-y-4">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link href={`/blog/${item.slug}`} className="group flex gap-3">
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-primary-pale">
                          {item.coverImage && (
                            <Image
                              src={item.coverImage}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="text-sm font-semibold leading-snug text-dark group-hover:text-primary line-clamp-3">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-primary-mid bg-primary-pale p-6">
              <h2 className="text-lg font-bold text-dark">Newsletter</h2>
              <p className="mt-2 text-sm text-muted">
                Recevez nos prochains articles directement dans votre boîte mail.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
