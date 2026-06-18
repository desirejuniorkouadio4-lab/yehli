"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";
import type { ArticleVM } from "@/lib/data/types";

const FALLBACK = [
  { id: "f1", title: "YEHLI lance de nouveaux ateliers scientifiques pour les lycéens d'Abidjan", href: "/blog" },
  { id: "f2", title: "Formation continue : 50 enseignants formés aux méthodes actives en 2024", href: "/blog" },
  { id: "f3", title: "Nouveau partenariat avec l'Université FHB pour la vulgarisation scientifique", href: "/blog" },
  { id: "f4", title: "Forum YEHLI 2025 : dates et programme bientôt disponibles", href: "/evenements" },
  { id: "f5", title: "Découvrez le catalogue de formations 2025–2026 de YEHLI", href: "/formations" },
];

export function NewsTicker({ articles }: { articles?: ArticleVM[] }) {
  const items = articles?.length
    ? articles.map((a) => ({ id: a.id, title: a.title, href: `/blog/${a.slug}` }))
    : FALLBACK;

  // Duplication pour boucle infinie seamless (keyframe marquee = -50%)
  const doubled = [...items, ...items];
  const duration = Math.max(28, items.length * 9);

  return (
    <div className="relative flex items-stretch overflow-hidden border-b border-border bg-white shadow-sm">
      {/* Badge "Actualités" fixe à gauche */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 border-r border-border bg-primary px-4 py-3">
        <Megaphone className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-widest text-white">
          Actualités
        </span>
      </div>

      {/* Zone défilante avec masque en fondu sur les bords */}
      <div className="relative flex-1 overflow-hidden mask-fade-x">
        <ul
          className="flex animate-marquee items-center whitespace-nowrap"
          style={{ animationDuration: `${duration}s` }}
          aria-label="Fil d'actualités YEHLI"
        >
          {doubled.map((item, i) => (
            <li key={`${item.id}-${i}`} className="flex items-center">
              <Link
                href={item.href}
                className="px-6 py-3 text-sm text-body transition-colors hover:text-primary"
                tabIndex={i >= items.length ? -1 : 0}
              >
                {item.title}
              </Link>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-mid" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
