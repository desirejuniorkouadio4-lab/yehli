"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { MAIN_NAV, type NavItem } from "@/config/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le méga-menu lors d'un changement de page.
  React.useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname]);

  // Échap ferme le méga-menu desktop.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 120);
  };

  const activeItem = MAIN_NAV.find((i) => i.label === active && i.type === "mega") as
    | Extract<NavItem, { type: "mega" }>
    | undefined;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        scrolled ? "shadow-header" : "border-b border-border/70",
      )}
    >
      <div onMouseLeave={scheduleClose} onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}>
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" aria-label="YEHLI — Accueil" className="shrink-0">
            <Logo className="h-9 lg:h-11" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {MAIN_NAV.map((item) => {
                const isActive =
                  item.type === "link"
                    ? pathname === item.href
                    : item.href
                      ? pathname.startsWith(item.href) && item.href !== "/"
                      : false;
                return (
                  <li key={item.label} onMouseEnter={() => (item.type === "mega" ? open(item.label) : setActive(null))}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                          isActive ? "text-primary" : "text-dark hover:text-primary",
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={active === item.label}
                        onClick={() => setActive((a) => (a === item.label ? null : item.label))}
                        className={cn(
                          "flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                          active === item.label || isActive ? "text-primary" : "text-dark hover:text-primary",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            active === item.label && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA desktop */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button asChild variant="secondary" size="sm">
              <Link href="/faire-un-don">Faire un don</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/demander-une-intervention">
                Demander une intervention
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-dark hover:bg-primary-pale lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Panneau méga-menu desktop */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key={activeItem.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full hidden lg:block"
            >
              <div className="container-page pb-4 pt-2">
                <MegaPanel item={activeItem} onNavigate={() => setActive(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

// ── Panneau méga-menu (desktop) ─────────────────────────────
function MegaPanel({
  item,
  onNavigate,
}: {
  item: Extract<NavItem, { type: "mega" }>;
  onNavigate: () => void;
}) {
  const isGrid = item.variant === "grid";
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-primary/5 ring-1 ring-black/5">
      <div className={cn("grid", item.featured ? "lg:grid-cols-12" : "grid-cols-1")}>
        <div className={cn("p-6", item.featured && "lg:col-span-8")}>
          {item.columns.map((col, ci) => (
            <div key={ci}>
              {col.title && (
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">{col.title}</p>
              )}
              <ul className={cn(isGrid ? "grid gap-1 sm:grid-cols-2" : "grid gap-1")}>
                {col.links.map((link) => {
                  const Icon = link.icon ? getIcon(link.icon) : null;
                  return (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary-pale"
                      >
                        {Icon && (
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </span>
                        )}
                        <span>
                          <span className="block text-sm font-semibold text-dark group-hover:text-primary">
                            {link.label}
                          </span>
                          {link.description && (
                            <span className="mt-0.5 block text-xs leading-snug text-muted">
                              {link.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {item.featured && (
          <div className="relative flex flex-col justify-between gap-4 bg-gradient-to-br from-primary to-[#0f4a1d] p-6 lg:col-span-4">
            <div>
              <p className="font-heading text-lg font-bold text-white">{item.featured.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{item.featured.text}</p>
            </div>
            <Button asChild variant="accent" size="sm" className="w-fit">
              <Link href={item.featured.href} onClick={onNavigate}>
                {item.featured.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Drawer mobile ───────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo className="h-9" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-dark hover:bg-primary-pale"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Navigation mobile">
              <ul className="space-y-1">
                {MAIN_NAV.map((item) => (
                  <li key={item.label}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-semibold",
                          pathname === item.href ? "bg-primary-pale text-primary" : "text-dark",
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                          aria-expanded={expanded === item.label}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-dark"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-muted transition-transform",
                              expanded === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3"
                            >
                              {item.href && (
                                <li>
                                  <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-primary"
                                  >
                                    Tout voir
                                  </Link>
                                </li>
                              )}
                              {item.columns.flatMap((c) => c.links).map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="block rounded-lg px-4 py-2.5 text-sm text-body hover:text-primary"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-2 border-t border-border px-5 py-4">
              <Button asChild className="w-full">
                <Link href="/demander-une-intervention" onClick={onClose}>
                  Demander une intervention
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/faire-un-don" onClick={onClose}>
                  Faire un don
                </Link>
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
