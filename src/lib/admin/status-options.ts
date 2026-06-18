import { STATUS_LABELS } from "@/components/admin/status-badge";

export const STATUS_SETS: Record<string, string[]> = {
  intervention: ["NEW", "IN_PROGRESS", "ACCEPTED", "SCHEDULED", "COMPLETED", "REJECTED", "ARCHIVED"],
  volunteer: ["NEW", "IN_PROGRESS", "RETAINED", "NOT_RETAINED", "ARCHIVED"],
  membership: ["NEW", "IN_PROGRESS", "ACCEPTED", "REJECTED", "ARCHIVED"],
  donation: ["PENDING", "CONFIRMED", "FAILED", "CANCELLED", "REFUNDED"],
  message: ["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"],
};

export function statusOptions(type: string): { value: string; label: string }[] {
  return (STATUS_SETS[type] ?? []).map((value) => ({ value, label: STATUS_LABELS[value] ?? value }));
}
