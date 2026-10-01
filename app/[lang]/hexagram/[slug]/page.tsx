import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { HEXAGRAMS, hexagramSymbol } from "@/lib/hexagrams";
import { HEXAGRAM_NOTES } from "@/lib/hexagram-notes";
import { HREFLANG, SITE_LOCALES, hexagramFromSlug, hexagramIndexPath, hexagramPath, hexagramPinyin, hexagramSlug, isSiteLocale, languageAlternates, siteOrigin, trigramName, zhImageName, type SiteLocale } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return SITE_LOCALES.flatMap(lang => HEXAGRAMS.map(h => ({ lang, slug: hexagramSlug(h.number) })));
}

async function resolve(params: Params) {
  const { lang, slug } = await params;
  const hexagram = hexagramFromSlug(slug);
  if (!isSiteLocale(lang) || !hexagram) notFound();
  if (slug !== hexagramSlug(hexagram.number)) permanentRedirect(hexagramPath(lang, hexagram.number));
  return { lang, hexagram, note: HEXAGRAM_NOTES[hexagram.number - 1] };
}

const clip = (text: string, max = 158) => text.length <= max ? text : text.slice(0, max - 1).replace(/[\s,.;:，。；：、]+\S*$/, "") + "…";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, hexagram: h, note } = await resolve(params);
  const origin = await siteOrigin();
  const pinyin = hexagramPinyin(h.number);
  const title = lang === "en"
    ? `Hexagram ${h.number}: ${pinyin} (${h.traditional}) – ${note.title} | I Ching Meaning & Original Text`
    : `第${h.number}卦 ${h.name}卦（${h.traditional}）卦辞爻辞原文与白话导读 | 观象`;
  const description = clip(lang === "en"
    ? `I Ching hexagram ${h.number}, ${pinyin}: ${trigramName(h.upper, "en")} over ${trigramName(h.lower, "en")}. ${note.summary[1]}`
    : `${h.name}卦，${zhImageName(h)}，上${h.upper}下${h.lower}。${note.summary[0]}`);
  const url = origin + hexagramPath(lang, h.number);
  return {
    title, description,
    alternates: { canonical: url, languages: languageAlternates(origin, l => hexagramPath(l, h.number)) },
    openGraph: { type: "article", url, title, description, siteName: lang === "en" ? "Guanxiang" : "观象 · Guanxiang", locale: lang === "en" ? "en_US" : "zh_CN" },
    twitter: { card: "summary", title, description },
  };
}

function Figure({ lines, label }: { lines: number[]; label: string }) {
  return <div className="hex-figure" role="img" aria-label={label}>
    {[...lines].reverse().map((line, i) => <span className="line" key={i}>{line ? <i /> : <><i /><i /></>}</span>)}
  </div>;
}

const ZH_POSITIONS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
const EN_POSITIONS = ["Line 1 (bottom)", "Line 2", "Line 3", "Line 4", "Line 5", "Line 6 (top)"];

