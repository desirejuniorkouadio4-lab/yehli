import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SectionHeaderProps = {
  badge?: string;
  badgeVariant?: "green" | "yellow";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

/**
 * En-tête de section : badge coloré + grand titre + ligne décorative + sous-titre.
 * Conforme à la structure visuelle de la charte (section 2.5).
 */
export function SectionHeader({
  badge,
  badgeVariant = "green",
  title,
  subtitle,
  align = "center",
  as = "h2",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge && <Badge variant={badgeVariant === "yellow" ? "yellow" : "green"}>{badge}</Badge>}
      <Heading
        className={cn(
          "font-heading text-3xl font-bold leading-[1.15] text-dark sm:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      <span
        className={cn("h-1 w-16 rounded-full bg-accent", align === "center" && "mx-auto")}
        aria-hidden="true"
      />
      {subtitle && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
