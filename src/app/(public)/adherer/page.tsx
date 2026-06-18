import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MembershipForm } from "@/components/forms/membership-form";

export const metadata: Metadata = {
  title: "Adhérer",
  description:
    "Devenez membre de l'association YEHLI et participez activement à notre mission d'éducation et d'épanouissement des enfants et des jeunes en Côte d'Ivoire.",
  alternates: { canonical: "/adherer" },
};

const BENEFITS = [
  "Participer activement à la vie et aux décisions de l'association",
  "Être informé·e en priorité de nos actions et événements",
  "Contribuer concrètement à l'éducation des enfants et des jeunes",
  "Rejoindre une communauté engagée et bienveillante",
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Adhérer", href: "/adherer" }]}
        badge="Rejoignez l'association"
        title="Adhérer à YEHLI"
        subtitle="En devenant membre, vous donnez plus de force à notre mission et participez à construire une éducation lumineuse pour tous."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr,1.4fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-primary-pale p-6">
              <h2 className="font-heading text-xl font-bold text-dark">Pourquoi adhérer ?</h2>
              <ul className="mt-5 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <span className="text-pretty text-body">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-dark">Formulaire d&apos;adhésion</h2>
            <p className="mt-2 text-sm text-muted">
              Les champs marqués d&apos;un astérisque (*) sont obligatoires.
            </p>
            <div className="mt-6">
              <MembershipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
