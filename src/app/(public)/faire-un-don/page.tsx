import type { Metadata } from "next";
import { ShieldCheck, Heart, BookOpen, GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DonationForm } from "@/components/forms/donation-form";

export const metadata: Metadata = {
  title: "Faire un don",
  description:
    "Soutenez l'éducation en Côte d'Ivoire. Votre don finance des ateliers scientifiques, la formation des enseignants et des ressources pédagogiques pour les enfants.",
  alternates: { canonical: "/faire-un-don" },
};

const IMPACT = [
  { icon: GraduationCap, text: "5 000 XOF financent le matériel d'un atelier scientifique pour une classe." },
  { icon: BookOpen, text: "25 000 XOF offrent des ressources pédagogiques à plusieurs enseignants." },
  { icon: Heart, text: "50 000 XOF soutiennent une journée d'intervention complète dans une école." },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Faire un don", href: "/faire-un-don" }]}
        badge="Votre générosité éclaire des vies"
        title="Faire un don"
        subtitle="Chaque contribution, quel que soit son montant, finance directement nos actions éducatives auprès des enfants et des jeunes de Côte d'Ivoire."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr,1fr]">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-dark">Votre don</h2>
            <p className="mt-2 text-sm text-muted">
              Choisissez un montant et un mode de don. Vous recevrez un email de confirmation.
            </p>
            <div className="mt-6">
              <DonationForm />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-primary-pale p-6">
              <h2 className="font-heading text-xl font-bold text-dark">À quoi sert votre don ?</h2>
              <ul className="mt-5 space-y-5">
                {IMPACT.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm text-body">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <p className="text-sm text-muted">
                Vos données sont traitées de façon sécurisée et confidentielle. YEHLI s&apos;engage à
                la transparence dans l&apos;usage de chaque contribution.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
