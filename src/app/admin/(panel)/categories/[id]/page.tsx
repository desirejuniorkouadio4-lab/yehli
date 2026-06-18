import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, SubmitBar } from "@/components/admin/form-controls";
import { saveCategory } from "@/app/actions/admin-site";

export const metadata = { title: "Catégorie" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.category.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveCategory.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouvelle catégorie" : "Modifier la catégorie"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={record?.name ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <AdminField label="Description" htmlFor="description">
              <Textarea id="description" name="description" rows={3} defaultValue={record?.description ?? ""} />
            </AdminField>
            <SubmitBar cancelHref="/admin/categories" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
