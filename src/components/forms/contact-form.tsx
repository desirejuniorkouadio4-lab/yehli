"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact } from "@/app/actions/contact";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CONTACT_SUBJECTS } from "@/lib/form-options";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false },
  });
  const { formRef, pending, result, submit } = useServerForm(submitContact);

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof ContactInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <Honeypot />
      <FormField label="Nom complet" htmlFor="c-name" required error={err("name")}>
        <Input id="c-name" {...register("name")} aria-invalid={!!err("name")} />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="c-email" required error={err("email")}>
          <Input id="c-email" type="email" {...register("email")} aria-invalid={!!err("email")} />
        </FormField>
        <FormField label="Téléphone" htmlFor="c-phone" hint="Facultatif">
          <Input id="c-phone" type="tel" {...register("phone")} />
        </FormField>
      </div>
      <FormField label="Sujet" htmlFor="c-subject" required error={err("subject")}>
        <Select id="c-subject" defaultValue="" {...register("subject")} aria-invalid={!!err("subject")}>
          <option value="" disabled>
            Choisir un sujet…
          </option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="Message" htmlFor="c-message" required error={err("message")}>
        <Textarea id="c-message" rows={6} {...register("message")} aria-invalid={!!err("message")} />
      </FormField>
      <ConsentField registration={register("consent")} error={err("consent")} />
      {result && !result.ok && <FormErrorBanner message={result.message} />}
      <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Envoyer le message
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
