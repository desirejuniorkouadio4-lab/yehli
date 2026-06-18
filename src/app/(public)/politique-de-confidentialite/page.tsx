import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données personnelles de YEHLI.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Politique de confidentialité", href: "/politique-de-confidentialite" }]}
        title="Politique de confidentialité"
      />
      <section className="py-16">
        <div className="container-page">
          <div className="prose-yehli mx-auto">
            <p>
              L&apos;association YEHLI accorde une grande importance à la protection de vos données
              personnelles. La présente politique explique quelles données nous collectons, pourquoi,
              et quels sont vos droits.
            </p>

            <h2>Données collectées</h2>
            <p>Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires :</p>
            <ul>
              <li>Identité : nom, prénom, fonction</li>
              <li>Coordonnées : adresse email, téléphone, ville, pays</li>
              <li>Informations relatives à votre demande (intervention, don, adhésion, bénévolat, contact)</li>
            </ul>

            <h2>Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Répondre à vos demandes et assurer le suivi de nos échanges</li>
              <li>Organiser nos interventions, événements et actions</li>
              <li>Gérer les dons, adhésions et candidatures de bénévolat</li>
              <li>Vous envoyer notre newsletter, si vous y avez consenti</li>
            </ul>

            <h2>Base légale</h2>
            <p>
              Les traitements reposent sur votre consentement et sur l&apos;intérêt légitime de
              l&apos;association à mener à bien sa mission éducative.
            </p>

            <h2>Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant la durée nécessaire au traitement de votre demande,
              puis archivées ou supprimées conformément aux durées légales applicables. Les abonnés à
              la newsletter peuvent se désabonner à tout moment.
            </p>

            <h2>Partage des données</h2>
            <p>
              Vos données ne sont ni vendues ni cédées à des tiers. Elles peuvent être traitées par
              nos prestataires techniques (hébergement, envoi d&apos;emails) dans le strict cadre de
              nos services et dans le respect de la confidentialité.
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès,
              de rectification, d&apos;effacement, de limitation et d&apos;opposition concernant vos
              données. Pour exercer ces droits, écrivez-nous à contact@yehli.org.
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site utilise uniquement les cookies strictement nécessaires à son bon
              fonctionnement. Aucun cookie publicitaire n&apos;est déposé sans votre consentement.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative à la protection de vos données, contactez-nous à
              l&apos;adresse contact@yehli.org.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
