"use server";

import { prisma } from "@/lib/prisma";
import { membershipSchema } from "@/lib/validations";
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
import { sendMembershipEmails } from "@/lib/email";

export async function submitMembership(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre demande d'adhésion a bien été envoyée.");
  }
  if (!rateLimit(`membership:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = membershipSchema.safeParse({
    firstName: str(formData, "firstName"),
    lastName: str(formData, "lastName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    city: str(formData, "city"),
    commune: str(formData, "commune"),
    country: str(formData, "country"),
    profession: str(formData, "profession"),
    organization: str(formData, "organization"),
    membershipType: str(formData, "membershipType"),
    motivation: str(formData, "motivation"),
    consent: bool(formData, "consent"),
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier les champs du formulaire.", fieldErrorsFromZod(parsed.error));
  }
  const d = parsed.data;

  try {
    await prisma.membershipApplication.create({
      data: {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone || null,
        city: d.city || null,
        commune: d.commune || null,
        country: d.country,
        profession: d.profession || null,
        organization: d.organization || null,
        membershipType: d.membershipType,
        motivation: d.motivation || null,
      },
    });
  } catch {
    console.warn("[membership] persistance indisponible :", d.email);
  }

  await sendMembershipEmails({
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    phone: d.phone,
    city: d.city,
    country: d.country,
    profession: d.profession,
    organization: d.organization,
    membershipType: d.membershipType,
    motivation: d.motivation,
  });

  return successResult(
    "Merci ! Votre demande d'adhésion a bien été reçue. Nous reviendrons vers vous très prochainement.",
  );
}
