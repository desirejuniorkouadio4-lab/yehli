import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import type { TestimonialVM } from "@/lib/data/types";

type Props = {
  testimonials: TestimonialVM[];
  title?: string;
  subtitle?: string;
};

export function TestimonialsSection({
  testimonials,
  title = "Ce qu'ils disent de nous",
  subtitle = "Enseignants, parents et partenaires témoignent de l'impact de nos actions sur le terrain.",
}: Props) {
  if (!testimonials.length) return null;

  const [featured, ...rest] = testimonials;

  return (
    <section className="overflow-hidden bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader badge="Témoignages" title={title} subtitle={subtitle} />

        {/* Desktop : carte vedette à gauche + grille à droite */}
        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-[1fr_2fr]">
          {/* Carte vedette */}
          <div className="flex">
            <TestimonialCard testimonial={featured} featured />
          </div>

          {/* Grille compacte : 2 colonnes si ≥3 cartes, 1 sinon */}
          <div className={`grid gap-5 ${rest.length >= 3 ? "grid-cols-2" : "grid-cols-1"}`}>
            {rest.slice(0, 4).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Mobile/tablette : carrousel à scroll horizontal */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-3 lg:hidden"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="w-[80vw] max-w-[340px] shrink-0 sm:w-[60vw]"
              style={{ scrollSnapAlign: "start" }}
            >
              <TestimonialCard testimonial={t} featured={i === 0} />
            </div>
          ))}
        </div>

        {/* Indicateurs de scroll mobile */}
        <div className="mt-4 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all ${i === 0 ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
