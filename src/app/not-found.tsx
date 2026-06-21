import Link from "next/link";
import { HomeIcon, Search, BookOpen, CalendarDays, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  { label: "Accueil", href: "/", icon: HomeIcon },
  { label: "Nos actions", href: "/nos-actions", icon: Search },
  { label: "Blog & ressources", href: "/blog", icon: BookOpen },
  { label: "Événements", href: "/evenements", icon: CalendarDays },
  { label: "Formations", href: "/formations", icon: GraduationCap },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Illustration numérique */}
      <div className="relative mb-8 select-none">
        <span
          aria-hidden="true"
          className="font-heading text-[9rem] font-black leading-none text-primary/8 sm:text-[12rem]"
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <span className="text-5xl" aria-hidden="true">🔦</span>
          </div>
        </div>
      </div>

      <h1 className="font-heading text-2xl font-bold text-dark sm:text-3xl">
        Cette page est dans l&apos;ombre
      </h1>
      <p className="mx-auto mt-3 max-w-md text-pretty text-muted">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Mais la lumière de l&apos;éducation est
        toujours là — explorez le reste du site.
      </p>

      {/* Actions principales */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <HomeIcon className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/contact">Nous contacter</Link>
        </Button>
      </div>

      {/* Suggestions */}
      <div className="mt-12 w-full max-w-lg">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Pages populaires
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SUGGESTIONS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-medium text-body transition-colors hover:border-primary/30 hover:bg-primary-pale hover:text-primary"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
