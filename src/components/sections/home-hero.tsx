import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HandHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImpactStatVM } from "@/lib/data/types";

export function HomeHero({ stats }: { stats: ImpactStatVM[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Colonne texte */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-mid bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <Sparkles className="h-4 w-4 text-accent-dark" />
            ONG éducative · Côte d&apos;Ivoire
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] text-dark sm:text-5xl lg:text-6xl">
            Chaque enfant qui apprend est une{" "}
            <span className="relative whitespace-nowrap text-primary">
              lumière
              <svg
                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,5 Q50,9 100,4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            qui grandit
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            YEHLI accompagne les enfants, les jeunes et les éducateurs de Côte d&apos;Ivoire vers
            l&apos;excellence éducative, scientifique et citoyenne.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/demander-une-intervention">
                Demander une intervention
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/faire-un-don">
                <HandHeart className="h-5 w-5" />
                Faire un don
              </Link>
            </Button>
          </div>

          {/* Stats en ligne */}
          {stats.length > 0 && (
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-0.5 text-xs leading-tight text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Colonne visuel */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-accent/30 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-primary/10">
            <Image
              src="https://picsum.photos/seed/yehli-hero-education/900/1080"
              alt="Des enfants découvrent les sciences lors d'un atelier YEHLI"
              width={900}
              height={1080}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {/* Carte flottante */}
          <div className="absolute -bottom-5 -left-5 hidden max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-xl sm:block">
            <p className="font-heading text-sm font-bold italic leading-snug text-dark">
              « Éveiller la curiosité, révéler la confiance, construire l&apos;avenir. »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
