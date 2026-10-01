import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoinCaster } from "@/components/coin-caster";
import { HREFLANG, hexagramIndexPath, isSiteLocale, languageAlternates, readingPath, siteOrigin, type SiteLocale } from "@/lib/site";

type Params = Promise<{ lang: string }>;

async function locale(params: Params): Promise<SiteLocale> {
  const { lang } = await params;
  if (!isSiteLocale(lang)) notFound();
  return lang;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = await locale(params);
  const origin = await siteOrigin();
  const title = lang === "en" ? "Free I Ching Reading Online – Three-Coin Method with Legge's Translation | Guanxiang" : "易经在线起卦：三枚铜钱法，查看本卦、变爻与之卦 | 观象";
  const description = lang === "en"
    ? "Cast an I Ching hexagram with the traditional three-coin method. See your primary hexagram, changing lines and relating hexagram, with the original Chinese, James Legge's translation and line-by-line notes."
    : "用传统三枚铜钱法在线起卦，自下而上得六爻，查看本卦、变爻与之卦的卦辞爻辞原文和白话导读。问题只保存在你的浏览器里。";
  const url = origin + readingPath(lang);
  return { title, description, alternates: { canonical: url, languages: languageAlternates(origin, readingPath) }, openGraph: { type: "website", url, title, description } };
}

export default async function ReadingPage({ params }: { params: Params }) {
  const lang = await locale(params);
  const en = lang === "en";
  const other: SiteLocale = en ? "zh" : "en";
  return <>
    <p className="eyebrow">{en ? "I Ching · Three-coin method" : "《周易》 · 三枚铜钱法"}</p>
    <h1>{en ? "Cast an I Ching reading" : "起一卦"}</h1>
    <p className="lede">{en ? "Hold a question in mind, toss three coins six times, and read the hexagram that results — the original Chinese, Legge's 1882 translation and a short note on each line." : "心里放一个问题，掷三枚铜钱六次，得到一卦。结果页提供卦辞与变爻原文、白话导读和之卦。"}</p>
    <a className="lang-switch" href={readingPath(other)} hrefLang={HREFLANG[other]} lang={HREFLANG[other]}>{en ? "中文版" : "English version"}</a>

    <section className="panel cast-panel" aria-label={en ? "Cast the coins" : "掷铜钱"}>
      <CoinCaster lang={lang} resultPath={`${readingPath(lang)}/result`} />
    </section>

    <section className="panel" aria-labelledby="method">
      <h2 id="method">{en ? "How the three-coin method works" : "三枚铜钱法怎样起卦"}</h2>
      {en ? <>
        <p>Each line comes from one toss of three coins. Heads count 3 and tails count 2, so a toss adds up to 6, 7, 8 or 9. Seven is a young yang line (solid) and eight a young yin line (broken); both are stable. Nine is an old yang line and six an old yin line: they are &ldquo;changing&rdquo; lines that turn into their opposite.</p>
        <p>The first toss gives the bottom line, and the hexagram is built upward to the sixth. The lines as cast form the primary hexagram. If any lines are changing, flipping them gives a second, relating hexagram that suggests where the situation is heading.</p>
        <p>With three coins, a changing line comes up one time in four (a six one time in eight, a nine one time in eight). The coins here use your browser&apos;s cryptographic random generator.</p>
      </> : <>
        <p>每一爻掷一次三枚铜钱：正面计 3，反面计 2，合计为 6、7、8 或 9。七为少阳（阳爻），八为少阴（阴爻），都不变；九为老阳，六为老阴，是要变为相反一爻的“变爻”。</p>
        <p>第一次得初爻，自下而上直到上爻。六爻合成本卦；若有变爻，把变爻阴阳互换，便得到之卦，可看作事情可能的走向。</p>
        <p>三枚铜钱法中，出现变爻的机会约为四分之一（老阴、老阳各八分之一）。本页铜钱使用浏览器的加密随机数生成。</p>
      </>}
    </section>

    <section className="panel" aria-labelledby="reading-how">
      <h2 id="reading-how">{en ? "How to read the result" : "怎样读结果"}</h2>
      {en ? <>
        <p>With no changing lines, read the judgment of the primary hexagram. With changing lines, read those lines closely: they describe the parts of the situation in motion. Then look at the relating hexagram as the direction of change.</p>
        <p>Tradition offers several rules for weighting changing lines when there are many — Zhu Xi&apos;s is the best known. To keep things transparent, the result page shows all of them and leaves the weighing to you.</p>
      </> : <>
        <p>没有变爻时，以本卦卦辞为主；有变爻时，细读这些变爻的爻辞，它们对应事情中正在变化的部分，再参看之卦作为变化的方向。</p>
        <p>变爻较多时如何取舍，传统上有多种说法（以朱熹《易学启蒙》所列最为常见）。为保持透明，结果页列出全部变爻，由你自己斟酌。</p>
      </>}
    </section>

    <section className="panel" aria-labelledby="reading-note">
      <h2 id="reading-note">{en ? "What this is — and isn't" : "它是什么，不是什么"}</h2>
      <p>{en ? "Guanxiang treats a cast as a prompt for reflection, a way to look at a question from an unfamiliar angle. The coins are random; the reading does not predict events or replace professional advice on health, law or money." : "观象把起卦当作一次反思的契机，换一个角度看自己的问题。铜钱结果是随机的；解读不预测未来，也不能代替医疗、法律或财务等专业意见。"}</p>
      <p><a href={hexagramIndexPath(lang)}>{en ? "Browse all 64 hexagrams" : "浏览六十四卦全表"}</a></p>
    </section>
  </>;
}
