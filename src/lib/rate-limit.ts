import { headers } from "next/headers";

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

/**
 * Limiteur de débit en mémoire (fenêtre fixe).
 * Suffisant pour une instance ; pour un déploiement multi-instances,
 * brancher Upstash Redis via les variables d'environnement dédiées.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { success: boolean } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }
  if (entry.count >= limit) return { success: false };

  entry.count += 1;
  return { success: true };
}

/** Identifiant client (IP) à partir des en-têtes de la requête. */
export function getClientIp(): string {
  const h = headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") ?? "unknown";
}
