import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EventVM } from "@/lib/data/types";

export function EventCard({ event }: { event: EventVM }) {
  const start = event.startDate;
  const day = start.toLocaleDateString("fr-FR", { day: "2-digit" });
  const month = start.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
  const isPast = start < new Date();

  return (
    <Link href={`/evenements/${event.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <div className="relative aspect-[16/9] overflow-hidden bg-primary-pale">
          {event.coverImage && (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-col items-center rounded-xl bg-white px-3 py-1.5 text-center shadow-md">
            <span className="font-heading text-xl font-bold leading-none text-primary">{day}</span>
            <span className="text-[0.65rem] font-semibold uppercase text-muted">{month}</span>
          </div>
          <Badge
            variant={isPast ? "neutral" : "accent"}
            size="sm"
            className="absolute right-3 top-3 shadow-sm"
          >
            {isPast ? "Passé" : "À venir"}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-dark transition-colors group-hover:text-primary line-clamp-2">
            {event.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              {start.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {event.city && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {event.city}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
