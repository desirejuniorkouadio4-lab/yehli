import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminField, AdminFormCard, Input, Textarea, Select, StatusField, SubmitBar } from "@/components/admin/form-controls";
import { RichEditor } from "@/components/admin/rich-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { saveArticle } from "@/app/actions/admin-articles";

export const metadata = { title: "Article" };

export default async function Page({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";

  const [record, categories, tags] = await Promise.all([
    isNew
      ? Promise.resolve(null)
      : safe(
          () =>
            prisma.article.findUnique({
              where: { id: params.id },
              include: { tags: { select: { tagId: true } } },
            }),
          null,
        ),
    safe(() => prisma.category.findMany({ orderBy: { name: "asc" } }), []),
    safe(() => prisma.tag.findMany({ orderBy: { name: "asc" } }), []),
  ]);

  if (!isNew && !record) notFound();

  const currentTagIds = new Set(record?.tags.map((t) => t.tagId) ?? []);
  const action = saveArticle.bind(null, record?.id ?? null);

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader title={isNew ? "Nouvel article" : "Modifier l'article"} />
      <form action={action}>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <AdminFormCard>
              <div className="space-y-5">
                <AdminField label="Titre" htmlFor="title" required>
                  <Input id="title" name="title" defaultValue={record?.title ?? ""} required />
                </AdminField>
                <AdminField label="Slug" htmlFor="slug" hint="Laisser vide pour générer automatiquement">
                  <Input id="slug" name="slug" defaultValue={record?.slug ?? ""} />
                </AdminField>
                <AdminField label="Extrait" htmlFor="excerpt" hint="Résumé affiché dans les listes">
                  <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={record?.excerpt ?? ""} />
                </AdminField>
                <AdminField label="Contenu" htmlFor="content" required>
                  <RichEditor initialHTML={record?.content ?? ""} />
                </AdminField>
              </div>
            </AdminFormCard>
          </div>

          <div className="space-y-5">
            <AdminFormCard>
              <div className="space-y-5">
                <AdminField label="Statut">
                  <StatusField defaultValue={record?.status ?? "DRAFT"} />
                </AdminField>
                <AdminField label="Catégorie" htmlFor="categoryId">
                  <Select id="categoryId" name="categoryId" defaultValue={record?.categoryId ?? ""}>
                    <option value="">— Aucune —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </Select>
                </AdminField>
                <AdminField label="Image de couverture (URL)" htmlFor="coverImage">
                  <Input id="coverImage" name="coverImage" defaultValue={record?.coverImage ?? ""} />
                </AdminField>
                <div>
                  <p className="mb-1.5 text-sm font-semibold text-dark">Tags</p>
                  <div className="max-h-44 space-y-1.5 overflow-y-auto rounded-md border border-border p-3">
                    {tags.length === 0 && <p className="text-xs text-muted">Aucun tag disponible.</p>}
                    {tags.map((t) => (
                      <label key={t.id} className="flex cursor-pointer items-center gap-2 text-sm">
                        <Checkbox name="tags" value={t.id} defaultChecked={currentTagIds.has(t.id)} />
                        {t.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </AdminFormCard>

            <AdminFormCard>
              <div className="space-y-4">
                <p className="text-sm font-bold text-dark">Référencement (SEO)</p>
                <AdminField label="Meta title" htmlFor="metaTitle">
                  <Input id="metaTitle" name="metaTitle" defaultValue={record?.metaTitle ?? ""} />
                </AdminField>
                <AdminField label="Meta description" htmlFor="metaDescription">
                  <Textarea id="metaDescription" name="metaDescription" rows={3} defaultValue={record?.metaDescription ?? ""} />
                </AdminField>
              </div>
            </AdminFormCard>
          </div>
        </div>
        <div className="mt-5">
          <SubmitBar cancelHref="/admin/articles" label="Enregistrer l'article" />
        </div>
      </form>
    </div>
  );
}
