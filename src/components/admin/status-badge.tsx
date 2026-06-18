import { cn } from "@/lib/utils";

export const STATUS_LABELS: Record<string, string> = {
  NEW: "Nouveau",
  IN_PROGRESS: "En cours",
  ACCEPTED: "Accepté",
  SCHEDULED: "Planifié",
  COMPLETED: "Terminé",
  REJECTED: "Rejeté",
  RETAINED: "Retenu",
  NOT_RETAINED: "Non retenu",
  ARCHIVED: "Archivé",
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  FAILED: "Échoué",
  CANCELLED: "Annulé",
  REFUNDED: "Remboursé",
  DRAFT: "Brouillon",
  PUBLISHED: "Publié",
};

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-info/10 text-info",
  IN_PROGRESS: "bg-warning/10 text-warning",
  ACCEPTED: "bg-success/10 text-success",
  SCHEDULED: "bg-primary/10 text-primary",
  COMPLETED: "bg-success/10 text-success",
  REJECTED: "bg-error/10 text-error",
  RETAINED: "bg-success/10 text-success",
  NOT_RETAINED: "bg-error/10 text-error",
  ARCHIVED: "bg-muted/10 text-muted",
  PENDING: "bg-warning/10 text-warning",
  CONFIRMED: "bg-success/10 text-success",
  FAILED: "bg-error/10 text-error",
  CANCELLED: "bg-muted/10 text-muted",
  REFUNDED: "bg-info/10 text-info",
  DRAFT: "bg-muted/10 text-muted",
  PUBLISHED: "bg-success/10 text-success",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status] ?? "bg-surface text-muted",
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
