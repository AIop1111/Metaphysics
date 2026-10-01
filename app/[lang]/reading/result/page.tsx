import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CastJournal } from "@/components/cast-journal";
import { analyseCast, isMoving, parseCast, primaryLine, type LineValue } from "@/lib/cast";
import { castSnapshot } from "@/lib/cast-snapshot";
import { hexagramByLines, type HexagramText } from "@/lib/hexagrams";
import { HEXAGRAM_NOTES } from "@/lib/hexagram-notes";
import { READINGS_EN } from "@/lib/hexagram-readings-en";
import { leggeFor } from "@/lib/legge";
import { hexagramPath, hexagramPinyin, isSiteLocale, readingPath, siteOrigin, trigramName, zhImageName, type SiteLocale } from "@/lib/site";

type Params = Promise<{ lang: string }>;
type Search = Promise<{ lines?: string | string[] }>;

async function locale(params: Params): Promise<SiteLocale> {
  const { lang } = await params;
  if (!isSiteLocale(lang)) notFound();
  return lang;
}

// Individual casts are shareable but not indexed; the casting page is the canonical URL.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = await locale(params);
  const origin = await siteOrigin();
  return {
    title: lang === "en" ? "Your I Ching reading | Guanxiang" : "你的起卦结果 | 观象",
    robots: { index: false, follow: true },
    alternates: { canonical: origin + readingPath(lang) },
  };
}

const ZH_POS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
const VALUE: Record<SiteLocale, Record<LineValue, string>> = {
  zh: { 6: "老阴，变", 7: "少阳", 8: "少阴", 9: "老阳，变" },
  en: { 6: "old yin, changing", 7: "young yang", 8: "young yin", 9: "old yang, changing" },
};

function CastFigure({ values, label }: { values: LineValue[]; label: string }) {
  return <div className="hex-figure" role="img" aria-label={label}>
    {[...values].reverse().map((v, i) => <span className={`line ${isMoving(v) ? "moving" : ""}`} key={i}>{primaryLine(v) ? <i /> : <><i /><i /></>}</span>)}
  </div>;
}
function PlainFigure({ lines, label }: { lines: number[]; label: string }) {
  return <div className="hex-figure small" role="img" aria-label={label}>
    {[...lines].reverse().map((line, i) => <span className="line" key={i}>{line ? <i /> : <><i /><i /></>}</span>)}
  </div>;
}

function name(h: HexagramText, lang: SiteLocale) {
  return lang === "en" ? `${h.number}. ${hexagramPinyin(h.number)} ${h.traditional} · ${HEXAGRAM_NOTES[h.number - 1].title}` : `第 ${h.number} 卦 · ${h.name}（${zhImageName(h)}）`;
}

