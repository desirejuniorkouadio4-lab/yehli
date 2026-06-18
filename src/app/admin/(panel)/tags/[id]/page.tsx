import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, SubmitBar } from "@/components/admin/form-controls";
import { saveTag } from "@/app/actions/admin-site";

export const metadata = { title: "Tag" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.tag.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveTag.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-xl">
      <AdminPageHeader title={isNew ? "Nouveau tag" : "Modifier le tag"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={record?.name ?? ""} required />
            </AdminField>
            <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
              <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
            </AdminField>
            <SubmitBar cancelHref="/admin/tags" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
