import Link from "next/link";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TrainingVM } from "@/lib/data/types";

export function TrainingCard({ training }: { training: TrainingVM }) {
  return (
    <Link href={`/formations/${training.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <div className="relative aspect-[16/10] overflow-hidden bg-primary-pale">
          {training.image && (
            <Image
              src={training.image}
              alt={training.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {training.theme && (
            <Badge variant="dark" className="absolute left-3 top-3 shadow-sm">
              {training.theme}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-dark transition-colors group-hover:text-primary">
            {training.title}
          </h3>
          {training.summary && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
              {training.summary}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
            {training.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {training.duration}
              </span>
            )}
            {training.targetAudience && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                {training.targetAudience}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
