/**
 * Passerelle PayDunya — Orange Money CI, MTN CI, Moov CI, Wave, cartes.
 * Variables d'environnement requises :
 *   PAYDUNYA_MASTER_KEY   — Clé Principale
 *   PAYDUNYA_PRIVATE_KEY  — Clé Privée
 *   PAYDUNYA_PUBLIC_KEY   — Clé Publique
 *   PAYDUNYA_TOKEN        — Token
 *   PAYDUNYA_MODE         — "test" (sandbox) ou "live" (production)
 *   NEXT_PUBLIC_SITE_URL  — URL de base pour les callbacks
 */

import type { PaymentGateway, PaymentInitInput, PaymentInitResult } from "./index";
import { SITE_URL } from "@/config/site";

export class PayDunyaGateway implements PaymentGateway {
  readonly provider = "paydunya" as const;

  private readonly masterKey: string;
  private readonly privateKey: string;
  private readonly publicKey: string;
  private readonly token: string;
  private readonly apiBase: string;

  constructor() {
    const masterKey = process.env.PAYDUNYA_MASTER_KEY;
    const privateKey = process.env.PAYDUNYA_PRIVATE_KEY;
    const publicKey = process.env.PAYDUNYA_PUBLIC_KEY;
    const token = process.env.PAYDUNYA_TOKEN;

    if (!masterKey || !privateKey || !publicKey || !token) {
      throw new Error(
        "PayDunya : PAYDUNYA_MASTER_KEY, PAYDUNYA_PRIVATE_KEY, PAYDUNYA_PUBLIC_KEY et PAYDUNYA_TOKEN sont requis.",
      );
    }

    this.masterKey = masterKey;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.token = token;

    const mode = (process.env.PAYDUNYA_MODE || "test").toLowerCase();
    this.apiBase =
      mode === "live"
        ? "https://app.paydunya.com/api/v1"
        : "https://app.paydunya.com/sandbox-api/v1";
  }

  async initiate(input: PaymentInitInput): Promise<PaymentInitResult> {
    try {
      const body = {
        invoice: {
          total_amount: Math.round(input.amount),
          description: input.description || "Don à l'association YEHLI",
        },
        store: {
          name: "YEHLI",
          tagline: "L'éducation, une lumière pour changer des vies",
          postal_address: "Abidjan, Côte d'Ivoire",
          website_url: SITE_URL,
          logo_url: `${SITE_URL}/icons/icon-512.png`,
        },
        actions: {
          cancel_url: `${SITE_URL}/faire-un-don?status=cancelled`,
          return_url: `${SITE_URL}/faire-un-don?status=success`,
          callback_url: `${SITE_URL}/api/payment/paydunya/callback`,
        },
        customer: {
          name: input.name || "",
          email: input.email,
        },
        custom_data: {
          payment_reference: input.reference,
        },
      };

      const res = await fetch(`${this.apiBase}/checkout-invoice/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PAYDUNYA-MASTER-KEY": this.masterKey,
          "PAYDUNYA-PRIVATE-KEY": this.privateKey,
          "PAYDUNYA-PUBLIC-KEY": this.publicKey,
          "PAYDUNYA-TOKEN": this.token,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.response_code === "00") {
        // PayDunya renvoie l'URL de paiement dans response_text quand response_code === "00"
        const redirectUrl: string =
          data.invoice_url ?? data.checkout_url ?? data.response_url ??
          (typeof data.response_text === "string" && data.response_text.startsWith("http")
            ? data.response_text
            : "");

        if (redirectUrl) {
          return {
            provider: "paydunya",
            status: "REDIRECT",
            reference: input.reference,
            redirectUrl,
          };
        }
      }

      console.error("[paydunya] réponse inattendue :", data);
      return {
        provider: "paydunya",
        status: "ERROR",
        reference: input.reference,
        message: "Service de paiement temporairement indisponible. Merci de réessayer.",
      };
    } catch (err) {
      console.error("[paydunya] fetch error:", err);
      return {
        provider: "paydunya",
        status: "ERROR",
        reference: input.reference,
        message: "Service de paiement temporairement indisponible.",
      };
    }
  }
}
