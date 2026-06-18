"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── FloatingInput ─────────────────────────────────────────────
type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
};

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, hint, icon, className, id, required, type = "text", ...props }, ref) => {
    const uid = id ?? `fi-${label.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <div>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              {icon}
            </span>
          )}
          <input
            id={uid}
            ref={ref}
            type={type}
            placeholder=" "
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${uid}-error` : hint ? `${uid}-hint` : undefined}
            className={cn(
              "peer block h-14 w-full rounded-xl border border-border bg-white pb-2 pt-5 text-base text-dark transition-all",
              "placeholder-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
              "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20",
              "disabled:cursor-not-allowed disabled:opacity-60",
              icon ? "px-4 pl-11" : "px-4",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={uid}
            className={cn(
              "pointer-events-none absolute top-4 origin-left text-base text-muted/80 transition-all duration-200",
              icon ? "left-11" : "left-4",
              // Empty + unfocused → label sits in middle
              "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
              // Focused → float up, green
              "peer-focus:-translate-y-2.5 peer-focus:scale-[0.72] peer-focus:text-primary",
              // Filled → float up, neutral
              "peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.72] peer-[:not(:placeholder-shown)]:text-muted",
              error && "peer-focus:text-error",
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
        </div>
        {hint && !error && (
          <p id={`${uid}-hint`} className="mt-1.5 text-xs text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${uid}-error`} className="mt-1.5 text-xs font-medium text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

// ── FloatingTextarea ──────────────────────────────────────────
type FloatingTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  watchLength?: number;
};

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, hint, watchLength, className, id, required, ...props }, ref) => {
    const uid = id ?? `ft-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const max = props.maxLength;
    return (
      <div>
        <div className="relative">
          <textarea
            id={uid}
            ref={ref}
            placeholder=" "
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${uid}-error` : hint ? `${uid}-hint` : undefined}
            className={cn(
              "peer block w-full resize-none rounded-xl border border-border bg-white px-4 pb-3 pt-7 text-base text-dark transition-all",
              "placeholder-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
              "aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={uid}
            className={cn(
              "pointer-events-none absolute left-4 top-5 origin-left text-base text-muted/80 transition-all duration-200",
              "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
              "peer-focus:-translate-y-3 peer-focus:scale-[0.72] peer-focus:text-primary",
              "peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-[0.72] peer-[:not(:placeholder-shown)]:text-muted",
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
          {max !== undefined && (
            <span
              className={cn(
                "absolute bottom-3 right-4 text-xs tabular-nums",
                (watchLength ?? 0) > max * 0.9 ? "text-amber-500" : "text-muted",
              )}
            >
              {watchLength ?? 0}/{max}
            </span>
          )}
        </div>
        {hint && !error && (
          <p id={`${uid}-hint`} className="mt-1.5 text-xs text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${uid}-error`} className="mt-1.5 text-xs font-medium text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";

// ── SubjectChips ──────────────────────────────────────────────
type ChipsFieldProps = {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export function SubjectChips({ options, value, onChange, error }: ChipsFieldProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-dark">
        Sujet <span className="text-error">*</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150",
                active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-white text-body hover:border-primary/50 hover:text-primary",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── PillSelect ─────────────────────────────────────────────────
// Single-select pill group (radio behaviour).
type PillSelectProps = {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  allLabel?: string;
  className?: string;
};

export function PillSelect({ options, value, onChange, allLabel = "Tous", className }: PillSelectProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        type="button"
        onClick={() => onChange("")}
        className={cn(
          "rounded-full border px-3 py-1 text-sm font-medium transition-all",
          value === ""
            ? "border-primary bg-primary text-white"
            : "border-border bg-white text-muted hover:border-primary/40 hover:text-primary",
        )}
      >
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(value === opt ? "" : opt)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium transition-all",
            value === opt
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-muted hover:border-primary/40 hover:text-primary",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
