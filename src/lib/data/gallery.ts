import { prisma } from "@/lib/prisma";
import { DEMO_GALLERY_ALBUMS, DEMO_GALLERY_ITEMS } from "@/lib/content/demo-content";
import type { GalleryAlbumVM, GalleryItemVM } from "./types";

export async function getGalleryAlbums(): Promise<GalleryAlbumVM[]> {
  try {
    const rows = await prisma.galleryAlbum.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        _count: { select: { items: true } },
      },
    });
    if (!rows.length) return DEMO_GALLERY_ALBUMS;
    return rows.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      description: a.description,
      coverImage: a.coverImage,
      itemCount: a._count.items,
    }));
  } catch {
    return DEMO_GALLERY_ALBUMS;
  }
}

export async function getGalleryItems(
  opts: { albumSlug?: string } = {},
): Promise<GalleryItemVM[]> {
  const fallback = opts.albumSlug
    ? DEMO_GALLERY_ITEMS.filter((i) => i.albumSlug === opts.albumSlug)
    : DEMO_GALLERY_ITEMS;
  try {
    const rows = await prisma.galleryItem.findMany({
      where: {
        status: "PUBLISHED",
        ...(opts.albumSlug ? { album: { slug: opts.albumSlug } } : {}),
      },
      orderBy: { date: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        url: true,
        thumbnail: true,
        date: true,
        location: true,
        album: { select: { slug: true, title: true } },
      },
    });
    if (!rows.length) return fallback;
    return rows.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      type: i.type,
      url: i.url,
      thumbnail: i.thumbnail,
      date: i.date,
      location: i.location,
      albumSlug: i.album?.slug ?? null,
      albumTitle: i.album?.title ?? null,
    }));
  } catch {
    return fallback;
  }
}
