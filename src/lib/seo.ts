export const SITE_URL = "https://minhaljaved.com";
export const SITE_NAME = "Minhal Javed";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page head tags: title, description, canonical URL and the matching
 * Open Graph / Twitter tags. Site-wide tags (share image, icons) live in __root.
 */
export function pageHead({
  path,
  title,
  description,
  shareDescription = description,
}: {
  /** Route path, e.g. "/work". */
  path: string;
  title: string;
  description: string;
  /** Shorter line for link previews; defaults to `description`. */
  shareDescription?: string;
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: shareDescription },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: shareDescription },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
