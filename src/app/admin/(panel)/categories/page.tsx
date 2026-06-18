import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/app/actions/admin-site";

export const metadata = { title: "Catégories" };

export default async function Page() {
  const items = await safe(
    () =>
      prisma.category.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true, _count: { select: { articles: true } } },
      }),
    [],
  );

  return (
    <div>
      <AdminPageHeader title="Catégories" description={`${items.length} catégorie(s)`}>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4" />
            Nouvelle
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Nom", "Slug", "Articles", ""]}
        empty="Aucune catégorie."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.name}</td>
            <td className="px-4 py-3 font-mono text-xs text-muted">{r.slug}</td>
            <td className="px-4 py-3 text-muted">{r._count.articles}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/categories/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteCategory.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
