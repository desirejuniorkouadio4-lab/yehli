"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Result = { ok: true; message: string } | { ok: false; error: string };

export async function changePassword(formData: FormData): Promise<Result> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { ok: false, error: "Non autorisé." };

  const current = (formData.get("currentPassword") as string | null)?.trim() ?? "";
  const next = (formData.get("newPassword") as string | null)?.trim() ?? "";
  const confirm = (formData.get("confirmPassword") as string | null)?.trim() ?? "";

  if (!current || !next || !confirm) return { ok: false, error: "Tous les champs sont requis." };
  if (next.length < 8) return { ok: false, error: "Le nouveau mot de passe doit contenir au moins 8 caractères." };
  if (next !== confirm) return { ok: false, error: "Les mots de passe ne correspondent pas." };

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { passwordHash: true } });
  if (!user?.passwordHash) return { ok: false, error: "Impossible de modifier ce compte (identité externe)." };

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) return { ok: false, error: "Mot de passe actuel incorrect." };

  const hash = await bcrypt.hash(next, 12);
  await prisma.user.update({ where: { id: session.user.id }, data: { passwordHash: hash } });

  return { ok: true, message: "Mot de passe mis à jour avec succès." };
}
