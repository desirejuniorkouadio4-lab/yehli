import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { ICON_NAMES } from "@/lib/icons";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, Select, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveAction } from "@/app/actions/admin-content";

export const metadata = { title: "Axe d'action" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.actionProgram.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveAction.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title={isNew ? "Nouvel axe d'action" : "Modifier l'axe d'action"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Titre" htmlFor="title" required>
              <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <AdminField label="Description courte" htmlFor="shortDesc">
              <Textarea id="shortDesc" name="shortDesc" rows={2} defaultValue={record?.shortDesc ?? ""} />
            </AdminField>
            <AdminField label="Description longue" htmlFor="description" required hint="Séparer les paragraphes par une ligne vide">
              <Textarea id="description" name="description" rows={6} defaultValue={record?.description ?? ""} required />
            </AdminField>
            <AdminField label="Objectifs" htmlFor="objectives" hint="Un objectif par ligne">
              <Textarea id="objectives" name="objectives" rows={4} defaultValue={record?.objectives ?? ""} />
            </AdminField>
            <AdminField label="Public cible" htmlFor="targetAudience">
              <Input id="targetAudience" name="targetAudience" defaultValue={record?.targetAudience ?? ""} />
            </AdminField>
            <AdminField label="Image">
              <ImageUpload name="image" defaultValue={record?.image} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-3">
              <AdminField label="Icône" htmlFor="icon">
                <Select id="icon" name="icon" defaultValue={record?.icon ?? "GraduationCap"}>
                  {ICON_NAMES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </Select>
              </AdminField>
              <AdminField label="Ordre" htmlFor="order">
                <Input id="order" name="order" type="number" defaultValue={record?.order ?? 0} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "DRAFT"} />
              </AdminField>
            </div>
            <SubmitBar cancelHref="/admin/actions" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
