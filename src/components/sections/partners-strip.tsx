import { SectionHeader } from "@/components/shared/section-header";
import { PartnerCard } from "@/components/cards/partner-card";
import type { PartnerVM } from "@/lib/data/types";

type PartnersStripProps = {
  partners: PartnerVM[];
  title?: string;
  subtitle?: string;
  badge?: string;
};

export function PartnersStrip({
  partners,
  title = "Nos partenaires",
  subtitle = "Institutions, fondations et établissements qui soutiennent notre mission éducative.",
  badge = "Ils nous font confiance",
}: PartnersStripProps) {
  if (!partners.length) return null;
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
}
