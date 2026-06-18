"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isHoneypotFilled, successResult, errorResult, type ActionResult } from "@/lib/forms";
import { sendNewsletterConfirmation } from "@/lib/email";

export async function subscribeNewsletter(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre inscription est bien prise en compte.");
  }

  if (!rateLimit(`newsletter:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    name: (formData.get("name") as string) || "",
  });
  if (!parsed.success) {
    return errorResult("Veuillez saisir une adresse email valide.");
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { active: true, name: parsed.data.name || undefined },
      create: { email: parsed.data.email, name: parsed.data.name || null },
    });
  } catch {
    // Sans base accessible, on ne casse pas le parcours : journalisation.
    console.warn("[newsletter] persistance indisponible :", parsed.data.email);
  }

  await sendNewsletterConfirmation({ email: parsed.data.email, name: parsed.data.name });

  return successResult("Merci ! Votre inscription à la newsletter est confirmée.");
}
