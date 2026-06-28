import { Resend } from "resend";
import { SITE } from "@/config/site";

const FROM = process.env.EMAIL_FROM || "YEHLI <noreply@yehli.org>";
const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || SITE.contact.email || "contact@yehli.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  bcc?: string[];
};

/** Envoi d'un email via Resend ; sans clé API, journalisation en console (mode dev). */
export async function sendEmail({ to, subject, html, replyTo, bcc }: SendArgs): Promise<void> {
  if (!resend) {
    console.info(
      `[email:dev] (clé Resend absente) → ${Array.isArray(to) ? to.join(", ") : to}${bcc ? ` (bcc: ${bcc.length})` : ""} | ${subject}`,
    );
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html, replyTo, bcc });
  } catch (error) {
    console.error("[email] échec de l'envoi :", error);
  }
}

/**
 * Envoie une campagne newsletter en masse via BCC (par lots de 45 destinataires).
 * Retourne le nombre de destinataires traités.
 */
export async function sendNewsletterCampaign(
  subject: string,
  bodyHtml: string,
  recipients: string[],
): Promise<number> {
  const html = emailLayout({ title: subject, bodyHtml });
  const chunkSize = 45;
  for (let i = 0; i < recipients.length; i += chunkSize) {
    const chunk = recipients.slice(i, i + chunkSize);
    await sendEmail({ to: adminEmail(), bcc: chunk, subject, html });
  }
  return recipients.length;
}

export function adminEmail(): string {
  return ADMIN_EMAIL;
}

