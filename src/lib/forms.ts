import type { ZodError } from "zod";

/** Champ piège anti-spam (invisible) : rempli uniquement par les robots. */
export const HONEYPOT_FIELD = "website";

export type ActionResult = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export function successResult(message: string): ActionResult {
  return { ok: true, message };
}

export function errorResult(
  message: string,
  fieldErrors?: Record<string, string>,
): ActionResult {
  return { ok: false, message, fieldErrors };
}

/** Transforme une erreur Zod en dictionnaire { champ: message }. */
export function fieldErrorsFromZod(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Vrai si le honeypot est rempli (soumission probablement robotisée). */
export function isHoneypotFilled(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

/** Lit une chaîne (espaces rognés) depuis un FormData. */
export function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Lit un booléen de case à cocher depuis un FormData. */
export function bool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

/** Lit une liste de valeurs (cases à cocher multiples) depuis un FormData. */
export function strList(formData: FormData, key: string): string[] {
  return formData.getAll(key).filter((v): v is string => typeof v === "string" && v.length > 0);
}
