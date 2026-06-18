import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, SearchX } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { TrainingCard } from "@/components/cards/training-card";
import { TrainingFilters } from "@/components/forms/training-filters";
import { getTrainings, getTrainingFacets } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Formations & ateliers",
  description:
    "Catalogue des formations et ateliers YEHLI : vulgarisation scientifique, neurosciences, IA éducative, ateliers de philosophie, environnement et plus encore.",
  alternates: { canonical: "/formations" },
};

type Props = {
  searchParams: { search?: string; theme?: string; audience?: string; format?: string };
};

export default async function FormationsPage({ searchParams }: Props) {
  const filters = {
    search: searchParams.search,
    theme: searchParams.theme,
    audience: searchParams.audience,
    format: searchParams.format,
  };
  const [trainings, facets] = await Promise.all([getTrainings(filters), getTrainingFacets()]);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Formations", href: "/formations" }]}
        badge="Formations & ateliers"
        title="Nos formations"
        subtitle="Des interventions clés en main pour les écoles, les enseignants et les jeunes. Toutes nos formations sont gratuites et adaptables à votre contexte."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Suspense fallback={<div className="h-24 rounded-2xl border border-border bg-white" />}>
            <TrainingFilters
              themes={facets.themes}
              audiences={facets.audiences}
              formats={facets.formats}
            />
          </Suspense>

          <p className="mt-6 text-sm text-muted">
            {trainings.length} formation{trainings.length > 1 ? "s" : ""} disponible
            {trainings.length > 1 ? "s" : ""}
          </p>

          {trainings.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training) => (
                <TrainingCard key={training.id} training={training} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
              <SearchX className="h-12 w-12 text-muted" />
              <p className="text-lg font-semibold text-dark">Aucune formation ne correspond</p>
              <p className="max-w-md text-pretty text-muted">
                Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
              </p>
              <Button asChild variant="secondary">
                <Link href="/formations">Réinitialiser</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary-pale py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-heading text-3xl font-bold text-dark sm:text-4xl">
            Vous ne trouvez pas exactement ce que vous cherchez ?
          </h2>
          <p className="max-w-2xl text-pretty text-muted">
            Nous construisons des interventions sur mesure. Décrivez-nous votre besoin et nous vous
            proposerons une solution adaptée.
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
