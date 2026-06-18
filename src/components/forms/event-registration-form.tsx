"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { registerForEvent } from "@/app/actions/event-registration";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HONEYPOT_FIELD, type ActionResult } from "@/lib/forms";

export function EventRegistrationForm({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await registerForEvent(eventId, eventTitle, formData);
      setResult(res);
      if (res.ok) formRef.current?.reset();
    });
  };

  if (result?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="font-semibold text-dark">{result.message}</p>
      </div>
    );
  }

  const errors = result?.fieldErrors ?? {};

  return (
    <form ref={formRef} action={onSubmit} className="space-y-4">
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Prénom" htmlFor="ev-firstName" required error={errors.firstName}>
          <Input id="ev-firstName" name="firstName" required aria-invalid={!!errors.firstName} />
        </FormField>
        <FormField label="Nom" htmlFor="ev-lastName" required error={errors.lastName}>
          <Input id="ev-lastName" name="lastName" required aria-invalid={!!errors.lastName} />
        </FormField>
      </div>
      <FormField label="Email" htmlFor="ev-email" required error={errors.email}>
        <Input id="ev-email" name="email" type="email" required aria-invalid={!!errors.email} />
      </FormField>
      <FormField label="Téléphone" htmlFor="ev-phone" hint="Facultatif">
        <Input id="ev-phone" name="phone" type="tel" />
      </FormField>

      {result && !result.ok && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-error" role="alert">
          <AlertCircle className="h-4 w-4" />
          {result.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Inscription…
          </>
        ) : (
          "Je m'inscris"
        )}
      </Button>
    </form>
  );
}
