"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ADMIN_NAV } from "@/config/admin-nav";
import { roleAtLeast, ROLE_LABELS } from "@/lib/roles";
import { getInitials, cn } from "@/lib/utils";
import type { UserRole } from "@prisma/client";

type AdminUser = { name?: string | null; email?: string | null; role: UserRole };

export function AdminShell({ user, children }: { user: AdminUser; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = ADMIN_NAV.map((group) => ({
    ...group,
    items: group.items.filter((i) => !i.minRole || roleAtLeast(user.role, i.minRole)),
  })).filter((group) => group.items.length > 0);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
          <Logo className="h-8" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-1.5 px-3 text-2xs font-bold uppercase tracking-wider text-muted">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-white"
                          : "text-body hover:bg-primary-pale hover:text-primary",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le site public
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-white lg:block">
        {sidebar}
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 bg-dark/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-white shadow-xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebar}
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-dark hover:bg-surface lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-tight text-dark">{user.name}</p>
              <p className="text-xs text-muted">{ROLE_LABELS[user.role]}</p>
            </div>
            <Link
              href="/admin/mon-compte"
              title="Mon compte"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {getInitials(user.name || "Admin")}
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-error/10 hover:text-error"
              aria-label="Se déconnecter"
              title="Se déconnecter"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
