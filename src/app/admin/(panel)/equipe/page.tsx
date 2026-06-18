import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteTeamMember } from "@/app/actions/admin-site";

export const metadata = { title: "Équipe" };

export default async function Page() {
  const items = await safe(() => prisma.teamMember.findMany({ orderBy: { order: "asc" } }), []);

  return (
    <div>
      <AdminPageHeader title="Équipe" description={`${items.length} membre(s)`}>
        <Button asChild>
          <Link href="/admin/equipe/new">
            <Plus className="h-4 w-4" />
            Nouveau membre
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Nom", "Rôle", "Ordre", "Statut", ""]}
        empty="Aucun membre."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.name}</td>
            <td className="px-4 py-3 text-muted">{r.role}</td>
            <td className="px-4 py-3 text-muted">{r.order}</td>
            <td className="px-4 py-3">
              <StatusBadge status={r.status} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/equipe/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteTeamMember.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
