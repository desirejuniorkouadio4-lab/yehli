"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, Loader2 } from "lucide-react";

type ActionFn = () => Promise<{ ok: boolean; error?: string }>;

export function CommentActions({
  approve,
  reject,
  remove,
  status,
}: {
  approve: ActionFn;
  reject: ActionFn;
  remove: ActionFn;
  status: "PENDING" | "APPROVED" | "REJECTED";
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const run = (fn: ActionFn, confirm?: string) => () => {
    if (confirm && !window.confirm(confirm)) return;
    start(async () => {
      const res = await fn();
      if (res && !res.ok && res.error) window.alert(res.error);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      {pending && <Loader2 className="h-4 w-4 animate-spin text-muted" />}
      {status !== "APPROVED" && (
        <button
          type="button"
          onClick={run(approve)}
          disabled={pending}
          title="Approuver"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-success transition-colors hover:bg-success/10 disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
        </button>
      )}
      {status !== "REJECTED" && (
        <button
          type="button"
          onClick={run(reject)}
          disabled={pending}
          title="Rejeter"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-warning transition-colors hover:bg-warning/10 disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={run(remove, "Supprimer définitivement ce commentaire ?")}
        disabled={pending}
        title="Supprimer"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
