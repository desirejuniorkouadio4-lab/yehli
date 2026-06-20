"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Compass,
  GraduationCap,
  Menu as MenuIcon,
  HandHeart,
  X,
  ChevronRight,
  Users,
  FileText,
  Calendar,
  Image as ImageIcon,
  CalendarCheck,
  Heart,
  UserPlus,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { SITE, waNumber } from "@/config/site";
import { cn } from "@/lib/utils";

type Sheet = "menu" | "agir" | null;

// ── Données ─────────────────────────────────────────────────
const AGIR_ACTIONS = [
  { label: "Faire un don", desc: "Soutenez nos actions", href: "/faire-un-don", icon: HandHeart },
  { label: "Demander une intervention", desc: "Pour écoles & structures", href: "/demander-une-intervention", icon: CalendarCheck },
  { label: "Devenir bénévole", desc: "Donnez de votre temps", href: "/devenir-benevole", icon: Heart },
  { label: "Adhérer", desc: "Rejoignez l'association", href: "/adherer", icon: UserPlus },
];

const MENU_DESTINATIONS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Qui sommes-nous", href: "/qui-sommes-nous", icon: Users },
  { label: "Nos actions", href: "/nos-actions", icon: Compass },
  { label: "Formations", href: "/formations", icon: GraduationCap },
  { label: "Blog & ressources", href: "/blog", icon: FileText },
  { label: "Événements", href: "/evenements", icon: Calendar },
  { label: "Galerie", href: "/galerie", icon: ImageIcon },
];

// ── Composant principal ─────────────────────────────────────
export function MobileNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = React.useState<Sheet>(null);

  // Ferme la feuille à chaque navigation.
  React.useEffect(() => setSheet(null), [pathname]);

  // Verrouille le défilement du corps quand une feuille est ouverte.
  React.useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Barre d'onglets fixe */}
      <nav
        aria-label="Navigation mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-lg lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-1">
          <TabLink href="/" label="Accueil" icon={Home} active={isActive("/")} />
          <TabLink href="/nos-actions" label="Actions" icon={Compass} active={isActive("/nos-actions")} />

          {/* Bouton central surélevé — Agir */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setSheet("agir")}
              aria-label="Agir"
              className="-mt-7 flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-full bg-accent text-dark shadow-lg shadow-accent/40 ring-4 ring-white transition-transform active:scale-95"
            >
              <HandHeart className="h-6 w-6" />
              <span className="text-[10px] font-bold leading-none">Agir</span>
            </button>
          </div>

          <TabLink href="/formations" label="Formations" icon={GraduationCap} active={isActive("/formations")} />
          <TabButton label="Menu" icon={MenuIcon} active={sheet === "menu"} onClick={() => setSheet("menu")} />
        </div>
      </nav>

      {/* Feuille « Agir » */}
      <BottomSheet open={sheet === "agir"} onClose={() => setSheet(null)} title="Agir avec YEHLI">
        <p className="mb-4 mt-1 text-sm text-muted">Chaque geste compte. Choisissez comment soutenir.</p>
        <div className="space-y-2.5">
          {AGIR_ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/60 p-3.5 transition-colors active:bg-primary-pale"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold text-dark">{a.label}</span>
                <span className="block text-xs text-muted">{a.desc}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted" />
            </Link>
          ))}
        </div>
      </BottomSheet>

      {/* Feuille « Menu » */}
      <BottomSheet open={sheet === "menu"} onClose={() => setSheet(null)} title="Menu">
        <div className="mb-5 grid grid-cols-2 gap-2.5">
          {MENU_DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/60 p-3.5 transition-colors active:bg-primary-pale"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <d.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug text-dark">{d.label}</span>
            </Link>
          ))}
        </div>

        <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">Nous contacter</p>
        <div className="mb-5 space-y-1.5">
          <ContactRow icon={Phone} label={SITE.contact.phone} href={`tel:${waNumber(SITE.contact.phone)}`} />
          <ContactRow icon={Mail} label={SITE.contact.email} href={`mailto:${SITE.contact.email}`} />
          <ContactRow icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${waNumber(SITE.contact.whatsapp)}`} external />
          <ContactRow icon={MapPin} label={SITE.contact.address} />
        </div>

        <div className="mb-4 flex items-center gap-2.5">
          <SocialLink href={SITE.socials.facebook} label="Facebook" icon={FacebookIcon} />
          <SocialLink href={SITE.socials.instagram} label="Instagram" icon={InstagramIcon} />
          <SocialLink href={SITE.socials.linkedin} label="LinkedIn" icon={LinkedinIcon} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted">
          <Link href="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-primary">Confidentialité</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </BottomSheet>
    </>
  );
}

// ── Sous-composants ─────────────────────────────────────────
function TabLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-1.5 transition-colors",
        active ? "text-primary" : "text-muted",
      )}
    >
      <Icon className={cn("h-[22px] w-[22px]", active && "stroke-[2.4]")} />
      <span className={cn("text-[10px] leading-none", active ? "font-bold" : "font-medium")}>{label}</span>
    </Link>
  );
}

function TabButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={active}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-1.5 transition-colors",
        active ? "text-primary" : "text-muted",
      )}
    >
      <Icon className={cn("h-[22px] w-[22px]", active && "stroke-[2.4]")} />
      <span className={cn("text-[10px] leading-none", active ? "font-bold" : "font-medium")}>{label}</span>
    </button>
  );
}

function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-dark/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            role="dialog"
            aria-label={title}
            className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            <div className="shrink-0 px-4 pt-2.5">
              <div className="mx-auto mb-2 h-1.5 w-11 rounded-full bg-border" aria-hidden="true" />
              <div className="flex items-center justify-between pb-1">
                <h2 className="font-heading text-lg font-bold text-dark">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted active:bg-border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div
              className="overflow-y-auto px-4 pt-2"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-body">{label}</span>
    </>
  );
  const cls = "flex items-center gap-3 rounded-xl p-2 transition-colors active:bg-primary-pale";
  if (!href) return <div className={cls}>{inner}</div>;
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-dark transition-colors active:bg-primary-pale"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
