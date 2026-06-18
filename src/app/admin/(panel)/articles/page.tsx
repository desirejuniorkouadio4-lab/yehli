import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteArticle } from "@/app/actions/admin-articles";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Articles" };

export default async function Page() {
  const items = await safe(
    () =>
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
    [],
  );

  return (
    <div>
      <AdminPageHeader title="Articles" description={`${items.length} article(s)`}>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </AdminPageHeader>

      <AdminTableShell
        headers={["Titre", "Catégorie", "Date", "Statut", ""]}
        empty="Aucun article."
        isEmpty={items.length === 0}
      >
        {items.map((r) => (
          <tr key={r.id} className="hover:bg-surface/50">
            <td className="px-4 py-3 font-semibold text-dark">{r.title}</td>
            <td className="px-4 py-3 text-muted">{r.category?.name ?? "—"}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">
              {formatDate(r.publishedAt ?? r.createdAt)}
            </td>
            <td className="px-4 py-3">
              <StatusBadge status={r.status} />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <Link
                  href={`/blog/${r.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Voir sur le site"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/articles/${r.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteArticle.bind(null, r.id)} />
              </div>
            </td>
          </tr>
        ))}
      </AdminTableShell>
    </div>
  );
}