export default async function CastResult({ params, searchParams }: { params: Params; searchParams: Search }) {
  const lang = await locale(params);
  const en = lang === "en";
  const t = (zh: string, english: string) => en ? english : zh;
  const raw = (await searchParams).lines;
  const values = parseCast(Array.isArray(raw) ? raw[0] : raw);
  if (!values) return <>
    <h1>{t("没有找到这一卦", "This cast could not be read")}</h1>
    <p className="lede">{t("链接里的六爻数据不完整。", "The link does not contain six valid lines.")}</p>
    <p><a className="button primary" href={readingPath(lang)}>{t("重新起一卦", "Cast a new reading")}</a></p>
  </>;

  const { primary, relating, moving } = analyseCast(values);
  const base = hexagramByLines(primary), to = relating ? hexagramByLines(relating) : null;
  const note = HEXAGRAM_NOTES[base.number - 1], legge = leggeFor(base.number), reading = READINGS_EN[base.number];
  const allMoving = moving.length === 6 && base.extra.length > 0;

  return <>
    <p className="eyebrow">{t("起卦结果", "Your reading")}</p>
    <h1>{to ? (en ? `${hexagramPinyin(base.number)} changing to ${hexagramPinyin(to.number)}` : `${base.name}之${to.name}`) : (en ? `${hexagramPinyin(base.number)}, no changing lines` : `${base.name}，无变爻`)}</h1>
    <p className="lede">{t(`掷得（自下而上）：${values.join(" ")}。`, `Cast, bottom to top: ${values.join(" ")}.`)} {moving.length ? t(`变爻：${moving.map(p => ZH_POS[p - 1]).join("、")}。`, `Changing ${moving.length === 1 ? "line" : "lines"}: ${moving.join(", ")}.`) : t("没有变爻，以本卦卦辞为主。", "With no changing lines, the judgment is the focus.")}</p>

    <section className="panel cast-summary" aria-label={t("卦象", "The hexagrams")}>
      <div className="cast-pair">
        <figure>
          <CastFigure values={values} label={t(`本卦${base.name}，变爻以高亮标出`, `Primary hexagram ${base.number}, changing lines highlighted`)} />
          <figcaption><span className="eyebrow">{t("本卦", "Primary")}</span><a href={hexagramPath(lang, base.number)}>{name(base, lang)}</a></figcaption>
        </figure>
        {to && relating && <>
          <span className="cast-arrow" aria-hidden="true">→</span>
          <figure>
            <PlainFigure lines={relating} label={t(`之卦${to.name}`, `Relating hexagram ${to.number}`)} />
            <figcaption><span className="eyebrow">{t("之卦", "Relating")}</span><a href={hexagramPath(lang, to.number)}>{name(to, lang)}</a></figcaption>
          </figure>
        </>}
      </div>
      <ol className="cast-values">
        {values.map((v, i) => <li key={i} className={isMoving(v) ? "moving" : ""}>{en ? `Line ${i + 1}` : ZH_POS[i]}: {v} · {VALUE[lang][v]}</li>)}
      </ol>
    </section>

    <section className="panel" aria-labelledby="primary">
      <h2 id="primary">{t(`本卦：${base.name}`, `Primary hexagram: ${hexagramPinyin(base.number)}`)}</h2>
      <p className="lede">{en ? `${trigramName(base.upper, "en")} over ${trigramName(base.lower, "en")}` : `上${trigramName(base.upper, "zh")}下${trigramName(base.lower, "zh")}`}</p>
      <p className="classical" lang="zh-Hant">{base.judgment}</p>
      {en && <p className="legge"><span className="legge-label">Legge, 1882</span>{legge.judgment}</p>}
      <p>{note.summary[en ? 1 : 0]}</p>
      {en && reading && <p>{reading.essay[0]}</p>}
      <p className="prompt">{t("留一个问题：", "A question to reflect on: ")}{note.prompt[en ? 1 : 0]}</p>
    </section>

    {moving.length > 0 && <section className="panel" aria-labelledby="changing">
      <h2 id="changing">{t("变爻", moving.length === 1 ? "The changing line" : "The changing lines")}</h2>
      {allMoving && <p>{t("六爻皆变，乾、坤两卦另有“用九 / 用六”之辞，通常以它为主：", "All six lines are changing. Qian and Kun have a special text for this case, usually read first:")}</p>}
      <ol className="line-list">
        {allMoving && base.extra.map((text, i) => <li key={text}><span className="pos">{t("用爻", "All lines")}</span><div>
          <p className="classical" lang="zh-Hant">{text}</p>
          {en && <p className="legge"><span className="legge-label">Legge</span>{legge.extra[i]}</p>}
          {en && reading?.extra && <p className="line-note"><span className="legge-label">Reading</span>{reading.extra}</p>}
        </div></li>)}
        {moving.map(p => <li key={p}><span className="pos">{en ? `Line ${p}` : ZH_POS[p - 1]}</span><div>
          <p className="classical" lang="zh-Hant">{base.lineTexts[p - 1]}</p>
          {en && <p className="legge"><span className="legge-label">Legge</span>{legge.lines[p - 1]}</p>}
          {en && reading && <p className="line-note"><span className="legge-label">Reading</span>{reading.lines[p - 1]}</p>}
        </div></li>)}
      </ol>
      {moving.length > 1 && <p className="fine">{t("变爻较多时如何取舍，传统上有多种规则；这里全部列出，供你自己斟酌。", "Traditions differ on how to weigh several changing lines; all of them are shown here for you to consider.")}</p>}
    </section>}

    {to && <section className="panel" aria-labelledby="relating">
      <h2 id="relating">{t(`之卦：${to.name}`, `Relating hexagram: ${hexagramPinyin(to.number)}`)}</h2>
      <p className="lede">{t("变爻翻转后得到之卦，可看作事情可能的走向。", "Flipping the changing lines gives the relating hexagram, read as the direction the situation may take.")}</p>
      <p className="classical" lang="zh-Hant">{to.judgment}</p>
      {en && <p className="legge"><span className="legge-label">Legge, 1882</span>{leggeFor(to.number).judgment}</p>}
      <p>{HEXAGRAM_NOTES[to.number - 1].summary[en ? 1 : 0]}</p>
    </section>}

    <section className="panel" aria-labelledby="keep">
      <h2 id="keep">{t("留给以后", "Keep this reading")}</h2>
      <CastJournal lang={lang} lines={values.join("")} snapshot={castSnapshot(values)} />
    </section>

    <p className="fine">{t("铜钱结果是随机的。观象把起卦当作反思的契机，不预测未来，也不代替专业意见。", "The coins are random. Guanxiang treats a cast as a prompt for reflection; it does not predict events or replace professional advice.")}</p>
    <div className="actions">
      <a className="button primary" href={readingPath(lang)}>{t("再起一卦", "Cast again")}</a>
      <a className="button" href={hexagramPath(lang, base.number)}>{t(`阅读${base.name}卦全文`, `Read all of hexagram ${base.number}`)}</a>
      {to && <a className="button" href={hexagramPath(lang, to.number)}>{t(`阅读${to.name}卦全文`, `Read all of hexagram ${to.number}`)}</a>}
    </div>
  </>;
}
