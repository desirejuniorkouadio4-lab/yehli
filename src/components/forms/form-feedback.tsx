import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { HONEYPOT_FIELD } from "@/lib/forms";

/** Champ honeypot anti-spam (invisible pour les humains). */
export function Honeypot() {
  return (
    <input
      type="text"
      name={HONEYPOT_FIELD}
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
      aria-hidden="true"
    />
  );
}

/** État de succès affiché à la place du formulaire. */
export function FormSuccess({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <p className="text-lg font-semibold text-dark">{message}</p>
      <p className="text-sm text-muted">Un email de confirmation vous a été envoyé.</p>
    </div>
  );
}

/** Case de consentement RGPD, reliée à React Hook Form. */
export function ConsentField({
  registration,
  error,
  id = "consent",
}: {
  registration: UseFormRegisterReturn;
  error?: string;
  id?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <Checkbox id={id} {...registration} aria-invalid={!!error} className="mt-0.5" />
        <span className="text-sm text-muted">
          J&apos;accepte que mes données soient traitées conformément à la{" "}
          <Link
            href="/politique-de-confidentialite"
            target="_blank"
            className="font-medium text-primary underline"
          >
            politique de confidentialité
          </Link>
          . <span className="text-error">*</span>
        </span>
      </label>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Bandeau d'erreur en tête de formulaire. */
export function FormErrorBanner({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="flex items-center gap-2 rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}
