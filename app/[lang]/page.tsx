import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { HEXAGRAMS, TRIGRAM_INFO } from "@/lib/hexagrams";
import { HEXAGRAM_NOTES } from "@/lib/hexagram-notes";
import { READINGS_EN } from "@/lib/hexagram-readings-en";
import { HOME_ALTERNATES, hexagramIndexPath, hexagramPath, hexagramPinyin, isSiteLocale, readingPath, siteOrigin, trigramName } from "@/lib/site";

type Params = Promise<{ lang: string }>;

// The English home leads with the I Ching; the Chinese home remains the interactive app at "/".
async function englishOnly(params: Params) {
  const { lang } = await params;
  if (!isSiteLocale(lang)) notFound();
  if (lang === "zh") permanentRedirect("/");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  await englishOnly(params);
  const origin = await siteOrigin();
  const title = "I Ching Online: Free Readings, the 64 Hexagrams & Legge's Translation | Guanxiang";
  const description = "Cast a free I Ching reading with the three-coin method, then read the hexagram in the original Chinese with James Legge's 1882 translation and original line-by-line notes. All 64 hexagrams and the eight trigrams explained.";
  return {
    title, description,
    alternates: { canonical: `${origin}/en`, languages: HOME_ALTERNATES(origin) },
    openGraph: { type: "website", url: `${origin}/en`, title, description, siteName: "Guanxiang", locale: "en_US" },
  };
}

const TRIGRAMS_EN: { name: string; quality: string; family: string; doubled: number }[] = [
  { name: "乾", quality: "Strong, creative, initiating — the force that starts things.", family: "Father · northwest", doubled: 1 },
  { name: "坤", quality: "Receptive, yielding, sustaining — what carries and completes.", family: "Mother · southwest", doubled: 2 },
  { name: "震", quality: "Arousing movement, a sudden start, the first stirring of spring.", family: "Eldest son · east", doubled: 51 },
  { name: "巽", quality: "Gentle penetration — influence that works by persistence.", family: "Eldest daughter · southeast", doubled: 57 },
  { name: "坎", quality: "Depth and danger, flowing on through difficulty.", family: "Middle son · north", doubled: 29 },
  { name: "离", quality: "Clarity and brightness, and the dependence of a flame on its fuel.", family: "Middle daughter · south", doubled: 30 },
  { name: "艮", quality: "Stillness and stopping — knowing where to rest.", family: "Youngest son · northeast", doubled: 52 },
  { name: "兑", quality: "Joy and open exchange, like water shared between two lakes.", family: "Youngest daughter · west", doubled: 58 },
];
const PINYIN: Record<string, string> = { 乾: "Qián", 坤: "Kūn", 震: "Zhèn", 巽: "Xùn", 坎: "Kǎn", 离: "Lí", 艮: "Gèn", 兑: "Duì" };

function Lines({ lines, className }: { lines: number[]; className: string }) {
  return <span className={className} aria-hidden="true">{[...lines].reverse().map((line, i) => <span className="line" key={i}>{line ? <i /> : <><i /><i /></>}</span>)}</span>;
}

