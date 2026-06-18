"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { membershipSchema, type MembershipInput } from "@/lib/validations";
import { submitMembership } from "@/app/actions/membership";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES, MEMBERSHIP_TYPES } from "@/lib/form-options";

export function MembershipForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipInput>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { consent: false, country: "Côte d'Ivoire" },
  });
  const { formRef, pending, result, submit } = useServerForm(submitMembership);

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof MembershipInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Prénom" htmlFor="m-firstName" required error={err("firstName")}>
          <Input id="m-firstName" {...register("firstName")} aria-invalid={!!err("firstName")} />
        </FormField>
        <FormField label="Nom" htmlFor="m-lastName" required error={err("lastName")}>
          <Input id="m-lastName" {...register("lastName")} aria-invalid={!!err("lastName")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="m-email" required error={err("email")}>
          <Input id="m-email" type="email" {...register("email")} aria-invalid={!!err("email")} />
        </FormField>
        <FormField label="Téléphone" htmlFor="m-phone" hint="Facultatif">
          <Input id="m-phone" type="tel" {...register("phone")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Ville" htmlFor="m-city" hint="Facultatif">
          <Input id="m-city" {...register("city")} />
        </FormField>
        <FormField label="Commune" htmlFor="m-commune" hint="Facultatif">
          <Input id="m-commune" {...register("commune")} />
        </FormField>
        <FormField label="Pays" htmlFor="m-country" required error={err("country")}>
          <Select id="m-country" {...register("country")} aria-invalid={!!err("country")}>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Profession" htmlFor="m-profession" hint="Facultatif">
          <Input id="m-profession" {...register("profession")} />
        </FormField>
        <FormField label="Organisation" htmlFor="m-organization" hint="Facultatif">
          <Input id="m-organization" {...register("organization")} />
        </FormField>
      </div>
      <FormField label="Type d'adhésion" htmlFor="m-type" required error={err("membershipType")}>
        <Select id="m-type" defaultValue="" {...register("membershipType")} aria-invalid={!!err("membershipType")}>
          <option value="" disabled>Choisir…</option>
          {MEMBERSHIP_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Votre motivation" htmlFor="m-motivation" hint="Facultatif">
        <Textarea id="m-motivation" rows={4} {...register("motivation")} placeholder="Pourquoi souhaitez-vous adhérer à YEHLI ?" />
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
            Envoyer ma demande d&apos;adhésion
            <UserPlus className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
