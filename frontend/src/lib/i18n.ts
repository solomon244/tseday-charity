export type Lang = "en" | "am";

export function getLang(value?: string): Lang {
  return value === "am" ? "am" : "en";
}

/**
 * Merge `lang` into an internal href, preserving existing query strings and `#hash` fragments.
 * Examples: `/news` → `/news?lang=am`, `/programs#wash` → `/programs?lang=am#wash`
 */
export function withLang(href: string, lang: Lang): string {
  if (/^https?:\/\//i.test(href)) return href;

  let hash = "";
  let pathPart = href;
  const hashIdx = pathPart.indexOf("#");
  if (hashIdx !== -1) {
    hash = pathPart.slice(hashIdx);
    pathPart = pathPart.slice(0, hashIdx);
  }

  const qIdx = pathPart.indexOf("?");
  const pathname = qIdx === -1 ? pathPart : pathPart.slice(0, qIdx);
  const queryString = qIdx === -1 ? "" : pathPart.slice(qIdx + 1);
  const params = new URLSearchParams(queryString);
  params.set("lang", lang);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}${hash}` : `${pathname}${hash}`;
}