export default async function EnglishHome({ params }: { params: Params }) {
  await englishOnly(params);
  const origin = await siteOrigin();
  const today = new Date().toISOString().slice(0, 10);
  const day = Math.floor(Date.parse(`${today}T12:00:00Z`) / 86400000);
  const daily = HEXAGRAMS[((day % 64) + 64) % 64];
  const note = HEXAGRAM_NOTES[daily.number - 1];
  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "Guanxiang", alternateName: "观象", url: `${origin}/en`, inLanguage: "en", description: "I Ching readings, the 64 hexagrams and the eight trigrams, with the original Chinese and Legge's translation." };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <section className="home-hero" aria-labelledby="home-title">
      <p className="eyebrow">I Ching · Book of Changes · 周易</p>
      <h1 id="home-title">Read the I Ching in its own words.</h1>
      <p className="lede">Cast a reading with three coins, or browse all 64 hexagrams. Every page pairs the original Chinese with James Legge&apos;s 1882 translation and a plain-English note on each line.</p>
      <div className="actions">
        <a className="button primary" href={readingPath("en")}>Cast a free reading</a>
        <a className="button" href={hexagramIndexPath("en")}>Browse the 64 hexagrams</a>
      </div>
      <Link className="lang-switch" href="/?lang=zh" hrefLang="zh-Hans" lang="zh-Hans">中文版</Link>
    </section>

    <section className="panel daily" aria-labelledby="daily">
      <p className="eyebrow">Hexagram of the day · {today}</p>
      <div className="daily-body">
        <Lines lines={daily.lines} className="hex-figure small" />
        <div>
          <h2 id="daily"><a href={hexagramPath("en", daily.number)}>{daily.number}. {hexagramPinyin(daily.number)} <span lang="zh-Hant">{daily.traditional}</span> · {note.title}</a></h2>
          <p className="lede">{trigramName(daily.upper, "en")} over {trigramName(daily.lower, "en")}</p>
          <p>{note.summary[1]}</p>
          {READINGS_EN[daily.number] && <p>{READINGS_EN[daily.number].essay[0]}</p>}
          <p className="prompt">A question to reflect on: {note.prompt[1]}</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="how">
      <h2 id="how">How a reading works</h2>
      <ol className="steps">
        <li><strong>Hold a question.</strong> Make it specific — one situation, one decision. It stays in your browser and never affects the coins.</li>
        <li><strong>Toss three coins, six times.</strong> Heads count 3 and tails 2; each toss gives one line, from the bottom up. Sixes and nines are changing lines.</li>
        <li><strong>Read the result.</strong> The primary hexagram, its changing lines and the relating hexagram, in Chinese, in Legge&apos;s English, and in our own short notes. Save it to a private journal if you like.</li>
      </ol>
      <p><a href={readingPath("en")}>Start a reading →</a></p>
    </section>

    <section aria-labelledby="trigrams">
      <h2 id="trigrams">The eight trigrams</h2>
      <p className="lede">Every hexagram is two trigrams stacked: a lower one for the inner situation and an upper one for the outer. Learning these eight images is the quickest way into the book. Family roles and directions follow the traditional Shuogua commentary.</p>
      <ul className="trigram-grid">
        {TRIGRAMS_EN.map(tg => { const info = TRIGRAM_INFO[tg.name]; return <li key={tg.name}>
          <Lines lines={info.lines} className="trigram-figure" />
          <div>
            <h3>{info.symbol} {PINYIN[tg.name]} <span lang="zh-Hant">{tg.name}</span> · {info.image[1]}</h3>
            <p>{tg.quality}</p>
            <p className="fine">{tg.family} · <a href={hexagramPath("en", tg.doubled)}>doubled: hexagram {tg.doubled}</a></p>
          </div>
        </li>; })}
      </ul>
    </section>

    <section className="panel" aria-labelledby="texts">
      <h2 id="texts">About the texts</h2>
      <p>The Chinese judgments and line texts come from the Zhou Yi on Chinese Wikisource, each linked to the exact revision we checked. The English is James Legge&apos;s translation from the Sacred Books of the East (1882), which is in the public domain; his bracketed words are his own additions. Overviews and line notes are written by Guanxiang and are not a translation.</p>
      <p>We treat the I Ching as a classic for reflection. A cast is random; it does not predict events or replace professional advice.</p>
    </section>

    <section className="also" aria-labelledby="also">
      <h2 id="also">Also on Guanxiang</h2>
      <ul>
        <li><Link href="/?lang=en#horoscope">Daily zodiac prompts</Link> — short original entertainment readings for the twelve signs.</li>
        <li><Link href="/?lang=en#mbti">Personality preferences</Link> — a 24-question exercise based on the four MBTI preference pairs (unofficial).</li>
        <li><Link href="/?lang=en#journal">Your journal</Link> — keep readings and reflections privately in this browser.</li>
      </ul>
    </section>
  </>;
}
