import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { JsonLd } from "@/components/seo/json-ld";
import { SocialShare } from "@/components/shared/social-share";
import { getEvents, getEventBySlug } from "@/lib/data/events";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/config/site";

type Props = { params: { slug: string } };

export const revalidate = 3600;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: event.title,
    description: event.description.slice(0, 160),
    alternates: { canonical: `/evenements/${event.slug}` },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const isPast = event.startDate.getTime() < Date.now();
  const paragraphs = event.description.split("\n\n").filter(Boolean);
  const time = event.startDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const endTime = event.endDate?.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const info = [
    { icon: CalendarDays, label: "Date", value: formatDate(event.startDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
    { icon: Clock, label: "Horaire", value: endTime ? `${time} – ${endTime}` : time },
    { icon: MapPin, label: "Lieu", value: [event.location, event.city, event.country].filter(Boolean).join(", ") || null },
    { icon: Users, label: "Capacité", value: event.capacity ? `${event.capacity} participants` : null },
  ].filter((i) => Boolean(i.value));

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description.slice(0, 300),
    startDate: event.startDate.toISOString(),
    ...(event.endDate ? { endDate: event.endDate.toISOString() } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.coverImage ? { image: [event.coverImage] } : {}),
    location: {
      "@type": "Place",
      name: event.location ?? event.city ?? "Côte d'Ivoire",
      address: [event.location, event.city, event.country].filter(Boolean).join(", "),
    },
    organizer: { "@type": "Organization", name: "YEHLI", url: SITE.url },
  };

  return (
    <>
      <JsonLd data={eventLd} />
      <PageHeader
        breadcrumb={[
          { label: "Événements", href: "/evenements" },
          { label: event.title, href: `/evenements/${event.slug}` },
        ]}
        badge={isPast ? "Événement passé" : "Événement à venir"}
        title={event.title}
        subtitle={`${formatDate(event.startDate)}${event.city ? ` · ${event.city}` : ""}`}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr,360px]">
          <div>
            {event.coverImage && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-pale">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose-yehli">
              <h2>À propos de l&apos;événement</h2>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <SocialShare url={`${SITE.url}/evenements/${event.slug}`} title={event.title} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-base font-bold text-dark">Informations pratiques</h2>
              <dl className="mt-4 space-y-4">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wide text-muted">{label}</dt>
                      <dd className="font-medium capitalize text-dark">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-border pt-5">
                {isPast ? (
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Cet événement est terminé. Merci à tous les participants !
                  </div>
                ) : event.registrationOpen ? (
                  <>
                    <Badge variant="green" className="mb-4">
                      Inscriptions ouvertes
                    </Badge>
                    <EventRegistrationForm eventId={event.id} eventTitle={event.title} />
                  </>
                ) : (
                  <Badge variant="neutral">Inscriptions à venir</Badge>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
