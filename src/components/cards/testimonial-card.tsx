import { Quote } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import type { TestimonialVM } from "@/lib/data/types";

export function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: TestimonialVM;
  featured?: boolean;
}) {
  return (
    <figure
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "bg-primary shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30"
          : "border border-border bg-white shadow-soft hover:border-primary/25 hover:shadow-md"
      }`}
    >
      {/* Icône quote décorative en fond, très atténuée */}
      <Quote
        aria-hidden="true"
        className={`pointer-events-none absolute -right-2 -top-2 h-24 w-24 rotate-180 ${
          featured ? "text-white" : "text-primary"
        }`}
        style={{ opacity: featured ? 0.08 : 0.05 }}
      />

      {/* Étoiles */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 16 16" className="h-4 w-4 fill-accent" aria-hidden="true">
            <path d="M8 1.3l1.7 3.4 3.8.6-2.75 2.67.65 3.78L8 9.8l-3.4 1.78.65-3.78L2.5 5.3l3.8-.6z" />
          </svg>
        ))}
      </div>

      {/* Citation */}
      <blockquote
        className={`relative flex-1 text-sm leading-relaxed ${
          featured ? "text-white/90" : "text-body"
        }`}
      >
        {testimonial.content}
      </blockquote>

      {/* Auteur */}
      <figcaption
        className={`mt-5 flex items-center gap-3 border-t pt-4 ${
          featured ? "border-white/20" : "border-border"
        }`}
      >
        <Avatar
          name={testimonial.name}
          src={testimonial.photo}
          size={40}
          className={`h-10 w-10 shrink-0 text-xs font-bold ${
            featured ? "bg-white/15 text-white" : ""
          }`}
        />
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-semibold ${
              featured ? "text-white" : "text-dark"
            }`}
          >
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className={`truncate text-xs ${featured ? "text-white/60" : "text-muted"}`}>
              {testimonial.role}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
