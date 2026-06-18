// Abstraction de paiement — prête pour CinetPay, PayDunya, Stripe, FedaPay, Mobile Money.
// En l'absence de clés API, la passerelle « manuelle » enregistre l'intention de don
// (statut PENDING) et l'équipe finalise le paiement hors-ligne.

export type PaymentProvider =
  | "cinetpay"
  | "paydunya"
  | "stripe"
  | "fedapay"
  | "mtn_momo"
  | "manual";

export type PaymentInitInput = {
  amount: number;
  currency: string;
  email: string;
  name?: string;
  reference: string;
  description?: string;
  donationType?: string;
};

export type PaymentInitResult = {
  provider: PaymentProvider;
  status: "PENDING" | "REDIRECT" | "ERROR";
  reference: string;
  redirectUrl?: string;
  message?: string;
};

export interface PaymentGateway {
  readonly provider: PaymentProvider;
  initiate(input: PaymentInitInput): Promise<PaymentInitResult>;
}

/**
 * Passerelle manuelle (par défaut) : enregistre l'intention de don sans appel externe.
 * Lorsqu'un prestataire sera intégré, ajouter sa classe et le cas correspondant
 * dans getPaymentGateway().
 */
class ManualGateway implements PaymentGateway {
  readonly provider: PaymentProvider = "manual";
  async initiate(input: PaymentInitInput): Promise<PaymentInitResult> {
    return {
      provider: "manual",
      status: "PENDING",
      reference: input.reference,
      message:
        "Votre intention de don a été enregistrée. Un membre de l'équipe vous contactera pour finaliser votre contribution.",
    };
  }
}

export function getPaymentGateway(): PaymentGateway {
  const provider = (process.env.PAYMENT_PROVIDER || "").toLowerCase();
  switch (provider) {
    // case "cinetpay":  return new CinetPayGateway();
    // case "paydunya":  return new PayDunyaGateway();
    // case "stripe":    return new StripeGateway();
    // case "fedapay":   return new FedaPayGateway();
    // case "mtn_momo":  return new MtnMomoGateway();
    default:
      return new ManualGateway();
  }
}

export function generatePaymentReference(): string {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `YEHLI-${time}-${rand}`;
}
