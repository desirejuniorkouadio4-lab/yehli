"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { interventionSchema, type InterventionInput } from "@/lib/validations";
import { submitIntervention } from "@/app/actions/intervention";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  STRUCTURE_TYPES,
  INTERVENTION_TYPES,
  AUDIENCES,
  THEMES,
  COUNTRIES,
} from "@/lib/form-options";

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <legend className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">
      {children}
    </legend>
  );
}

export function InterventionForm({ defaultTheme }: { defaultTheme?: string }) {
  const themeOptions =
    defaultTheme && !THEMES.includes(defaultTheme as (typeof THEMES)[number])
      ? [defaultTheme, ...THEMES]
      : [...THEMES];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterventionInput>({
    resolver: zodResolver(interventionSchema),
    defaultValues: {
      consent: false,
      country: "Côte d'Ivoire",
      requestedTheme: defaultTheme ?? "",
    },
  });
  const { formRef, pending, result, submit } = useServerForm(submitIntervention);

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof InterventionInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-10">
      <Honeypot />

      <fieldset>
        <Legend>Votre structure</Legend>
        <div className="space-y-5">
          <FormField label="Nom de la structure" htmlFor="i-structureName" required error={err("structureName")}>
            <Input id="i-structureName" {...register("structureName")} aria-invalid={!!err("structureName")} />
          </FormField>
          <FormField label="Type de structure" htmlFor="i-structureType" required error={err("structureType")}>
            <Select id="i-structureType" defaultValue="" {...register("structureType")} aria-invalid={!!err("structureType")}>
              <option value="" disabled>Choisir…</option>
              {STRUCTURE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </FormField>
          <div className="grid gap-5 sm:grid-cols-3">
            <FormField label="Ville" htmlFor="i-city" required error={err("city")}>
              <Input id="i-city" {...register("city")} aria-invalid={!!err("city")} />
            </FormField>
            <FormField label="Commune" htmlFor="i-commune" hint="Facultatif">
              <Input id="i-commune" {...register("commune")} />
            </FormField>
            <FormField label="Pays" htmlFor="i-country" required error={err("country")}>
              <Select id="i-country" {...register("country")} aria-invalid={!!err("country")}>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <Legend>Personne à contacter</Legend>
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Nom" htmlFor="i-lastName" required error={err("managerLastName")}>
              <Input id="i-lastName" {...register("managerLastName")} aria-invalid={!!err("managerLastName")} />
            </FormField>
            <FormField label="Prénom" htmlFor="i-firstName" required error={err("managerFirstName")}>
              <Input id="i-firstName" {...register("managerFirstName")} aria-invalid={!!err("managerFirstName")} />
            </FormField>
          </div>
          <FormField label="Fonction" htmlFor="i-role" required error={err("managerRole")}>
            <Input id="i-role" {...register("managerRole")} aria-invalid={!!err("managerRole")} />
          </FormField>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Email" htmlFor="i-email" required error={err("email")}>
              <Input id="i-email" type="email" {...register("email")} aria-invalid={!!err("email")} />
            </FormField>
            <FormField label="Téléphone / WhatsApp" htmlFor="i-phone" required error={err("phone")}>
              <Input id="i-phone" type="tel" {...register("phone")} aria-invalid={!!err("phone")} />
            </FormField>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <Legend>Votre demande</Legend>
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Public concerné" htmlFor="i-audience" required error={err("targetAudience")}>
              <Select id="i-audience" defaultValue="" {...register("targetAudience")} aria-invalid={!!err("targetAudience")}>
                <option value="" disabled>Choisir…</option>
                {AUDIENCES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </Select>
            </FormField>
            <FormField label="Nombre estimé de participants" htmlFor="i-participants" hint="Facultatif" error={err("estimatedParticipants")}>
              <Input id="i-participants" type="number" min={1} {...register("estimatedParticipants")} aria-invalid={!!err("estimatedParticipants")} />
            </FormField>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Thématique souhaitée" htmlFor="i-theme" hint="Facultatif">
              <Select id="i-theme" {...register("requestedTheme")}>
                <option value="">Indifférent / à définir</option>
                {themeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </FormField>
            <FormField label="Type d'intervention" htmlFor="i-type" required error={err("interventionType")}>
              <Select id="i-type" defaultValue="" {...register("interventionType")} aria-invalid={!!err("interventionType")}>
                <option value="" disabled>Choisir…</option>
                {INTERVENTION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </FormField>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Date souhaitée" htmlFor="i-date" hint="Facultatif">
              <Input id="i-date" type="date" {...register("desiredDate")} />
            </FormField>
            <FormField label="Budget indicatif" htmlFor="i-budget" hint="Si applicable">
              <Input id="i-budget" {...register("indicativeBudget")} placeholder="Ex. 50 000 XOF" />
            </FormField>
          </div>
          <FormField label="Message complémentaire" htmlFor="i-message" hint="Facultatif">
            <Textarea id="i-message" rows={5} {...register("message")} placeholder="Décrivez votre projet, vos attentes, votre contexte…" />
          </FormField>
        </div>
      </fieldset>

      <div className="space-y-5">
        <ConsentField registration={register("consent")} error={err("consent")} />
        {result && !result.ok && <FormErrorBanner message={result.message} />}
        <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
