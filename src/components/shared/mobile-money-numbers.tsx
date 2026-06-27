"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Operator = {
  name: string;
  subtitle: string;
  number: string;
  logo: string;          // chemin /public
  accentFrom: string;    // gradient from
  accentTo: string;      // gradient to
  borderColor: string;
  badgeBg: string;
};

const OPERATORS: Omit<Operator, "number">[] = [
  {
    name: "Wave",
    subtitle: "Transfert Mobile Money",
    logo: "/images/Wave.png",
    accentFrom: "from-[#1A91FF]",
    accentTo: "to-[#0E6CC7]",
    borderColor: "border-[#1A91FF]/25",
    badgeBg: "bg-[#E8F4FF]",
  },
  {
    name: "MTN Mobile Money",
    subtitle: "Transfert Mobile Money",
    logo: "/images/mtn-money.webp",
    accentFrom: "from-[#FFCC00]",
    accentTo: "to-[#F5B800]",
    borderColor: "border-[#FFCC00]/40",
    badgeBg: "bg-[#FFF9E0]",
  },
];

function CopyButton({ number, accentFrom, accentTo }: { number: string; accentFrom: string; accentTo: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(number.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponible
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copier le numéro"
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200",
        "bg-gradient-to-br shadow-md active:scale-95",
        copied ? "from-success to-success" : `${accentFrom} ${accentTo}`,
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copié !
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copier
        </>
      )}
    </button>
  );
}

function OperatorCard({ op, number }: { op: (typeof OPERATORS)[0]; number: string }) {
  if (!number) return null;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-5 overflow-hidden rounded-2xl border bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-md",
        op.borderColor,
      )}
    >
      {/* Bande de couleur à gauche */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1.5 rounded-l-2xl bg-gradient-to-b",
          op.accentFrom,
          op.accentTo,
        )}
        aria-hidden="true"
      />

      {/* Logo opérateur */}
      <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ml-3", op.badgeBg)}>
        <Image
          src={op.logo}
          alt={op.name}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          unoptimized
        />
      </div>

      {/* Texte */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">{op.subtitle}</p>
        <p className="mt-0.5 text-base font-black text-dark">{op.name}</p>
        <p className="mt-1 font-heading text-xl font-bold tracking-wide text-dark">
          {number}
        </p>
      </div>

      {/* Bouton copier */}
      <CopyButton number={number} accentFrom={op.accentFrom} accentTo={op.accentTo} />
    </div>
  );
}

export function MobileMoneyNumbers({
  orangeMoney,
  wave,
  mtn,
}: {
  orangeMoney?: string;
  wave?: string;
  mtn?: string;
}) {
  const values = [wave, mtn];
  const hasAny = [orangeMoney, wave, mtn].some(Boolean);
  if (!hasAny) return null;

  return (
    <div className="space-y-3">
      {OPERATORS.map((op, i) =>
        values[i] ? (
          <OperatorCard key={op.name} op={op} number={values[i]!} />
        ) : null,
      )}
    </div>
  );
}
