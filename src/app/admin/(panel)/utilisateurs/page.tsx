import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { requireRole } from "@/lib/rbac";
import { ROLE_LABELS } from "@/lib/roles";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/app/actions/admin-users";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Utilisateurs" };

export default async function Page() {
  await requireRole("SUPER_ADMIN");
  const items = await safe(
    () =>
      prisma.user.findMany({
        orderBy: { createdAt: "asc" },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
    [],
  );

  return (
    <div>
      <AdminPageHeader title="Utilisateurs" description={`${items.length} utilisateur(s)`}>
        <Button asChild>
          <Link href="/admin/utilisateurs/new">
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Nom", "Email", "Rôle", "Créé le", ""]}
        empty="Aucun utilisateur."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.name ?? "—"}</td>
            <td className="px-4 py-3 text-muted">{r.email}</td>
            <td className="px-4 py-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {ROLE_LABELS[r.role]}
              </span>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/utilisateurs/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteUser.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
