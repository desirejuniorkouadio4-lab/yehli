"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";
import { str } from "@/lib/forms";
import { slugify } from "@/lib/utils";
import { sanitizeRichHtml } from "@/lib/sanitize";

type Res = { ok: boolean; error?: string };

const statusOf = (v: string): PublishStatus =>
  v === "PUBLISHED" || v === "DRAFT" || v === "ARCHIVED" ? (v as PublishStatus) : "DRAFT";

export async function saveArticle(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");

  const title = str(formData, "title");
  const status = statusOf(str(formData, "status"));
  const content = sanitizeRichHtml(str(formData, "content"));
  const tagIds = formData.getAll("tags").filter((v): v is string => typeof v === "string" && v.length > 0);

  const base = {
    title,
    slug: slugify(str(formData, "slug") || title),
    excerpt: str(formData, "excerpt") || null,
    content,
    coverImage: str(formData, "coverImage") || null,
    status,
    categoryId: str(formData, "categoryId") || null,
    metaTitle: str(formData, "metaTitle") || null,
    metaDescription: str(formData, "metaDescription") || null,
  };

  let articleId: string;
  if (id) {
    const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true } });
    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...base,
        publishedAt: status === "PUBLISHED" ? existing?.publishedAt ?? new Date() : null,
      },
    });
    articleId = updated.id;
    await prisma.articleTag.deleteMany({ where: { articleId } });
  } else {
    const created = await prisma.article.create({
      data: {
        ...base,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        authorId: auth.userId !== "preview-admin" ? auth.userId : null,
      },
    });
    articleId = created.id;
  }

  if (tagIds.length) {
    await prisma.articleTag.createMany({
      data: tagIds.map((tagId) => ({ articleId, tagId })),
      skipDuplicates: true,
    });
  }

  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.articleTag.deleteMany({ where: { articleId: id } });
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/articles");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
