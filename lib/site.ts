import { headers } from "next/headers";
import { HEXAGRAMS, TRIGRAM_INFO, type HexagramText } from "./hexagrams";

export const SITE_LOCALES = ["zh", "en"] as const;
export type SiteLocale = typeof SITE_LOCALES[number];
export const HREFLANG: Record<SiteLocale, string> = { zh: "zh-Hans", en: "en" };
export const isSiteLocale = (value: unknown): value is SiteLocale => SITE_LOCALES.includes(value as SiteLocale);

/** Hanyu Pinyin with tone marks, in King Wen order. */
export const HEXAGRAM_PINYIN = [
  "Qián", "Kūn", "Zhūn", "Méng", "Xū", "Sòng", "Shī", "Bǐ", "Xiǎo Chù", "Lǚ",
  "Tài", "Pǐ", "Tóng Rén", "Dà Yǒu", "Qiān", "Yù", "Suí", "Gǔ", "Lín", "Guān",
  "Shì Kè", "Bì", "Bō", "Fù", "Wú Wàng", "Dà Chù", "Yí", "Dà Guò", "Kǎn", "Lí",
  "Xián", "Héng", "Dùn", "Dà Zhuàng", "Jìn", "Míng Yí", "Jiā Rén", "Kuí", "Jiǎn", "Xiè",
  "Sǔn", "Yì", "Guài", "Gòu", "Cuì", "Shēng", "Kùn", "Jǐng", "Gé", "Dǐng",
  "Zhèn", "Gèn", "Jiàn", "Guī Mèi", "Fēng", "Lǚ", "Xùn", "Duì", "Huàn", "Jié",
  "Zhōng Fú", "Xiǎo Guò", "Jì Jì", "Wèi Jì",
] as const;

export const hexagramPinyin = (number: number) => HEXAGRAM_PINYIN[number - 1];
const plain = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
/** URL slug such as `49-ge` or `54-gui-mei`; shared by both languages. */
export const hexagramSlug = (number: number) => `${number}-${plain(hexagramPinyin(number)).replace(/\s+/g, "-")}`;
export const hexagramPath = (lang: SiteLocale, number: number) => `/${lang}/hexagram/${hexagramSlug(number)}`;
export const hexagramIndexPath = (lang: SiteLocale) => `/${lang}/hexagram`;

/** Accepts `49`, `49-ge` or any `49-*` slug; returns the hexagram or undefined. */
export function hexagramFromSlug(slug: string): HexagramText | undefined {
  const match = /^(\d{1,2})(?:-[a-z-]*)?$/.exec(slug);
  const number = match ? Number(match[1]) : NaN;
  return Number.isInteger(number) && number >= 1 && number <= 64 ? HEXAGRAMS[number - 1] : undefined;
}

export const trigramName = (name: string, lang: SiteLocale) => TRIGRAM_INFO[name].image[lang === "zh" ? 0 : 1];

/**
 * Absolute origin for canonical, hreflang and sitemap URLs. Set
 * NEXT_PUBLIC_SITE_URL (e.g. https://guanxiang.example) in production so
 * every URL points at the primary domain; otherwise the request host is used.
 */
export async function siteOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:5173";
  const proto = h.get("x-forwarded-proto") ?? (/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
}

export function originFromRequest(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

/** hreflang alternates for a path that exists in both languages. */
export function languageAlternates(origin: string, pathFor: (lang: SiteLocale) => string) {
  const languages: Record<string, string> = {};
  for (const lang of SITE_LOCALES) languages[HREFLANG[lang]] = origin + pathFor(lang);
  languages["x-default"] = origin + pathFor("en");
  return languages;
}

/** Traditional image name: 泽火革, or 乾为天 when both trigrams match. */
export const zhImageName = (h: HexagramText) => h.upper === h.lower ? `${h.name}为${trigramName(h.upper, "zh")}` : `${trigramName(h.upper, "zh")}${trigramName(h.lower, "zh")}${h.name}`;

export const readingPath = (lang: SiteLocale) => `/${lang}/reading`;
