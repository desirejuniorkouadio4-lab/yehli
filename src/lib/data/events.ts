import { prisma } from "@/lib/prisma";
import { DEMO_EVENTS } from "@/lib/content/demo-content";
import type { EventVM } from "./types";

type EventRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  location: string | null;
  city: string | null;
  country: string | null;
  coverImage: string | null;
  capacity: number | null;
  registrationOpen: boolean;
};

function toEventVM(e: EventRow): EventVM {
  return {
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description,
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location,
    city: e.city,
    country: e.country,
    coverImage: e.coverImage,
    capacity: e.capacity,
    registrationOpen: e.registrationOpen,
  };
}

export async function getEvents(): Promise<EventVM[]> {
  try {
    const rows = await prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { startDate: "desc" },
    });
    return rows.length ? rows.map(toEventVM) : DEMO_EVENTS;
  } catch {
    return DEMO_EVENTS;
  }
}

export async function getUpcomingEvents(limit?: number): Promise<EventVM[]> {
  const now = new Date();
  const upcoming = (await getEvents())
    .filter((e) => e.startDate >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export async function getPastEvents(limit?: number): Promise<EventVM[]> {
  const now = new Date();
  const past = (await getEvents())
    .filter((e) => e.startDate < now)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  return typeof limit === "number" ? past.slice(0, limit) : past;
}

export async function getEventBySlug(slug: string): Promise<EventVM | null> {
  try {
    const e = await prisma.event.findFirst({ where: { slug, status: "PUBLISHED" } });
    if (e) return toEventVM(e);
    return DEMO_EVENTS.find((x) => x.slug === slug) ?? null;
  } catch {
    return DEMO_EVENTS.find((x) => x.slug === slug) ?? null;
  }
}
