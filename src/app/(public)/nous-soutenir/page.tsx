import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, UserPlus, Heart, Handshake, Gift, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getTestimonials } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Nous soutenir",
  description:
    "Découvrez toutes les façons de soutenir YEHLI : don financier, adhésion, bénévolat, partenariat, don matériel ou parrainage d'une activité éducative.",
  alternates: { canonical: "/nous-soutenir" },
};

const SUPPORT_MODES = [
  { icon: HandHeart, title: "Faire un don financier", text: "Chaque contribution finance directement nos ateliers et nos formations.", href: "/faire-un-don", cta: "Faire un don" },
  { icon: UserPlus, title: "Adhérer à l'association", text: "Devenez membre et participez activement à la vie de YEHLI.", href: "/adherer", cta: "Adhérer" },
  { icon: Heart, title: "Devenir bénévole", text: "Offrez votre temps et vos compétences sur le terrain.", href: "/devenir-benevole", cta: "Devenir bénévole" },
  { icon: Handshake, title: "Devenir partenaire", text: "Institutions et entreprises, construisons des projets ensemble.", href: "/contact", cta: "Nous contacter" },
  { icon: Gift, title: "Faire un don matériel", text: "Livres, matériel scientifique, équipement numérique…", href: "/contact", cta: "Nous contacter" },
  { icon: Sparkles, title: "Sponsoriser une activité", text: "Financez un atelier ou une formation et offrez-lui votre nom.", href: "/contact", cta: "Nous contacter" },
];

const CONTRIBUTIONS = [
  "Du matériel scientifique pour des expériences en classe",
  "Des supports pédagogiques et des livres pour les élèves",
  "La formation continue des enseignants",
  "L'organisation d'ateliers de philosophie et de pensée critique",
  "Des actions de sensibilisation à l'environnement",
  "L'accès au numérique éducatif pour les plus défavorisés",
];

export default async function SupportPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Nous soutenir", href: "/nous-soutenir" }]}
        badge="Passez à l'action"
        title="Soutenez l'éducation, éclairez des vies"
        subtitle="Votre engagement, quelle qu'en soit la forme, permet à des centaines d'enfants d'accéder à une éducation de qualité et à la joie d'apprendre."
      />

      {/* Modes de soutien */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="6 façons d'aider"
            title="Comment nous soutenir ?"
            subtitle="Choisissez la manière qui vous correspond le mieux pour contribuer à notre mission."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_MODES.map(({ icon: Icon, title, text, href, cta }) => (
              <div
                key={title}
                className="flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-dark">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                <Link
                  href={href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À quoi servent vos contributions */}
      <section className="bg-primary-pale py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              badge="Transparence"
              title="À quoi servent vos contributions ?"
              subtitle="Nous nous engageons à utiliser chaque contribution avec rigueur et au plus près du terrain."
            />
          </div>
          <ul className="space-y-3">
            {CONTRIBUTIONS.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-pretty text-body">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Témoignages */}
      <TestimonialsSection
        testimonials={testimonials}
        title="Ils nous soutiennent déjà"
        subtitle="Donateurs, bénévoles et partenaires partagent ce que leur engagement auprès de YEHLI leur apporte."
      />

      {/* CTA final */}
      <section className="bg-primary py-16">
        <div className="container-page text-center">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl">
            Prêt·e à faire la différence ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/85">
            Un don, une heure de bénévolat ou un partenariat : tout compte pour faire grandir la
            lumière de l&apos;éducation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/faire-un-don"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 font-bold text-dark transition-all hover:bg-accent-dark hover:-translate-y-0.5"
            >
              Faire un don
              <HandHeart className="h-5 w-5" />
            </Link>
            <Link
              href="/devenir-benevole"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Devenir bénévole
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