/** Gabarit HTML aux couleurs YEHLI (compatible clients email). */
export function emailLayout({ title, bodyHtml }: { title: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;color:#374151;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <tr>
          <td style="background:#1A6B2A;background:linear-gradient(135deg,#1A6B2A,#0f4a1d);padding:28px 32px;text-align:center;">
            <div style="font-size:28px;font-weight:800;letter-spacing:1px;color:#ffffff;">YEHLI<span style="color:#F5C518;">.</span></div>
            <div style="margin-top:4px;font-size:13px;color:#d7ead9;">L'éducation, une lumière pour changer des vies</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:20px;color:#1C1C2E;">${title}</h1>
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #E5E7EB;background:#f9fafb;text-align:center;font-size:12px;color:#6B7280;">
            <p style="margin:0 0 8px;font-weight:600;color:#1A6B2A;">L'équipe YEHLI — L'éducation, une lumière pour changer des vies</p>
            <p style="margin:0;"><a href="${SITE_URL}" style="color:#1A6B2A;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#1A6B2A;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:9999px;">${label}</a>`;

const p = (text: string) =>
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#374151;">${text}</p>`;

const kvTable = (rows: [string, string | null | undefined][]) =>
  `<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 0;color:#6B7280;width:42%;vertical-align:top;">${k}</td><td style="padding:7px 0;color:#1C1C2E;font-weight:600;">${v}</td></tr>`,
    )
    .join("")}</table>`;

/** Notification générique à l'administrateur (tableau récapitulatif). */
async function notifyAdmin(
  subject: string,
  title: string,
  rows: [string, string | null | undefined][],
  replyTo?: string,
): Promise<void> {
  await sendEmail({
    to: adminEmail(),
    subject,
    replyTo,
    html: emailLayout({
      title,
      bodyHtml: `${p("Une nouvelle soumission vient d'être reçue sur le site :")}${kvTable(rows)}`,
    }),
  });
}

// ── Newsletter ──────────────────────────────────────────────
export async function sendNewsletterConfirmation({
  email,
  name,
}: {
  email: string;
  name?: string;
}): Promise<void> {
  const hello = name ? `Bonjour ${name},` : "Bonjour,";
  await sendEmail({
    to: email,
    subject: "Bienvenue dans la communauté YEHLI",
    html: emailLayout({
      title: "Merci pour votre inscription !",
      bodyHtml: `
        ${p(hello)}
        ${p("Vous êtes désormais inscrit·e à la newsletter de YEHLI. Vous recevrez nos actualités, nos ressources de vulgarisation scientifique et l'annonce de nos prochains événements.")}
        ${p("À très bientôt,")}
        <p style="margin:16px 0 0;">${button(SITE_URL + "/blog", "Découvrir nos ressources")}</p>
      `,
    }),
  });
}

// ── Inscription à un événement ──────────────────────────────
export async function sendEventRegistrationConfirmation({
  email,
  firstName,
  eventTitle,
}: {
  email: string;
  firstName: string;
  eventTitle: string;
}): Promise<void> {
  await sendEmail({
    to: email,
    subject: `Inscription confirmée — ${eventTitle}`,
    html: emailLayout({
      title: "Votre inscription est confirmée",
      bodyHtml: `
        ${p(`Bonjour ${firstName},`)}
        ${p(`Nous avons le plaisir de confirmer votre inscription à l'événement <strong>« ${eventTitle} »</strong>.`)}
        ${p("Nous vous enverrons les informations pratiques (lieu, horaires, programme) à l'approche de la date. Nous avons hâte de vous y retrouver !")}
        <p style="margin:16px 0 0;">${button(SITE_URL + "/evenements", "Voir tous nos événements")}</p>
      `,
    }),
  });
}

// ── Demande d'intervention ──────────────────────────────────
export async function sendInterventionEmails(data: {
  email: string;
  managerFirstName: string;
  managerLastName: string;
  managerRole: string;
  phone: string;
  structureName: string;
  structureType: string;
  city: string;
  country: string;
  targetAudience: string;
  interventionType: string;
  requestedTheme?: string;
  estimatedParticipants?: string;
  desiredDate?: string;
  indicativeBudget?: string;
  message?: string;
}): Promise<void> {
  await sendEmail({
    to: data.email,
    subject: "Votre demande d'intervention a bien été reçue",
    html: emailLayout({
      title: "Merci pour votre demande !",
      bodyHtml: `
        ${p(`Bonjour ${data.managerFirstName},`)}
        ${p(`Nous avons bien reçu la demande d'intervention de <strong>${data.structureName}</strong>. Notre équipe l'étudie avec attention et vous contactera dans les meilleurs délais pour définir ensemble les modalités.`)}
        ${p("Nos interventions sont gratuites et adaptées à votre public. À très bientôt !")}
      `,
    }),
  });
  await notifyAdmin(
    `Nouvelle demande d'intervention — ${data.structureName}`,
    "Nouvelle demande d'intervention",
    [
      ["Structure", data.structureName],
      ["Type", data.structureType],
      ["Ville", data.city],
      ["Pays", data.country],
      ["Responsable", `${data.managerFirstName} ${data.managerLastName}`],
      ["Fonction", data.managerRole],
      ["Email", data.email],
      ["Téléphone", data.phone],
      ["Public concerné", data.targetAudience],
      ["Participants estimés", data.estimatedParticipants],
      ["Thématique", data.requestedTheme],
      ["Type d'intervention", data.interventionType],
      ["Date souhaitée", data.desiredDate],
      ["Budget indicatif", data.indicativeBudget],
      ["Message", data.message],
    ],
    data.email,
  );
}

