"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Heart } from "lucide-react";
import { volunteerSchema, type VolunteerInput } from "@/lib/validations";
import { submitVolunteer } from "@/app/actions/volunteer";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { COUNTRIES, VOLUNTEER_INTERESTS } from "@/lib/form-options";

export function VolunteerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { consent: false, country: "Côte d'Ivoire", interests: [] },
  });
  const { formRef, pending, result, submit } = useServerForm(submitVolunteer);

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof VolunteerInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Prénom" htmlFor="v-firstName" required error={err("firstName")}>
          <Input id="v-firstName" {...register("firstName")} aria-invalid={!!err("firstName")} />
        </FormField>
        <FormField label="Nom" htmlFor="v-lastName" required error={err("lastName")}>
          <Input id="v-lastName" {...register("lastName")} aria-invalid={!!err("lastName")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="v-email" required error={err("email")}>
          <Input id="v-email" type="email" {...register("email")} aria-invalid={!!err("email")} />
        </FormField>
        <FormField label="Téléphone" htmlFor="v-phone" hint="Facultatif">
          <Input id="v-phone" type="tel" {...register("phone")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Ville" htmlFor="v-city" hint="Facultatif">
          <Input id="v-city" {...register("city")} />
        </FormField>
        <FormField label="Commune" htmlFor="v-commune" hint="Facultatif">
          <Input id="v-commune" {...register("commune")} />
        </FormField>
        <FormField label="Pays" htmlFor="v-country" required error={err("country")}>
          <Select id="v-country" {...register("country")} aria-invalid={!!err("country")}>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Profession" htmlFor="v-profession" hint="Facultatif">
          <Input id="v-profession" {...register("profession")} />
        </FormField>
        <FormField label="Disponibilité" htmlFor="v-availability" hint="Ex. 4h / semaine">
          <Input id="v-availability" {...register("availability")} />
        </FormField>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-dark">Domaines d&apos;intérêt</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {VOLUNTEER_INTERESTS.map((interest) => (
            <label
              key={interest}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary-pale"
            >
              <Checkbox value={interest} {...register("interests")} />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <FormField label="Compétences" htmlFor="v-skills" hint="Facultatif">
        <Textarea id="v-skills" rows={3} {...register("skills")} placeholder="Vos savoir-faire, langues, outils…" />
      </FormField>
      <FormField label="Expérience associative" htmlFor="v-experience" hint="Facultatif">
        <Textarea id="v-experience" rows={3} {...register("associativeExperience")} />
      </FormField>
      <FormField label="Votre motivation" htmlFor="v-motivation" required error={err("motivation")}>
        <Textarea
          id="v-motivation"
          rows={4}
          {...register("motivation")}
          aria-invalid={!!err("motivation")}
          placeholder="Qu'est-ce qui vous motive à rejoindre YEHLI ?"
        />
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
            Envoyer ma candidature
            <Heart className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
