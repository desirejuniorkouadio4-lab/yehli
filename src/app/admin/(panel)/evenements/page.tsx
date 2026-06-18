import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/app/actions/admin-content";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Événements" };

export default async function Page() {
  const items = await safe(() => prisma.event.findMany({ orderBy: { startDate: "desc" } }), []);

  return (
    <div>
      <AdminPageHeader title="Événements" description={`${items.length} événement(s)`}>
        <Button asChild>
          <Link href="/admin/evenements/new">
            <Plus className="h-4 w-4" />
            Nouvel événement
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Titre", "Date", "Lieu", "Inscriptions", "Statut", ""]}
        empty="Aucun événement."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.title}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.startDate)}</td>
            <td className="px-4 py-3 text-muted">{r.city}</td>
            <td className="px-4 py-3">
              <span
                className={
                  r.registrationOpen
                    ? "rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                    : "rounded-full bg-muted/10 px-2.5 py-0.5 text-xs font-semibold text-muted"
                }
              >
                {r.registrationOpen ? "Ouvertes" : "Fermées"}
              </span>
            </td>
            <td className="px-4 py-3">
              <StatusBadge status={r.status} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/evenements/${r.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Voir sur le site"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/evenements/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteEvent.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
