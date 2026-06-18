import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  icon: Icon,
  label,
  value,
  href,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  href?: string;
  hint?: string;
}) {
  const inner = (
    <div className="flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary-mid hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {href && <ArrowUpRight className="h-4 w-4 text-muted" />}
      </div>
      <p className="mt-4 font-heading text-3xl font-bold text-dark">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-muted/80">{hint}</p>}
    </div>
  );
  if (href) {
    return (
      <Link href={href} className={cn("block")}>
        {inner}
      </Link>
    );
  }
  return inner;
}
