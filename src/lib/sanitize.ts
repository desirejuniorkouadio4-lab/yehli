import sanitizeHtml from "sanitize-html";

/**
 * Assainit le HTML éditorial (corps d'article, contenu riche).
 *
 * 100 % JavaScript via `sanitize-html` : aucune émulation de DOM (pas de
 * jsdom), donc compatible avec le runtime serverless de Vercel. Autorise les
 * balises de mise en forme produites par l'éditeur Tiptap, y compris les
 * images insérées dans le corps (URLs https, ex. Vercel Blob).
 */
export function sanitizeRichHtml(dirty: string): string {
  if (!dirty) return "";
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br", "span", "strong", "b", "em", "i", "u", "s", "mark", "sub", "sup",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote", "code", "pre", "hr",
      "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["class"],
    },
    // Les images du corps viennent de Vercel Blob (https) ; les liens peuvent
    // pointer vers des ressources externes, des emails ou des numéros.
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    // Sécurise tous les liens sortants.
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });
}
