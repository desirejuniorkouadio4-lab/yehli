"use server";

import { revalidatePath } from "next/cache";
import { RequestStatus, DonationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";

export type SubmissionType =
  | "intervention"
  | "volunteer"
  | "membership"
  | "donation"
  | "message";

type Result = { ok: boolean; error?: string };

export async function updateSubmissionStatus(
  type: SubmissionType,
  id: string,
  status: string,
  path?: string,
): Promise<Result> {
  const auth = await assertRole("ADMIN");
  if (!auth.ok) return { ok: false, error: auth.error };

  try {
    switch (type) {
      case "intervention":
        await prisma.interventionRequest.update({ where: { id }, data: { status: status as RequestStatus } });
        break;
      case "volunteer":
        await prisma.volunteerApplication.update({ where: { id }, data: { status: status as RequestStatus } });
        break;
      case "membership":
        await prisma.membershipApplication.update({ where: { id }, data: { status: status as RequestStatus } });
        break;
      case "message":
        await prisma.contactMessage.update({ where: { id }, data: { status: status as RequestStatus } });
        break;
      case "donation":
        await prisma.donation.update({ where: { id }, data: { status: status as DonationStatus } });
        break;
    }
    if (path) revalidatePath(path);
    return { ok: true };
  } catch {
    return { ok: false, error: "Mise à jour impossible (base de données indisponible ?)." };
  }
}

export async function updateInternalNote(
  type: Exclude<SubmissionType, "message">,
  id: string,
  note: string,
  path?: string,
): Promise<Result> {
  const auth = await assertRole("ADMIN");
  if (!auth.ok) return { ok: false, error: auth.error };

  try {
    const value = note.trim() || null;
    switch (type) {
      case "intervention":
        await prisma.interventionRequest.update({ where: { id }, data: { internalNote: value } });
        break;
      case "volunteer":
        await prisma.volunteerApplication.update({ where: { id }, data: { internalNote: value } });
        break;
      case "membership":
        await prisma.membershipApplication.update({ where: { id }, data: { internalNote: value } });
        break;
      case "donation":
        // Le modèle Donation n'a pas de note interne : on ignore proprement.
        break;
    }
    if (path) revalidatePath(path);
    return { ok: true };
  } catch {
    return { ok: false, error: "Enregistrement impossible (base de données indisponible ?)." };
  }
}

export async function deleteNewsletterSubscriber(id: string): Promise<Result> {
  const auth = await assertRole("ADMIN");
  if (!auth.ok) return { ok: false, error: auth.error };
  try {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    revalidatePath("/admin/newsletter");
    return { ok: true };
  } catch {
    return { ok: false, error: "Suppression impossible." };
  }
}
