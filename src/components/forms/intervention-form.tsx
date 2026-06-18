"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, ChevronRight, ChevronLeft, Building2, User, ClipboardList, Check } from "lucide-react";
import { interventionSchema, type InterventionInput } from "@/lib/validations";
import { submitIntervention } from "@/app/actions/intervention";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FloatingInput, FloatingTextarea } from "./floating-fields";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  STRUCTURE_TYPES,
  INTERVENTION_TYPES,
  AUDIENCES,
  THEMES,
  COUNTRIES,
} from "@/lib/form-options";

const STEPS = [
  { id: 0, label: "Structure", icon: Building2 },
  { id: 1, label: "Contact", icon: User },
  { id: 2, label: "Demande", icon: ClipboardList },
];

const STEP_FIELDS: Record<number, (keyof InterventionInput)[]> = {
  0: ["structureName", "structureType", "city", "country"],
  1: ["managerLastName", "managerFirstName", "managerRole", "email", "phone"],
  2: ["targetAudience", "interventionType", "consent"],
};

function FloatingSelect({
  label,
  id,
  error,
  required,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-dark">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-dark transition-all",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
          "aria-[invalid=true]:border-error",
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function InterventionForm({ defaultTheme }: { defaultTheme?: string }) {
  const [step, setStep] = useState(0);

  const themeOptions =
    defaultTheme && !THEMES.includes(defaultTheme as (typeof THEMES)[number])
      ? [defaultTheme, ...THEMES]
      : [...THEMES];

  const {
    register,
    handleSubmit,
    trigger,
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

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const isLast = step === STEPS.length - 1;

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-8">
      <Honeypot />

      {/* Indicateur d'étapes */}
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const done = step > i;
          const active = step === i;
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    done
                      ? "border-primary bg-primary text-white"
                      : active
                        ? "border-primary bg-white text-primary shadow-md shadow-primary/20"
                        : "border-border bg-white text-muted",
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap text-xs font-semibold",
                    active ? "text-primary" : done ? "text-primary/70" : "text-muted",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mb-5 mx-2 flex-1 border-t-2 transition-colors",
                    done ? "border-primary" : "border-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Étape 0 — Votre structure */}
      {step === 0 && (
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Votre structure</p>
          <FloatingInput
            label="Nom de la structure"
            id="i-structureName"
            required
            error={err("structureName")}
            {...register("structureName")}
          />
          <FloatingSelect
            label="Type de structure"
            id="i-structureType"
            required
            defaultValue=""
            error={err("structureType")}
            {...register("structureType")}
          >
            <option value="" disabled>Choisir…</option>
            {STRUCTURE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </FloatingSelect>
          <div className="grid gap-5 sm:grid-cols-3">
            <FloatingInput label="Ville" id="i-city" required error={err("city")} {...register("city")} />
            <FloatingInput label="Commune" id="i-commune" hint="Facultatif" {...register("commune")} />
            <FloatingSelect label="Pays" id="i-country" required error={err("country")} {...register("country")}>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </FloatingSelect>
          </div>
        </div>
      )}

      {/* Étape 1 — Personne à contacter */}
      {step === 1 && (
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Personne à contacter</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingInput label="Nom" id="i-lastName" required error={err("managerLastName")} {...register("managerLastName")} />
            <FloatingInput label="Prénom" id="i-firstName" required error={err("managerFirstName")} {...register("managerFirstName")} />
          </div>
          <FloatingInput label="Fonction" id="i-role" required error={err("managerRole")} {...register("managerRole")} />
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingInput label="Email" id="i-email" type="email" required error={err("email")} {...register("email")} />
            <FloatingInput label="Téléphone / WhatsApp" id="i-phone" type="tel" required error={err("phone")} {...register("phone")} />
          </div>
        </div>
      )}

      {/* Étape 2 — Votre demande */}
      {step === 2 && (
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Votre demande</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingSelect
              label="Public concerné"
              id="i-audience"
              required
              defaultValue=""
              error={err("targetAudience")}
              {...register("targetAudience")}
            >
              <option value="" disabled>Choisir…</option>
              {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
            </FloatingSelect>
            <FloatingInput
              label="Nombre estimé de participants"
              id="i-participants"
              type="number"
              hint="Facultatif"
              error={err("estimatedParticipants")}
              {...register("estimatedParticipants")}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingSelect
              label="Thématique souhaitée"
              id="i-theme"
              {...register("requestedTheme")}
            >
              <option value="">Indifférent / à définir</option>
              {themeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </FloatingSelect>
            <FloatingSelect
              label="Type d'intervention"
              id="i-type"
              required
              defaultValue=""
              error={err("interventionType")}
              {...register("interventionType")}
            >
              <option value="" disabled>Choisir…</option>
              {INTERVENTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </FloatingSelect>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingInput
              label="Date souhaitée"
              id="i-date"
              type="date"
              hint="Facultatif"
              {...register("desiredDate")}
            />
            <FloatingInput
              label="Budget indicatif"
              id="i-budget"
              hint="Ex. 50 000 XOF"
              {...register("indicativeBudget")}
            />
          </div>
          <FloatingTextarea
            label="Message complémentaire"
            id="i-message"
            rows={4}
            hint="Contexte, attentes, particularités…"
            maxLength={1500}
            {...register("message")}
          />
          <ConsentField registration={register("consent")} error={err("consent")} />
          {result && !result.ok && <FormErrorBanner message={result.message} />}
        </div>
      )}

      {/* Navigation entre étapes */}
      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
        ) : (
          <div />
        )}

        {isLast ? (
          <Button type="submit" disabled={pending} size="lg">
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
        ) : (
          <Button type="button" onClick={next}>
            Continuer
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
