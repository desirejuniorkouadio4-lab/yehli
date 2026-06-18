import type { UserRole } from "@prisma/client";

// Helpers de rôles purs (sans dépendance serveur) — utilisables côté client.

export const ROLE_RANK: Record<UserRole, number> = {
  VIEWER: 1,
  EDITOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  VIEWER: "Lecteur",
  EDITOR: "Éditeur",
  ADMIN: "Administrateur",
  SUPER_ADMIN: "Super administrateur",
};

export function roleAtLeast(role: UserRole, min: UserRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

export function canEditContent(role: UserRole): boolean {
  return roleAtLeast(role, "EDITOR");
}

export function canManage(role: UserRole): boolean {
  return roleAtLeast(role, "ADMIN");
}

export function canManageUsers(role: UserRole): boolean {
  return role === "SUPER_ADMIN";
}
