import type { Metadata } from "next";
import { ShieldCheck, Heart, BookOpen, GraduationCap, Smartphone, ClipboardList, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DonationForm } from "@/components/forms/donation-form";
import { MobileMoneyNumbers } from "@/components/shared/mobile-money-numbers";

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

const STEPS: { num: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    num: "1",
    icon: Heart,
    title: "Choisissez votre montant",
    desc: "Décidez du montant que vous souhaitez offrir.",
  },
  {
    num: "2",
    icon: Smartphone,
    title: "Envoyez via Mobile Money",
    desc: "Transférez votre don au numéro de votre opérateur ci-dessous.",
  },
  {
    num: "3",
    icon: ClipboardList,
    title: "Confirmez votre don",
    desc: "Remplissez le formulaire avec votre nom, email et le montant envoyé.",
  },
];

// Numéros Mobile Money — modifiables via variables d'environnement Vercel
const ORANGE_MONEY = process.env.DONATION_ORANGE_MONEY || "";
const WAVE        = process.env.DONATION_WAVE        || "+225 05 66 30 36 99";
const MTN         = process.env.DONATION_MTN         || "+225 05 66 30 36 99";

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
        <div className="container-page">

          {/* Étapes */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">
                  {num}
                </span>
                <div>
                  <p className="font-semibold text-dark">{title}</p>
                  <p className="mt-1 text-sm text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">

            {/* Gauche : numéros + formulaire */}
            <div className="space-y-8">

              {/* Numéros Mobile Money */}
              {(ORANGE_MONEY || WAVE || MTN) && (
                <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-dark">
                    Numéros Mobile Money
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Envoyez votre don au numéro de votre opérateur, puis remplissez le formulaire ci-dessous.
                  </p>
                  <div className="mt-5">
                    <MobileMoneyNumbers
                      orangeMoney={ORANGE_MONEY}
                      wave={WAVE}
                      mtn={MTN}
                    />
                  </div>
                </div>
              )}

              {/* Formulaire de confirmation */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-heading text-xl font-bold text-dark">
                  Confirmer votre don
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Après avoir envoyé votre paiement, remplissez ce formulaire pour que nous puissions vous envoyer un accusé de réception.
                </p>
                <div className="mt-6">
                  <DonationForm />
                </div>
              </div>
            </div>

            {/* Droite : impact + sécurité */}
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
        </div>
      </section>
    </>
  );
}
