/**
 * Passerelle CinetPay — supporte Orange Money CI, MTN CI, Moov CI, Wave, cartes.
 * Variables d'environnement requises :
 *   CINETPAY_API_KEY   — clé API CinetPay
 *   CINETPAY_SITE_ID   — identifiant du site marchand
 *   NEXT_PUBLIC_SITE_URL — URL de base pour les callbacks
 */

import type { PaymentGateway, PaymentInitInput, PaymentInitResult } from "./index";
import { SITE_URL } from "@/config/site";

const API_URL = "https://api-checkout.cinetpay.com/v2/payment";

export class CinetPayGateway implements PaymentGateway {
  readonly provider = "cinetpay" as const;

  private readonly apiKey: string;
  private readonly siteId: string;

  constructor() {
    const apiKey = process.env.CINETPAY_API_KEY;
    const siteId = process.env.CINETPAY_SITE_ID;
    if (!apiKey || !siteId) {
      throw new Error(
        "CinetPay : variables CINETPAY_API_KEY et CINETPAY_SITE_ID requises.",
      );
    }
    this.apiKey = apiKey;
    this.siteId = siteId;
  }

  async initiate(input: PaymentInitInput): Promise<PaymentInitResult> {
    try {
      const body = {
        apikey: this.apiKey,
        site_id: this.siteId,
        transaction_id: input.reference,
        amount: Math.round(input.amount),
        currency: input.currency || "XOF",
        description: input.description || "Don à YEHLI",
        customer_email: input.email,
        customer_name: input.name || "",
        notify_url: `${SITE_URL}/api/payment/cinetpay/callback`,
        return_url: `${SITE_URL}/faire-un-don?status=success`,
        channels: "ALL",   // Orange Money, MTN, Wave, cartes…
        lang: "fr",
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error("[cinetpay] HTTP error:", res.status, res.statusText);
        return { provider: "cinetpay", status: "ERROR", reference: input.reference };
      }

      const data = await res.json();

      if (data.code === "201" && data.data?.payment_url) {
        return {
          provider: "cinetpay",
          status: "REDIRECT",
          reference: input.reference,
          redirectUrl: data.data.payment_url,
        };
      }

      console.error("[cinetpay] unexpected response:", data);
      return {
        provider: "cinetpay",
        status: "ERROR",
        reference: input.reference,
        message: data.message || "Erreur lors de l'initialisation du paiement.",
      };
    } catch (err) {
      console.error("[cinetpay] fetch error:", err);
      return {
        provider: "cinetpay",
        status: "ERROR",
        reference: input.reference,
        message: "Service de paiement temporairement indisponible.",
      };
    }
  }
}
