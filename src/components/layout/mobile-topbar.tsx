import Link from "next/link";
import { HandHeart } from "lucide-react";
import { Logo } from "@/components/brand/logo";

/** En-tête mobile compact (la navigation vit dans la barre d'onglets en bas). */
export function MobileTopBar() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur-md lg:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" aria-label="YEHLI — Accueil">
          <Logo className="h-8" />
        </Link>
        <Link
          href="/faire-un-don"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-dark shadow-sm transition-transform active:scale-95"
        >
          <HandHeart className="h-4 w-4" />
          Faire un don
        </Link>
      </div>
    </header>
  );
}
