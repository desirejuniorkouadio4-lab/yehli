import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site officiel de l'association YEHLI.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Mentions légales", href: "/mentions-legales" }]}
        title="Mentions légales"
      />
      <section className="py-16">
        <div className="container-page">
          <div className="prose-yehli mx-auto">
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par l&apos;association <strong>YEHLI</strong>, organisation
              non gouvernementale dédiée à l&apos;éducation et à l&apos;épanouissement des enfants et
              des jeunes en Côte d&apos;Ivoire.
            </p>
            <ul>
              <li>Siège : Abidjan, Côte d&apos;Ivoire</li>
              <li>Adresse électronique : contact@yehli.org</li>
              <li>Représentante légale : Dr Mariame Coulibaly, Fondatrice</li>
            </ul>

            <h2>Conception et réalisation</h2>
            <p>
              Le site a été conçu et réalisé par <strong>Digital Access — Département Digital Web
              Solution</strong>.
            </p>

            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par un prestataire d&apos;hébergement web professionnel.
              L&apos;identité et les coordonnées complètes de l&apos;hébergeur peuvent être obtenues
              sur simple demande à l&apos;adresse contact@yehli.org.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logo, charte
              graphique) est la propriété de l&apos;association YEHLI ou de ses partenaires, sauf
              mention contraire. Toute reproduction, représentation ou diffusion, totale ou
              partielle, sans autorisation préalable est interdite et constituerait une contrefaçon.
            </p>

            <h2>Responsabilité</h2>
            <p>
              YEHLI s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations diffusées sur ce site, mais ne saurait être tenue responsable des erreurs,
              omissions ou résultats qui pourraient être obtenus par un usage inapproprié de ces
              informations.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à
              l&apos;adresse contact@yehli.org.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
