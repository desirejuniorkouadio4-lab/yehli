import Link from "next/link";
import { Eye } from "lucide-react";
import { RequestStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminFilters } from "@/components/admin/admin-filters";
import { ExportButton } from "@/components/admin/export-button";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusSelect } from "@/components/admin/status-select";
import { statusOptions, STATUS_SETS } from "@/lib/admin/status-options";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Messages" };

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const where: Prisma.ContactMessageWhereInput = {};
  if (searchParams.status) where.status = searchParams.status as RequestStatus;
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } },
      { subject: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const items = await safe(
    () => prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    [],
  );
  const options = statusOptions("message");

  return (
    <div>
      <AdminPageHeader title="Messages de contact" description={`${items.length} message(s)`}>
        <ExportButton type="messages" />
      </AdminPageHeader>

      <AdminFilters basePath="/admin/messages" statuses={STATUS_SETS.message} active={searchParams.status} />

      <AdminTableShell
        headers={["Expéditeur", "Sujet", "Date", "Statut", ""]}
        empty="Aucun message."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3">
              <p className="font-semibold text-dark">{r.name}</p>
              <p className="text-xs text-muted">{r.email}</p>
            </td>
            <td className="px-4 py-3 text-muted">{r.subject}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <StatusSelect type="message" id={r.id} status={r.status} options={options} />
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                href={`/admin/messages/${r.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                aria-label="Voir le détail"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
