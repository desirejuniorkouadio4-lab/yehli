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

export const metadata = { title: "Adhésions" };

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const where: Prisma.MembershipApplicationWhereInput = {};
  if (searchParams.status) where.status = searchParams.status as RequestStatus;
  if (searchParams.q) {
    where.OR = [
      { firstName: { contains: searchParams.q, mode: "insensitive" } },
      { lastName: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const items = await safe(
    () => prisma.membershipApplication.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    [],
  );
  const options = statusOptions("membership");

  return (
    <div>
      <AdminPageHeader title="Adhésions" description={`${items.length} demande(s) d'adhésion`}>
        <ExportButton type="adhesions" />
      </AdminPageHeader>

      <AdminFilters basePath="/admin/adhesions" statuses={STATUS_SETS.membership} active={searchParams.status} />

      <AdminTableShell
        headers={["Nom", "Contact", "Type", "Date", "Statut", ""]}
        empty="Aucune demande d'adhésion."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">
              {r.firstName} {r.lastName}
            </td>
            <td className="px-4 py-3 text-xs text-muted">{r.email}</td>
            <td className="px-4 py-3 text-muted">{r.membershipType}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <StatusSelect type="membership" id={r.id} status={r.status} options={options} />
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                href={`/admin/adhesions/${r.id}`}
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
