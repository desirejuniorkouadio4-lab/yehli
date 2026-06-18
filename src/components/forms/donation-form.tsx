"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, HandHeart } from "lucide-react";
import { donationSchema, type DonationInput } from "@/lib/validations";
import { submitDonation } from "@/app/actions/donation";
import { useServerForm } from "./use-server-form";
import { Honeypot, FormSuccess, FormErrorBanner, ConsentField } from "./form-feedback";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS, DONATION_TYPES, DONATION_DESTINATIONS } from "@/lib/form-options";
import { formatCurrency, cn } from "@/lib/utils";

export function DonationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { currency: "XOF", donationType: "Ponctuel", anonymous: false, consent: false },
  });
  const { formRef, pending, result, submit } = useServerForm(submitDonation);

  const amount = watch("amount");

  if (result?.ok) return <FormSuccess message={result.message} />;
  const err = (name: keyof DonationInput) =>
    (errors[name]?.message as string | undefined) ?? result?.fieldErrors?.[name as string];

  return (
    <form ref={formRef} onSubmit={handleSubmit(submit)} noValidate className="space-y-6">
      <Honeypot />
      <input type="hidden" {...register("currency")} />

      {/* Montant */}
      <div>
        <p className="mb-2 text-sm font-semibold text-dark">
          Montant du don <span className="text-error">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DONATION_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setValue("amount", preset, { shouldValidate: true })}
              className={cn(
                "rounded-xl border-2 px-3 py-3 text-center text-sm font-bold transition-colors",
                Number(amount) === preset
                  ? "border-primary bg-primary-pale text-primary"
                  : "border-border bg-white text-dark hover:border-primary-mid",
              )}
            >
              {formatCurrency(preset)}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <FormField label="Ou montant libre (XOF)" htmlFor="d-amount" error={err("amount")}>
            <Input
              id="d-amount"
              type="number"
              min={500}
              step={500}
              placeholder="Saisir un montant"
              {...register("amount")}
              aria-invalid={!!err("amount")}
            />
          </FormField>
        </div>
      </div>

      {/* Type de don */}
      <div>
        <p className="mb-2 text-sm font-semibold text-dark">
          Type de don <span className="text-error">*</span>
        </p>
        <div className="flex gap-3">
          {DONATION_TYPES.map((type) => (
            <label
              key={type}
              className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary-pale has-[:checked]:text-primary"
            >
              <input type="radio" value={type} {...register("donationType")} className="accent-primary" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <FormField label="Affecter mon don à" htmlFor="d-destination" hint="Facultatif">
        <Select id="d-destination" {...register("destination")}>
          <option value="">Là où le besoin est le plus grand</option>
          {DONATION_DESTINATIONS.map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </Select>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Prénom" htmlFor="d-firstName" hint="Facultatif">
          <Input id="d-firstName" {...register("firstName")} />
        </FormField>
        <FormField label="Nom" htmlFor="d-lastName" hint="Facultatif">
          <Input id="d-lastName" {...register("lastName")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="d-email" required error={err("email")}>
          <Input id="d-email" type="email" {...register("email")} aria-invalid={!!err("email")} />
        </FormField>
        <FormField label="Téléphone" htmlFor="d-phone" hint="Facultatif">
          <Input id="d-phone" type="tel" {...register("phone")} />
        </FormField>
      </div>
      <FormField label="Message (facultatif)" htmlFor="d-message">
        <Textarea id="d-message" rows={3} {...register("message")} />
      </FormField>

      <label htmlFor="d-anonymous" className="flex cursor-pointer items-center gap-3">
        <Checkbox id="d-anonymous" {...register("anonymous")} />
        <span className="text-sm text-muted">Je souhaite que mon don reste anonyme</span>
      </label>

      <ConsentField registration={register("consent")} error={err("consent")} />
      {result && !result.ok && <FormErrorBanner message={result.message} />}
      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Traitement…
          </>
        ) : (
          <>
            Faire un don
            <HandHeart className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
