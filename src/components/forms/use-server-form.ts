"use client";

import { useRef, useState, useTransition } from "react";
import type { ActionResult } from "@/lib/forms";

/**
 * Relie un formulaire React Hook Form à une server action.
 * La validation client est gérée par RHF (zodResolver) ; à la soumission,
 * on construit un FormData depuis l'élément <form> (capture honeypot, cases,
 * sélections multiples) et la server action re-valide côté serveur.
 */
export function useServerForm(action: (formData: FormData) => Promise<ActionResult>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const submit = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
      if (res.ok) formRef.current?.reset();
      if (typeof window !== "undefined") {
        // Ramène l'utilisateur vers le message de retour.
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  };

  return { formRef, pending, result, submit };
}
