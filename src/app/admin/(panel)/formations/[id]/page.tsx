import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveTraining } from "@/app/actions/admin-content";

export const metadata = { title: "Formation" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.training.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveTraining.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title={isNew ? "Nouvelle formation" : "Modifier la formation"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Titre" htmlFor="title" required>
              <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <AdminField label="Résumé" htmlFor="summary">
              <Textarea id="summary" name="summary" rows={2} defaultValue={record?.summary ?? ""} />
            </AdminField>
            <AdminField label="Description" htmlFor="description" required hint="Séparer les paragraphes par une ligne vide">
              <Textarea id="description" name="description" rows={6} defaultValue={record?.description ?? ""} required />
            </AdminField>
            <AdminField label="Objectifs" htmlFor="objectives" hint="Un objectif par ligne">
              <Textarea id="objectives" name="objectives" rows={4} defaultValue={record?.objectives ?? ""} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Public cible" htmlFor="targetAudience">
                <Input id="targetAudience" name="targetAudience" defaultValue={record?.targetAudience ?? ""} />
              </AdminField>
              <AdminField label="Thème" htmlFor="theme">
                <Input id="theme" name="theme" defaultValue={record?.theme ?? ""} />
              </AdminField>
              <AdminField label="Durée" htmlFor="duration">
                <Input id="duration" name="duration" defaultValue={record?.duration ?? ""} placeholder="2h" />
              </AdminField>
              <AdminField label="Format" htmlFor="format">
                <Input id="format" name="format" defaultValue={record?.format ?? ""} placeholder="Atelier" />
              </AdminField>
            </div>
            <AdminField label="Prérequis" htmlFor="prerequisites">
              <Input id="prerequisites" name="prerequisites" defaultValue={record?.prerequisites ?? ""} />
            </AdminField>
            <AdminField label="Image">
              <ImageUpload name="image" defaultValue={record?.image} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Meta title (SEO)" htmlFor="metaTitle">
                <Input id="metaTitle" name="metaTitle" defaultValue={record?.metaTitle ?? ""} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "DRAFT"} />
              </AdminField>
            </div>
            <AdminField label="Meta description (SEO)" htmlFor="metaDescription">
              <Textarea id="metaDescription" name="metaDescription" rows={2} defaultValue={record?.metaDescription ?? ""} />
            </AdminField>
            <SubmitBar cancelHref="/admin/formations" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
