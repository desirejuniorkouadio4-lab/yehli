import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Reply } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { StatusSelect } from "@/components/admin/status-select";
import { statusOptions } from "@/lib/admin/status-options";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Détail message" };

export default async function Page({ params }: { params: { id: string } }) {
  const r = await safe(() => prisma.contactMessage.findUnique({ where: { id: params.id } }), null);
  if (!r) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/messages"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux messages
      </Link>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-dark">{r.subject}</h1>
          <p className="text-sm text-muted">
            De {r.name} · {formatDate(r.createdAt)}
          </p>
        </div>
        <StatusSelect type="message" id={r.id} status={r.status} options={statusOptions("message")} />
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-4 border-b border-border pb-4">
          <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <Mail className="h-4 w-4" />
            {r.email}
          </a>
          {r.phone && (
            <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              <Phone className="h-4 w-4" />
              {r.phone}
            </a>
          )}
        </div>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-body">{r.message}</p>
        <div className="mt-6">
          <a
            href={`mailto:${r.email}?subject=${encodeURIComponent(`RE: ${r.subject ?? ""}`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
          >
            <Reply className="h-4 w-4" />
            Répondre par email
          </a>
        </div>
      </div>
    </div>
  );
}
