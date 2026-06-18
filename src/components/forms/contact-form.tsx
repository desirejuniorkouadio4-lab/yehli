"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, User, Mail, Phone } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact } from "@/app/actions/contact";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FloatingInput, FloatingTextarea, SubjectChips } from "./floating-fields";
import { Button } from "@/components/ui/button";
import { CONTACT_SUBJECTS } from "@/lib/form-options";

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false, subject: "" },
  });
  const { formRef, pending, result, submit } = useServerForm(submitContact);
  const messageValue = watch("message");

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof ContactInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <Honeypot />

      <FloatingInput
        label="Nom complet"
        id="c-name"
        required
        icon={<User className="h-4 w-4" />}
        error={err("name")}
        {...register("name")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingInput
          label="Email"
          id="c-email"
          type="email"
          required
          icon={<Mail className="h-4 w-4" />}
          error={err("email")}
          {...register("email")}
        />
        <FloatingInput
          label="Téléphone"
          id="c-phone"
          type="tel"
          hint="Facultatif"
          icon={<Phone className="h-4 w-4" />}
          {...register("phone")}
        />
      </div>

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <SubjectChips
            options={CONTACT_SUBJECTS}
            value={field.value}
            onChange={field.onChange}
            error={err("subject")}
          />
        )}
      />

      <FloatingTextarea
        label="Votre message"
        id="c-message"
        required
        rows={5}
        maxLength={2000}
        watchLength={messageValue?.length ?? 0}
        error={err("message")}
        {...register("message")}
      />

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
