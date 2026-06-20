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
  Search,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { SITE, waNumber } from "@/config/site";
import { NAV_ACTIONS } from "@/config/navigation";
import { cn } from "@/lib/utils";

// Index de recherche du menu (pages principales du site).
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

const SEARCH_INDEX: { label: string; href: string; kw: string }[] = [
  { label: "Accueil", href: "/", kw: "home" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous", kw: "association mission valeurs histoire" },
  { label: "Notre équipe", href: "/qui-sommes-nous#equipe", kw: "membres team" },
  { label: "Nos partenaires", href: "/partenaires", kw: "partenaires sponsors" },
  { label: "Nos actions", href: "/nos-actions", kw: "programmes axes domaines" },
  ...NAV_ACTIONS.map((a) => ({ label: a.label, href: a.href, kw: a.description ?? "" })),
  { label: "Formations", href: "/formations", kw: "ateliers catalogue enseignants élèves" },
  { label: "Blog & ressources", href: "/blog", kw: "articles actualités vulgarisation" },
  { label: "Événements", href: "/evenements", kw: "agenda forums rencontres" },
  { label: "Galerie", href: "/galerie", kw: "photos images" },
  { label: "Faire un don", href: "/faire-un-don", kw: "soutenir donation argent" },
  { label: "Demander une intervention", href: "/demander-une-intervention", kw: "atelier conférence école structure" },
  { label: "Devenir bénévole", href: "/devenir-benevole", kw: "volontaire engagement temps" },
  { label: "Adhérer", href: "/adherer", kw: "membre adhésion cotisation" },
  { label: "Nous soutenir", href: "/nous-soutenir", kw: "aider soutien" },
  { label: "Contact", href: "/contact", kw: "joindre email téléphone presse" },
];

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
type ContactInfo = { email: string; phone: string; whatsapp: string; address: string };

export function MobileNav({ contact }: { contact?: ContactInfo }) {
  const pathname = usePathname();
  const [sheet, setSheet] = React.useState<Sheet>(null);
  const [barHidden, setBarHidden] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Ferme la feuille et réinitialise la recherche à chaque navigation.
  React.useEffect(() => {
    setSheet(null);
    setQuery("");
  }, [pathname]);

  // Verrouille le défilement du corps quand une feuille est ouverte.
  React.useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    if (!sheet) setQuery("");
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  // Masque la barre d'onglets au défilement vers le bas, la révèle vers le haut.
  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setBarHidden(y > last && y > 90);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const results = query.trim()
    ? SEARCH_INDEX.filter((i) => norm(`${i.label} ${i.kw}`).includes(norm(query.trim())))
    : [];

  return (
    <>
      {/* Barre d'onglets fixe */}
      <nav
        aria-label="Navigation mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-lg transition-transform duration-300 will-change-transform lg:hidden",
          barHidden && !sheet ? "translate-y-[calc(100%+2.5rem)]" : "translate-y-0",
        )}
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
        {/* Recherche */}
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une page…"
            aria-label="Rechercher"
            className="h-12 w-full rounded-2xl border border-border bg-surface pl-11 pr-4 text-[15px] text-dark outline-none transition-colors placeholder:text-muted focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
          />
        </div>

        {query.trim() ? (
          <div className="space-y-1.5">
            {results.length === 0 ? (
              <p className="px-1 py-10 text-center text-sm text-muted">
                Aucun résultat pour «&nbsp;{query.trim()}&nbsp;».
              </p>
            ) : (
              results.map((r) => (
                <Link
                  key={r.href + r.label}
                  href={r.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 transition-colors active:bg-primary-pale"
                >
                  <span className="text-[15px] font-semibold text-dark">{r.label}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted" />
                </Link>
              ))
            )}
          </div>
        ) : (
          <>
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
          <ContactRow icon={Phone} label={contact?.phone ?? SITE.contact.phone} href={`tel:${waNumber(contact?.phone ?? SITE.contact.phone)}`} />
          <ContactRow icon={Mail} label={contact?.email ?? SITE.contact.email} href={`mailto:${contact?.email ?? SITE.contact.email}`} />
          <ContactRow icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${waNumber(contact?.whatsapp ?? SITE.contact.whatsapp)}`} external />
          <ContactRow icon={MapPin} label={contact?.address ?? SITE.contact.address} />
        </div>

        <div className="mb-4 flex items-center gap-2.5">
          <SocialLink href={SITE.socials.facebook} label="Facebook" icon={FacebookIcon} />
          <SocialLink href={SITE.socials.instagram} label="Instagram" icon={InstagramIcon} />
          <SocialLink href={SITE.socials.linkedin} label="LinkedIn" icon={LinkedinIcon} />
        </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted">
              <Link href="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-primary">Confidentialité</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
              <Link href="/admin" className="ml-auto flex items-center gap-1 rounded-full border border-border px-2.5 py-1 hover:border-primary/40 hover:text-primary">
                <Lock className="h-3 w-3" />
                Admin
              </Link>
            </div>
          </>
        )}
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
