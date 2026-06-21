"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Webhook PayDunya — appelé après paiement (actions.callback_url).
 * Met à jour le statut du don en base.
 * Docs : https://paydunya.com/developers/docs/api/checkout
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Corps invalide" }, { status: 400 });

    // PayDunya envoie { data: { invoice: { token, ... }, custom_data: { payment_reference } } }
    const invoiceData = body?.data?.invoice ?? body?.invoice ?? body;
    const customData = body?.data?.custom_data ?? body?.custom_data ?? {};
    const status: string = invoiceData?.status ?? "";
    const reference: string = customData?.payment_reference ?? invoiceData?.token ?? "";

    if (!reference) {
      console.warn("[paydunya/callback] référence manquante :", body);
      return NextResponse.json({ received: true }); // ne pas bloquer PayDunya
    }

    const newStatus =
      status === "completed" ? ("CONFIRMED" as const) : ("FAILED" as const);

    await prisma.donation
      .updateMany({ where: { paymentReference: reference }, data: { status: newStatus } })
      .catch(() => {});

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[paydunya/callback]", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
