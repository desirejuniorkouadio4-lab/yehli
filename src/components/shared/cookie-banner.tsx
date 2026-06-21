"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "yehli_cookies_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Attendre le rendu côté client pour lire localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 lg:bottom-4 lg:left-auto lg:right-4 lg:w-[380px]",
        "mx-auto max-w-full sm:max-w-md lg:max-w-none",
        // Décalage pour ne pas masquer la barre d'onglets mobile
        "pb-[env(safe-area-inset-bottom)] lg:pb-0",
      )}
    >
      <div
        className="m-3 lg:m-0 rounded-2xl border border-border bg-white shadow-2xl shadow-dark/10"
        style={{ marginBottom: "calc(4.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="relative p-5">
          {/* Bouton fermer (ne refuse pas, juste cache temporairement) */}
          <button
            type="button"
            onClick={decline}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-dark"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-dark">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-dark">Cookies & confidentialité</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Nous utilisons des cookies essentiels pour le bon fonctionnement du site
                (session, sécurité). Aucun cookie publicitaire ou de traçage tiers.{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-2 hover:no-underline"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={accept}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={decline}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-body transition-colors hover:bg-surface"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
