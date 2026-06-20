import Link from "next/link";
import {
  HandHeart,
  CalendarCheck,
  Compass,
  GraduationCap,
  FileText,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Demander une intervention", href: "/demander-une-intervention", icon: CalendarCheck },
  { label: "Nos actions", href: "/nos-actions", icon: Compass },
  { label: "Formations", href: "/formations", icon: GraduationCap },
  { label: "Blog & ressources", href: "/blog", icon: FileText },
  { label: "Événements", href: "/evenements", icon: Calendar },
  { label: "Galerie", href: "/galerie", icon: ImageIcon },
];

/** Tableau de bord d'accès rapide — affiché uniquement sur mobile, en haut de l'accueil. */
export function MobileQuickActions() {
  return (
    <section className="lg:hidden">
      <div className="container-page py-6">
        {/* Carte « don » mise en avant */}
        <Link
          href="/faire-un-don"
          className="mb-3 flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-5 text-white shadow-lg shadow-primary/20 transition-transform active:scale-[0.99]"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-dark">
            <HandHeart className="h-7 w-7" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-heading text-lg font-bold">Soutenez nos actions</span>
            <span className="block text-sm text-white/85">Un don, c&apos;est un atelier de plus pour un enfant.</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0" />
        </Link>

        <p className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-muted">Accès rapide</p>
        <div className="grid grid-cols-2 gap-2.5">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-4 shadow-soft transition-colors active:bg-primary-pale"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <it.icon className="h-[22px] w-[22px]" />
              </span>
              <span className="text-sm font-semibold leading-snug text-dark">{it.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
