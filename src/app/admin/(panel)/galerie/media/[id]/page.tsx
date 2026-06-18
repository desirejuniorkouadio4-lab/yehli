import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, Select, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveGalleryItem } from "@/app/actions/admin-gallery";

export const metadata = { title: "Média" };

function toDateInput(d?: Date | null): string {
  return d ? d.toISOString().slice(0, 10) : "";
}

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const [record, albums] = await Promise.all([
    isNew
      ? Promise.resolve(null)
      : safe(() => prisma.galleryItem.findUnique({ where: { id: params.id } }), null),
    safe(() => prisma.galleryAlbum.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }), []),
  ]);
  if (!isNew && !record) notFound();

  const action = saveGalleryItem.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouveau média" : "Modifier le média"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Titre" htmlFor="title" required>
              <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
            </AdminField>
            <AdminField label="Description" htmlFor="description">
              <Textarea id="description" name="description" rows={2} defaultValue={record?.description ?? ""} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Type" htmlFor="type">
                <Select id="type" name="type" defaultValue={record?.type ?? "IMAGE"}>
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Vidéo</option>
                </Select>
              </AdminField>
              <AdminField label="Album" htmlFor="albumId">
                <Select id="albumId" name="albumId" defaultValue={record?.albumId ?? ""}>
                  <option value="">— Aucun —</option>
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </Select>
              </AdminField>
            </div>
            <AdminField label="Image / Média" required>
              <ImageUpload name="url" defaultValue={record?.url} />
            </AdminField>
            <AdminField label="Miniature (optionnelle)" hint="Vignette différente de l'image principale">
              <ImageUpload name="thumbnail" defaultValue={record?.thumbnail} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Date" htmlFor="date">
                <Input id="date" name="date" type="date" defaultValue={toDateInput(record?.date)} />
              </AdminField>
              <AdminField label="Lieu" htmlFor="location">
                <Input id="location" name="location" defaultValue={record?.location ?? ""} />
              </AdminField>
            </div>
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
