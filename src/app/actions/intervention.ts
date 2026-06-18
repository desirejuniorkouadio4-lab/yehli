"use server";

import { prisma } from "@/lib/prisma";
import { interventionSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  successResult,
  errorResult,
  fieldErrorsFromZod,
  str,
  bool,
  type ActionResult,
} from "@/lib/forms";
import { sendInterventionEmails } from "@/lib/email";

export async function submitIntervention(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre demande a bien été envoyée.");
  }
  if (!rateLimit(`intervention:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = interventionSchema.safeParse({
    structureName: str(formData, "structureName"),
    structureType: str(formData, "structureType"),
    city: str(formData, "city"),
    commune: str(formData, "commune"),
    country: str(formData, "country"),
    managerLastName: str(formData, "managerLastName"),
    managerFirstName: str(formData, "managerFirstName"),
    managerRole: str(formData, "managerRole"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    targetAudience: str(formData, "targetAudience"),
    estimatedParticipants: str(formData, "estimatedParticipants"),
    requestedTheme: str(formData, "requestedTheme"),
    interventionType: str(formData, "interventionType"),
    desiredDate: str(formData, "desiredDate"),
    indicativeBudget: str(formData, "indicativeBudget"),
    message: str(formData, "message"),
    consent: bool(formData, "consent"),
  });
  if (!parsed.success) {
    return errorResult(
      "Veuillez vérifier les champs du formulaire.",
      fieldErrorsFromZod(parsed.error),
    );
  }
  const d = parsed.data;

  try {
    await prisma.interventionRequest.create({
      data: {
        structureName: d.structureName,
        structureType: d.structureType,
        managerFirstName: d.managerFirstName,
        managerLastName: d.managerLastName,
        managerRole: d.managerRole,
        email: d.email,
        phone: d.phone,
        city: d.city,
        commune: d.commune || null,
        country: d.country,
        targetAudience: d.targetAudience,
        estimatedParticipants: d.estimatedParticipants
          ? parseInt(d.estimatedParticipants, 10)
          : null,
        requestedTheme: d.requestedTheme || null,
        interventionType: d.interventionType,
        desiredDate: d.desiredDate ? new Date(d.desiredDate) : null,
        indicativeBudget: d.indicativeBudget || null,
        message: d.message || null,
      },
    });
  } catch {
    console.warn("[intervention] persistance indisponible :", d.email);
  }

  await sendInterventionEmails({
    email: d.email,
    managerFirstName: d.managerFirstName,
    managerLastName: d.managerLastName,
    managerRole: d.managerRole,
    phone: d.phone,
    structureName: d.structureName,
    structureType: d.structureType,
    city: d.city,
    country: d.country,
    targetAudience: d.targetAudience,
    interventionType: d.interventionType,
    requestedTheme: d.requestedTheme,
    estimatedParticipants: d.estimatedParticipants,
    desiredDate: d.desiredDate,
    indicativeBudget: d.indicativeBudget,
    message: d.message,
  });

  return successResult(
    "Merci ! Nous avons bien reçu votre demande. Notre équipe vous contactera dans les meilleurs délais.",
  );
}
