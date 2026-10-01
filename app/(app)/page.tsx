"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { BookOpen, Bookmark, Check, CircleHelp, Download, FileText, Globe2, Layers3, Plus, RotateCcw, Save, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Horoscope } from "@/components/horoscope";
import { Mbti } from "@/components/mbti";
import { KnowledgeLibrary, MiniHexagram } from "@/components/knowledge-library";
import { HEXAGRAMS, hexagramByNumber } from "@/lib/hexagrams";
import { HEXAGRAM_NOTES } from "@/lib/hexagram-notes";
import { LESSONS, TOPICS, type Topic } from "@/lib/knowledge";
import { patternSnapshot, reflectionSnapshot } from "@/lib/results";
import { getDailyHoroscope, isZodiacId, localDateKey, ZODIAC_PREFERENCE_KEY, ZODIAC_SIGNS, type ZodiacId } from "@/lib/horoscope";
import { EXAMPLES, TRIGRAMS, STORAGE_KEY, RESULT_KINDS, calculatePlum, getLearningResult, parseEntries, entryMarkdown, entryKind, entryCaption, type ExampleId, type JournalEntry, type Language, type ResultSnapshot } from "@/lib/iching";

type View = "home" | "explore" | "reading" | "horoscope" | "mbti" | "library" | "journal";
type Draft = Pick<JournalEntry, "question" | "facts" | "understanding" | "unknown" | "action">;
const EMPTY_DRAFT: Draft = { question: "", facts: "", understanding: "", unknown: "", action: "" };
const VIEWS: View[] = ["home", "explore", "reading", "horoscope", "mbti", "library", "journal"];
const NAV: { id: View; label: [string, string] }[] = [{ id: "home", label: ["首页", "Home"] }, { id: "explore", label: ["卦象探索", "Patterns"] }, { id: "horoscope", label: ["星座", "Zodiac"] }, { id: "mbti", label: ["MBTI", "MBTI"] }, { id: "library", label: ["星图书阁", "Library"] }, { id: "journal", label: ["手记", "Journal"] }];
const LEARNING = [
  { n: "01", title: ["先读懂六条线", "Read the six lines"], text: ["阴与阳，怎样构成一个卦？", "How do solid and broken lines form a pattern?"], icon: Layers3 },
  { n: "02", title: ["变化从哪里来", "Locate the change"], text: ["一爻变化，整体随之改变。", "One line changes the whole structure."], icon: RotateCcw },
  { n: "03", title: ["给解释划一道线", "Read with context"], text: ["分清原文、传统解释与自己的理解。", "Separate sources, tradition, and your own reflection."], icon: BookOpen },
];

