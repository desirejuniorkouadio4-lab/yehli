"use client";

import { useRef, useState, useTransition } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { HONEYPOT_FIELD } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await subscribeNewsletter(formData);
      setResult({ ok: res.ok, message: res.message });
      if (res.ok) formRef.current?.reset();
    });
  };

  return (
    <div>
      <form ref={formRef} action={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse email
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="Votre adresse email"
          className="h-12 flex-1 rounded-full border border-border bg-white px-5 text-[0.95rem] text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-white transition-all hover:bg-primary-light hover:shadow-cta disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Inscription…
            </>
          ) : (
            <>
              S&apos;inscrire
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      {result && (
        <p
          role="status"
          className={cn(
            "mt-3 flex items-center gap-1.5 text-sm font-medium",
            result.ok ? "text-success" : "text-error",
          )}
        >
          {result.ok ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {result.message}
        </p>
      )}
    </div>
  );
}
