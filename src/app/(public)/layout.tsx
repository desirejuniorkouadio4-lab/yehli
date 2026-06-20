import { Navbar } from "@/components/layout/navbar";
import { MobileTopBar } from "@/components/layout/mobile-topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/data/site";
import { SITE } from "@/config/site";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  alternateName: "Association YEHLI",
  url: SITE.url,
  logo: `${SITE.url}/images/logo-yehli.png`,
  description: SITE.description,
  slogan: SITE.tagline,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.linkedin,
    SITE.socials.youtube,
  ].filter(Boolean),
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings();
  const contact = {
    email: s.contact_email || SITE.contact.email,
    phone: s.contact_phone || SITE.contact.phone,
    whatsapp: s.contact_whatsapp || SITE.contact.whatsapp,
    address: s.contact_address || SITE.contact.address,
  };
  return (
    <>
      <JsonLd data={organizationLd} />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Aller au contenu
      </a>
      <Navbar />
      <MobileTopBar />
      <main id="contenu" className="overflow-x-clip">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      {/* Espace de garde sous le contenu pour la barre d'onglets fixe (mobile). */}
      <div
        aria-hidden="true"
        className="lg:hidden"
        style={{ height: "calc(4rem + env(safe-area-inset-bottom))" }}
      />
      <MobileNav contact={contact} />
    </>
  );
}
