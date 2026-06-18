import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { saveAlbum } from "@/app/actions/admin-gallery";

export const metadata = { title: "Album" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.galleryAlbum.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveAlbum.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouvel album" : "Modifier l'album"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Titre" htmlFor="title" required>
              <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <AdminField label="Description" htmlFor="description">
              <Textarea id="description" name="description" rows={3} defaultValue={record?.description ?? ""} />
            </AdminField>
            <AdminField label="Image de couverture (URL)" htmlFor="coverImage">
              <Input id="coverImage" name="coverImage" defaultValue={record?.coverImage ?? ""} />
            </AdminField>
            <AdminField label="Statut">
              <StatusField defaultValue={record?.status ?? "PUBLISHED"} />
            </AdminField>
            <SubmitBar cancelHref="/admin/galerie" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