export default async function HexagramPage({ params }: { params: Params }) {
  const { lang, hexagram: h, note } = await resolve(params);
  const origin = await siteOrigin();
  const en = lang === "en";
  const t = (zh: string, english: string) => en ? english : zh;
  const other: SiteLocale = en ? "zh" : "en";
  const pinyin = hexagramPinyin(h.number);
  const prev = h.number > 1 ? h.number - 1 : null;
  const next = h.number < 64 ? h.number + 1 : null;
  const upper = `${h.upper} · ${trigramName(h.upper, lang)}`;
  const lower = `${h.lower} · ${trigramName(h.lower, lang)}`;
  const heading = en ? `Hexagram ${h.number}: ${pinyin} · ${note.title}` : `第 ${h.number} 卦 · ${h.name}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: heading, inLanguage: HREFLANG[lang], url: origin + hexagramPath(lang, h.number), isBasedOn: h.source, publisher: { "@type": "Organization", name: "Guanxiang" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t("观象", "Guanxiang"), item: `${origin}/` },
        { "@type": "ListItem", position: 2, name: t("六十四卦", "64 Hexagrams"), item: origin + hexagramIndexPath(lang) },
        { "@type": "ListItem", position: 3, name: heading, item: origin + hexagramPath(lang, h.number) },
      ] },
    ],
  };

  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <ol className="crumbs">
      <li><a href={`/?lang=${lang}`}>{t("观象", "Guanxiang")}</a></li>
      <li><a href={hexagramIndexPath(lang)}>{t("六十四卦", "64 Hexagrams")}</a></li>
      <li aria-current="page">{en ? `${h.number}. ${pinyin}` : `${h.number}. ${h.name}`}</li>
    </ol>

    <header className="hex-hero">
      <Figure lines={h.lines} label={t(`${h.name}卦六爻结构，上${h.upper}下${h.lower}`, `Six-line figure of ${pinyin}: ${trigramName(h.upper, "en")} over ${trigramName(h.lower, "en")}`)} />
      <div>
        <p className="eyebrow">{t("《周易》六十四卦", "I Ching · Book of Changes")}</p>
        <h1>{en ? <>Hexagram {h.number}: {pinyin} <span lang="zh-Hant">{h.traditional}</span> · {note.title}</> : <>第 {h.number} 卦 · {h.name}卦{h.traditional !== h.name && <span lang="zh-Hant">（{h.traditional}）</span>}</>}</h1>
        <p className="lede">{en ? `${trigramName(h.upper, "en")} over ${trigramName(h.lower, "en")}` : `上${trigramName(h.upper, "zh")}下${trigramName(h.lower, "zh")} · ${zhImageName(h)}`}</p>
        <ul className="hex-meta">
          <li>{t("上卦", "Upper trigram")} <strong>{upper}</strong></li>
          <li>{t("下卦", "Lower trigram")} <strong>{lower}</strong></li>
          <li>Unicode <strong className="glyph">{hexagramSymbol(h.number)}</strong></li>
        </ul>
        <a className="lang-switch" href={hexagramPath(other, h.number)} hrefLang={HREFLANG[other]} lang={HREFLANG[other]}>{en ? "中文版" : "English version"}</a>
      </div>
    </header>

    <section className="panel" aria-labelledby="overview">
      <h2 id="overview">{t("白话导读", "Overview")}</h2>
      <p>{note.summary[en ? 1 : 0]}</p>
      <p className="prompt">{t("留一个问题：", "A question to reflect on: ")}{note.prompt[en ? 1 : 0]}</p>
      <p className="fine">{t("导读概述传统主题，思考问题为观象编辑文字，均非逐字译文。", "This overview summarizes traditional themes and is original Guanxiang writing, not a translation.")}</p>
    </section>

    <section className="panel" aria-labelledby="judgment">
      <h2 id="judgment">{t("卦辞原文", "The Judgment (original Chinese)")}</h2>
      <p className="classical" lang="zh-Hant">{h.judgment}</p>
    </section>

    <section className="panel" aria-labelledby="lines">
      <h2 id="lines">{t("六爻原文（自下而上）", "The six lines (original Chinese, bottom to top)")}</h2>
      <ol className="line-list">
        {h.lineTexts.map((text, i) => <li key={i}><span className="pos">{en ? EN_POSITIONS[i] : ZH_POSITIONS[i]}</span><span className="classical" lang="zh-Hant">{text}</span></li>)}
        {h.extra.map(text => <li key={text}><span className="pos">{t("用爻", "All lines changing")}</span><span className="classical" lang="zh-Hant">{text}</span></li>)}
      </ol>
      <p className="fine">{t("保留所见繁体原文及标点；不同版本可能有异文。", "Traditional-character text as published; editions may differ slightly.")} <a href={h.source} rel="noopener" target="_blank">{t("核对维基文库原文与版本", "Check the Wikisource revision")}</a></p>
    </section>

    <div className="actions">
      <a className="button primary" href={`/?lang=${lang}#library/hexagram/${h.number}`}>{t("在互动书阁中改变任一爻", "Change any line in the interactive explorer")}</a>
      <a className="button" href={hexagramIndexPath(lang)}>{t("浏览全部六十四卦", "Browse all 64 hexagrams")}</a>
    </div>

    <nav className="pager" aria-label={t("前后卦", "Adjacent hexagrams")}>
      {prev ? <a href={hexagramPath(lang, prev)} rel="prev">← {en ? `${prev}. ${hexagramPinyin(prev)}` : `第 ${prev} 卦 ${HEXAGRAMS[prev - 1].name}`}</a> : <span />}
      {next ? <a href={hexagramPath(lang, next)} rel="next">{en ? `${next}. ${hexagramPinyin(next)}` : `第 ${next} 卦 ${HEXAGRAMS[next - 1].name}`} →</a> : <span />}
    </nav>
  </article>;
}
