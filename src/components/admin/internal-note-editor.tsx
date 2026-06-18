"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { updateInternalNote } from "@/app/actions/admin-status";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function InternalNoteEditor({
  type,
  id,
  note,
}: {
  type: "intervention" | "volunteer" | "membership";
  id: string;
  note: string | null;
}) {
  const [value, setValue] = useState(note ?? "");
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        rows={4}
        placeholder="Note interne (non visible par le demandeur)…"
      />
      <Button
        type="button"
        size="sm"
        disabled={pending}
        className="mt-2"
        onClick={() =>
          startTransition(async () => {
            await updateInternalNote(type, id, value);
            setSaved(true);
          })
        }
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enregistrement…
          </>
        ) : saved ? (
          <>
            <Check className="h-4 w-4" />
            Note enregistrée
          </>
        ) : (
          "Enregistrer la note"
        )}
      </Button>
    </div>
  );
}
