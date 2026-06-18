import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation du site officiel de l'association YEHLI.",
  alternates: { canonical: "/conditions-utilisation" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Conditions d'utilisation", href: "/conditions-utilisation" }]}
        title="Conditions d'utilisation"
      />
      <section className="py-16">
        <div className="container-page">
          <div className="prose-yehli mx-auto">
            <h2>Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation régissent l&apos;accès et
              l&apos;usage du site officiel de l&apos;association YEHLI. En naviguant sur ce site, vous
              acceptez de vous y conformer.
            </p>

            <h2>Accès au site</h2>
            <p>
              Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à
              Internet. YEHLI s&apos;efforce d&apos;assurer la disponibilité du site, sans toutefois
              être tenue à une obligation de résultat. Des interruptions peuvent survenir pour des
              raisons de maintenance ou techniques.
            </p>

            <h2>Utilisation des contenus</h2>
            <p>
              Les contenus publiés sur ce site sont mis à disposition à titre informatif. Toute
              réutilisation à des fins commerciales ou toute reproduction sans autorisation est
              interdite.
            </p>

            <h2>Comportement de l&apos;utilisateur</h2>
            <p>L&apos;utilisateur s&apos;engage à utiliser le site de manière loyale et à ne pas :</p>
            <ul>
              <li>Perturber le bon fonctionnement du site</li>
              <li>Transmettre des contenus illicites ou inappropriés via les formulaires</li>
              <li>Porter atteinte aux droits de l&apos;association ou de tiers</li>
            </ul>

            <h2>Formulaires et données</h2>
            <p>
              Les informations transmises via les formulaires sont traitées conformément à notre{" "}
              <a href="/politique-de-confidentialite">politique de confidentialité</a>. L&apos;utilisateur
              s&apos;engage à fournir des informations exactes.
            </p>

            <h2>Liens externes</h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. YEHLI n&apos;exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h2>Modification</h2>
            <p>
              YEHLI se réserve le droit de modifier les présentes conditions à tout moment. La version
              applicable est celle en vigueur lors de votre visite.
            </p>

            <h2>Contact</h2>
            <p>Pour toute question, écrivez-nous à contact@yehli.org.</p>
          </div>
        </div>
      </section>
    </>
  );
}
