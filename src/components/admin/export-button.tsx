import { Download } from "lucide-react";

export function ExportButton({ type, label = "Exporter en CSV" }: { type: string; label?: string }) {
  return (
    <a
      href={`/api/admin/export/${type}`}
      download
      className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-pale"
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}
