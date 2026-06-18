import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { EventCard } from "@/components/cards/event-card";
import { getEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Forums, ateliers et rencontres organisés par YEHLI autour de l'éducation, de la science et de la citoyenneté en Côte d'Ivoire.",
  alternates: { canonical: "/evenements" },
};

export default async function EventsPage() {
  const all = await getEvents();
  const now = Date.now();
  const upcoming = all
    .filter((e) => e.startDate.getTime() >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const past = all
    .filter((e) => e.startDate.getTime() < now)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Événements", href: "/evenements" }]}
        badge="Agenda"
        title="Nos événements"
        subtitle="Participez à nos forums, ateliers et rencontres dédiés à l'éducation, la science et la citoyenneté."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader align="left" badge="À venir" title="Événements à venir" />
          {upcoming.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface py-14 text-center">
              <CalendarClock className="h-10 w-10 text-muted" />
              <p className="font-semibold text-dark">Aucun événement programmé pour le moment</p>
              <p className="max-w-md text-pretty text-muted">
                Revenez bientôt ou abonnez-vous à notre newsletter pour être informé·e en premier.
              </p>
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="container-page">
            <SectionHeader align="left" badge="Archives" title="Événements passés" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
