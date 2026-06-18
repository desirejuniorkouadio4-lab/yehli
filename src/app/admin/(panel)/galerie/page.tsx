import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, FolderPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safe } from "@/lib/admin/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTableShell } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { deleteAlbum, deleteGalleryItem } from "@/app/actions/admin-gallery";

export const metadata = { title: "Galerie" };

export default async function Page() {
  const [albums, items] = await safe(
    () =>
      Promise.all([
        prisma.galleryAlbum.findMany({
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, slug: true, status: true, _count: { select: { items: true } } },
        }),
        prisma.galleryItem.findMany({
          orderBy: { createdAt: "desc" },
          take: 100,
          include: { album: { select: { title: true } } },
        }),
      ]),
    [[], []] as const,
  );

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader title="Albums" description={`${albums.length} album(s)`}>
          <Button asChild>
            <Link href="/admin/galerie/album/new">
              <FolderPlus className="h-4 w-4" />
              Nouvel album
            </Link>
          </Button>
        </AdminPageHeader>
        <AdminTableShell
          headers={["Titre", "Médias", "Statut", ""]}
          empty="Aucun album."
          isEmpty={albums.length === 0}
        >
          {albums.map((a) => (
            <tr key={a.id} className="hover:bg-surface/50">
              <td className="px-4 py-3 font-semibold text-dark">{a.title}</td>
              <td className="px-4 py-3 text-muted">{a._count.items}</td>
              <td className="px-4 py-3">
                <StatusBadge status={a.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/galerie/album/${a.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton action={deleteAlbum.bind(null, a.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTableShell>
      </div>

      <div>
        <AdminPageHeader title="Médias" description={`${items.length} média(s)`}>
          <Button asChild>
            <Link href="/admin/galerie/media/new">
              <Plus className="h-4 w-4" />
              Nouveau média
            </Link>
          </Button>
        </AdminPageHeader>
        <AdminTableShell
          headers={["Aperçu", "Titre", "Album", "Statut", ""]}
          empty="Aucun média."
          isEmpty={items.length === 0}
        >
          {items.map((m) => (
            <tr key={m.id} className="hover:bg-surface/50">
              <td className="px-4 py-2">
                <div className="relative h-12 w-16 overflow-hidden rounded bg-surface">
                  {(m.thumbnail || m.url) && (
                    <Image src={m.thumbnail || m.url} alt={m.title} fill sizes="64px" className="object-cover" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-dark">{m.title}</td>
              <td className="px-4 py-3 text-muted">{m.album?.title ?? "—"}</td>
              <td className="px-4 py-3">
                <StatusBadge status={m.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/galerie/media/${m.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-pale hover:text-primary"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteButton action={deleteGalleryItem.bind(null, m.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTableShell>
      </div>
    </div>
  );
}
