import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, Select, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { savePartner } from "@/app/actions/admin-site";

export const metadata = { title: "Partenaire" };

const TYPES = [
  { value: "institutionnel", label: "Institutionnel" },
  { value: "financier", label: "Financier" },
  { value: "technique", label: "Technique" },
  { value: "ecole_beneficiaire", label: "École bénéficiaire" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.partner.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = savePartner.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouveau partenaire" : "Modifier le partenaire"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={record?.name ?? ""} required />
            </AdminField>
            <AdminField label="Type" htmlFor="type">
              <Select id="type" name="type" defaultValue={record?.type ?? "institutionnel"}>
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </Select>
            </AdminField>
            <AdminField label="Description" htmlFor="description">
              <Textarea id="description" name="description" rows={3} defaultValue={record?.description ?? ""} />
            </AdminField>
            <AdminField label="Logo (URL)" htmlFor="logo">
              <Input id="logo" name="logo" defaultValue={record?.logo ?? ""} />
            </AdminField>
            <AdminField label="Site web" htmlFor="website">
              <Input id="website" name="website" defaultValue={record?.website ?? ""} placeholder="https://" />
            </AdminField>
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="Ordre d'affichage" htmlFor="order">
                <Input id="order" name="order" type="number" defaultValue={record?.order ?? 0} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "PUBLISHED"} />
              </AdminField>
            </div>
            <SubmitBar cancelHref="/admin/partenaires" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
