import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Telescope, Heart, Sparkles, ShieldCheck, Users, Quote } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { TeamCard } from "@/components/cards/team-card";
import { getTeamMembers } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Qui sommes-nous ?",
  description:
    "Découvrez l'histoire, la mission, la vision et l'équipe de YEHLI, ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  alternates: { canonical: "/qui-sommes-nous" },
};

const VALUES = [
  { name: "Curiosité", text: "Nourrir l'envie d'apprendre et d'explorer le monde.", icon: Sparkles },
  { name: "Confiance", text: "Permettre à chacun de réaliser son plein potentiel.", icon: ShieldCheck },
  { name: "Humanité", text: "Favoriser le partage, le respect et la solidarité.", icon: Heart },
];

const COMMITMENTS = [
  "Une éducation de qualité accessible à chaque enfant",
  "La gratuité et la flexibilité de nos interventions",
  "La rigueur scientifique au service de la pédagogie",
  "L'inclusion des publics les plus vulnérables",
  "Le respect de l'environnement dans toutes nos actions",
  "La transparence dans l'usage des contributions",
];

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Qui sommes-nous", href: "/qui-sommes-nous" }]}
        badge="L'association"
        title="Qui sommes-nous ?"
        subtitle="YEHLI est une ONG dédiée à l'éducation et à l'épanouissement des enfants et des jeunes de Côte d'Ivoire, avec une attention particulière pour les plus vulnérables."
      />

      {/* Notre histoire */}
      <section id="histoire" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              align="left"
              badge="Notre histoire"
              title="Une lumière née d'une conviction"
            />
            <div className="prose-yehli mt-6">
              <p>
                YEHLI est née de la conviction profonde de sa fondatrice, le Dr Mariame Coulibaly,
                maître de conférences en physique-chimie : l&apos;éducation est le levier le plus
                puissant pour transformer durablement une société.
              </p>
              <p>
                Convaincue que chaque enfant porte en lui une lumière qui ne demande qu&apos;à
                grandir, elle a réuni autour d&apos;elle des passionnés de pédagogie, de science et
                d&apos;engagement citoyen. Ensemble, ils ont fait le pari de rendre la connaissance
                accessible, vivante et inspirante pour tous les enfants de Côte d&apos;Ivoire.
              </p>
              <p>
                Depuis, YEHLI combine la vulgarisation scientifique, la formation continue des
                enseignants, la sensibilisation à l&apos;inclusion et au numérique éducatif, et le
                développement de la pensée critique chez les jeunes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent/25 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-primary/10">
              <Image
                src="https://picsum.photos/seed/yehli-histoire/900/760"
                alt="Atelier éducatif animé par YEHLI auprès d'élèves"
                width={900}
                height={760}
                className="aspect-[7/6] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission, vision, valeurs */}
      <section id="mission" className="scroll-mt-24 bg-primary-pale py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="Notre raison d'être"
            title="Mission, vision & valeurs"
            subtitle="Trois piliers guident chacune de nos actions au quotidien."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-white p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-dark">Notre mission</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Rendre l&apos;éducation et la science accessibles à tous, former les enseignants,
                développer l&apos;esprit critique et favoriser l&apos;égalité des chances.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-white p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Telescope className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-dark">Notre vision</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Une Côte d&apos;Ivoire où chaque enfant, sans exception, a les moyens d&apos;éveiller
                sa curiosité, de révéler sa confiance et de construire son avenir.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-white p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-dark">
                <Heart className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-dark">Nos valeurs</h3>
              <ul className="mt-3 space-y-2.5">
                {VALUES.map((v) => (
                  <li key={v.name} className="flex items-start gap-2.5">
                    <v.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted">
                      <strong className="font-semibold text-dark">{v.name}</strong> — {v.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mot de la fondatrice */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <figure className="relative mx-auto max-w-3xl rounded-2xl border border-primary-mid bg-primary-pale/50 p-8 text-center sm:p-12">
            <Quote className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
            <blockquote className="mt-5 font-heading text-xl italic leading-relaxed text-dark sm:text-2xl">
              « L&apos;éducation est la plus belle des lumières : elle ne s&apos;éteint jamais en se
              partageant, elle grandit. Chaque enfant que nous accompagnons devient à son tour une
              source de lumière pour sa famille et sa communauté. »
            </blockquote>
            <figcaption className="mt-6">
              <div className="font-semibold text-dark">Dr Mariame Coulibaly</div>
              <div className="text-sm text-muted">Fondatrice de YEHLI</div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Notre équipe */}
      <section id="equipe" className="scroll-mt-24 bg-surface py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="L'équipe"
            title="Les visages de YEHLI"
            subtitle="Des femmes et des hommes engagés, animés par la même passion pour l'éducation."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Reveal key={member.id}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeader
            badge="Nos engagements"
            title="Ce à quoi nous tenons"
            subtitle="Des principes concrets qui guident chacune de nos interventions."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <div
                key={c}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </span>
                <span className="text-pretty font-medium text-body">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-pale py-16">
        <div className="container-page text-center">
          <h2 className="font-heading text-3xl font-bold text-dark sm:text-4xl">
            Rejoignez notre mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted">
            Ensemble, faisons grandir la lumière de l&apos;éducation pour les enfants et les jeunes
            de Côte d&apos;Ivoire.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/nous-soutenir">Nous soutenir</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/devenir-benevole">Devenir bénévole</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
