import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { WaveSeparator } from "@/components/shared/wave-separator";
import { HomeHero } from "@/components/sections/home-hero";
import { MobileQuickActions } from "@/components/sections/mobile-quick-actions";
import { HomeWelcome } from "@/components/sections/home-welcome";
import { NewsTicker } from "@/components/sections/news-ticker";
import { JoinCTA } from "@/components/sections/join-cta";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { QuickContact } from "@/components/sections/quick-contact";
import { ActionCard } from "@/components/cards/action-card";
import { TrainingCard } from "@/components/cards/training-card";
import { ArticleCard } from "@/components/cards/article-card";
import { EventCard } from "@/components/cards/event-card";
import { getImpactStats, getPartners, getTestimonials, getSiteSettings } from "@/lib/data/site";
import { getActions, getTrainings } from "@/lib/data/programs";
import { getRecentArticles } from "@/lib/data/blog";
import { getEvents } from "@/lib/data/events";
import { getGalleryItems } from "@/lib/data/gallery";
import { SITE } from "@/config/site";

const SUPPORT_REASONS = [
  "Des ateliers scientifiques gratuits pour les élèves",
  "Des formations qui transforment les pratiques des enseignants",
  "Des ressources pédagogiques accessibles à tous",
  "L'inclusion des enfants les plus vulnérables",
];

export const revalidate = 3600;

export default async function HomePage() {
  const [stats, actions, trainings, articles, allEvents, gallery, testimonials, partners, settings] =
    await Promise.all([
      getImpactStats(),
      getActions(),
      getTrainings(),
      getRecentArticles(6),
      getEvents(),
      getGalleryItems(),
      getTestimonials(),
      getPartners(),
      getSiteSettings(),
    ]);

  const featuredTrainings = trainings.slice(0, 3);
  const tickerArticles = articles.slice(0, 6);
  const recentArticles = articles.slice(0, 3);
  const galleryPreview = gallery.slice(0, 6);
  const now = Date.now();
  const upcoming = allEvents
    .filter((e) => e.startDate.getTime() >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const homeEvents = (upcoming.length ? upcoming : allEvents).slice(0, 3);

  return (
    <>
      <HomeHero stats={stats} />

      {/* Tableau de bord d'accès rapide (mobile uniquement) */}
      <MobileQuickActions />

      {/* Fil d'actualités défilant */}
      <NewsTicker articles={tickerArticles} />

      {/* Mot de bienvenue de la fondatrice */}
      <HomeWelcome />

      {/* Nos domaines d'action */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="Nos actions"
            title="Nos domaines d'action"
            subtitle="Huit axes complémentaires pour éveiller la curiosité, développer l'esprit critique et favoriser l'égalité des chances."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((action, i) => (
              <Reveal key={action.id} delay={i * 0.04}>
                <ActionCard action={action} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/nos-actions">
                Découvrir toutes nos actions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Formations phares */}
      <WaveSeparator topColor="#FFFFFF" bottomColor="#EAF4EC" />
      <section className="bg-primary-pale py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="Formations & ateliers"
            title="Nos formations phares"
            subtitle="Des interventions clés en main pour les écoles, les enseignants et les jeunes, animées par des passionnés de pédagogie et de science."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredTrainings.map((training, i) => (
              <Reveal key={training.id} delay={i * 0.05}>
                <TrainingCard training={training} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/formations">
                Voir toutes les formations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pourquoi soutenir YEHLI */}
      <WaveSeparator topColor="#EAF4EC" bottomColor="#FFFFFF" />
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-accent/25 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-primary/10">
              <Image
                src="https://picsum.photos/seed/yehli-soutenir/900/700"
                alt="Des enseignants en formation avec YEHLI"
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeader
              align="left"
              badge="Pourquoi nous soutenir"
              title="Votre soutien éclaire des vies"
              subtitle="Grâce à votre générosité, nous transformons l'éducation sur le terrain, là où l'impact est le plus grand."
            />
            <ul className="mt-8 space-y-4">
              {SUPPORT_REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-pretty text-body">{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/faire-un-don">Faire un don</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/nous-soutenir">Toutes les façons d&apos;aider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dernières actualités */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="Le blog"
            title="Nos dernières actualités"
            subtitle="Ressources de vulgarisation scientifique, réflexions pédagogiques et nouvelles de l'association."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {recentArticles.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.05}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/blog">
                Lire toutes les actualités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Événements à venir */}
      {homeEvents.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <SectionHeader
              badge="Agenda"
              title="Nos prochains événements"
              subtitle="Forums, ateliers et rencontres autour de l'éducation, de la science et de la citoyenneté."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {homeEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.05}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="secondary">
                <Link href="/evenements">
                  Tous les événements
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Galerie aperçu */}
      {galleryPreview.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="container-page">
            <SectionHeader
              badge="En images"
              title="La vie de YEHLI"
              subtitle="Quelques instants capturés lors de nos ateliers, formations et événements."
            />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryPreview.map((item) => (
                <Link
                  key={item.id}
                  href="/galerie"
                  className="group relative aspect-square overflow-hidden rounded-xl bg-primary-pale"
                >
                  <Image
                    src={item.thumbnail || item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="secondary">
                <Link href="/galerie">
                  Voir la galerie
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Témoignages */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Partenaires */}
      <PartnersStrip partners={partners} />

      {/* Nous rejoindre */}
      <JoinCTA />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Contact rapide */}
      <QuickContact
        email={settings.contact_email || SITE.contact.email}
        phone={settings.contact_phone || SITE.contact.phone}
        whatsapp={settings.contact_whatsapp || SITE.contact.whatsapp}
      />
    </>
  );
}
