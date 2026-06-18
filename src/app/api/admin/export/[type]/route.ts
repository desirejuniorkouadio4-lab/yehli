import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/rbac";
import { roleAtLeast } from "@/lib/roles";
import { toCSV, csvResponse } from "@/lib/admin/utils";
import { formatDate } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: { type: string } }) {
  const user = await getCurrentUser();
  if (!user || !roleAtLeast(user.role, "ADMIN")) {
    return new Response("Accès non autorisé.", { status: 403 });
  }

  try {
    switch (params.type) {
      case "interventions": {
        const rows = await prisma.interventionRequest.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Structure", "Type", "Ville", "Pays", "Nom", "Prénom", "Fonction", "Email", "Téléphone", "Public", "Participants", "Thématique", "Intervention", "Statut"],
          rows.map((r) => [
            formatDate(r.createdAt),
            r.structureName,
            r.structureType,
            r.city,
            r.country,
            r.managerLastName,
            r.managerFirstName,
            r.managerRole,
            r.email,
            r.phone,
            r.targetAudience,
            r.estimatedParticipants,
            r.requestedTheme,
            r.interventionType,
            r.status,
          ]),
        );
        return csvResponse("demandes-intervention.csv", csv);
      }
      case "benevoles": {
        const rows = await prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Prénom", "Nom", "Email", "Téléphone", "Ville", "Pays", "Profession", "Disponibilité", "Domaines", "Statut"],
          rows.map((r) => [
            formatDate(r.createdAt),
            r.firstName,
            r.lastName,
            r.email,
            r.phone,
            r.city,
            r.country,
            r.profession,
            r.availability,
            r.interests,
            r.status,
          ]),
        );
        return csvResponse("benevoles.csv", csv);
      }
      case "adhesions": {
        const rows = await prisma.membershipApplication.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Prénom", "Nom", "Email", "Téléphone", "Ville", "Pays", "Profession", "Organisation", "Type", "Statut"],
          rows.map((r) => [
            formatDate(r.createdAt),
            r.firstName,
            r.lastName,
            r.email,
            r.phone,
            r.city,
            r.country,
            r.profession,
            r.organization,
            r.membershipType,
            r.status,
          ]),
        );
        return csvResponse("adhesions.csv", csv);
      }
      case "dons": {
        const rows = await prisma.donation.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Prénom", "Nom", "Email", "Montant", "Devise", "Type", "Destination", "Anonyme", "Statut", "Référence"],
          rows.map((r) => [
            formatDate(r.createdAt),
            r.firstName,
            r.lastName,
            r.email,
            r.amount.toString(),
            r.currency,
            r.donationType,
            r.destination,
            r.anonymous ? "Oui" : "Non",
            r.status,
            r.paymentReference,
          ]),
        );
        return csvResponse("dons.csv", csv);
      }
      case "newsletter": {
        const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Email", "Nom", "Actif"],
          rows.map((r) => [formatDate(r.createdAt), r.email, r.name, r.active ? "Oui" : "Non"]),
        );
        return csvResponse("newsletter.csv", csv);
      }
      case "messages": {
        const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
        const csv = toCSV(
          ["Date", "Nom", "Email", "Téléphone", "Sujet", "Message", "Statut"],
          rows.map((r) => [
            formatDate(r.createdAt),
            r.name,
            r.email,
            r.phone,
            r.subject,
            r.message,
            r.status,
          ]),
        );
        return csvResponse("messages.csv", csv);
      }
      default:
        return new Response("Type d'export inconnu.", { status: 404 });
    }
  } catch {
    return new Response("Export indisponible (base de données requise).", { status: 503 });
  }
}
