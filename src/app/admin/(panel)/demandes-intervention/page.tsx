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

export const metadata = { title: "Demandes d'intervention" };

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const where: Prisma.InterventionRequestWhereInput = {};
  if (searchParams.status) where.status = searchParams.status as RequestStatus;
  if (searchParams.q) {
    where.OR = [
      { structureName: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } },
      { city: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const items = await safe(
    () => prisma.interventionRequest.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    [],
  );
  const options = statusOptions("intervention");

  return (
    <div>
      <AdminPageHeader title="Demandes d'intervention" description={`${items.length} demande(s) au total`}>
        <ExportButton type="interventions" />
      </AdminPageHeader>

      <AdminFilters
        basePath="/admin/demandes-intervention"
        statuses={STATUS_SETS.intervention}
        active={searchParams.status}
      />

      <AdminTableShell
        headers={["Structure", "Contact", "Public", "Date", "Statut", ""]}
        empty="Aucune demande d'intervention."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3">
              <p className="font-semibold text-dark">{r.structureName}</p>
              <p className="text-xs text-muted">{r.structureType}</p>
            </td>
            <td className="px-4 py-3">
              <p className="text-dark">
                {r.managerFirstName} {r.managerLastName}
              </p>
              <p className="text-xs text-muted">{r.email}</p>
            </td>
            <td className="px-4 py-3 text-muted">{r.targetAudience}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <StatusSelect type="intervention" id={r.id} status={r.status} options={options} />
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                href={`/admin/demandes-intervention/${r.id}`}
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
