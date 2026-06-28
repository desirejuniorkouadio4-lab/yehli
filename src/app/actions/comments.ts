"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  isHoneypotFilled,
  successResult,
  errorResult,
  fieldErrorsFromZod,
  str,
  type ActionResult,
} from "@/lib/forms";

const commentSchema = z.object({
  name: z.string().trim().min(2, "Votre nom est requis").max(80),
  email: z.string().trim().email("Adresse email invalide").optional().or(z.literal("")),
  content: z
    .string()
    .trim()
    .min(3, "Votre commentaire est trop court")
    .max(2000, "Votre commentaire est trop long (2000 caractères max)"),
});

export async function submitComment(
  articleId: string,
  articleSlug: string,
  formData: FormData,
): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre commentaire sera publié après modération.");
  }
  if (!rateLimit(`comment:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = commentSchema.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    content: str(formData, "content"),
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier votre commentaire.", fieldErrorsFromZod(parsed.error));
  }
  const d = parsed.data;

  try {
    await prisma.articleComment.create({
      data: {
        articleId,
        name: d.name,
        email: d.email || null,
        content: d.content,
        status: "PENDING",
      },
    });
  } catch {
    return errorResult("Une erreur est survenue. Merci de réessayer plus tard.");
  }

  revalidatePath(`/blog/${articleSlug}`);
  return successResult(
    "Merci ! Votre commentaire a bien été envoyé. Il sera visible après validation par notre équipe.",
  );
}
