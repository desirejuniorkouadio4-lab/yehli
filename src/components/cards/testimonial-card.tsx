import { Quote } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import type { TestimonialVM } from "@/lib/data/types";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialVM }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-card">
      <Quote className="h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
      <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-body">
        {testimonial.content}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={testimonial.name} src={testimonial.photo} size={44} className="h-11 w-11" />
        <div>
          <div className="font-semibold text-dark">{testimonial.name}</div>
          {testimonial.role && <div className="text-xs text-muted">{testimonial.role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
