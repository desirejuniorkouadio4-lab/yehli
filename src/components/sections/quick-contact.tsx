import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social-icons";
import { waNumber } from "@/config/site";

type QuickContactProps = {
  email: string;
  phone: string;
  whatsapp: string;
};

export function QuickContact({ email, phone, whatsapp }: QuickContactProps) {
  const items = [
    { Icon: Mail, label: "Écrivez-nous", value: email, href: `mailto:${email}` },
    { Icon: Phone, label: "Appelez-nous", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    {
      Icon: WhatsappIcon,
      label: "WhatsApp",
      value: "Discutons ensemble",
      href: `https://wa.me/${waNumber(whatsapp)}`,
    },
  ];

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid items-center gap-6 rounded-2xl border border-border bg-surface p-8 sm:p-10 lg:grid-cols-[1fr,auto]">
        <div className="grid gap-5 sm:grid-cols-3">
          {items.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="block truncate font-semibold text-dark group-hover:text-primary">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white transition-all hover:bg-primary-light hover:shadow-cta"
        >
          Page contact
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
