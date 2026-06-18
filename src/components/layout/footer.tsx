import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  WhatsappIcon,
} from "@/components/icons/social-icons";
import { Logo } from "@/components/brand/logo";
import { getSiteSettings } from "@/lib/data/site";
import { SITE, waNumber } from "@/config/site";
import { FOOTER_NAV } from "@/config/navigation";

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const get = (key: string, fallback = "") => settings[key] || fallback;
  const email = get("contact_email", SITE.contact.email);
  const phone = get("contact_phone", SITE.contact.phone);
  const whatsapp = get("contact_whatsapp", SITE.contact.whatsapp);
  const address = get("contact_address", SITE.contact.address);

  const socials = [
    { key: "social_facebook", label: "Facebook", Icon: FacebookIcon },
    { key: "social_instagram", label: "Instagram", Icon: InstagramIcon },
    { key: "social_linkedin", label: "LinkedIn", Icon: LinkedinIcon },
    { key: "social_youtube", label: "YouTube", Icon: YoutubeIcon },
  ].filter((s) => Boolean(settings[s.key]));

  const columns = [FOOTER_NAV.association, FOOTER_NAV.actions, FOOTER_NAV.join];

  return (
    <footer className="relative bg-primary text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#0f4a1d]" aria-hidden="true" />
      <div className="container-page relative z-10 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Colonne marque */}
          <div className="lg:col-span-4">
            <Logo variant="white" className="h-12" />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-white/80">
              {get("site_tagline", SITE.tagline)}
            </p>
            <p className="mt-4 max-w-xs text-sm italic text-accent-light">
              « {SITE.signature} »
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ key, label, Icon }) => (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-dark"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonnes de liens */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-accent-light">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Colonne contact */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent-light">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-2.5 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-start gap-2.5 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${waNumber(whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white"
                >
                  <WhatsappIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bande basse */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {year} YEHLI</span>
            {FOOTER_NAV.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-white/60">
            Site conçu et réalisé par{" "}
            <span className="font-medium text-white/80">
              {get("site_creator", SITE.creator)}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
