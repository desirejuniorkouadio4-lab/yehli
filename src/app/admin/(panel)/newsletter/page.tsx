import Link from "next/link";
import { Send } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ExportButton } from "@/components/admin/export-button";
import { AdminTableShell } from "@/components/admin/admin-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteNewsletterSubscriber } from "@/app/actions/admin-status";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Newsletter" };

export default async function Page() {
  const items = await safe(
    () => prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    [],
  );

  return (
    <div>
      <AdminPageHeader title="Abonnés à la newsletter" description={`${items.length} abonné(s)`}>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/newsletter/campagne">
              <Send className="h-4 w-4" />
              Composer une campagne
            </Link>
          </Button>
          <ExportButton type="newsletter" />
        </div>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Email", "Nom", "Inscription", "Actif", ""]}
        empty="Aucun abonné pour le moment."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-medium text-dark">{r.email}</td>
            <td className="px-4 py-3 text-muted">{r.name ?? "—"}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <span
                className={
                  r.active
                    ? "rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                    : "rounded-full bg-muted/10 px-2.5 py-0.5 text-xs font-semibold text-muted"
                }
              >
                {r.active ? "Actif" : "Inactif"}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <DeleteButton
                action={deleteNewsletterSubscriber.bind(null, r.id)}
                confirmLabel={`Supprimer l'abonné ${r.email} ?`}
              />
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
