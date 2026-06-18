"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updateSubmissionStatus, type SubmissionType } from "@/app/actions/admin-status";
import { cn } from "@/lib/utils";

export function StatusSelect({
  type,
  id,
  status,
  options,
  className,
}: {
  type: SubmissionType;
  id: string;
  status: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <span className="relative inline-flex items-center">
      <select
        value={status}
        disabled={pending}
        onChange={(e) => {
          const value = e.target.value;
          startTransition(async () => {
            await updateSubmissionStatus(type, id, value);
            router.refresh();
          });
        }}
        className={cn(
          "h-9 rounded-lg border border-border bg-white pl-3 pr-8 text-xs font-semibold text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60",
          className,
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {pending && <Loader2 className="absolute -right-5 h-4 w-4 animate-spin text-muted" />}
    </span>
  );
}
