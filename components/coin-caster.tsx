"use client";

import { useEffect, useRef, useState } from "react";
import { CAST_SESSION_KEY, castKey, isMoving, primaryLine, tossLine, type Toss } from "@/lib/cast";

type Lang = "zh" | "en";
const POSITIONS: Record<Lang, string[]> = {
  zh: ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"],
  en: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5", "Line 6"],
};
const VALUE_NAMES: Record<Lang, Record<number, string>> = {
  zh: { 6: "老阴 · 变", 7: "少阳", 8: "少阴", 9: "老阳 · 变" },
  en: { 6: "old yin · changing", 7: "young yang", 8: "young yin", 9: "old yang · changing" },
};

export function CoinCaster({ lang, resultPath }: { lang: Lang; resultPath: string }) {
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);
  const [question, setQuestion] = useState("");
  const [tosses, setTosses] = useState<Toss[]>([]);
  const [spinning, setSpinning] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const done = tosses.length === 6;
  const last = tosses.at(-1);
  const href = done ? `${resultPath}?lines=${castKey(tosses.map(x => x.value))}` : undefined;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function toss(count: number) {
    if (spinning || done) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = Array.from({ length: Math.min(count, 6 - tosses.length) }, () => tossLine());
    if (reduced) { setTosses(v => [...v, ...next]); return; }
    setSpinning(true);
    timer.current = window.setTimeout(() => { setTosses(v => [...v, ...next]); setSpinning(false); }, 650);
  }
  function remember() {
    try { sessionStorage.setItem(CAST_SESSION_KEY, JSON.stringify({ lines: castKey(tosses.map(x => x.value)), question: question.trim(), at: new Date().toISOString() })); } catch {}
  }

  return <div className="caster">
    <label className="caster-question" htmlFor="cast-question">
      <span>{t("你想思考的问题（选填）", "Your question (optional)")}</span>
      <textarea id="cast-question" rows={3} maxLength={500} value={question} onChange={e => setQuestion(e.target.value)} placeholder={t("写得具体一点，例如：这次换工作，我最需要先看清什么？", "Be specific, e.g. What should I understand before changing jobs?")} />
      <small>{t("问题只保存在你的浏览器里，不会发送到服务器，也不影响铜钱的结果。", "Your question stays in this browser. It is not sent anywhere and does not influence the coins.")}</small>
    </label>

    <div className="caster-stage">
      <div className={`coins ${spinning ? "spinning" : ""}`} aria-hidden="true">
        {[0, 1, 2].map(i => { const coin = last?.coins[i]; return <span key={i} className={`coin ${coin === 3 ? "heads" : coin === 2 ? "tails" : ""}`}>{coin === undefined ? "·" : coin === 3 ? t("正", "H") : t("反", "T")}</span>; })}
      </div>
      <p className="caster-status" aria-live="polite">
        {spinning ? t("铜钱翻转中……", "The coins are spinning…")
          : last ? t(`${POSITIONS.zh[tosses.length - 1]}：${last.coins.join(" + ")} = ${last.value}，${VALUE_NAMES.zh[last.value]}`, `${POSITIONS.en[tosses.length - 1]}: ${last.coins.join(" + ")} = ${last.value}, ${VALUE_NAMES.en[last.value]}`)
          : t("每次掷三枚铜钱：正面计 3，反面计 2。六次之后，卦自下而上完成。", "Each toss uses three coins: heads count 3, tails 2. Six tosses build the hexagram from the bottom up.")}
      </p>
      <div className="caster-actions">
        {!done && <button type="button" className="button primary" onClick={() => toss(1)} disabled={spinning}>{t(`掷铜钱 · 第 ${tosses.length + 1} 爻`, `Toss the coins · line ${tosses.length + 1} of 6`)}</button>}
        {!done && <button type="button" className="button" onClick={() => toss(6)} disabled={spinning}>{tosses.length ? t("掷完剩下几爻", "Toss the remaining lines") : t("一次掷完六爻", "Toss all six at once")}</button>}
        {done && href && <a className="button primary" href={href} onClick={remember}>{t("查看这一卦", "Read your hexagram")}</a>}
        {tosses.length > 0 && <button type="button" className="button" onClick={() => { window.clearTimeout(timer.current); setSpinning(false); setTosses([]); }}>{t("重新开始", "Start over")}</button>}
      </div>
    </div>

    <ol className="cast-figure" aria-label={t("已掷出的爻（自下而上）", "Lines cast so far, bottom to top")}>
      {[5, 4, 3, 2, 1, 0].map(i => { const x = tosses[i]; return <li key={i} className={x ? "" : "empty"}>
        <span className="pos">{POSITIONS[lang][i]}</span>
        <span className={`cast-line ${x ? (primaryLine(x.value) ? "yang" : "yin") : ""} ${x && isMoving(x.value) ? "moving" : ""}`}>{x ? (primaryLine(x.value) ? <i /> : <><i /><i /></>) : null}</span>
        <span className="val">{x ? `${x.value} · ${VALUE_NAMES[lang][x.value]}` : ""}</span>
      </li>; })}
    </ol>
  </div>;
}
