import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export { Input } from "@/components/ui/input";
export { Textarea } from "@/components/ui/textarea";
export { Select } from "@/components/ui/select";

export function AdminField({
  label,
  htmlFor,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-dark">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function StatusField({
  defaultValue = "DRAFT",
  withArchived = true,
}: {
  defaultValue?: string;
  withArchived?: boolean;
}) {
  return (
    <Select name="status" defaultValue={defaultValue}>
      <option value="PUBLISHED">Publié</option>
      <option value="DRAFT">Brouillon</option>
      {withArchived && <option value="ARCHIVED">Archivé</option>}
    </Select>
  );
}

export function SubmitBar({ cancelHref, label = "Enregistrer" }: { cancelHref: string; label?: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-border pt-5">
      <Button type="submit">{label}</Button>
      <Button asChild variant="ghost">
        <Link href={cancelHref}>Annuler</Link>
      </Button>
    </div>
  );
}

export function AdminFormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">{children}</div>
  );
}
