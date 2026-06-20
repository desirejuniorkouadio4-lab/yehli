import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminFormCard } from "@/components/admin/form-controls";
import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { ROLE_LABELS } from "@/lib/roles";
import { User, Shield } from "lucide-react";

export const metadata = { title: "Mon compte" };

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id
    ? await safe(() => prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, role: true, createdAt: true },
      }), null)
    : null;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <AdminPageHeader title="Mon compte" />

      {/* Infos du compte */}
      <AdminFormCard>
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-muted" />
          <h2 className="font-bold text-dark">Informations du compte</h2>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <dt className="w-24 shrink-0 font-semibold text-muted">Nom</dt>
            <dd className="text-dark">{user?.name || session?.user?.name || "—"}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="w-24 shrink-0 font-semibold text-muted">Email</dt>
            <dd className="text-dark">{user?.email || session?.user?.email || "—"}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="w-24 shrink-0 font-semibold text-muted">Rôle</dt>
            <dd className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-primary">
                {user?.role ? ROLE_LABELS[user.role] : "—"}
              </span>
            </dd>
          </div>
          {user?.createdAt && (
            <div className="flex items-center gap-3">
              <dt className="w-24 shrink-0 font-semibold text-muted">Membre depuis</dt>
              <dd className="text-dark">
                {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(user.createdAt)}
              </dd>
            </div>
          )}
        </dl>
      </AdminFormCard>

      {/* Changement de mot de passe */}
      <ChangePasswordForm />
    </div>
  );
}
