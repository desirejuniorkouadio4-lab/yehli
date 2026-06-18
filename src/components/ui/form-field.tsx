import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type FormFieldProps = {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Enveloppe standardisée d'un champ de formulaire :
 * label + contrôle + indice + message d'erreur (lié via aria-describedby).
 */
export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          className="text-xs font-medium text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
