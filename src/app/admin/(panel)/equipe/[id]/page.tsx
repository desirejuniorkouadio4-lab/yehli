import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { saveTeamMember } from "@/app/actions/admin-site";

export const metadata = { title: "Membre de l'équipe" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.teamMember.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveTeamMember.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouveau membre" : "Modifier le membre"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <AdminField label="Nom" htmlFor="name" required>
              <Input id="name" name="name" defaultValue={record?.name ?? ""} required />
            </AdminField>
            <AdminField label="Rôle" htmlFor="role" required>
              <Input id="role" name="role" defaultValue={record?.role ?? ""} required />
            </AdminField>
            <AdminField label="Biographie" htmlFor="bio">
              <Textarea id="bio" name="bio" rows={4} defaultValue={record?.bio ?? ""} />
            </AdminField>
            <AdminField label="Photo (URL)" htmlFor="photo" hint="Laisser vide pour afficher les initiales">
              <Input id="photo" name="photo" defaultValue={record?.photo ?? ""} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Email" htmlFor="email">
                <Input id="email" name="email" type="email" defaultValue={record?.email ?? ""} />
              </AdminField>
              <AdminField label="LinkedIn" htmlFor="linkedin">
                <Input id="linkedin" name="linkedin" defaultValue={record?.linkedin ?? ""} placeholder="https://" />
              </AdminField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="Ordre d'affichage" htmlFor="order">
                <Input id="order" name="order" type="number" defaultValue={record?.order ?? 0} />
              </AdminField>
              <AdminField label="Statut">
                <StatusField defaultValue={record?.status ?? "PUBLISHED"} />
              </AdminField>
            </div>
            <SubmitBar cancelHref="/admin/equipe" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
