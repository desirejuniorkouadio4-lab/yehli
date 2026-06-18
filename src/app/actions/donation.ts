"use server";

import { prisma } from "@/lib/prisma";
import { donationSchema } from "@/lib/validations";
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
import { sendDonationEmails } from "@/lib/email";
import { getPaymentGateway, generatePaymentReference } from "@/lib/payment";
import { formatCurrency } from "@/lib/utils";

export async function submitDonation(formData: FormData): Promise<ActionResult> {
  if (isHoneypotFilled(formData)) {
    return successResult("Merci ! Votre intention de don a bien été enregistrée.");
  }
  if (!rateLimit(`donation:${getClientIp()}`).success) {
    return errorResult("Trop de tentatives. Merci de réessayer dans une minute.");
  }

  const parsed = donationSchema.safeParse({
    firstName: str(formData, "firstName"),
    lastName: str(formData, "lastName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    amount: str(formData, "amount"),
    currency: str(formData, "currency") || "XOF",
    donationType: str(formData, "donationType"),
    destination: str(formData, "destination"),
    message: str(formData, "message"),
    anonymous: bool(formData, "anonymous"),
    consent: bool(formData, "consent"),
  });
  if (!parsed.success) {
    return errorResult("Veuillez vérifier les informations du don.", fieldErrorsFromZod(parsed.error));
  }
  const d = parsed.data;

  const gateway = getPaymentGateway();
  const reference = generatePaymentReference();
  const payment = await gateway.initiate({
    amount: d.amount,
    currency: d.currency,
    email: d.email,
    name: [d.firstName, d.lastName].filter(Boolean).join(" ") || undefined,
    reference,
    description: "Don à l'association YEHLI",
    donationType: d.donationType,
  });

  try {
    await prisma.donation.create({
      data: {
        firstName: d.firstName || null,
        lastName: d.lastName || null,
        email: d.email,
        phone: d.phone || null,
        amount: d.amount,
        currency: d.currency,
        donationType: d.donationType,
        destination: d.destination || null,
        message: d.message || null,
        anonymous: d.anonymous,
        status: "PENDING",
        paymentProvider: payment.provider,
        paymentReference: payment.reference,
      },
    });
  } catch {
    console.warn("[donation] persistance indisponible :", d.email);
  }

  await sendDonationEmails({
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    amount: formatCurrency(d.amount, d.currency),
    donationType: d.donationType,
    destination: d.destination,
    message: d.message,
  });

  if (payment.status === "REDIRECT" && payment.redirectUrl) {
    return { ok: true, message: "Redirection vers le paiement…", fieldErrors: { redirect: payment.redirectUrl } };
  }
  return successResult(
    payment.message ??
      "Merci ! Votre intention de don a été enregistrée. Vous recevrez un email de confirmation.",
  );
}
