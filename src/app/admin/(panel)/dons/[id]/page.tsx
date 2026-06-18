import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { DetailField } from "@/components/admin/detail-field";
import { StatusSelect } from "@/components/admin/status-select";
import { statusOptions } from "@/lib/admin/status-options";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Détail don" };

export default async function Page({ params }: { params: { id: string } }) {
  const r = await safe(() => prisma.donation.findUnique({ where: { id: params.id } }), null);
  if (!r) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/dons"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux dons
      </Link>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">
            {formatCurrency(Number(r.amount), r.currency)}
          </h1>
          <p className="text-sm text-muted">Don reçu le {formatDate(r.createdAt)}</p>
        </div>
        <StatusSelect type="donation" id={r.id} status={r.status} options={statusOptions("donation")} />
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <dl className="grid gap-5 sm:grid-cols-2">
          <DetailField
            label="Donateur"
            value={r.anonymous ? "Anonyme" : [r.firstName, r.lastName].filter(Boolean).join(" ") || "—"}
          />
          <DetailField
            label="Email"
            value={
              <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                {r.email}
              </a>
            }
          />
          <DetailField label="Téléphone" value={r.phone} />
          <DetailField label="Type de don" value={r.donationType} />
          <DetailField label="Destination" value={r.destination} />
          <DetailField label="Anonyme" value={r.anonymous ? "Oui" : "Non"} />
          <DetailField label="Prestataire" value={r.paymentProvider} />
          <DetailField label="Référence" value={r.paymentReference} />
          <DetailField label="Message" value={r.message} full />
        </dl>
      </div>
    </div>
  );
}
