import sanitizeHtml from "sanitize-html";

// Valeurs de couleur sûres : hex, rgb(a), hsl(a) et couleurs nommées.
// Aucune ne peut contenir url(), expression() ou javascript: → pas de XSS.
const SAFE_COLOR = [
  /^#(?:[0-9a-f]{3,8})$/i,
  /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i,
  /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i,
  /^[a-z]+$/i,
];

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
      "*": ["class", "style"],
    },
    // Seules `color` et `background-color` (valeurs sûres) sont conservées ;
    // toute autre propriété de style est supprimée.
    allowedStyles: {
      "*": {
        color: SAFE_COLOR,
        "background-color": SAFE_COLOR,
      },
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
