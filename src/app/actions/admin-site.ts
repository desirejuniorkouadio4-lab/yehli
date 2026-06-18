"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";
import { str, bool } from "@/lib/forms";
import { slugify } from "@/lib/utils";

type Res = { ok: boolean; error?: string };

const intOr0 = (v: string) => (v && /^-?\d+$/.test(v) ? parseInt(v, 10) : 0);
const statusOf = (v: string): PublishStatus =>
  v === "PUBLISHED" || v === "DRAFT" || v === "ARCHIVED" ? (v as PublishStatus) : "PUBLISHED";

// ── Témoignages ─────────────────────────────────────────────
export async function saveTestimonial(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const data = {
    name: str(formData, "name"),
    role: str(formData, "role") || null,
    content: str(formData, "content"),
    photo: str(formData, "photo") || null,
    order: intOr0(str(formData, "order")),
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePath("/admin/temoignages");
  redirect("/admin/temoignages");
}

export async function deleteTestimonial(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/temoignages");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Partenaires ─────────────────────────────────────────────
export async function savePartner(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const data = {
    name: str(formData, "name"),
    type: str(formData, "type") || null,
    description: str(formData, "description") || null,
    logo: str(formData, "logo") || null,
    website: str(formData, "website") || null,
    order: intOr0(str(formData, "order")),
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.partner.update({ where: { id }, data });
  else await prisma.partner.create({ data });
  revalidatePath("/admin/partenaires");
  redirect("/admin/partenaires");
}

export async function deletePartner(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.partner.delete({ where: { id } });
    revalidatePath("/admin/partenaires");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Équipe ──────────────────────────────────────────────────
export async function saveTeamMember(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const data = {
    name: str(formData, "name"),
    role: str(formData, "role"),
    bio: str(formData, "bio") || null,
    photo: str(formData, "photo") || null,
    email: str(formData, "email") || null,
    linkedin: str(formData, "linkedin") || null,
    order: intOr0(str(formData, "order")),
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.teamMember.update({ where: { id }, data });
  else await prisma.teamMember.create({ data });
  revalidatePath("/admin/equipe");
  redirect("/admin/equipe");
}

export async function deleteTeamMember(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/admin/equipe");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Statistiques d'impact ───────────────────────────────────
export async function saveImpactStat(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const data = {
    label: str(formData, "label"),
    value: str(formData, "value"),
    icon: str(formData, "icon") || null,
    order: intOr0(str(formData, "order")),
    active: bool(formData, "active"),
  };
  if (id) await prisma.impactStat.update({ where: { id }, data });
  else await prisma.impactStat.create({ data });
  revalidatePath("/admin/stats-impact");
  redirect("/admin/stats-impact");
}

export async function deleteImpactStat(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.impactStat.delete({ where: { id } });
    revalidatePath("/admin/stats-impact");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Catégories ──────────────────────────────────────────────
export async function saveCategory(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const name = str(formData, "name");
  const data = {
    name,
    slug: str(formData, "slug") ? slugify(str(formData, "slug")) : slugify(name),
    description: str(formData, "description") || null,
  };
  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible (catégorie utilisée ?)." };
  }
}

// ── Tags ────────────────────────────────────────────────────
export async function saveTag(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const name = str(formData, "name");
  const data = { name, slug: str(formData, "slug") ? slugify(str(formData, "slug")) : slugify(name) };
  if (id) await prisma.tag.update({ where: { id }, data });
  else await prisma.tag.create({ data });
  revalidatePath("/admin/tags");
  redirect("/admin/tags");
}

export async function deleteTag(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.tag.delete({ where: { id } });
    revalidatePath("/admin/tags");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Paramètres du site ──────────────────────────────────────
export async function saveSettings(formData: FormData) {
  const auth = await assertRole("ADMIN");
  if (!auth.ok) redirect("/admin/dashboard");
  const keys = [
    "site_name",
    "site_tagline",
    "site_description",
    "site_creator",
    "contact_email",
    "contact_phone",
    "contact_whatsapp",
    "contact_address",
    "social_facebook",
    "social_instagram",
    "social_linkedin",
    "social_youtube",
  ];
  for (const key of keys) {
    const value = str(formData, key);
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/", "layout");
  redirect("/admin/parametres?saved=1");
}
