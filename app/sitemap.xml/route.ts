import { HEXAGRAMS } from "@/lib/hexagrams";
import { HREFLANG, SITE_LOCALES, hexagramIndexPath, hexagramPath, originFromRequest, type SiteLocale } from "@/lib/site";

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET(request: Request) {
  const origin = originFromRequest(request);
  const pages: ((lang: SiteLocale) => string)[] = [hexagramIndexPath, ...HEXAGRAMS.map(h => (lang: SiteLocale) => hexagramPath(lang, h.number))];
  const entry = (loc: string, alternates = "") => `  <url>\n    <loc>${escape(loc)}</loc>\n${alternates}  </url>\n`;
  const links = (pathFor: (lang: SiteLocale) => string) => [
    ...SITE_LOCALES.map(lang => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[lang]}" href="${escape(origin + pathFor(lang))}"/>\n`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(origin + pathFor("en"))}"/>\n`,
  ].join("");
  const body = entry(`${origin}/`) + pages.flatMap(pathFor => SITE_LOCALES.map(lang => entry(origin + pathFor(lang), links(pathFor)))).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
