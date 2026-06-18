import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { Checkbox } from "@/components/ui/checkbox";
import { saveEvent } from "@/app/actions/admin-content";

export const metadata = { title: "Événement" };

function toLocalInput(d?: Date | null): string {
  if (!d) return "";
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.event.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveEvent.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title={isNew ? "Nouvel événement" : "Modifier l'événement"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Titre" htmlFor="title" required>
              <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <AdminField label="Description" htmlFor="description" required hint="Séparer les paragraphes par une ligne vide">
              <Textarea id="description" name="description" rows={6} defaultValue={record?.description ?? ""} required />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Date et heure de début" htmlFor="startDate" required>
                <Input id="startDate" name="startDate" type="datetime-local" defaultValue={toLocalInput(record?.startDate)} required />
              </AdminField>
              <AdminField label="Date et heure de fin" htmlFor="endDate">
                <Input id="endDate" name="endDate" type="datetime-local" defaultValue={toLocalInput(record?.endDate)} />
              </AdminField>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <AdminField label="Lieu" htmlFor="location">
                <Input id="location" name="location" defaultValue={record?.location ?? ""} />
              </AdminField>
              <AdminField label="Ville" htmlFor="city">
                <Input id="city" name="city" defaultValue={record?.city ?? ""} />
              </AdminField>
              <AdminField label="Pays" htmlFor="country">
                <Input id="country" name="country" defaultValue={record?.country ?? "Côte d'Ivoire"} />
              </AdminField>
            </div>
            <AdminField label="Image de couverture (URL)" htmlFor="coverImage">
              <Input id="coverImage" name="coverImage" defaultValue={record?.coverImage ?? ""} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Capacité" htmlFor="capacity">
                <Input id="capacity" name="capacity" type="number" defaultValue={record?.capacity ?? ""} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "DRAFT"} />
              </AdminField>
            </div>
            <label htmlFor="registrationOpen" className="flex cursor-pointer items-center gap-3">
              <Checkbox id="registrationOpen" name="registrationOpen" defaultChecked={record?.registrationOpen ?? false} />
              <span className="text-sm font-medium text-dark">Inscriptions ouvertes</span>
            </label>
            <SubmitBar cancelHref="/admin/evenements" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
