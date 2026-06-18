import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsappIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { getSiteSettings } from "@/lib/data/site";
import { SITE, waNumber } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'association YEHLI : email, téléphone, WhatsApp. Une question, un partenariat, une demande presse ? Nous vous répondons rapidement.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings.contact_email || SITE.contact.email;
  const phone = settings.contact_phone || SITE.contact.phone;
  const whatsapp = settings.contact_whatsapp || SITE.contact.whatsapp;
  const address = settings.contact_address || SITE.contact.address;

  const socials = [
    { key: "social_facebook", label: "Facebook", Icon: FacebookIcon },
    { key: "social_instagram", label: "Instagram", Icon: InstagramIcon },
    { key: "social_linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => settings[s.key]);

  const contactItems = [
    { Icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { Icon: Phone, label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { Icon: WhatsappIcon, label: "WhatsApp", value: phone, href: `https://wa.me/${waNumber(whatsapp)}` },
    { Icon: MapPin, label: "Adresse", value: address, href: null },
  ];

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
        badge="Parlons-en"
        title="Contactez-nous"
        subtitle="Une question, une idée de collaboration, une demande presse ? Notre équipe est à votre écoute."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr,1.4fr]">
          {/* Coordonnées */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-dark">Nos coordonnées</h2>
            <p className="mt-3 text-muted">
              N&apos;hésitez pas à nous joindre par le canal qui vous convient le mieux.
            </p>
            <ul className="mt-8 space-y-5">
              {contactItems.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-semibold text-dark hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-dark">{value}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Disponibilité</p>
                <p className="font-semibold text-dark">Du lundi au vendredi, 8h – 17h</p>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Suivez-nous</p>
                <div className="mt-3 flex gap-3">
                  {socials.map(({ key, label, Icon }) => (
                    <a
                      key={key}
                      href={settings[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-light"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-dark">Envoyez-nous un message</h2>
            <p className="mt-2 text-sm text-muted">
              Les champs marqués d&apos;un astérisque (*) sont obligatoires.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
