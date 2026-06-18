"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PublishStatus, MediaType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";
import { str } from "@/lib/forms";
import { slugify } from "@/lib/utils";

type Res = { ok: boolean; error?: string };

const statusOf = (v: string): PublishStatus =>
  v === "PUBLISHED" || v === "DRAFT" || v === "ARCHIVED" ? (v as PublishStatus) : "PUBLISHED";

// ── Albums ──────────────────────────────────────────────────
export async function saveAlbum(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const title = str(formData, "title");
  const data = {
    title,
    slug: slugify(str(formData, "slug") || title),
    description: str(formData, "description") || null,
    coverImage: str(formData, "coverImage") || null,
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.galleryAlbum.update({ where: { id }, data });
  else await prisma.galleryAlbum.create({ data });
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
  redirect("/admin/galerie");
}

export async function deleteAlbum(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.galleryItem.updateMany({ where: { albumId: id }, data: { albumId: null } });
    await prisma.galleryAlbum.delete({ where: { id } });
    revalidatePath("/admin/galerie");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Médias ──────────────────────────────────────────────────
export async function saveGalleryItem(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const typeRaw = str(formData, "type");
  const dateRaw = str(formData, "date");
  const data = {
    title: str(formData, "title"),
    description: str(formData, "description") || null,
    type: (typeRaw === "VIDEO" ? "VIDEO" : "IMAGE") as MediaType,
    url: str(formData, "url"),
    thumbnail: str(formData, "thumbnail") || null,
    date: dateRaw ? new Date(dateRaw) : null,
    location: str(formData, "location") || null,
    albumId: str(formData, "albumId") || null,
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.galleryItem.update({ where: { id }, data });
  else await prisma.galleryItem.create({ data });
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
  redirect("/admin/galerie");
}

export async function deleteGalleryItem(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.galleryItem.delete({ where: { id } });
    revalidatePath("/admin/galerie");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
