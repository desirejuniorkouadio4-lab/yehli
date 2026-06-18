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
const intOrNull = (v: string) => (v && /^\d+$/.test(v) ? parseInt(v, 10) : null);
const statusOf = (v: string): PublishStatus =>
  v === "PUBLISHED" || v === "DRAFT" || v === "ARCHIVED" ? (v as PublishStatus) : "DRAFT";

// ── Formations ──────────────────────────────────────────────
export async function saveTraining(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const title = str(formData, "title");
  const data = {
    title,
    slug: slugify(str(formData, "slug") || title),
    summary: str(formData, "summary") || null,
    description: str(formData, "description"),
    objectives: str(formData, "objectives") || null,
    targetAudience: str(formData, "targetAudience") || null,
    duration: str(formData, "duration") || null,
    format: str(formData, "format") || null,
    theme: str(formData, "theme") || null,
    prerequisites: str(formData, "prerequisites") || null,
    image: str(formData, "image") || null,
    status: statusOf(str(formData, "status")),
    metaTitle: str(formData, "metaTitle") || null,
    metaDescription: str(formData, "metaDescription") || null,
  };
  if (id) await prisma.training.update({ where: { id }, data });
  else await prisma.training.create({ data });
  revalidatePath("/admin/formations");
  revalidatePath("/formations");
  redirect("/admin/formations");
}

export async function deleteTraining(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.training.delete({ where: { id } });
    revalidatePath("/admin/formations");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Axes d'action ───────────────────────────────────────────
export async function saveAction(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const title = str(formData, "title");
  const data = {
    title,
    slug: slugify(str(formData, "slug") || title),
    shortDesc: str(formData, "shortDesc") || null,
    description: str(formData, "description"),
    targetAudience: str(formData, "targetAudience") || null,
    objectives: str(formData, "objectives") || null,
    image: str(formData, "image") || null,
    icon: str(formData, "icon") || null,
    order: intOr0(str(formData, "order")),
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.actionProgram.update({ where: { id }, data });
  else await prisma.actionProgram.create({ data });
  revalidatePath("/admin/actions");
  revalidatePath("/nos-actions");
  redirect("/admin/actions");
}

export async function deleteAction(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.actionProgram.delete({ where: { id } });
    revalidatePath("/admin/actions");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}

// ── Événements ──────────────────────────────────────────────
export async function saveEvent(id: string | null, formData: FormData) {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) redirect("/admin/dashboard");
  const title = str(formData, "title");
  const startRaw = str(formData, "startDate");
  const endRaw = str(formData, "endDate");
  const data = {
    title,
    slug: slugify(str(formData, "slug") || title),
    description: str(formData, "description"),
    startDate: startRaw ? new Date(startRaw) : new Date(),
    endDate: endRaw ? new Date(endRaw) : null,
    location: str(formData, "location") || null,
    city: str(formData, "city") || null,
    country: str(formData, "country") || null,
    coverImage: str(formData, "coverImage") || null,
    capacity: intOrNull(str(formData, "capacity")),
    registrationOpen: bool(formData, "registrationOpen"),
    status: statusOf(str(formData, "status")),
  };
  if (id) await prisma.event.update({ where: { id }, data });
  else await prisma.event.create({ data });
  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
  redirect("/admin/evenements");
}

export async function deleteEvent(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/evenements");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
