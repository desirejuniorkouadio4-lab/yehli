import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DEMO_ARTICLES, DEMO_CATEGORIES, DEMO_TAGS } from "@/lib/content/demo-content";
import type { ArticleVM, CategoryVM, TagVM } from "./types";

const articleSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  coverImage: true,
  publishedAt: true,
  author: { select: { name: true } },
  category: { select: { name: true, slug: true } },
  tags: { select: { tag: { select: { name: true, slug: true } } } },
} satisfies Prisma.ArticleSelect;

type ArticleRow = Prisma.ArticleGetPayload<{ select: typeof articleSelect }>;

function toArticleVM(a: ArticleRow): ArticleVM {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    coverImage: a.coverImage,
    publishedAt: a.publishedAt,
    author: a.author?.name ?? null,
    category: a.category ? { name: a.category.name, slug: a.category.slug } : null,
    tags: a.tags.map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
  };
}

type ArticleQuery = {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};

function filterDemoArticles(opts: ArticleQuery): ArticleVM[] {
  let list = [...DEMO_ARTICLES];
  if (opts.category) list = list.filter((a) => a.category?.slug === opts.category);
  if (opts.tag) list = list.filter((a) => a.tags.some((t) => t.slug === opts.tag));
  if (opts.search) {
    const q = opts.search.toLowerCase();
    list = list.filter((a) =>
      `${a.title} ${a.excerpt ?? ""}`.toLowerCase().includes(q),
    );
  }
  return list.sort(
    (a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0),
  );
}

function paginate(list: ArticleVM[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return { items: list.slice(start, start + pageSize), total: list.length };
}

export async function getArticles(
  opts: ArticleQuery = {},
): Promise<{ items: ArticleVM[]; total: number }> {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 12;
  const hasFilters = Boolean(opts.category || opts.tag || opts.search);

  try {
    const where: Prisma.ArticleWhereInput = {
      status: "PUBLISHED",
      publishedAt: { not: null },
    };
    if (opts.category) where.category = { slug: opts.category };
    if (opts.tag) where.tags = { some: { tag: { slug: opts.tag } } };
    if (opts.search) {
      where.OR = [
        { title: { contains: opts.search, mode: "insensitive" } },
        { excerpt: { contains: opts.search, mode: "insensitive" } },
        { content: { contains: opts.search, mode: "insensitive" } },
      ];
    }

    const [rows, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: articleSelect,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.article.count({ where }),
    ]);

    if (total === 0 && !hasFilters) {
      return paginate(filterDemoArticles(opts), page, pageSize);
    }
    return { items: rows.map(toArticleVM), total };
  } catch {
    return paginate(filterDemoArticles(opts), page, pageSize);
  }
}

export async function getRecentArticles(limit = 3): Promise<ArticleVM[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED", publishedAt: { not: null } },
      select: articleSelect,
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    return rows.length ? rows.map(toArticleVM) : filterDemoArticles({}).slice(0, limit);
  } catch {
    return filterDemoArticles({}).slice(0, limit);
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleVM | null> {
  try {
    const a = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      select: articleSelect,
    });
    if (a) return toArticleVM(a);
    return DEMO_ARTICLES.find((x) => x.slug === slug) ?? null;
  } catch {
    return DEMO_ARTICLES.find((x) => x.slug === slug) ?? null;
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  categorySlug?: string | null,
  limit = 3,
): Promise<ArticleVM[]> {
  try {
    const rows = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        slug: { not: currentSlug },
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
      select: articleSelect,
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    if (rows.length) return rows.map(toArticleVM);
  } catch {
    // repli ci-dessous
  }
  return filterDemoArticles({})
    .filter((a) => a.slug !== currentSlug && (!categorySlug || a.category?.slug === categorySlug))
    .slice(0, limit);
}

export async function getCategories(): Promise<CategoryVM[]> {
  try {
    const rows = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        _count: { select: { articles: true } },
      },
    });
    if (!rows.length) return DEMO_CATEGORIES;
    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      count: c._count.articles,
    }));
  } catch {
    return DEMO_CATEGORIES;
  }
}

export async function getTags(): Promise<TagVM[]> {
  try {
    const rows = await prisma.tag.findMany({ orderBy: { name: "asc" } });
    if (!rows.length) return DEMO_TAGS;
    return rows.map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
  } catch {
    return DEMO_TAGS;
  }
}
