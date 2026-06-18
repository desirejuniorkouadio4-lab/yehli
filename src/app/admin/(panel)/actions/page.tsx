import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteAction } from "@/app/actions/admin-content";

export const metadata = { title: "Actions" };

export default async function Page() {
  const items = await safe(() => prisma.actionProgram.findMany({ orderBy: { order: "asc" } }), []);

  return (
    <div>
      <AdminPageHeader title="Axes d'action" description={`${items.length} axe(s) d'intervention`}>
        <Button asChild>
          <Link href="/admin/actions/new">
            <Plus className="h-4 w-4" />
            Nouvel axe
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Titre", "Icône", "Ordre", "Statut", ""]}
        empty="Aucun axe d'action."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.title}</td>
            <td className="px-4 py-3 text-muted">{r.icon}</td>
            <td className="px-4 py-3 text-muted">{r.order}</td>
            <td className="px-4 py-3">
              <StatusBadge status={r.status} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/nos-actions/${r.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Voir sur le site"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/actions/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteAction.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
