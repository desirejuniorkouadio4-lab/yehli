"use server";

import { revalidatePath } from "next/cache";
import { assertRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

type Res = { ok: boolean; error?: string };

async function setStatus(id: string, status: "APPROVED" | "REJECTED"): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.articleComment.update({ where: { id }, data: { status } });
    revalidatePath("/admin/commentaires");
    return { ok: true };
  } catch {
    return { ok: false, error: "Action impossible." };
  }
}

export async function approveComment(id: string): Promise<Res> {
  return setStatus(id, "APPROVED");
}

export async function rejectComment(id: string): Promise<Res> {
  return setStatus(id, "REJECTED");
}

export async function deleteComment(id: string): Promise<Res> {
  const auth = await assertRole("EDITOR");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.articleComment.delete({ where: { id } });
    revalidatePath("/admin/commentaires");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
