import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteTag } from "@/app/actions/admin-site";

export const metadata = { title: "Tags" };

export default async function Page() {
  const items = await safe(() => prisma.tag.findMany({ orderBy: { name: "asc" } }), []);

  return (
    <div>
      <AdminPageHeader title="Tags" description={`${items.length} tag(s)`}>
        <Button asChild>
          <Link href="/admin/tags/new">
            <Plus className="h-4 w-4" />
            Nouveau
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell headers={["Nom", "Slug", ""]} empty="Aucun tag." isEmpty={items.length === 0}>
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.name}</td>
            <td className="px-4 py-3 font-mono text-xs text-muted">{r.slug}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/admin/tags/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteTag.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
