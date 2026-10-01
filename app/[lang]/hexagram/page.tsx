import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HEXAGRAMS } from "@/lib/hexagrams";
import { HEXAGRAM_NOTES } from "@/lib/hexagram-notes";
import { HREFLANG, hexagramIndexPath, hexagramPath, hexagramPinyin, isSiteLocale, languageAlternates, siteOrigin, trigramName, zhImageName, type SiteLocale } from "@/lib/site";

type Params = Promise<{ lang: string }>;

async function locale(params: Params): Promise<SiteLocale> {
  const { lang } = await params;
  if (!isSiteLocale(lang)) notFound();
  return lang;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = await locale(params);
  const origin = await siteOrigin();
  const title = lang === "en" ? "The 64 I Ching Hexagrams: Meanings, Trigrams & Original Text | Guanxiang" : "《周易》六十四卦全表：卦辞爻辞原文与白话导读 | 观象";
  const description = lang === "en"
    ? "All 64 hexagrams of the I Ching (Book of Changes) in King Wen order, with pinyin, upper and lower trigrams, original Chinese judgments and line texts, and short original overviews."
    : "按通行卦序浏览《周易》六十四卦：卦名、上下卦、卦辞与六爻繁体原文、版本出处及观象原创白话导读。";
  const url = origin + hexagramIndexPath(lang);
  return { title, description, alternates: { canonical: url, languages: languageAlternates(origin, hexagramIndexPath) }, openGraph: { type: "website", url, title, description } };
}

export default async function HexagramIndex({ params }: { params: Params }) {
  const lang = await locale(params);
  const en = lang === "en";
  const other: SiteLocale = en ? "zh" : "en";
  return <>
    <p className="eyebrow">{en ? "I Ching · Book of Changes" : "《周易》"}</p>
    <h1>{en ? "The 64 hexagrams of the I Ching" : "六十四卦"}</h1>
    <p className="lede">{en ? "In the traditional King Wen order. Each page has the original Chinese judgment and six line texts, the two trigrams, and a short original overview." : "按通行卦序排列。每卦一页，收录卦辞与六爻原文、上下卦结构和观象原创白话导读。"}</p>
    <a className="lang-switch" href={hexagramIndexPath(other)} hrefLang={HREFLANG[other]} lang={HREFLANG[other]}>{en ? "中文版" : "English version"}</a>
    <ul className="hex-grid">
      {HEXAGRAMS.map(h => <li key={h.number}><a href={hexagramPath(lang, h.number)}>
        <span className="num">{String(h.number).padStart(2, "0")}</span>
        <span className="name">{en ? <>{hexagramPinyin(h.number)} <span lang="zh-Hant">{h.traditional}</span></> : h.name}</span>
        <span className="sub">{en ? `${HEXAGRAM_NOTES[h.number - 1].title} · ${trigramName(h.upper, "en")} over ${trigramName(h.lower, "en")}` : `上${h.upper}下${h.lower} · ${zhImageName(h)}`}</span>
      </a></li>)}
    </ul>
  </>;
}
