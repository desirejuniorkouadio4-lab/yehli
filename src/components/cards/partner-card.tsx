import Image from "next/image";
import type { PartnerVM } from "@/lib/data/types";

const TYPE_LABELS: Record<string, string> = {
  institutionnel: "Institutionnel",
  technique: "Technique",
  financier: "Financier",
  ecole_beneficiaire: "École bénéficiaire",
};

export function partnerTypeLabel(type?: string | null): string {
  if (!type) return "Partenaire";
  return TYPE_LABELS[type] ?? type;
}

export function PartnerCard({ partner }: { partner: PartnerVM }) {
  const content = partner.logo ? (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={160}
      height={80}
      className="max-h-14 w-auto object-contain"
    />
  ) : (
    <span className="text-center text-sm font-semibold leading-snug text-primary/90">
      {partner.name}
    </span>
  );

  const inner = (
    <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-primary-mid hover:shadow-card">
      {content}
    </div>
  );

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
        {inner}
      </a>
    );
  }
  return inner;
}
