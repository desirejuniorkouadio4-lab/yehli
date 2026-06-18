import type { Metadata } from "next";
import { Sparkles, HeartHandshake, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { VolunteerForm } from "@/components/forms/volunteer-form";

export const metadata: Metadata = {
  title: "Devenir bénévole",
  description:
    "Offrez votre temps et vos compétences à YEHLI. Devenez bénévole et contribuez à l'éducation, la science et l'inclusion des enfants et des jeunes de Côte d'Ivoire.",
  alternates: { canonical: "/devenir-benevole" },
};

const WHY = [
  { icon: HeartHandshake, title: "Un engagement citoyen fort", text: "Donnez du sens à votre temps en agissant pour une cause essentielle." },
  { icon: Sparkles, title: "Une expérience enrichissante", text: "Développez vos compétences et vivez des rencontres marquantes." },
  { icon: Users, title: "Une communauté soudée", text: "Rejoignez une équipe passionnée et bienveillante." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Devenir bénévole", href: "/devenir-benevole" }]}
        badge="Donnez de votre temps"
        title="Devenir bénévole"
        subtitle="Le bénévolat est au cœur de l'action de YEHLI. Vos compétences et votre énergie peuvent changer le quotidien de centaines d'enfants."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-3">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-dark">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-dark">Votre candidature</h2>
            <p className="mt-2 text-sm text-muted">
              Parlez-nous de vous et de vos envies. Les champs marqués d&apos;un astérisque (*) sont
              obligatoires.
            </p>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
