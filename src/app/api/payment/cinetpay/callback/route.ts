"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Webhook CinetPay — appelé par CinetPay après paiement (notify_url).
 * Met à jour le statut du don en base.
 * Docs : https://docs.cinetpay.com/api/1.0/notification
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null) ??
      Object.fromEntries(new URLSearchParams(await request.text()));

    const transactionId: string = body.cpm_trans_id || body.transaction_id || "";
    const status: string = body.cpm_result || body.payment_method || "";

    if (!transactionId) {
      return NextResponse.json({ error: "transaction_id manquant" }, { status: 400 });
    }

    const newStatus =
      status === "00" || String(status).toUpperCase() === "ACCEPTED"
        ? ("CONFIRMED" as const)
        : ("FAILED" as const);

    await prisma.donation.updateMany({
      where: { paymentReference: transactionId },
      data: { status: newStatus },
    }).catch(() => {}); // ignore si hors ligne

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[cinetpay/callback]", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
