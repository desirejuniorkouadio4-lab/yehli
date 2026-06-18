import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteTraining } from "@/app/actions/admin-content";

export const metadata = { title: "Formations" };

export default async function Page() {
  const items = await safe(
    () => prisma.training.findMany({ orderBy: { createdAt: "desc" } }),
    [],
  );

  return (
    <div>
      <AdminPageHeader title="Formations" description={`${items.length} formation(s)`}>
        <Button asChild>
          <Link href="/admin/formations/new">
            <Plus className="h-4 w-4" />
            Nouvelle formation
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Titre", "Thème", "Public", "Statut", ""]}
        empty="Aucune formation."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.title}</td>
            <td className="px-4 py-3 text-muted">{r.theme}</td>
            <td className="px-4 py-3 text-muted">{r.targetAudience}</td>
            <td className="px-4 py-3">
              <StatusBadge status={r.status} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/formations/${r.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Voir sur le site"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/formations/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteTraining.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
