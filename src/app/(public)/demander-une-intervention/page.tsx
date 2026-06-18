import type { Metadata } from "next";
import { Gift, CalendarCheck, Users, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { InterventionForm } from "@/components/forms/intervention-form";

export const metadata: Metadata = {
  title: "Demander une intervention",
  description:
    "Écoles, associations, collectivités : sollicitez gratuitement un atelier, une conférence ou une formation YEHLI. Remplissez le formulaire, notre équipe vous recontacte.",
  alternates: { canonical: "/demander-une-intervention" },
};

const REASSURANCE = [
  { icon: Gift, title: "Gratuit", text: "Nos interventions sont offertes aux structures éducatives." },
  { icon: CalendarCheck, title: "Flexible", text: "Date, format et durée s'adaptent à votre organisation." },
  { icon: Users, title: "Sur mesure", text: "Le contenu est ajusté à votre public et à vos objectifs." },
  { icon: Sparkles, title: "Inspirant", text: "Des animateurs passionnés qui éveillent la curiosité." },
];

export default function InterventionPage({
  searchParams,
}: {
  searchParams: { theme?: string };
}) {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Demander une intervention", href: "/demander-une-intervention" }]}
        badge="Écoles · Associations · Collectivités"
        title="Demander une intervention"
        subtitle="Atelier, conférence ou formation : sollicitez YEHLI pour votre structure. C'est gratuit, flexible et entièrement adapté à votre public."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr,1fr]">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <p className="text-pretty text-muted">
              Remplissez ce formulaire pour nous présenter votre projet. Les champs marqués
              d&apos;un astérisque (*) sont obligatoires. Notre équipe vous recontactera dans les
              meilleurs délais.
            </p>
            <div className="mt-8">
              <InterventionForm defaultTheme={searchParams.theme} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-primary-pale p-6">
              <h2 className="font-heading text-xl font-bold text-dark">
                Pourquoi solliciter YEHLI ?
              </h2>
              <ul className="mt-5 space-y-5">
                {REASSURANCE.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-dark">{title}</p>
                      <p className="text-sm text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
