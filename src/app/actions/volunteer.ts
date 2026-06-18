"use server";

import { prisma } from "@/lib/prisma";
import { volunteerSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  successResult,
  errorResult,
  fieldErrorsFromZod,
  str,
  bool,
  strList,
  type ActionResult,
} from "@/lib/forms";
import { sendVolunteerEmails } from "@/lib/email";

export async function submitVolunteer(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre candidature a bien été envoyée.");
  }
  if (!rateLimit(`volunteer:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = volunteerSchema.safeParse({
    firstName: str(formData, "firstName"),
    lastName: str(formData, "lastName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    city: str(formData, "city"),
    commune: str(formData, "commune"),
    country: str(formData, "country"),
    profession: str(formData, "profession"),
    availability: str(formData, "availability"),
    skills: str(formData, "skills"),
    interests: strList(formData, "interests"),
    associativeExperience: str(formData, "associativeExperience"),
    motivation: str(formData, "motivation"),
    consent: bool(formData, "consent"),
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier les champs du formulaire.", fieldErrorsFromZod(parsed.error));
  }
  const d = parsed.data;
  const interests = d.interests.join(", ");

  try {
    await prisma.volunteerApplication.create({
      data: {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone || null,
        city: d.city || null,
        commune: d.commune || null,
        country: d.country,
        profession: d.profession || null,
        availability: d.availability || null,
        skills: d.skills || null,
        interests: interests || null,
        associativeExperience: d.associativeExperience || null,
        motivation: d.motivation,
      },
    });
  } catch {
    console.warn("[volunteer] persistance indisponible :", d.email);
  }

  await sendVolunteerEmails({
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    phone: d.phone,
    city: d.city,
    country: d.country,
    profession: d.profession,
    availability: d.availability,
    interests,
    skills: d.skills,
    motivation: d.motivation,
  });

  return successResult(
    "Merci pour votre engagement ! Votre candidature de bénévolat a bien été reçue.",
  );
}
