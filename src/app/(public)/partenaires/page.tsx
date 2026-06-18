import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { PartnerCard } from "@/components/cards/partner-card";
import { getPartners } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Nos partenaires",
  description:
    "Institutions, fondations, ONG et établissements scolaires qui accompagnent YEHLI dans sa mission éducative en Côte d'Ivoire.",
  alternates: { canonical: "/partenaires" },
};

const TYPE_GROUPS = [
  { key: "institutionnel", label: "Partenaires institutionnels" },
  { key: "financier", label: "Partenaires financiers" },
  { key: "technique", label: "Partenaires techniques" },
  { key: "ecole_beneficiaire", label: "Écoles bénéficiaires" },
];

export default async function PartnersPage() {
  const partners = await getPartners();
  const groups = TYPE_GROUPS.map((g) => ({
    ...g,
    items: partners.filter((p) => p.type === g.key),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Partenaires", href: "/partenaires" }]}
        badge="Ils nous font confiance"
        title="Nos partenaires"
        subtitle="YEHLI avance grâce à un réseau d'institutions, de fondations et d'établissements engagés pour l'éducation."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page space-y-14">
          {groups.map((group) => (
            <div key={group.key}>
              <h2 className="mb-6 text-center font-heading text-2xl font-bold text-dark">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-pale py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary-mid bg-white p-8 text-center sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
              <Handshake className="h-7 w-7" />
            </span>
            <SectionHeader
              className="mt-6"
              title="Devenir partenaire de YEHLI"
              subtitle="Vous partagez notre vision d'une éducation lumineuse et inclusive ? Construisons ensemble des projets à fort impact pour les enfants et les jeunes de Côte d'Ivoire."
            />
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Nous contacter
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
