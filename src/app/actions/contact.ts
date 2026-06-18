"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
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
import { sendContactEmails } from "@/lib/email";

export async function submitContact(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre message a bien été envoyé.");
  }
  if (!rateLimit(`contact:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = contactSchema.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    subject: str(formData, "subject"),
    message: str(formData, "message"),
    consent: bool(formData, "consent"),
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier les champs du formulaire.", fieldErrorsFromZod(parsed.error));
  }
  const d = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        subject: d.subject,
        message: d.message,
      },
    });
  } catch {
    console.warn("[contact] persistance indisponible :", d.email);
  }

  await sendContactEmails({
    email: d.email,
    name: d.name,
    phone: d.phone,
    subject: d.subject,
    message: d.message,
  });

  return successResult("Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.");
}
