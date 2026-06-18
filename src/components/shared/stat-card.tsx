import { getIcon } from "@/lib/icons";
import { CountUp } from "./count-up";
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon?: string | null;
  value: string;
  label: string;
  className?: string;
};

/**
 * Carte de statistique d'impact : icône + chiffre animé (CountUp) + libellé.
 */
export function StatCard({ icon, value, label, className }: StatCardProps) {
  const Icon = getIcon(icon);
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <span className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <CountUp
        value={value}
        className="font-heading text-4xl font-bold text-primary sm:text-5xl"
      />
      <span className="text-sm font-medium text-muted">{label}</span>
    </div>
  );
}
