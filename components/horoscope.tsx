"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookOpen, BriefcaseBusiness, CalendarDays, CircleHelp, Heart, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getDailyHoroscope, isZodiacId, localDateKey, ZODIAC_PREFERENCE_KEY, ZODIAC_SIGNS, type ZodiacId } from "@/lib/horoscope";
import type { Language } from "@/lib/iching";
import type { KeepResult } from "@/lib/results";

export function Horoscope({ lang, onKeep, onLearn }: { lang: Language; onKeep: KeepResult; onLearn: (id: string) => void }) {
  const [signId, setSignId] = useState<ZodiacId>("aries");
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const li = lang === "zh" ? 0 : 1;
  const t = (zh: string, en: string) => lang === "zh" ? zh : en;
  const sign = ZODIAC_SIGNS.find(item => item.id === signId)!;
  const reading = dateKey ? getDailyHoroscope(signId, dateKey) : null;
  const displayDate = dateKey ? new Date(`${dateKey}T12:00:00`).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "long", day: "numeric", weekday: "long" }) : "";

  useEffect(() => {
    try { const saved = localStorage.getItem(ZODIAC_PREFERENCE_KEY); if (isZodiacId(saved)) setSignId(saved); } catch {}
    const refresh = () => setDateKey(localDateKey());
    refresh();
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, []);

  function selectSign(value: string) {
    if (!isZodiacId(value)) return;
    setSignId(value);
    try { localStorage.setItem(ZODIAC_PREFERENCE_KEY, value); } catch {}
  }

  return <section className="horoscope-page" aria-labelledby="horoscope-heading">
    <div className="page-heading horoscope-heading">
      <div><p className="eyebrow">04 — DAILY HOROSCOPE</p><h1 id="horoscope-heading">{t("星座运势", "Daily horoscope")}</h1><p>{t("十二星座 · 每日原创娱乐文案", "Twelve signs · Original daily entertainment readings")}</p></div>
      <div className="horoscope-date"><CalendarDays size={17} aria-hidden="true" /><div>{dateKey && <time dateTime={dateKey}>{displayDate}</time>}<span>{t("按本地日期阅读", "YOUR LOCAL DATE")}</span></div></div>
    </div>

    <div className="module-knowledge-links"><BookOpen size={18} /><span>{t("认识星座，再读今天。", "A little context for today's reading.")}</span><Button variant="ghost" onClick={() => onLearn("zodiac-sign")}>{t("星座入门", "Zodiac basics")}</Button><Button variant="ghost" onClick={() => onLearn("zodiac-chart")}>{t("太阳星座与星盘", "Sun signs & charts")}</Button></div>
    <div className="horoscope-layout">
      <aside className="zodiac-picker" aria-label={t("选择星座", "Choose a zodiac sign")}>
        <div className="zodiac-picker-heading"><h2 id="zodiac-picker-label">{t("选择你的星座", "Choose your sign")}</h2><span>12</span></div>
        <RadioGroup className="zodiac-grid" value={signId} onValueChange={selectSign} aria-labelledby="zodiac-picker-label">
          {ZODIAC_SIGNS.map(item => <Label key={item.id} htmlFor={`zodiac-${item.id}`} className="zodiac-option" data-selected={signId === item.id}>
            <RadioGroupItem id={`zodiac-${item.id}`} value={item.id} className="zodiac-radio" aria-label={`${item.name[li]} ${item.dates[li]}`} />
            <span className="zodiac-glyph" aria-hidden="true">{item.glyph}{"\uFE0E"}</span><strong>{item.name[li]}</strong><span className="zodiac-dates">{item.dates[li]}</span>
          </Label>)}
        </RadioGroup>
        <div className="zodiac-mobile-select"><Select value={signId} onValueChange={selectSign}><SelectTrigger aria-labelledby="zodiac-picker-label"><SelectValue /></SelectTrigger><SelectContent position="popper">{ZODIAC_SIGNS.map(item => <SelectItem key={item.id} value={item.id}><span aria-hidden="true">{item.glyph}{"\uFE0E"}</span> {item.name[li]} <span className="zodiac-select-dates">{item.dates[li]}</span></SelectItem>)}</SelectContent></Select></div>
        <div className="zodiac-picker-note"><p>{t("记住上次选择，下次打开继续阅读。", "Your last selection is remembered for your next visit.")}</p><Button variant="ghost" onClick={() => setInfoOpen(true)}><CircleHelp size={16} />{t("星座日期与内容说明", "Dates & reading notes")}</Button></div>
      </aside>

      <article className="horoscope-paper" aria-labelledby="horoscope-sign-title" aria-busy={!reading}>
        <header className="horoscope-sign-header"><div className="horoscope-sign-identity"><span className="horoscope-large-glyph" aria-hidden="true">{sign.glyph}{"\uFE0E"}</span><div><p>{t("今日运势", "TODAY’S READING")}</p><h2 id="horoscope-sign-title">{sign.name[li]}</h2><span>{sign.dates[li]}<i />{sign.element[li]}</span></div></div><span className="horoscope-edition">{t("观象原创", "GUANXIANG ORIGINAL")}</span></header>
        {reading ? <>
          <p className="sr-only" role="status">{sign.name[li]} · {displayDate} · {reading.theme[li]}</p>
          <section className="horoscope-overall"><div className="horoscope-section-label"><Sparkles size={16} aria-hidden="true" />{t("整体运势", "OVERALL")}</div><h3>{reading.theme[li]}</h3><p>{reading.overall[li]}</p></section>
          <div className="horoscope-aspects">{[
            { key: "work", icon: BriefcaseBusiness, label: t("事业 · 学业", "Work & learning"), text: reading.work[li] },
            { key: "relationships", icon: Heart, label: t("感情 · 关系", "Love & relationships"), text: reading.relationships[li] },
            { key: "money", icon: Wallet, label: t("财务 · 消费", "Money & spending"), text: reading.money[li] },
          ].map(item => <section className="horoscope-aspect" key={item.key}><h3><item.icon size={17} aria-hidden="true" />{item.label}</h3><p>{item.text}</p></section>)}</div>
          <section className="horoscope-action"><span className="horoscope-action-mark" aria-hidden="true">宜</span><div><h3>{t("今天的一件小事", "One small thing for today")}</h3><p>{reading.action[li]}</p></div></section>
          <div className="horoscope-bottom"><div className="horoscope-lucky-items"><div><span>{t("趣味幸运色", "A COLOUR FOR FUN")}</span><strong><i style={{ backgroundColor: reading.luckyColour.hex }} />{reading.luckyColour.name[li]}</strong></div><div><span>{t("趣味幸运数", "A NUMBER FOR FUN")}</span><strong className="horoscope-lucky-number">{reading.luckyNumber}</strong></div></div><div className="horoscope-reminder"><span>{t("留一句给自己", "A NOTE TO YOURSELF")}</span><p>{reading.reminder[li]}</p></div></div>
          <p className="horoscope-content-note">{t("原创娱乐解读 · 文案按星座与日期轮换，未使用实时天象推算。", "Original entertainment readings · Copy rotates by sign and date; no live planetary calculation is used.")}</p>
          <div className="result-actions"><Button onClick={() => onKeep({ kind: "zodiac", title: [`${sign.name[0]} · ${dateKey}`, `${sign.name[1]} · ${dateKey}`], summary: [`主题：${reading.theme[0]}\n整体：${reading.overall[0]}\n事业与学业：${reading.work[0]}\n关系：${reading.relationships[0]}\n消费：${reading.money[0]}\n今日小事：${reading.action[0]}\n趣味幸运色／数：${reading.luckyColour.name[0]}／${reading.luckyNumber}\n留一句：${reading.reminder[0]}`, `Theme: ${reading.theme[1]}\nOverall: ${reading.overall[1]}\nWork: ${reading.work[1]}\nRelationships: ${reading.relationships[1]}\nSpending: ${reading.money[1]}\nSmall action: ${reading.action[1]}\nColour / number for fun: ${reading.luckyColour.name[1]} / ${reading.luckyNumber}\nReminder: ${reading.reminder[1]}`], method: ["观象原创娱乐提示；按星座和设备本地日期轮换，没有实时天象计算。", "Original entertainment prompts rotated by sign and local date; no live planetary calculation."], capturedAt: new Date().toISOString(), signId, dateKey: dateKey! }, reading.action[li])}><Bookmark size={17} />{t("留进手记", "Keep in journal")}</Button><Button variant="outline" onClick={() => onLearn("zodiac-journal")}><BookOpen size={17} />{t("怎样使用每日提示", "Using a daily prompt")}</Button></div>
        </> : <p className="horoscope-loading" role="status">{t("正在准备今日运势…", "Preparing today’s reading…")}</p>}
      </article>
    </div>

    <Dialog open={infoOpen} onOpenChange={setInfoOpen}><DialogContent className="knowledge-dialog"><DialogHeader><DialogTitle>{t("星座日期与内容说明", "Dates & reading notes")}</DialogTitle><DialogDescription>{t("了解你正在阅读的内容。", "A little context for the reading.")}</DialogDescription></DialogHeader><div className="knowledge-body"><h3>{t("怎样选择星座", "Choosing a sign")}</h3><p>{t("这里采用西方太阳星座的常见日期区间，日期仅供选择时参考。出生在区间边界附近时，太阳进入星座的时刻会随年份和时区变化；本页不据此计算你的出生星盘。", "The dates are conventional ranges for Western sun signs, provided as a reference when choosing. Near a boundary, the Sun’s entry time varies with the year and time zone. This page does not calculate a birth chart.")}</p><a className="source-link block-link" href="https://www.horoscope.com/horoscope-dates/" target="_blank" rel="noreferrer">{t("日期参考：Horoscope.com", "Date ranges: Horoscope.com")}</a><a className="source-link block-link" href="https://cafeastrology.com/articles/signsofthezodiac.html" target="_blank" rel="noreferrer">{t("边界说明：Cafe Astrology", "Boundary dates: Cafe Astrology")}</a><h3>{t("每日内容怎样变化", "How the daily reading changes")}</h3><p>{t("运势、今日提示、幸运色与幸运数由观象原创编写或编排，用于娱乐和个人反思。页面根据星座和你设备上的本地日期，从已有主题中轮换内容。同一星座在同一天的内容保持一致，主题会重复出现。它们不是来自第三方实时运势，也未使用行星位置推算。", "Readings, prompts, colours, and numbers are original Guanxiang entertainment content. The page rotates through written themes using the selected sign and your device’s local date. The same sign and date produce the same reading, and themes recur. These are not live third-party forecasts or planetary calculations.")}</p><h3>{t("选择放在哪里", "Remembering your selection")}</h3><p>{t("只在当前浏览器记住你选择的星座，不需要填写生日，也不会改动已有手记。", "Your selected sign is remembered in this browser. No birthday is required, and existing journal entries are not changed.")}</p></div></DialogContent></Dialog>
  </section>;
}
