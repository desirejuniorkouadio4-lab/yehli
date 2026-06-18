import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HandHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary">
      {/* Image de fond (enfants) — repli vert si absente */}
      <Image
        src="/images/hero-enfants.jpg"
        alt="Des enfants lèvent la main avec enthousiasme lors d'une activité éducative de YEHLI"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Voiles d'assombrissement pour la lisibilité du texte */}
      <div aria-hidden="true" className="absolute inset-0 bg-dark/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container-page relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            ONG éducative · Côte d&apos;Ivoire
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Chaque enfant qui apprend est une{" "}
            <span className="relative whitespace-nowrap text-accent">
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

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/90">
            YEHLI accompagne les enfants, les jeunes et les éducateurs de Côte d&apos;Ivoire vers
            l&apos;excellence éducative, scientifique et citoyenne.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href="/demander-une-intervention">
                Demander une intervention
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary"
            >
              <Link href="/faire-un-don">
                <HandHeart className="h-5 w-5" />
                Faire un don
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
