"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Operator = {
  name: string;
  shortName: string;
  number: string;
  color: string;       // bg de la carte
  textColor: string;   // couleur du nom
  badgeColor: string;  // badge logo
  logo: string;        // emoji ou lettre
};

const OPERATORS: Omit<Operator, "number">[] = [
  {
    name: "Orange Money",
    shortName: "Orange",
    color: "bg-[#FF6600]/8",
    textColor: "text-[#FF6600]",
    badgeColor: "bg-[#FF6600]",
    logo: "🟠",
  },
  {
    name: "Wave",
    shortName: "Wave",
    color: "bg-[#1A91FF]/8",
    textColor: "text-[#1A91FF]",
    badgeColor: "bg-[#1A91FF]",
    logo: "🌊",
  },
  {
    name: "MTN Mobile Money",
    shortName: "MTN",
    color: "bg-[#FFCC00]/10",
    textColor: "text-[#B8970A]",
    badgeColor: "bg-[#FFCC00]",
    logo: "🟡",
  },
];

function OperatorCard({ op, number }: { op: (typeof OPERATORS)[0]; number: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const clean = number.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // pas de clipboard dispo
    }
  }

  if (!number) return null;

  return (
    <div className={`${op.color} flex items-center justify-between gap-4 rounded-2xl border border-border p-4`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">{op.logo}</span>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${op.textColor}`}>{op.name}</p>
          <p className="mt-0.5 font-heading text-lg font-bold tracking-wide text-dark">{number}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copier le numéro ${op.name}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted transition-colors hover:border-primary/30 hover:text-primary"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
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
  const numbers = [orangeMoney, wave, mtn];
  const hasAny = numbers.some(Boolean);
  if (!hasAny) return null;

  return (
    <div className="space-y-3">
      {OPERATORS.map((op, i) =>
        numbers[i] ? <OperatorCard key={op.name} op={op} number={numbers[i]!} /> : null,
      )}
    </div>
  );
}
