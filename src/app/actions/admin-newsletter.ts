"use server";

import { assertRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { sendNewsletterCampaign } from "@/lib/email";
import { str } from "@/lib/forms";

type Res = { ok: boolean; message: string };

/** Convertit un texte brut (lignes) en paragraphes HTML sûrs. */
function textToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text
    .split(/\n{2,}/)
    .map((para) => `<p style="margin:0 0 16px;line-height:1.6;">${esc(para).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export async function sendCampaign(formData: FormData): Promise<Res> {
  const auth = await assertRole("ADMIN");
  if (!auth.ok) return { ok: false, message: "Non autorisé." };

  const subject = str(formData, "subject");
  const body = str(formData, "body");

  if (!subject || !body) {
    return { ok: false, message: "Le sujet et le contenu sont requis." };
  }

  let recipients: string[] = [];
  try {
    const rows = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      select: { email: true },
    });
    recipients = rows.map((r) => r.email).filter(Boolean);
  } catch {
    return { ok: false, message: "Impossible de récupérer la liste des abonnés." };
  }

  if (recipients.length === 0) {
    return { ok: false, message: "Aucun abonné actif à qui envoyer." };
  }

  const sent = await sendNewsletterCampaign(subject, textToHtml(body), recipients);
  return { ok: true, message: `Campagne envoyée à ${sent} abonné${sent > 1 ? "s" : ""}.` };
}
