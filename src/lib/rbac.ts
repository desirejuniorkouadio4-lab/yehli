import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { authOptions } from "./auth";
import { roleAtLeast } from "./roles";

export { roleAtLeast, canEditContent, canManage, canManageUsers, ROLE_LABELS } from "./roles";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/** Redirige vers la connexion si non authentifié. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Exige un rôle minimum ; sinon redirige vers le tableau de bord. */
export async function requireRole(min: UserRole) {
  const user = await requireUser();
  if (!roleAtLeast(user.role, min)) redirect("/admin/dashboard");
  return user;
}

/** Variante pour les server actions : renvoie une erreur plutôt qu'une redirection. */
export async function assertRole(
  min: UserRole,
): Promise<{ ok: true; userId: string; role: UserRole } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Vous devez être connecté." };
  if (!roleAtLeast(user.role, min)) return { ok: false, error: "Droits insuffisants pour cette action." };
  return { ok: true, userId: user.id, role: user.role };
}
