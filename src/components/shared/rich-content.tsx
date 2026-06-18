import DOMPurify from "isomorphic-dompurify";
import { cn } from "@/lib/utils";

/**
 * Rend un contenu HTML éditorial après assainissement (anti-XSS, côté serveur).
 */
export function RichContent({ html, className }: { html: string; className?: string }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return (
    <div className={cn("prose-yehli", className)} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
