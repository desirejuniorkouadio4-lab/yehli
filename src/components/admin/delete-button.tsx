"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeleteButton({
  action,
  confirmLabel = "Confirmer la suppression ? Cette action est irréversible.",
  label,
  className,
}: {
  action: () => Promise<{ ok: boolean; error?: string }>;
  confirmLabel?: string;
  label?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    if (!window.confirm(confirmLabel)) return;
    startTransition(async () => {
      const res = await action();
      if (res && !res.ok && res.error) window.alert(res.error);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg text-muted transition-colors hover:bg-error/10 hover:text-error disabled:opacity-60",
        label ? "px-3 py-2 text-sm font-medium" : "h-8 w-8",
        className,
      )}
      aria-label="Supprimer"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {label}
    </button>
  );
}
