import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { requireRole } from "@/lib/rbac";
import { ROLE_LABELS } from "@/lib/roles";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Select, SubmitBar } from "@/components/admin/form-controls";
import { saveUser } from "@/app/actions/admin-users";

export const metadata = { title: "Utilisateur" };

const ROLES = ["VIEWER", "EDITOR", "ADMIN", "SUPER_ADMIN"] as const;

export default async function Page({ params }: { params: { id: string } }) {
  await requireRole("SUPER_ADMIN");
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.user.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveUser.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-xl">
      <AdminPageHeader title={isNew ? "Nouvel utilisateur" : "Modifier l'utilisateur"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name">
              <Input id="name" name="name" defaultValue={record?.name ?? ""} />
            </AdminField>
            <AdminField label="Email" htmlFor="email" required>
              <Input id="email" name="email" type="email" defaultValue={record?.email ?? ""} required />
            </AdminField>
            <AdminField label="Rôle" htmlFor="role">
              <Select id="role" name="role" defaultValue={record?.role ?? "VIEWER"}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </Select>
            </AdminField>
            <AdminField
              label="Mot de passe"
              htmlFor="password"
              hint={isNew ? "Requis pour pouvoir se connecter" : "Laisser vide pour conserver le mot de passe actuel"}
            >
              <Input id="password" name="password" type="password" autoComplete="new-password" />
            </AdminField>
            <SubmitBar cancelHref="/admin/utilisateurs" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
