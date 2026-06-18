import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveTestimonial } from "@/app/actions/admin-site";

export const metadata = { title: "Témoignage" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.testimonial.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveTestimonial.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouveau témoignage" : "Modifier le témoignage"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={record?.name ?? ""} required />
            </AdminField>
            <AdminField label="Rôle / fonction" htmlFor="role" hint="Ex. Directrice d'école, Abidjan">
              <Input id="role" name="role" defaultValue={record?.role ?? ""} />
            </AdminField>
            <AdminField label="Témoignage" htmlFor="content" required>
              <Textarea id="content" name="content" rows={5} defaultValue={record?.content ?? ""} required />
            </AdminField>
            <AdminField label="Photo" hint="Laisser vide pour afficher les initiales">
              <ImageUpload name="photo" defaultValue={record?.photo} aspect="square" />
            </AdminField>
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="Ordre d'affichage" htmlFor="order">
                <Input id="order" name="order" type="number" defaultValue={record?.order ?? 0} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "PUBLISHED"} />
              </AdminField>
            </div>
            <SubmitBar cancelHref="/admin/temoignages" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