function Hexagram({ lines, interactive = false, changed = false, onFlip, label, small = false }: { lines: number[]; interactive?: boolean; changed?: boolean; onFlip?: () => void; label: string; small?: boolean }) {
  return <div className={`hexagram ${small ? "hex-small" : ""}`} role="group" aria-label={label}>
    {[...lines].reverse().map((line, i) => {
      const index = 6 - i;
      const contents = <><span className={`line-stroke ${line ? "yang" : "yin"}`}><i />{!line && <i />}</span><span className="line-index">{index === 1 ? "01" : `0${index}`}</span></>;
      return interactive && index === 1 ? <button type="button" className={`hex-line moving-line ${changed ? "is-changed" : ""}`} key={index} onClick={onFlip} aria-label={label} aria-pressed={changed}>{contents}</button> : <div className={`hex-line ${changed && index === 1 ? "is-changed" : ""}`} key={index}>{contents}</div>;
    })}
  </div>;
}

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");
  const [view, setView] = useState<View>("home");
  const [exampleId, setExampleId] = useState<ExampleId>("plum");
  const [changed, setChanged] = useState(false);
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState("lines");
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [storageCorrupt, setStorageCorrupt] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [snapshot, setSnapshot] = useState<ResultSnapshot | null>(null);
  const [journalFilter, setJournalFilter] = useState("all");
  const [homeDaily, setHomeDaily] = useState<{ dateKey: string; signId: ZodiacId } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [review, setReview] = useState("");
  const [modal, setModal] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [discard, setDiscard] = useState<(() => void) | null>(null);
  const stateRef = useRef({ exampleId, changed });
  const viewRef = useRef<View>(view);
  const dirtyRef = useRef(false);
  const example = EXAMPLES.find(e => e.id === exampleId)!;
  const symbol = changed ? example.to : example.from;
  const activeEntry = entries.find(e => e.id === activeId);
  const currentSnapshot = activeEntry?.snapshot ?? snapshot;
  const visibleEntries = entries.filter(e => journalFilter === "all" || entryKind(e) === journalFilter);
  const previousMbti = currentSnapshot?.kind === "mbti" ? entries.find(e => e.id !== activeId && e.snapshot?.kind === "mbti" && e.snapshot.dimensions && Date.parse(e.snapshot.capturedAt) < Date.parse(currentSnapshot.capturedAt)) : undefined;
  const dailyIndex = homeDaily ? Math.floor(Date.parse(`${homeDaily.dateKey}T12:00:00Z`) / 86400000) : 0;
  const dailyPattern = HEXAGRAMS[((dailyIndex % 64) + 64) % 64];
  const dailySign = ZODIAC_SIGNS.find(s => s.id === homeDaily?.signId);
  const dailyHoroscope = homeDaily ? getDailyHoroscope(homeDaily.signId, homeDaily.dateKey) : null;
  const dailyPersonality = LESSONS.filter(l => l.topic === "mbti")[((dailyIndex % 4) + 4) % 4];
  const calculation = calculatePlum();
  const li = lang === "zh" ? 0 : 1;
  const t = (zh: string, en: string) => lang === "zh" ? zh : en;
  const date = (value: string) => new Date(value).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "short", day: "numeric" });

  function navigate(next: View, hash = next as string) {
    viewRef.current = next; setView(next); window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function openLibrary(path = "hexagrams") { navigate("library", `library/${path}`); }
  function goToTopic(topic: Topic) { navigate(topic === "iching" ? "explore" : topic === "zodiac" ? "horoscope" : "mbti"); }
  function selectExample(id: ExampleId) { setExampleId(id); setChanged(false); setStep(0); }
  function flip() { setChanged(v => !v); if (mode === "plum") setStep(changed ? 2 : 3); }
  function protectDraft(action: () => void) { if (dirty || review.trim()) setDiscard(() => () => { dirtyRef.current = false; setDirty(false); setReview(""); action(); }); else action(); }
  function beginJournal() {
    protectDraft(() => { setDraft({ ...EMPTY_DRAFT, question }); setSnapshot(reflectionSnapshot()); setActiveId(null); setReview(""); setDirty(Boolean(question.trim())); navigate("journal"); });
  }
  function keepResult(result: ResultSnapshot, action = "") {
    protectDraft(() => {
      const now = new Date().toISOString();
      const entry: JournalEntry = { id: crypto.randomUUID(), ...EMPTY_DRAFT, question: question.trim() || result.title[li], action, exampleId, changed, snapshot: structuredClone(result), createdAt: now, updatedAt: now, reviews: [] };
      const saved = persist([entry, ...entries]);
      setDraft({ question: entry.question, facts: "", understanding: "", unknown: "", action }); setSnapshot(entry.snapshot!); setActiveId(saved ? entry.id : null); setReview(""); setDirty(!saved); setJournalFilter("all"); navigate("journal");
      if (saved) toast.success(t("结果已留进手记，可以继续补充自己的背景。", "Result saved. Add your own context when ready."));
    });
  }
  function keepLearningResult() {
    const result = patternSnapshot(symbol.number, example.from.number, changed ? [1] : [], ["固定学习示例：" + example.category[0] + "；问题不参与计算。", "Fixed learning example: " + example.category[1] + "; the question is not used in the calculation."]);
    result.summary = [result.summary[0] + "\n当前学习主题：" + symbol.theme[0] + "\n整理思路：\n" + example.prompts[0].join("\n"), result.summary[1] + "\nCurrent learning context: " + symbol.theme[1] + "\nReflection prompts:\n" + example.prompts[1].join("\n")];
    keepResult(result);
  }
  function persist(next: JournalEntry[]) {
    if (next.length > 2000) { toast.error(t("记录已达本设备容量上限，请先导出整理。", "The entry limit is reached. Export and organize your records first.")); return false; }
    if (storageCorrupt) { toast.error(t("已有手记无法读取。为保护原数据，当前无法覆盖保存。", "Existing journal data cannot be read. Saving is blocked to protect it.")); return false; }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setEntries(next); setStorageError(false); return true; }
    catch { setStorageError(true); toast.error(t("保存失败，请先导出这份手记。", "Could not save. Please export this entry.")); return false; }
  }
  function currentEntry(): JournalEntry {
    const now = new Date().toISOString();
    return { id: activeEntry?.id ?? crypto.randomUUID(), ...draft, exampleId: activeEntry?.exampleId ?? exampleId, changed: activeEntry?.changed ?? changed, ...(currentSnapshot ? { snapshot: currentSnapshot } : {}), createdAt: activeEntry?.createdAt ?? now, updatedAt: now, reviews: activeEntry?.reviews ?? [] };
  }
  function saveDraft() {
    if (!draft.question.trim()) { toast.error(t("先写下一个具体的问题。", "Write a specific question first.")); return; }
    const entry = currentEntry();
    const next = activeEntry ? entries.map(e => e.id === entry.id ? entry : e) : [entry, ...entries];
    if (persist(next)) { setActiveId(entry.id); setDirty(false); toast.success(t("手记已保存在本设备。", "Entry saved on this device.")); }
  }
  function openEntry(entry: JournalEntry) {
    protectDraft(() => { setDraft({ question: entry.question, facts: entry.facts, understanding: entry.understanding, unknown: entry.unknown, action: entry.action }); setSnapshot(entry.snapshot ?? null); setActiveId(entry.id); setExampleId(entry.exampleId); setChanged(entry.changed); setDirty(false); setReview(""); navigate("journal"); });
  }
  function exportEntry(entry: JournalEntry) {
    const url = URL.createObjectURL(new Blob([entryMarkdown(entry)], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `guanxiang-${entry.createdAt.slice(0, 10)}.md`; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success(t("已导出 Markdown 手记。", "Markdown entry exported."));
  }
  function addReview() {
    if (!activeEntry || !review.trim() || dirty) return;
    const now = new Date().toISOString();
    const updated = { ...activeEntry, updatedAt: now, reviews: [...activeEntry.reviews, { at: now, text: review.trim() }] };
    if (persist(entries.map(e => e.id === activeId ? updated : e))) { setReview(""); toast.success(t("已追加回看，原记录保留。", "Reflection appended; the original record is preserved.")); }
  }
  function changeDraft(key: keyof Draft, value: string) { setDraft(d => ({ ...d, [key]: value })); setDirty(true); }

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1); if (hash === "main-content") return;
      const requested = hash.split("/")[0] as View; const next = VIEWS.includes(requested) ? requested : "home";
      if (viewRef.current === "journal" && next !== "journal" && dirtyRef.current) {
        window.history.replaceState(null, "", "#journal");
        setDiscard(() => () => { dirtyRef.current = false; setDirty(false); setReview(""); navigate(next, hash); }); return;
      }
      viewRef.current = next; setView(next);
    };
    syncHash(); window.addEventListener("hashchange", syncHash);
    let savedLang: string | null = null;
    try { const raw = localStorage.getItem(STORAGE_KEY); try { setEntries(parseEntries(raw)); } catch { setStorageCorrupt(true); setStorageError(true); } savedLang = localStorage.getItem("guanxiang.language"); }
    catch { setStorageError(true); }
    // Explicit ?lang= link > saved choice > browser language (non-Chinese browsers start in English).
    const requestedLang = new URLSearchParams(window.location.search).get("lang");
    const initialLang = requestedLang === "en" || requestedLang === "zh" ? requestedLang : savedLang === "en" || savedLang === "zh" ? savedLang : (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase().startsWith("zh") ? "zh" : "en";
    if (initialLang === "en") setLang("en");
    setReady(true);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  useEffect(() => { document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en"; if (ready) { try { localStorage.setItem("guanxiang.language", lang); } catch {} } }, [lang, ready]);
  useEffect(() => { stateRef.current = { exampleId, changed }; }, [exampleId, changed]);
  useEffect(() => { viewRef.current = view; }, [view]);
  useEffect(() => { dirtyRef.current = dirty || Boolean(review.trim()); }, [dirty, review]);
  useEffect(() => {
    if (view !== "home") return;
    const update = () => { let signId: ZodiacId = "aries"; try { const saved = localStorage.getItem(ZODIAC_PREFERENCE_KEY); if (isZodiacId(saved)) signId = saved; } catch {} setHomeDaily({ dateKey: localDateKey(), signId }); };
    update(); const timer = window.setInterval(update, 60000); window.addEventListener("focus", update); document.addEventListener("visibilitychange", update);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", update); document.removeEventListener("visibilitychange", update); };
  }, [view]);
  useEffect(() => { const handler = (event: BeforeUnloadEvent) => { if (dirty || review.trim()) { event.preventDefault(); event.returnValue = ""; } }; window.addEventListener("beforeunload", handler); return () => window.removeEventListener("beforeunload", handler); }, [dirty, review]);
  useEffect(() => {
    type Tool = { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown };
    const context = (document as Document & { modelContext?: { registerTool: (tool: Tool, options: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Tool) => { try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {} };
    register({ name: "get_learning_result", title: "Read current learning pattern", description: "Read the selected fixed I Ching learning example, including its six lines. Does not read private journal entries.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute(input) { if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).length) throw new Error("Expected an empty object"); return getLearningResult(stateRef.current.exampleId, stateRef.current.changed); } });
    register({ name: "configure_learning_example", title: "Configure a fixed learning example", description: "Select one of three fixed learning examples and show its original or changed pattern in the explorer. Does not generate a personal prediction or save a journal entry.", inputSchema: { type: "object", properties: { exampleId: { type: "string", enum: ["plum", "heaven", "earth"] }, changed: { type: "boolean" } }, required: ["exampleId"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid input"); const data = input as { exampleId?: ExampleId; changed?: boolean }; if (Object.keys(data).some(k => !["exampleId", "changed"].includes(k)) || !EXAMPLES.some(e => e.id === data.exampleId) || (data.changed !== undefined && typeof data.changed !== "boolean")) throw new Error("Invalid learning configuration"); const id = data.exampleId!; const next = data.changed ?? false; flushSync(() => { setExampleId(id); setChanged(next); setMode("lines"); setStep(0); setView("explore"); }); stateRef.current = { exampleId: id, changed: next }; window.location.hash = "explore"; return getLearningResult(id, next); } });
    return () => lifecycle.abort();
  }, []);

  return <div className={`site-shell cosmic-theme minimal-ui ${lang === "en" ? "english" : ""}`}>
    <a className="skip-link" href="#main-content">{t("跳到正文", "Skip to content")}</a>
    <header className="site-header">
      <a className="brand" href="#home" aria-label={t("观象首页", "Guanxiang home")}><span className="brand-word"><strong>观象</strong><span>GUANXIANG</span></span></a>
      <nav aria-label={t("主要导航", "Main navigation")}>{NAV.map(item => <a key={item.id} href={`#${item.id}`} onClick={e => { e.preventDefault(); protectDraft(() => navigate(item.id)); }} className={view === item.id || (item.id === "explore" && view === "reading") ? "active" : ""} aria-current={view === item.id || (item.id === "explore" && view === "reading") ? "page" : undefined}>{item.label[li]}</a>)}</nav>
      <Button variant="ghost" className="language-button" onClick={() => setLang(lang === "zh" ? "en" : "zh")} aria-label={t("切换到英文", "Switch to Chinese")}><Globe2 size={17} />{t("EN", "中文")}</Button>
    </header>

    <main id="main-content" className="site-main" data-view={view}>
      {view === "home" && <>
        <section className="home-hub-intro" aria-labelledby="home-title"><h1 id="home-title">{t("今天，想探索什么？", "Choose your path.")}</h1><p>{t("从卦象、星座或人格偏好开始，留一点时间认识自己。", "Explore patterns, your zodiac sign, or personality preferences.")}</p></section>
        <div className="home-portals">
          <section className="home-portal home-portal-iching" aria-labelledby="home-iching-title"><h2 id="home-iching-title">{t("卦象", "I Ching")}</h2><p className="home-portal-description">{t("浏览六十四卦原文，亲手改变六爻看变化。", "Read all 64 patterns and change their six lines.")}</p><span className="home-portal-meta">{t("64 卦原典 · 互动结构", "64 classical patterns · Interactive study")}</span><Link className="home-portal-cast" href={`/${lang}/reading`}>{t("起一卦", "Cast a reading")}<span className="cast-extra"> · {t("三枚铜钱", "three coins")}</span></Link><Button variant="outline" onClick={() => openLibrary()}><span className="portal-button-full">{t("探索卦象", "Explore patterns")}</span><span className="portal-button-compact">{t("探索", "Open")}</span></Button></section>
          <section className="home-portal home-portal-zodiac" aria-labelledby="home-zodiac-title"><h2 id="home-zodiac-title">{t("星座", "Zodiac")}</h2><p className="home-portal-description">{t("选择你的星座，读一份今天的原创娱乐提示。", "Choose your sign for an original daily entertainment reading.")}</p><span className="home-portal-meta">{t("十二星座 · 每日阅读", "Twelve signs · Daily readings")}</span><Button variant="outline" onClick={() => navigate("horoscope")}><span className="portal-button-full">{t("查看星座", "Read your horoscope")}</span><span className="portal-button-compact">{t("阅读", "Read")}</span></Button></section>
          <section className="home-portal home-portal-mbti" aria-labelledby="home-mbti-title"><h2 id="home-mbti-title">MBTI</h2><p className="home-portal-description">{t("用日常选择观察偏好，探索十六种类型。", "Notice your everyday preferences and explore sixteen types.")}</p><span className="home-portal-meta">{t("24 题原创自测 · 非官方", "24 original questions · Unofficial")}</span><Button variant="outline" onClick={() => navigate("mbti")}><span className="portal-button-full">{t("探索 MBTI", "Explore MBTI")}</span><span className="portal-button-compact">{t("自测", "Test")}</span></Button></section>
        </div>
        <section className="home-daily-section" aria-labelledby="daily-heading"><div className="section-heading"><div><p className="eyebrow">A LITTLE INSPIRATION</p><h2 id="daily-heading">{t("今日灵感", "Today's inspiration")}</h2></div>{homeDaily && <time dateTime={homeDaily.dateKey}>{date(`${homeDaily.dateKey}T12:00:00`)}</time>}</div><div className="home-daily-grid"><button onClick={() => openLibrary(`hexagram/${dailyPattern.number}`)}><span className="topic-chip chip-iching">{t("今日读象", "A pattern to read")}</span><div><MiniHexagram lines={dailyPattern.lines} /><h3>{dailyPattern.name}<small>{HEXAGRAM_NOTES[dailyPattern.number - 1].title}</small></h3></div><p>{HEXAGRAM_NOTES[dailyPattern.number - 1].prompt[li]}</p><span>{t("按本地日期轮换的卦典条目", "A library entry rotated by local date")}</span></button><button onClick={() => navigate("horoscope")}><span className="topic-chip chip-zodiac">{t("星座提示", "Zodiac prompt")}</span><h3>{dailySign ? dailySign.name[li] : t("今日阅读", "A daily reading")}</h3><p>{dailyHoroscope ? dailyHoroscope.action[li] : t("选择一个星座，看看今天的小提醒。", "Choose a sign for a small reminder.")}</p><span>{t("原创娱乐阅读", "Original entertainment reading")}</span></button><button onClick={() => openLibrary(`learn/${dailyPersonality.id}`)}><span className="topic-chip chip-mbti">{t("人格观察", "Preference observation")}</span><h3>{dailyPersonality.title[li]}</h3><p>{dailyPersonality.exercise[li]}</p><span>{t("一个日常情境练习", "An everyday exercise")}</span></button></div></section>
        <section className="home-hub-question" aria-labelledby="home-question-title"><div><p className="eyebrow">A MOMENT TO REFLECT</p><h2 id="home-question-title">{t("给自己，留一个问题。", "Keep a question for yourself.")}</h2><p>{t("把想到的、尚未确定的，留给下一次回看。", "Keep your thoughts and uncertainties for a later reflection.")}</p></div><div className="question-start"><Label htmlFor="home-question">{t("此刻，你在想什么？", "What is on your mind?")}<span>{t("选填", "OPTIONAL")}</span></Label><Textarea id="home-question" placeholder={t("例如：面对一个变化，我想先理清哪些事实？", "For example: What facts should I clarify before making a change?")} value={question} onChange={e => setQuestion(e.target.value)} maxLength={500} rows={3} /><div className="question-bottom"><span>{t("不用急着得到答案。", "No need to rush an answer.")}</span><Button variant="outline" onClick={beginJournal}><Bookmark size={17} />{t("留进手记", "Keep a journal entry")}</Button></div></div></section>
        <section className="learning-section"><div className="section-heading"><div><p className="eyebrow">EXPLORE THE LIBRARY</p><h2>{t("探索知识", "Explore the library")}</h2></div><Button variant="ghost" onClick={() => openLibrary()}><BookOpen size={17} />{t("进入星图书阁", "Open the library")}</Button></div><div className="learning-grid">{TOPICS.map((topic, i) => <button className="learning-card" key={topic.id} onClick={() => openLibrary(`learn/${topic.id}`)}><span className="learning-card-top"><span>0{i + 1}</span><BookOpen size={21} /></span><h3>{topic.label[li]} · {t("入门四步", "Four steps")}</h3><p>{topic.description[li]}</p><span className="read-link">{t("阅读与练习", "Read and practice")}</span></button>)}</div></section>
        <section className="home-recent-section"><div className="section-heading"><div><p className="eyebrow">RETURN TO YOUR NOTES</p><h2>{t("最近记录", "Recent records")}</h2></div><Button variant="ghost" onClick={() => navigate("journal")}>{t("查看全部", "View all")}</Button></div>{entries.length ? <div className="home-recent-grid">{entries.slice(0, 3).map(entry => <button className="home-recent-card" key={entry.id} onClick={() => openEntry(entry)}><span>{RESULT_KINDS.find(k => k.id === entryKind(entry))!.label[li]}<time dateTime={entry.createdAt}>{date(entry.createdAt)}</time></span><h3>{entry.question}</h3><p>{entryCaption(entry, lang)}</p><small>{t(`${entry.reviews.length} 次回看`, `${entry.reviews.length} reviews`)}</small></button>)}</div> : <div className="home-recent-empty"><Bookmark size={22} /><p>{t("从任一结果页留进手记，或写下自己的第一个问题。", "Keep a result from any module or write your first question.")}</p><Button variant="outline" onClick={beginJournal}>{t("写第一篇手记", "Write your first entry")}</Button></div>}</section>
      </>}

      {view === "explore" && <>
        <div className="page-heading"><div><p className="eyebrow">01 — EXPLORE THE PATTERN</p><h1>{t("卦象探索", "Pattern explorer")}</h1><p>{t("选择示例，点击初爻观察本卦与变卦。", "Choose an example and toggle its bottom line to compare patterns.")}</p></div><div className="module-heading-actions"><Button variant="outline" onClick={() => openLibrary()}><BookOpen />{t("六十四卦图鉴", "64-pattern library")}</Button><Button variant="ghost" onClick={() => setModal(0)}><CircleHelp />{t("怎么看", "How to read")}</Button></div></div>
        <div className="explorer-layout"><aside className="explore-controls"><Tabs value={mode} onValueChange={value => { setMode(value); if (value === "plum") selectExample("plum"); }}><TabsList className="explore-tabs"><TabsTrigger value="lines">{t("认识卦象", "Explore lines")}</TabsTrigger><TabsTrigger value="plum">{t("观梅复算", "Replay calculation")}</TabsTrigger></TabsList></Tabs>
          {mode === "lines" ? <><p className="control-label">{t("选择一个学习示例", "CHOOSE A LEARNING EXAMPLE")}</p><div className="example-list">{EXAMPLES.map(item => <button key={item.id} className={`example-option ${exampleId === item.id ? "selected" : ""}`} onClick={() => selectExample(item.id)} aria-pressed={exampleId === item.id}><span className="option-character">{item.from.name}</span><span><strong>{item.title[li]}</strong><small>{item.category[li]}</small></span><span className="option-check">{exampleId === item.id && <Check size={15} />}</span></button>)}</div><div className="quiet-note"><Layers3 size={18} /><p>{t("阳爻是一条完整的线，阴爻分为两段。最下方是初爻，三个爻组成一个经卦。", "A solid line is yang; a broken line is yin. The first line is at the bottom. Three lines form a trigram.")}</p></div><p className="fine-print">{t("固定文化学习示例，不随问题变化。", "Fixed cultural examples, independent of your question.")}</p></> : <><p className="control-label">{t("原书中的固定条件", "FIXED INPUTS FROM THE SOURCE")}</p><div className="fixed-inputs">{[[t("辰年数", "Chen year"), String(calculation.input.yearBranch)], [t("农历月", "Lunar month"), String(calculation.input.lunarMonth)], [t("农历日", "Lunar day"), String(calculation.input.lunarDay)], [t("申时数", "Shen hour"), String(calculation.input.hourBranch)]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><ol className="calculation-steps">{[t(`上卦：5 + 12 + 17 = ${calculation.upperTotal}；除以 8，余 ${calculation.upperRemainder}，对应兑。`, `Upper: 5 + 12 + 17 = ${calculation.upperTotal}. Remainder ${calculation.upperRemainder} on division by 8 gives Lake.`), t(`下卦：${calculation.upperTotal} + 9 = ${calculation.lowerTotal}；除以 8，余 ${calculation.lowerRemainder}，对应离。`, `Lower: ${calculation.upperTotal} + 9 = ${calculation.lowerTotal}. Remainder ${calculation.lowerRemainder} on division by 8 gives Fire.`), t(`动爻：${calculation.lowerTotal} 除以 6，余 ${calculation.movingLine}。初爻变，上兑下艮，成为咸。`, `Moving line: ${calculation.lowerTotal} mod 6 = ${calculation.movingLine}. The first line changes, giving Lake above Mountain: Xian.`)].map((text, i) => <li className={step > i ? "revealed" : ""} key={i}><span>{step > i ? <Check size={14} /> : i + 1}</span><p>{step > i ? text : t(["求上卦", "求下卦", "确定动爻"][i], ["Find the upper trigram", "Find the lower trigram", "Find the moving line"][i])}</p></li>)}</ol><div className="calculation-buttons"><Button onClick={() => { const next = step + 1; setStep(next); if (next === 3) setChanged(true); }} disabled={step >= 3}>{step >= 3 ? t("复算完成", "Replay complete") : t("查看下一步", "Reveal next step")}</Button><Button variant="ghost" onClick={() => { setStep(0); setChanged(false); }} aria-label={t("重置复算", "Reset calculation")}><RotateCcw /></Button></div><a className="source-link" href={example.source} target="_blank" rel="noreferrer">{t("查阅《梅花易数》原例", "Read the source example")}</a></>}
        </aside><section className="diagram-sheet" aria-live="polite"><div className="sheet-top"><span className="status-dot">{changed ? t("变卦", "CHANGED PATTERN") : t("本卦", "ORIGINAL PATTERN")}</span><span>{t("初爻变化示例", "FIRST-LINE EXAMPLE")}</span></div><div className="diagram-center"><div className="diagram-name"><span className="large-character">{symbol.name}</span><span className="diagram-english">{symbol.english}</span><span className="symbol-number">{t(`第 ${symbol.number} 卦`, `HEXAGRAM ${symbol.number}`)}</span></div><div className="diagram-lines"><div className="trigram-label"><span>{t("上卦", "UPPER")}</span>{symbol.upper} · {TRIGRAMS[symbol.upper][li]}</div><Hexagram lines={symbol.lines} interactive changed={changed} onFlip={flip} label={t("切换初爻的阴阳", "Toggle the bottom line")} /><div className="trigram-label"><span>{t("下卦", "LOWER")}</span>{symbol.lower} · {TRIGRAMS[symbol.lower][li]}</div></div></div><p className="diagram-hint"><span className="red-square" />{t("点一下最下方的线，观察初爻的变化。", "Tap the bottom line to observe the change.")}</p><div className="diagram-bottom"><div><span>{example.from.name}</span><span className="transition-line" /><span>{example.to.name}</span><small>{t("只变一爻", "ONE LINE CHANGES")}</small></div><Button onClick={() => navigate("reading")}>{t("阅读这一卦", "Reflect on this pattern")}<BookOpen /></Button></div></section></div>
      </>}

      {view === "reading" && <>
        <div className="page-heading"><div><p className="eyebrow">02 — READ & REFLECT</p><h1>{t("读象，也留一点余地。", "Read, with room to reflect.")}</h1><p>{t("先了解传统语境，再回到眼前具体的事情。", "Start with the traditional context, then return to the particulars of your question.")}</p></div><Button variant="outline" onClick={() => navigate("explore")}><RotateCcw />{t("回到卦象", "Back to pattern")}</Button></div>
        <div className="reading-layout"><aside className="reading-symbol"><span className="eyebrow">{t("当前学习示例", "CURRENT EXAMPLE")}</span><span className="large-character">{symbol.name}</span><p>{symbol.english}</p><Hexagram lines={symbol.lines} small changed={changed} label={t(`${symbol.name}卦六爻结构`, `${symbol.english}, six-line structure`)} /><div className="reading-pair">{example.from.name}<span>—</span>{example.to.name}</div><p className="reading-note">{t("此卦来自固定示例。你写下的问题不参与计算。", "This pattern comes from a fixed example. Your question is not used in the calculation.")}</p><Button variant="outline" onClick={() => setModal(3)}><BookOpen />{t("方法与出处", "Method & sources")}</Button></aside><div className="reading-content"><section className="reading-block"><div className="reading-section-label"><span>01</span><span>{t("传统主题", "TRADITIONAL CONTEXT")}</span></div><h2>{t("先看它说的是什么。", "First, understand its context.")}</h2><p className="theme-copy">{symbol.theme[li]}</p><div className="reading-original"><span>{t("卦辞原文", "ORIGINAL JUDGMENT")}</span><p lang="zh-Hant">{hexagramByNumber(symbol.number).judgment}</p><button className="source-link" onClick={() => openLibrary(`hexagram/${symbol.number}`)}>{t("查阅完整六爻与白话导读", "Read all six lines and the notes")}<BookOpen size={16} /></button></div><a className="source-link" href={example.source} target="_blank" rel="noreferrer"><BookOpen size={16} />{example.sourceTitle}</a><p className="fine-print">{t("上文为主题概述，非原文引句。", "The paragraph above is an editorial summary, not a quotation.")}</p></section><section className="reading-block reflection-block"><div className="reading-section-label"><span>02</span><span>{t("回到你的问题", "YOUR OWN REFLECTION")}</span></div><h2>{t("接下来，可以这样想。", "A few questions to sit with.")}</h2>{question.trim() && <blockquote className="your-question"><span>{t("你留的问题", "YOUR QUESTION")}</span><p>{question}</p></blockquote>}<ol className="reflection-prompts">{example.prompts[li].map((prompt, i) => <li key={prompt}><span>0{i + 1}</span><p>{prompt}</p></li>)}</ol><p className="fine-print">{t("这些问题由观象编辑，用于整理思路。", "These prompts were written by Guanxiang to support reflection.")}</p><Button className="journal-call" onClick={keepLearningResult}><Bookmark />{t("把思考留进手记", "Keep a journal entry")}</Button></section></div></div>
      </>}

      {view === "horoscope" && <Horoscope lang={lang} onKeep={keepResult} onLearn={id => openLibrary(`learn/${id}`)} />}
      {view === "mbti" && <Mbti lang={lang} onKeep={keepResult} onLearn={id => openLibrary(`learn/${id}`)} />}
      {view === "library" && <KnowledgeLibrary lang={lang} onKeep={keepResult} onGo={goToTopic} />}

      {view === "journal" && <>
        <div className="page-heading"><div><p className="eyebrow">03 — KEEP A RECORD</p><h1>{t("把此刻，留给以后。", "Leave a note for your future self.")}</h1><p>{t("记下事实、理解与下一步。后来再看，可以多一个角度。", "Record the facts, your interpretation, and a small next step. Return later with another perspective.")}</p></div><span className="device-badge"><ShieldCheck size={17} />{t("保存在本设备", "SAVED ON THIS DEVICE")}</span></div>
        {storageError && <div className="storage-alert" role="alert">{storageCorrupt ? t("已有手记数据无法读取，当前禁止覆盖保存。新写内容仍可导出。", "Existing data could not be read, so saving is blocked to protect it. You can still export a new draft.") : t("浏览器存储暂不可用，请导出手记留存。", "Browser storage is unavailable. Export your entry to keep a copy.")}</div>}
        <div className="journal-layout"><aside className="journal-sidebar"><div className="journal-sidebar-title"><span>{t("我的记录", "MY ENTRIES")}</span><span>{entries.length.toString().padStart(2, "0")}</span></div><div className="journal-category-filter"><Label htmlFor="journal-category">{t("记录分类", "Record category")}</Label><Select value={journalFilter} onValueChange={setJournalFilter}><SelectTrigger id="journal-category"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t("全部记录", "All records")}</SelectItem>{RESULT_KINDS.map(k => <SelectItem key={k.id} value={k.id}>{k.label[li]}</SelectItem>)}</SelectContent></Select></div><Button variant="outline" className="new-entry" onClick={() => protectDraft(() => { setDraft(EMPTY_DRAFT); setSnapshot(reflectionSnapshot()); setActiveId(null); setDirty(false); setReview(""); })}><Plus />{t("新建手记", "New entry")}</Button>{entries.length === 0 ? <div className="empty-journal"><FileText size={26} /><h3>{t("还没有手记", "Your first page awaits")}</h3><p>{t("写下右侧的第一个问题，记录会出现在这里。", "Write a question and save it. Your entries will appear here.")}</p></div> : <div className="journal-entry-list">{visibleEntries.map(entry => <button className={`journal-entry-item ${activeId === entry.id ? "selected" : ""}`} key={entry.id} onClick={() => openEntry(entry)}><time dateTime={entry.createdAt}>{date(entry.createdAt)}</time><strong>{entry.question}</strong><span>{entryCaption(entry, lang)}{entry.reviews.length > 0 ? t(` · ${entry.reviews.length} 次回看`, ` · ${entry.reviews.length} reflections`) : ""}</span></button>)}</div>}{entries.length > 0 && visibleEntries.length === 0 && <p className="journal-filter-empty" role="status">{t("这个分类暂时没有记录。", "No records in this category yet.")}</p>}<p className="sidebar-privacy">{t("本设备、当前浏览器保存。清理浏览器数据会移除记录；请定期导出。", "Stored in this browser on this device. Clearing browser data removes entries; export copies regularly.")}</p></aside>
        <section className="journal-paper"><div className="paper-heading"><span><span className="red-square" />{activeEntry ? t("一页手记", "A JOURNAL PAGE") : t("新的一页", "A NEW PAGE")}</span><span className="save-status">{dirty ? t("尚未保存", "UNSAVED") : activeEntry ? t("已保存", "SAVED") : t("草稿", "DRAFT")}</span></div>{currentSnapshot && <section className="journal-result-card" data-kind={currentSnapshot.kind} aria-label={t("当时保存的结果", "Captured result")}><div className="journal-result-top"><span className="topic-chip">{RESULT_KINDS.find(k => k.id === currentSnapshot.kind)!.label[li]}</span><time dateTime={currentSnapshot.capturedAt}>{new Date(currentSnapshot.capturedAt).toLocaleString(lang === "zh" ? "zh-CN" : "en-GB", { dateStyle: "medium", timeStyle: "short" })}</time></div><h3>{currentSnapshot.title[li]}</h3><p className="journal-result-method">{currentSnapshot.method[li]}</p><Collapsible key={`${activeId ?? "draft"}-${currentSnapshot.capturedAt}`}><CollapsibleTrigger asChild><Button variant="ghost"><BookOpen size={16} />{t("查看当时的完整内容", "View the captured content")}</Button></CollapsibleTrigger><CollapsibleContent><p className="journal-result-summary">{currentSnapshot.summary[li]}</p></CollapsibleContent></Collapsible>{currentSnapshot.dimensions && <div className="journal-snapshot-dimensions">{currentSnapshot.dimensions.map(d => <div key={d.axis}><strong>{d.axis[0]} / {d.axis[1]}</strong><span>{d.leftPoints} / {d.rightPoints} {t("分", "pts")}</span><small>{t(`${d.neutral} 题中间项`, `${d.neutral} middle answers`)}</small></div>)}</div>}{currentSnapshot.source && <a className="source-link" href={currentSnapshot.source} target="_blank" rel="noreferrer"><BookOpen size={16} />{t("参考出处", "Reference source")}</a>}{currentSnapshot.kind !== "reflection" && <p className="fine-print">{t("保留当时的内容与方法，之后的阅读或重测不会改写这一份结果。", "This keeps the original content and method. Later readings or exercises do not rewrite it.")}</p>}</section>}
          {!currentSnapshot && activeEntry && <div className="journal-legacy-note"><span>{t("原有学习记录", "LEGACY LEARNING RECORD")}</span><p>{entryCaption(activeEntry, lang)} · {t("原记录与回看均保留。", "The entry and reviews are preserved.")}</p></div>}
          {currentSnapshot?.kind === "mbti" && currentSnapshot.dimensions && previousMbti?.snapshot?.dimensions && <section className="journal-comparison"><h3>{t("对照上一份较早记录", "Compare with an earlier record")}</h3><p>{date(previousMbti.snapshot.capturedAt)} · {previousMbti.snapshot.pattern}</p><div className="comparison-table-wrap"><table><thead><tr><th scope="col">{t("偏好", "Pair")}</th><th scope="col">{t("上一份", "Earlier")}</th><th scope="col">{t("这一份", "Current")}</th><th scope="col">{t("分差变化", "Gap change")}</th></tr></thead><tbody>{currentSnapshot.dimensions.map((d, i) => { const before = previousMbti.snapshot!.dimensions![i]; const delta = d.leftPoints - d.rightPoints - (before.leftPoints - before.rightPoints); return <tr key={d.axis}><th scope="row">{d.axis[0]} / {d.axis[1]}</th><td>{before.leftPoints} / {before.rightPoints}</td><td>{d.leftPoints} / {d.rightPoints}</td><td>{delta > 0 ? "+" : ""}{delta}</td></tr>; })}</tbody></table></div><p className="fine-print">{t("每格按左／右列分数，变化以左分减右分计算。结合两次作答的背景来看，不作能力比较。", "Cells show left / right points; gap changes use left minus right. Compare the context of both exercises, not abilities.")}</p></section>}
          <div className="journal-question"><Label htmlFor="journal-question">{t("我的问题", "My question")}</Label><Input id="journal-question" value={draft.question} onChange={e => changeDraft("question", e.target.value)} placeholder={t("写得具体一点，从一件事开始。", "Make it specific. Start with one situation.")} maxLength={500} /></div><div className="journal-fields">{([["facts", t("已知事实", "Known facts"), t("已经发生、能够确认的事情。", "What has happened, and what can be confirmed.")], ["understanding", t("我的理解", "My interpretation"), t("我怎样理解它？哪些只是自己的想法？", "How do you understand it? What is your own interpretation?")], ["unknown", t("尚不确定", "Still unknown"), t("还缺少的信息、需要核实的地方。", "Missing information and things to check.")], ["action", t("下一小步", "One small action"), t("接下来可以做的一件具体小事。", "One specific, manageable thing you can do next.")]] as [keyof Draft, string, string][]).map(([key, label, placeholder], i) => <div className="journal-field" key={key}><Label htmlFor={`journal-${key}`}><span>0{i + 1}</span>{label}</Label><Textarea id={`journal-${key}`} value={draft[key]} onChange={e => changeDraft(key, e.target.value)} placeholder={placeholder} maxLength={5000} rows={5} /></div>)}</div><div className="journal-save-bar"><span className="attached-example">{t("关联记录", "RECORD")}<strong>{currentSnapshot ? RESULT_KINDS.find(k => k.id === currentSnapshot.kind)!.label[li] : example.category[li]}</strong></span><div><Button variant="outline" onClick={() => exportEntry(currentEntry())}><Download />{t("导出", "Export")}</Button><Button onClick={saveDraft} disabled={!ready || storageCorrupt}><Save />{t("保存手记", "Save entry")}</Button></div></div>
          {activeEntry && <section className="review-section"><div className="review-heading"><div><p className="eyebrow">RETURN TO THIS MOMENT</p><h2>{t("后来，再看一眼。", "Return with a new perspective.")}</h2></div><Button variant="ghost" className="delete-button" onClick={() => setDeleting(activeEntry.id)} aria-label={t("删除这篇手记", "Delete this entry")}><Trash2 size={17} /></Button></div><p className="fine-print">{t("追加的回看会带上时间，并保留当时的原记录。", "New reflections are timestamped and appended to the original entry.")}</p>{activeEntry.reviews.map((item, i) => <div className="review-item" key={`${item.at}-${i}`}><time dateTime={item.at}>{date(item.at)} · {new Date(item.at).toLocaleTimeString(lang === "zh" ? "zh-CN" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</time><p>{item.text}</p></div>)}<Label htmlFor="review-text" className="review-label">{t("这次回看，有什么不同？", "What looks different now?")}</Label><Textarea id="review-text" value={review} onChange={e => setReview(e.target.value)} placeholder={t("出现了什么新事实？上次的行动，结果如何？", "What new facts emerged? How did your last action turn out?")} maxLength={5000} rows={3} /><div className="review-actions">{dirty && <span>{t("请先保存上方修改，再追加回看。", "Save your edits above before appending a reflection.")}</span>}<Button variant="outline" disabled={!review.trim() || dirty || storageCorrupt} onClick={addReview}><Plus />{t("追加回看", "Append reflection")}</Button></div></section>}
        </section></div>
      </>}
    </main>

    <footer className="site-footer"><div><span className="footer-brand">观象</span><span>{t("观其象，留一问。", "See the pattern. Keep the question.")}</span></div><span className="footer-note">{t("文化学习 · 个人反思", "CULTURAL LEARNING · PERSONAL REFLECTION")}</span><nav className="footer-links" aria-label={t("六十四卦全表", "All 64 hexagrams")}><Link href="/zh/reading" hrefLang="zh-Hans" lang="zh-Hans">在线起卦</Link><Link href="/en/reading" hrefLang="en" lang="en">I Ching Reading (English)</Link><Link href="/zh/hexagram" hrefLang="zh-Hans" lang="zh-Hans">六十四卦全表</Link><Link href="/en/hexagram" hrefLang="en" lang="en">64 Hexagrams (English)</Link></nav><button onClick={() => setModal(3)}>{t("方法、出处与隐私", "Method, sources & privacy")}<CircleHelp size={15} /></button></footer>

    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className="knowledge-dialog"><DialogHeader><DialogTitle>{modal === 3 ? t("方法、出处与隐私", "Method, sources & privacy") : modal !== null ? LEARNING[modal].title[li] : ""}</DialogTitle><DialogDescription>{t("观象 · 易经文化学习笔记", "Guanxiang · Notes for exploring the I Ching")}</DialogDescription></DialogHeader><div className="knowledge-body">
      {modal === 0 && <><p>{t("一个卦由六爻组成，次序从下往上：初爻在底部，第六爻在顶部。完整的线是阳爻，分成两段的线是阴爻。", "A hexagram has six lines, read from bottom to top. The first line is at the bottom; the sixth is at the top. A solid line is yang, and a broken line is yin.")}</p><p>{t("下方三爻组成下卦，上方三爻组成上卦。革卦上兑下离，因此你会看到上部对应泽，下部对应火。", "The lower three lines form the lower trigram; the upper three form the upper trigram. Ge has Lake above Fire.")}</p><p>{t("探索页只提供三组已核对的结构示例，可以反复比较，不需要输入个人资料。", "The explorer offers three checked structural examples to compare. No personal details are needed.")}</p><a className="source-link" href="https://zh.wikisource.org/wiki/周易/繫辭上" target="_blank" rel="noreferrer">{t("参考：《周易·系辞上》", "Reference: I Ching, Xici I")}</a></>}
      {modal === 1 && <><p>{t("这里的动爻固定为初爻。点击最下方的一条线，阳爻变为阴爻，或阴爻变为阳爻；其余五爻保持原样。", "In these examples, the first line is the moving line. Tapping the bottom line swaps solid and broken while preserving the other five lines.")}</p><p>{t("三个示例分别是革变咸、乾变姤、坤变复。它们帮助观察结构，不根据你写下的问题选择结果。", "The examples are Ge to Xian, Qian to Gou, and Kun to Fu. They show structural changes; your question does not select a result.")}</p><p>{t("观梅复算使用原例的数字：辰年 5、农历十二月、十七日、申时 9。上卦与下卦分别除以 8 取余，动爻除以 6 取余。余数为零时，传统规则按 8 或 6 处理。", "The plum example uses Chen year 5, lunar month 12, day 17, and Shen hour 9. Trigrams use remainders on division by 8; the moving line uses division by 6. In the traditional rule, a zero remainder is treated as 8 or 6.")}</p><a className="source-link" href={EXAMPLES[0].source} target="_blank" rel="noreferrer">{t("参考：《梅花易数》卷一", "Reference: Mei Hua Yi Shu, volume I")}</a></>}
      {modal === 2 && <><p>{t("原文是可查阅的历史材料。传统解释包含特定时代的观念与不同学派的理解。观象提供的是简短主题概述，不把它当作已经验证的现实结论。", "The source text is a historical document. Traditional interpretation reflects its era and different schools of thought. Guanxiang presents brief themes as context.")}</p><p>{t("阅读页的思考问题由观象编辑。手记中的“已知事实”和“我的理解”分开填写，让具体事实与个人判断各有位置。", "Reflection prompts are written by Guanxiang. The journal separates known facts from your interpretation so each has a clear place.")}</p><p>{t("先核实事实，再决定行动；也可以把尚未确定的地方留在手记里，日后再看。", "Check the facts before deciding on an action, and leave room in your journal for what remains unknown.")}</p></>}
      {modal === 3 && <><h3>{t("这版怎样工作", "How this edition works")}</h3><p>{t("卦象探索保留三组固定学习示例；星图书阁提供完整六十四卦及任意爻位的手动结构练习。卦辞、六爻原文、版本出处与原创导读分开呈现。输入的问题不参与结构计算。", "The explorer keeps three fixed examples. The library adds all 64 hexagrams and manual changes at every position, with classical texts, revision links, and separate original notes. Questions do not determine the pattern.")}</p><h3>{t("可查阅的出处", "Sources you can inspect")}</h3>{EXAMPLES.map(e => <a key={e.id} className="source-link block-link" href={e.source} target="_blank" rel="noreferrer">{e.sourceTitle} · {e.category[li]}</a>)}<p>{t("传统主题由观象概述；英文与思考问题为编辑文字。", "Traditional themes are summarized by Guanxiang; English wording and reflection prompts are editorial text.")}</p><h3>{t("星座运势", "Daily horoscopes")}</h3><p>{t("十二星座的运势与每日提示为观象原创娱乐内容，按星座和本地日期轮换，未使用实时天象或出生星盘推算。日期参考与详细说明可在星座页面查看。", "Horoscopes and daily prompts are original Guanxiang entertainment copy, rotated by sign and local date. They use no live planetary calculation or birth chart. Date references and reading notes are available on the horoscope page.")}</p><h3>{t("MBTI 偏好探索", "MBTI preference exploration")}</h3><p>{t("24 道情境题与类型建议为观象原创，参考四组偏好框架，不是官方 MBTI 量表。自测答案与进度只保存在当前浏览器；方法、计分与官方参考链接可在 MBTI 页面查看。", "The 24 questions and type prompts are original to Guanxiang and reference the four preference pairs. This is not the official MBTI instrument. Answers and progress stay in this browser. Method, scoring, and official references are available on the MBTI page.")}</p><h3>{t("手记放在哪里", "Where your journal lives")}</h3><p>{t("三个模块都可以把当时的结果、日期与方法留进手记，再补充个人背景与回看。已有手记继续保留。问题与记录仍仅在当前页面及本设备的浏览器存储中处理，不发送到服务器。导出会下载一份 Markdown 文件。删除单篇记录会移除对应的本地内容；你已导出的文件需要自行管理。", "All three modules can keep their result, date, and method in the journal, with room for context and later reviews. Existing entries are preserved. Questions and records remain in this device’s browser and are not sent to a server. Export downloads a Markdown file. Deleting an entry removes its local record; exported files remain yours to manage.")}</p><p>{t("切换设备或浏览器不会自动同步。清除浏览器数据可能移除手记。", "Entries do not sync between devices or browsers. Clearing browser data may remove them.")}</p></>}
    </div></DialogContent></Dialog>

    <AlertDialog open={deleting !== null} onOpenChange={open => { if (!open) setDeleting(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{t("删除这篇手记？", "Delete this entry?")}</AlertDialogTitle><AlertDialogDescription>{t("这篇手记与它的回看记录会从本设备移除。如需留存，可先取消并导出。", "This entry and its follow-up reflections will be removed from this device. Cancel and export first if you would like a copy.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{t("保留手记", "Keep entry")}</AlertDialogCancel><AlertDialogAction className="confirm-delete" onClick={() => { if (persist(entries.filter(e => e.id !== deleting))) { if (activeId === deleting) { setActiveId(null); setDraft(EMPTY_DRAFT); setSnapshot(reflectionSnapshot()); setDirty(false); setReview(""); } toast.success(t("手记已删除。", "Entry deleted.")); } setDeleting(null); }}>{t("删除", "Delete")}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    <AlertDialog open={discard !== null} onOpenChange={open => { if (!open) setDiscard(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{t("这页还有未保存的内容", "This page has unsaved edits")}</AlertDialogTitle><AlertDialogDescription>{t("继续会放下这些修改。也可以先取消，保存或导出当前内容。", "Continuing will discard these edits. You can cancel to save or export them first.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{t("返回保存", "Go back")}</AlertDialogCancel><AlertDialogAction onClick={() => { const action = discard; setDiscard(null); action?.(); }}>{t("继续", "Continue")}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    <Toaster theme="dark" position="bottom-right" />
  </div>;
}
