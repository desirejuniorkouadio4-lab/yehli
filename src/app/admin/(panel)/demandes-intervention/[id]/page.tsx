import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { DetailField } from "@/components/admin/detail-field";
import { StatusSelect } from "@/components/admin/status-select";
import { InternalNoteEditor } from "@/components/admin/internal-note-editor";
import { statusOptions } from "@/lib/admin/status-options";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Détail demande" };

export default async function Page({ params }: { params: { id: string } }) {
  const r = await safe(
    () => prisma.interventionRequest.findUnique({ where: { id: params.id } }),
    null,
  );
  if (!r) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/demandes-intervention"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux demandes
      </Link>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">{r.structureName}</h1>
          <p className="text-sm text-muted">Reçue le {formatDate(r.createdAt)}</p>
        </div>
        <StatusSelect type="intervention" id={r.id} status={r.status} options={statusOptions("intervention")} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 font-bold text-dark">Détails de la demande</h2>
          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailField label="Type de structure" value={r.structureType} />
            <DetailField label="Ville" value={[r.city, r.commune].filter(Boolean).join(", ")} />
            <DetailField label="Pays" value={r.country} />
            <DetailField label="Responsable" value={`${r.managerFirstName ?? ""} ${r.managerLastName ?? ""}`.trim()} />
            <DetailField label="Fonction" value={r.managerRole} />
            <DetailField
              label="Email"
              value={
                <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                  <Mail className="h-4 w-4" />
                  {r.email}
                </a>
              }
            />
            <DetailField
              label="Téléphone"
              value={
                r.phone ? (
                  <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                    <Phone className="h-4 w-4" />
                    {r.phone}
                  </a>
                ) : null
              }
            />
            <DetailField label="Public concerné" value={r.targetAudience} />
            <DetailField label="Participants estimés" value={r.estimatedParticipants?.toString()} />
            <DetailField label="Thématique" value={r.requestedTheme} />
            <DetailField label="Type d'intervention" value={r.interventionType} />
            <DetailField label="Date souhaitée" value={r.desiredDate ? formatDate(r.desiredDate) : null} />
            <DetailField label="Budget indicatif" value={r.indicativeBudget} />
            <DetailField label="Message" value={r.message} full />
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-bold text-dark">Note interne</h2>
          <InternalNoteEditor type="intervention" id={r.id} note={r.internalNote} />
        </div>
      </div>
    </div>
  );
}
