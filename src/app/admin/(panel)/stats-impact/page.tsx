import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteImpactStat } from "@/app/actions/admin-site";

export const metadata = { title: "Statistiques d'impact" };

export default async function Page() {
  const items = await safe(() => prisma.impactStat.findMany({ orderBy: { order: "asc" } }), []);

  return (
    <div>
      <AdminPageHeader
        title="Statistiques d'impact"
        description="Chiffres clés affichés sur la page d'accueil"
      >
        <Button asChild>
          <Link href="/admin/stats-impact/new">
            <Plus className="h-4 w-4" />
            Nouvelle statistique
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Libellé", "Valeur", "Icône", "Ordre", "Active", ""]}
        empty="Aucune statistique."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.label}</td>
            <td className="px-4 py-3 text-primary font-bold">{r.value}</td>
            <td className="px-4 py-3 text-muted">{r.icon}</td>
            <td className="px-4 py-3 text-muted">{r.order}</td>
            <td className="px-4 py-3">
              <span
                className={
                  r.active
                    ? "rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                    : "rounded-full bg-muted/10 px-2.5 py-0.5 text-xs font-semibold text-muted"
                }
              >
                {r.active ? "Oui" : "Non"}
              </span>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/stats-impact/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteImpactStat.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
