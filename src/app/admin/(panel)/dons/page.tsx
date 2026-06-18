import Link from "next/link";
import { Eye, Coins } from "lucide-react";
import { DonationStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminFilters } from "@/components/admin/admin-filters";
import { ExportButton } from "@/components/admin/export-button";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusSelect } from "@/components/admin/status-select";
import { statusOptions, STATUS_SETS } from "@/lib/admin/status-options";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Dons" };

export default async function Page({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const where: Prisma.DonationWhereInput = {};
  if (searchParams.status) where.status = searchParams.status as DonationStatus;
  if (searchParams.q) {
    where.OR = [
      { firstName: { contains: searchParams.q, mode: "insensitive" } },
      { lastName: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const [items, confirmedAgg] = await safe(
    () =>
      Promise.all([
        prisma.donation.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
        prisma.donation.aggregate({ where: { status: "CONFIRMED" }, _sum: { amount: true } }),
      ]),
    [[], { _sum: { amount: null } }] as const,
  );
  const totalConfirmed = Number(confirmedAgg._sum.amount ?? 0);
  const options = statusOptions("donation");

  return (
    <div>
      <AdminPageHeader title="Dons" description={`${items.length} don(s) enregistré(s)`}>
        <ExportButton type="dons" />
      </AdminPageHeader>

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-primary-mid bg-primary-pale p-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
          <Coins className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Total des dons confirmés</p>
          <p className="font-heading text-2xl font-bold text-primary">{formatCurrency(totalConfirmed)}</p>
        </div>
      </div>

      <AdminFilters basePath="/admin/dons" statuses={STATUS_SETS.donation} active={searchParams.status} />

      <AdminTableShell
        headers={["Donateur", "Montant", "Type", "Date", "Statut", ""]}
        empty="Aucun don enregistré."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3">
              <p className="font-semibold text-dark">
                {r.anonymous ? "Donateur anonyme" : [r.firstName, r.lastName].filter(Boolean).join(" ") || "—"}
              </p>
              <p className="text-xs text-muted">{r.email}</p>
            </td>
            <td className="px-4 py-3 font-semibold text-dark">
              {formatCurrency(Number(r.amount), r.currency)}
            </td>
            <td className="px-4 py-3 text-muted">{r.donationType}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(r.createdAt)}</td>
            <td className="px-4 py-3">
              <StatusSelect type="donation" id={r.id} status={r.status} options={options} />
            </td>
            <td className="px-4 py-3 text-right">
              <Link
                href={`/admin/dons/${r.id}`}
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
