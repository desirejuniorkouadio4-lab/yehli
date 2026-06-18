import type { Metadata } from "next";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getGalleryAlbums, getGalleryItems } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez en images les ateliers scientifiques, formations et événements organisés par YEHLI auprès des enfants, des jeunes et des enseignants de Côte d'Ivoire.",
  alternates: { canonical: "/galerie" },
};

type Props = { searchParams: { album?: string } };

export default async function GalleryPage({ searchParams }: Props) {
  const [albums, items] = await Promise.all([
    getGalleryAlbums(),
    getGalleryItems({ albumSlug: searchParams.album }),
  ]);
  const activeAlbum = searchParams.album;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Galerie", href: "/galerie" }]}
        badge="En images"
        title="Notre galerie"
        subtitle="Plongez au cœur de nos actions : ateliers, formations et événements qui font grandir la lumière de l'éducation."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {albums.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <Link
                href="/galerie"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  !activeAlbum ? "bg-primary text-white" : "bg-primary-pale text-primary hover:bg-primary-mid",
                )}
              >
                Tous les albums
              </Link>
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/galerie?album=${album.slug}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeAlbum === album.slug
                      ? "bg-primary text-white"
                      : "bg-primary-pale text-primary hover:bg-primary-mid",
                  )}
                >
                  {album.title}
                </Link>
              ))}
            </div>
          )}

          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
              <ImageOff className="h-12 w-12 text-muted" />
              <p className="text-lg font-semibold text-dark">Aucun média dans cet album</p>
              <Link href="/galerie" className="font-semibold text-primary hover:text-primary-light">
                Voir tous les albums
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