// ── Bénévolat ───────────────────────────────────────────────
export async function sendVolunteerEmails(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  country: string;
  profession?: string;
  availability?: string;
  interests: string;
  skills?: string;
  motivation?: string;
}): Promise<void> {
  await sendEmail({
    to: data.email,
    subject: "Merci pour votre engagement bénévole",
    html: emailLayout({
      title: "Bienvenue parmi nos futurs bénévoles !",
      bodyHtml: `
        ${p(`Bonjour ${data.firstName},`)}
        ${p("Merci d'avoir proposé votre temps et vos compétences à YEHLI. Votre candidature de bénévolat a bien été enregistrée.")}
        ${p("Notre équipe reviendra vers vous très prochainement pour échanger sur les façons dont vous pourriez contribuer à notre mission.")}
      `,
    }),
  });
  await notifyAdmin(
    `Nouvelle candidature bénévole — ${data.firstName} ${data.lastName}`,
    "Nouvelle candidature de bénévolat",
    [
      ["Nom", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Téléphone", data.phone],
      ["Ville", data.city],
      ["Pays", data.country],
      ["Profession", data.profession],
      ["Disponibilité", data.availability],
      ["Domaines d'intérêt", data.interests],
      ["Compétences", data.skills],
      ["Motivation", data.motivation],
    ],
    data.email,
  );
}

// ── Adhésion ────────────────────────────────────────────────
export async function sendMembershipEmails(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  country: string;
  profession?: string;
  organization?: string;
  membershipType: string;
  motivation?: string;
}): Promise<void> {
  await sendEmail({
    to: data.email,
    subject: "Votre demande d'adhésion à YEHLI",
    html: emailLayout({
      title: "Merci de rejoindre YEHLI !",
      bodyHtml: `
        ${p(`Bonjour ${data.firstName},`)}
        ${p(`Nous avons bien reçu votre demande d'adhésion en tant que <strong>${data.membershipType}</strong>. Notre équipe la traite et reviendra vers vous rapidement pour finaliser votre adhésion.`)}
        ${p("Merci de votre confiance et de votre engagement à nos côtés.")}
      `,
    }),
  });
  await notifyAdmin(
    `Nouvelle adhésion — ${data.firstName} ${data.lastName}`,
    "Nouvelle demande d'adhésion",
    [
      ["Nom", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Téléphone", data.phone],
      ["Ville", data.city],
      ["Pays", data.country],
      ["Profession", data.profession],
      ["Organisation", data.organization],
      ["Type d'adhésion", data.membershipType],
      ["Motivation", data.motivation],
    ],
    data.email,
  );
}

// ── Don ─────────────────────────────────────────────────────
export async function sendDonationEmails(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  amount: string;
  donationType: string;
  destination?: string;
  message?: string;
}): Promise<void> {
  const hello = data.firstName ? `Bonjour ${data.firstName},` : "Bonjour,";
  await sendEmail({
    to: data.email,
    subject: "Merci pour votre générosité 💚",
    html: emailLayout({
      title: "Merci pour votre don !",
      bodyHtml: `
        ${p(hello)}
        ${p(`Nous avons bien enregistré votre intention de don de <strong>${data.amount}</strong>. Vous recevrez prochainement les instructions pour finaliser votre contribution.`)}
        ${p("Grâce à vous, des enfants accéderont à une éducation de qualité et à la joie d'apprendre. Du fond du cœur, merci.")}
      `,
    }),
  });
  await notifyAdmin(
    `Nouveau don — ${data.amount}`,
    "Nouvelle intention de don",
    [
      ["Donateur", [data.firstName, data.lastName].filter(Boolean).join(" ") || "Anonyme"],
      ["Email", data.email],
      ["Montant", data.amount],
      ["Type", data.donationType],
      ["Destination", data.destination],
      ["Message", data.message],
    ],
    data.email,
  );
}

// ── Contact ─────────────────────────────────────────────────
export async function sendContactEmails(data: {
  email: string;
  name: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  await sendEmail({
    to: data.email,
    subject: "Nous avons bien reçu votre message",
    html: emailLayout({
      title: "Merci de nous avoir écrit",
      bodyHtml: `
        ${p(`Bonjour ${data.name},`)}
        ${p("Nous avons bien reçu votre message et nous vous répondrons dans les meilleurs délais.")}
        ${p("À très bientôt,")}
      `,
    }),
  });
  await notifyAdmin(
    `Nouveau message — ${data.subject}`,
    "Nouveau message de contact",
    [
      ["Nom", data.name],
      ["Email", data.email],
      ["Téléphone", data.phone],
      ["Sujet", data.subject],
      ["Message", data.message],
    ],
    data.email,
  );
}
