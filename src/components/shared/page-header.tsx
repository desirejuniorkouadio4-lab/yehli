import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, type Crumb } from "./breadcrumb";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  breadcrumb?: Crumb[];
  coverImage?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * En-tête de page interne : fond vert (ou image de couverture) + fil d'Ariane
 * + badge + titre H1 + sous-titre. Touche décorative « soleil » de la charte.
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumb,
  coverImage,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={cn("relative isolate overflow-hidden bg-primary", className)}>
      {coverImage ? (
        <>
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/65" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-[#0f4a1d]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-primary-light/30 blur-3xl"
          />
        </>
      )}

      <div className="container-page relative z-10 py-14 sm:py-20">
        {breadcrumb && <Breadcrumb items={breadcrumb} light className="mb-5" />}
        {badge && (
          <Badge variant="accent" className="mb-4">
            {badge}
          </Badge>
        )}
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/85">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </header>
  );
}
