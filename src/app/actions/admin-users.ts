"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";
import { str } from "@/lib/forms";

type Res = { ok: boolean; error?: string };

const roleOf = (v: string): UserRole =>
  v === "SUPER_ADMIN" || v === "ADMIN" || v === "EDITOR" || v === "VIEWER" ? (v as UserRole) : "VIEWER";

export async function saveUser(id: string | null, formData: FormData) {
  const auth = await assertRole("SUPER_ADMIN");
  if (!auth.ok) redirect("/admin/dashboard");

  const name = str(formData, "name") || null;
  const email = str(formData, "email").toLowerCase();
  const role = roleOf(str(formData, "role"));
  const password = str(formData, "password");

  if (id) {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
      },
    });
  } else {
    await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash: password ? await bcrypt.hash(password, 12) : null,
      },
    });
  }
  revalidatePath("/admin/utilisateurs");
  redirect("/admin/utilisateurs");
}

export async function deleteUser(id: string): Promise<Res> {
  const auth = await assertRole("SUPER_ADMIN");
  if (!auth.ok) return { ok: false, error: auth.error };
  if (auth.userId === id) return { ok: false, error: "Vous ne pouvez pas supprimer votre propre compte." };
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/utilisateurs");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
