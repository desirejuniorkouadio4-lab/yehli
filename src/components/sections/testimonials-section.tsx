import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import type { TestimonialVM } from "@/lib/data/types";

type TestimonialsSectionProps = {
  testimonials: TestimonialVM[];
  title?: string;
  subtitle?: string;
};

export function TestimonialsSection({
  testimonials,
  title = "Ce qu'ils disent de nous",
  subtitle = "Enseignants, parents et partenaires témoignent de l'impact de nos actions sur le terrain.",
}: TestimonialsSectionProps) {
  if (!testimonials.length) return null;
  return (
    <section className="bg-primary-pale py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader badge="Témoignages" title={title} subtitle={subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
