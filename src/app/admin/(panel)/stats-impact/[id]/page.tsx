import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { ICON_NAMES } from "@/lib/icons";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Select, SubmitBar } from "@/components/admin/form-controls";
import { Checkbox } from "@/components/ui/checkbox";
import { saveImpactStat } from "@/app/actions/admin-site";

export const metadata = { title: "Statistique d'impact" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const record = isNew
    ? null
    : await safe(() => prisma.impactStat.findUnique({ where: { id: params.id } }), null);
  if (!isNew && !record) notFound();

  const action = saveImpactStat.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isNew ? "Nouvelle statistique" : "Modifier la statistique"} />
      <form action={action}>
        <AdminFormCard>
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Libellé" htmlFor="label" required>
                <Input id="label" name="label" defaultValue={record?.label ?? ""} required placeholder="Élèves touchés" />
              </AdminField>
              <AdminField label="Valeur" htmlFor="value" required>
                <Input id="value" name="value" defaultValue={record?.value ?? ""} required placeholder="300+" />
              </AdminField>
            </div>
            <AdminField label="Icône" htmlFor="icon" hint="Icône Lucide affichée au-dessus du chiffre">
              <Select id="icon" name="icon" defaultValue={record?.icon ?? "GraduationCap"}>
                {ICON_NAMES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Select>
            </AdminField>
            <AdminField label="Ordre d'affichage" htmlFor="order">
              <Input id="order" name="order" type="number" defaultValue={record?.order ?? 0} />
            </AdminField>
            <label htmlFor="active" className="flex cursor-pointer items-center gap-3">
              <Checkbox id="active" name="active" defaultChecked={record?.active ?? true} />
              <span className="text-sm font-medium text-dark">Active (visible sur le site)</span>
            </label>
            <SubmitBar cancelHref="/admin/stats-impact" />
          </div>
        </AdminFormCard>
      </form>
    </div>
  );
}
