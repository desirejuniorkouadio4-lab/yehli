import { z } from "zod";

const requiredText = (msg = "Ce champ est requis") => z.string().trim().min(1, msg);
const optionalText = z.string().trim().optional();
const email = z
  .string()
  .trim()
  .min(1, "L'adresse email est requise")
  .email("Adresse email invalide");
const consent = z
  .boolean()
  .refine((v) => v === true, { message: "Veuillez accepter la politique de confidentialité." });

// ── Newsletter ──────────────────────────────────────────────
export const newsletterSchema = z.object({
  email,
  name: optionalText,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ── Contact ─────────────────────────────────────────────────
export const contactSchema = z.object({
  name: requiredText("Votre nom est requis"),
  email,
  phone: optionalText,
  subject: requiredText("Veuillez choisir un sujet"),
  message: requiredText("Votre message est requis").pipe(
    z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
  ),
  consent,
});
export type ContactInput = z.infer<typeof contactSchema>;

// ── Demande d'intervention ──────────────────────────────────
export const interventionSchema = z.object({
  structureName: requiredText("Le nom de la structure est requis"),
  structureType: requiredText("Veuillez préciser le type de structure"),
  city: requiredText("La ville est requise"),
  commune: optionalText,
  country: requiredText("Le pays est requis"),
  managerLastName: requiredText("Le nom du responsable est requis"),
  managerFirstName: requiredText("Le prénom du responsable est requis"),
  managerRole: requiredText("La fonction est requise"),
  email,
  phone: requiredText("Le téléphone / WhatsApp est requis"),
  targetAudience: requiredText("Veuillez préciser le public concerné"),
  estimatedParticipants: optionalText.refine(
    (v) => !v || /^\d+$/.test(v),
    "Veuillez saisir un nombre valide",
  ),
  requestedTheme: optionalText,
  interventionType: requiredText("Veuillez préciser le type d'intervention"),
  desiredDate: optionalText,
  indicativeBudget: optionalText,
  message: optionalText,
  consent,
});
export type InterventionInput = z.infer<typeof interventionSchema>;

// ── Don ─────────────────────────────────────────────────────
export const donationSchema = z.object({
  firstName: optionalText,
  lastName: optionalText,
  email,
  phone: optionalText,
  amount: z.coerce
    .number({ invalid_type_error: "Montant invalide" })
    .positive("Veuillez indiquer un montant valide"),
  currency: z.string().default("XOF"),
  donationType: requiredText("Veuillez choisir le type de don"),
  destination: optionalText,
  message: optionalText,
  anonymous: z.boolean().default(false),
  consent,
});
export type DonationInput = z.infer<typeof donationSchema>;

// ── Adhésion ────────────────────────────────────────────────
export const membershipSchema = z.object({
  firstName: requiredText("Votre prénom est requis"),
  lastName: requiredText("Votre nom est requis"),
  email,
  phone: optionalText,
  city: optionalText,
  commune: optionalText,
  country: requiredText("Le pays est requis"),
  profession: optionalText,
  organization: optionalText,
  membershipType: requiredText("Veuillez choisir un type d'adhésion"),
  motivation: optionalText,
  consent,
});
export type MembershipInput = z.infer<typeof membershipSchema>;

// ── Bénévolat ───────────────────────────────────────────────
export const volunteerSchema = z.object({
  firstName: requiredText("Votre prénom est requis"),
  lastName: requiredText("Votre nom est requis"),
  email,
  phone: optionalText,
  city: optionalText,
  commune: optionalText,
  country: requiredText("Le pays est requis"),
  profession: optionalText,
  availability: optionalText,
  skills: optionalText,
  interests: z.array(z.string()).default([]),
  associativeExperience: optionalText,
  motivation: requiredText("Votre motivation est requise").pipe(
    z.string().min(10, "Merci de détailler un peu votre motivation"),
  ),
  consent,
});
export type VolunteerInput = z.infer<typeof volunteerSchema>;

// ── Inscription à un événement ──────────────────────────────
export const eventRegistrationSchema = z.object({
  firstName: requiredText("Votre prénom est requis"),
  lastName: requiredText("Votre nom est requis"),
  email,
  phone: optionalText,
});
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
