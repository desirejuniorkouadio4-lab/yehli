"use server";

import { prisma } from "@/lib/prisma";
import { eventRegistrationSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  successResult,
  errorResult,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/forms";
import { sendEventRegistrationConfirmation } from "@/lib/email";

export async function registerForEvent(
  eventId: string,
  eventTitle: string,
  formData: FormData,
): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci, votre inscription est bien enregistrée.");
  }
  if (!rateLimit(`event:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans un instant.");
  }

  const parsed = eventRegistrationSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: (formData.get("phone") as string) || "",
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier les informations saisies.", fieldErrorsFromZod(parsed.error));
  }

  try {
    await prisma.eventRegistration.create({
      data: {
        eventId,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
      },
    });
  } catch {
    console.warn("[event] persistance indisponible :", parsed.data.email);
  }

  await sendEventRegistrationConfirmation({
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    eventTitle,
  });

  return successResult("Votre inscription est confirmée ! Vous recevrez un email récapitulatif.");
}
