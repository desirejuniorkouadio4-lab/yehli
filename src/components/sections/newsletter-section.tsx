import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="relative isolate overflow-hidden rounded-2xl border border-primary-mid bg-primary-pale px-6 py-12 sm:px-12">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
            <Mail className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-heading text-2xl font-bold text-dark sm:text-3xl">
            Restez informé·e
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted">
            Recevez nos actualités, nos ressources de vulgarisation scientifique et l&apos;annonce
            de nos prochains événements, directement dans votre boîte mail.
          </p>
          <div className="mx-auto mt-7 max-w-xl">
            <NewsletterForm />
          </div>
          <p className="mt-3 text-xs text-muted">
            Pas de spam, jamais. Désabonnement possible en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
