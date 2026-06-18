/** Exécute une requête en renvoyant un repli si la base est indisponible. */
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/** Génère un CSV (séparateur « ; » + BOM pour Excel) à partir d'en-têtes et de lignes. */
export function toCSV(
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][],
): string {
  const escape = (value: string | number | boolean | null | undefined) => {
    const s = value == null ? "" : String(value);
    return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(";"), ...rows.map((r) => r.map(escape).join(";"))];
  return "﻿" + lines.join("\r\n");
}

/** Réponse HTTP de téléchargement CSV. */
export function csvResponse(filename: string, csv: string): Response {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

const MONTHS_FR = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

/** Compte des éléments par mois sur les `count` derniers mois. */
export function monthlyCounts(dates: Date[], count = 6): { month: string; total: number }[] {
  const now = new Date();
  const buckets: { key: string; month: string; total: number }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTHS_FR[d.getMonth()], total: 0 });
  }
  for (const date of dates) {
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.total += 1;
  }
  return buckets.map(({ month, total }) => ({ month, total }));
}
