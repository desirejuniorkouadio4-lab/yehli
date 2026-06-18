import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { ActionCard } from "@/components/cards/action-card";
import { getActions } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Nos actions",
  description:
    "Huit axes d'intervention complémentaires : éducation, vulgarisation scientifique, pensée critique, environnement, inclusion, numérique éducatif, formation des enseignants et actions communautaires.",
  alternates: { canonical: "/nos-actions" },
};

export default async function ActionsListPage() {
  const actions = await getActions();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Nos actions", href: "/nos-actions" }]}
        badge="Nos domaines d'action"
        title="Nos actions"
        subtitle="Huit axes complémentaires pour éveiller la curiosité, développer l'esprit critique, favoriser l'inclusion et préparer les jeunes au monde de demain."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {actions.map((action, i) => (
              <Reveal key={action.id} delay={i * 0.04}>
                <ActionCard action={action} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-pale py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-heading text-3xl font-bold text-dark sm:text-4xl">
            Une thématique vous intéresse pour votre structure ?
          </h2>
          <p className="max-w-2xl text-pretty text-muted">
            Nos interventions sont gratuites, flexibles et adaptées à votre public. Parlons de votre
            projet éducatif.
          </p>
          <Button asChild size="lg">
            <Link href="/demander-une-intervention">
              Demander une intervention
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
