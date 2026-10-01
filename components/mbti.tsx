"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Bookmark, BookOpen, Check, CircleHelp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AXES, MBTI_STORAGE_KEY, QUESTIONS, TYPES, WORK_PROMPTS, RELATIONSHIP_PROMPTS, emptySession, parseSession, scoreAnswers, type Answer, type MbtiSession, type TypeCode } from "@/lib/mbti";
import type { Language } from "@/lib/iching";
import type { KeepResult } from "@/lib/results";
type MbtiProps = { lang: Language; onKeep: KeepResult; onLearn: (id: string) => void };

const CHOICES = [
  { value: 2, label: ["很像 A", "Strongly A"] },
  { value: 1, label: ["偏向 A", "Lean A"] },
  { value: 0, label: ["都相近", "Both / neither"] },
  { value: -1, label: ["偏向 B", "Lean B"] },
  { value: -2, label: ["很像 B", "Strongly B"] },
];

const subscribeToMount = () => () => {};
const clientMounted = () => true;
const serverMounted = () => false;
type StorageStatus = "ok" | "unavailable" | "corrupt";
function readBrowserSession(): { session: MbtiSession; storage: StorageStatus } {
  let raw: string | null;
  try { raw = localStorage.getItem(MBTI_STORAGE_KEY); }
  catch { return { session: emptySession(), storage: "unavailable" }; }
  try { return { session: parseSession(raw), storage: "ok" }; }
  catch { return { session: emptySession(), storage: "corrupt" }; }
}

export function Mbti({ lang, onKeep, onLearn }: MbtiProps) {
  const mounted = useSyncExternalStore(subscribeToMount, clientMounted, serverMounted);
  return mounted ? <MbtiExperience lang={lang} onKeep={onKeep} onLearn={onLearn} /> : <p className="mbti-loading">{lang === "zh" ? "正在读取本地进度……" : "Loading your local progress…"}</p>;
}

function MbtiExperience({ lang, onKeep, onLearn }: MbtiProps) {
  const [initial] = useState(readBrowserSession);
  const [session, setSessionState] = useState<MbtiSession>(initial.session);
  const [storage, setStorage] = useState<StorageStatus>(initial.storage);
  const [tab, setTab] = useState("quiz");
  const [method, setMethod] = useState(false);
  const [reset, setReset] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const li = lang === "zh" ? 0 : 1;
  const t = (zh: string, en: string) => lang === "zh" ? zh : en;
  const answered = Object.keys(session.answers).length;
  const pageQuestions = QUESTIONS.slice(session.step * 4, session.step * 4 + 4);
  const pageComplete = pageQuestions.every(q => session.answers[q.id] !== undefined);
  const result = session.finished ? scoreAnswers(session.answers) : null;
  const profile = TYPES.find(type => type.code === session.selectedType)!;

  function setSession(change: MbtiSession | ((current: MbtiSession) => MbtiSession)) {
    const next = typeof change === "function" ? change(session) : change;
    if (storage === "ok") {
      try { localStorage.setItem(MBTI_STORAGE_KEY, JSON.stringify(next)); }
      catch { setStorage("unavailable"); }
    }
    setSessionState(next);
  }

  function focusQuestion() { requestAnimationFrame(() => heading.current?.focus()); }
  function stepTo(step: number) { setSession(s => ({ ...s, step })); focusQuestion(); }
  function viewType(code: TypeCode) { setSession(s => ({ ...s, selectedType: code })); setTab("types"); }
  function clearSession() {
    try { localStorage.removeItem(MBTI_STORAGE_KEY); setStorage("ok"); }
    catch { setStorage("unavailable"); }
    setSessionState(emptySession()); setReset(false); setTab("quiz");
  }
  function finish() {
    if (answered !== QUESTIONS.length) return;
    const scored = scoreAnswers(session.answers);
    setSession(s => ({ ...s, finished: true, selectedType: scored.candidates.length === 1 ? scored.candidates[0] : s.selectedType }));
    focusQuestion();
  }

  return <>
    <div className="page-heading mbti-heading">
      <div><p className="eyebrow">MBTI — A PREFERENCE EXPLORATION</p><h1>{t("MBTI 偏好探索", "MBTI preferences")}</h1><p>{t("用日常选择认识自己，也给不同的自己留一点空间。", "Explore everyday choices, with room for how you change across situations.")}</p><span className="mbti-edition">{t("原创偏好自测 · 非官方 MBTI 量表", "Original preference exercise · Not the official MBTI assessment")}</span></div>
      <Button variant="outline" onClick={() => setMethod(true)}><CircleHelp />{t("方法与出处", "Method & sources")}</Button>
    </div>
    <div className="module-knowledge-links"><BookOpen size={18} /><span>{t("先理解偏好，再认识自己。", "Understand the pairs and explore yourself.")}</span><Button variant="ghost" onClick={() => onLearn("mbti-pairs")}>{t("四组偏好", "The four pairs")}</Button><Button variant="ghost" onClick={() => onLearn("mbti-score")}>{t("分数怎么读", "Reading the scores")}</Button></div>
    <div className="mbti-toolbar"><Tabs value={tab} onValueChange={setTab}><TabsList className="mbti-tabs"><TabsTrigger value="quiz">{t("偏好自测", "Preference exercise")}</TabsTrigger><TabsTrigger value="types">{t("16 型图鉴", "16-type library")}</TabsTrigger></TabsList></Tabs><span>{t("四组偏好，没有高低之分。", "Four preference pairs, with no ranking.")}</span></div>
    <>
      {(storage === "unavailable" || storage === "corrupt") && <div className="mbti-storage-notice" role="status"><p>{storage === "corrupt" ? t("已有自测进度无法读取，暂不覆盖。你可以继续体验，或清除这份自测进度后重新保存。", "Your saved exercise cannot be read and will not be overwritten. You can continue here, or clear this exercise to save again.") : t("当前浏览器无法保存进度；离开页面后，这次答案可能丢失。", "This browser cannot save progress. Your answers may be lost when you leave this page.")}</p>{storage === "corrupt" && <Button variant="outline" onClick={() => setReset(true)}>{t("清除自测进度", "Clear exercise")}</Button>}</div>}

      {tab === "quiz" && <section className="mbti-exercise" aria-label={t("原创偏好自测", "Original preference exercise")}>
        <div className="mbti-exercise-top"><div><span className="eyebrow">{result ? "YOUR PREFERENCE SNAPSHOT" : "24 EVERYDAY CHOICES"}</span><h2 ref={heading} tabIndex={-1}>{result ? t("这次回答，留下的线索。", "A snapshot of your answers.") : t("按平时的自己来选。", "Choose what is usually like you.")}</h2><p>{result ? t("分数描述本次答案的倾向，不能衡量能力或定义你。", "Scores describe this set of answers, not your abilities or a fixed identity.") : t("想想最近几个月的日常状态，两边都像或都不像时，可以选中间项。", "Think about your usual life over the past few months. Choose the middle option if both or neither fit.")}</p></div>{answered > 0 && <Button variant="ghost" className="mbti-reset" onClick={() => setReset(true)}><RotateCcw />{t("重新开始", "Start again")}</Button>}</div>

        {!result ? <>
          <div className="mbti-progress"><div><span>{t(`第 ${session.step + 1} / 6 组`, `Page ${session.step + 1} of 6`)}</span><span>{t(`已答 ${answered} / 24 题`, `${answered} of 24 answered`)}</span></div><Progress value={answered / QUESTIONS.length * 100} aria-label={t("答题进度", "Answer progress")} /><p>{storage === "ok" ? t("进度自动保存在当前浏览器，可以随时回来。", "Progress saves in this browser, so you can return later.") : t("本次答案仅在当前页面保留。", "These answers are available only in this page session.")}</p></div>
          <div className="mbti-question-grid">{pageQuestions.map((q, i) => <section className="mbti-question" key={q.id} aria-labelledby={`${q.id}-title`}><div className="mbti-question-number"><span>{String(session.step * 4 + i + 1).padStart(2, "0")}</span><span>{t("日常情境", "EVERYDAY CHOICE")}</span>{session.answers[q.id] !== undefined && <Check size={16} aria-label={t("已回答", "Answered")} />}</div><h3 id={`${q.id}-title`}>{q.context[li]}</h3><div className="mbti-scenarios" id={`${q.id}-scenarios`}><p><span>A</span>{q.a[li]}</p><p><span>B</span>{q.b[li]}</p></div><RadioGroup value={session.answers[q.id]?.toString() ?? ""} onValueChange={value => setSession(s => ({ ...s, answers: { ...s.answers, [q.id]: Number(value) as Answer } }))} className="mbti-answer-scale" aria-labelledby={`${q.id}-title`} aria-describedby={`${q.id}-scenarios`}>{CHOICES.map(choice => <label className="mbti-answer" key={choice.value} htmlFor={`${q.id}-${choice.value}`} data-selected={session.answers[q.id] === choice.value}><RadioGroupItem id={`${q.id}-${choice.value}`} value={String(choice.value)} /><span>{choice.label[li]}</span></label>)}</RadioGroup></section>)}</div>
          <div className="mbti-page-actions"><Button variant="outline" disabled={session.step === 0} onClick={() => stepTo(session.step - 1)}>{t("上一组", "Previous")}</Button><span role="status">{!pageComplete ? t("完成本组 4 题后继续。", "Answer all four choices to continue.") : t("没有标准答案，按自己的感受就好。", "There are no right answers. Choose what fits you.")}</span>{session.step < 5 ? <Button disabled={!pageComplete} onClick={() => stepTo(session.step + 1)}>{t("下一组", "Next")}</Button> : <Button disabled={!pageComplete || answered !== 24} onClick={finish}>{t("查看偏好结果", "View results")}</Button>}</div>
        </> : <div className="mbti-results">
          <div className="mbti-result-identity"><span className="mbti-result-code">{result.pattern}</span><div><h3>{result.candidates.length === 1 ? TYPES.find(p => p.code === result.pattern)!.name[li] : t("有些偏好，暂时不分明。", "Some preferences remain open.")}</h3><p>{result.pattern.includes("X") ? t("X 表示两边同分，保留这个维度的两种可能。", "X marks a tied pair; both possibilities stay open.") : t("这是一条自我观察的起点，可以回到具体情境核对。", "Use this as a starting point and compare it with concrete situations.")}</p></div></div>
          <div className="mbti-dimensions">{result.dimensions.map((d, i) => <section className="mbti-dimension" key={d.axis}><div className="mbti-dimension-heading"><h4>{AXES[i].title[li]}</h4><span>{d.letter === "X" ? t("同分 · 保留两边", "Tied · Both remain open") : d.close ? t("差距较小", "Small difference") : t(`本次偏向 ${d.letter}`, `Leans ${d.letter} this time`)}</span></div><div className="mbti-score-labels"><span><strong>{d.axis[0]}</strong>{AXES[i].left[li]}<b>{t(`${d.leftPoints} 分`, `${d.leftPoints} pts`)}</b></span><span><strong>{d.axis[1]}</strong>{AXES[i].right[li]}<b>{t(`${d.rightPoints} 分`, `${d.rightPoints} pts`)}</b></span></div><div className="mbti-score-track" aria-hidden="true"><i style={{ width: `${d.leftPoints / 12 * 100}%` }} /><i style={{ width: `${d.rightPoints / 12 * 100}%` }} /></div><p>{AXES[i].prompt[li]}{d.neutral > 0 && <span> · {t(`${d.neutral} 题选择中间项`, `${d.neutral} middle ${d.neutral === 1 ? "answer" : "answers"}`)}</span>}</p></section>)}</div>
          <p className="mbti-score-note">{t("每组 6 题；很像计 2 分、偏向计 1 分、中间项计 0 分。分差不超过 2 分标为“差距较小”。这里的分数不是概率或测评准确率。", "Six questions per pair: strong choices score 2, leaning choices 1, middle choices 0. A gap of 1–2 points is marked small. Points are not probabilities or a measure of assessment accuracy.")}</p>
          <div className="mbti-candidates"><div><h3>{result.candidates.length === 1 ? t("去图鉴继续认识这个类型", "Explore this type in the library") : t("可以继续对照这些类型", "Compare these possibilities")}</h3><p>{t("类型卡中的称呼与建议为观象原创。", "Card names and prompts are original to Guanxiang.")}</p></div><div>{result.candidates.map(code => <Button key={code} variant="outline" onClick={() => viewType(code)}>{code}</Button>)}</div></div>
          <Button variant="outline" onClick={() => { setSession(s => ({ ...s, finished: false, step: 0 })); focusQuestion(); }}>{t("回看与修改答案", "Review and edit answers")}</Button>
          <div className="result-actions"><Button onClick={() => onKeep({ kind: "mbti", title: [`偏好记录 · ${result.pattern}`, `Preference record · ${result.pattern}`], summary: [`本次模式：${result.pattern}\n可对照类型：${result.candidates.join("、")}\n分数描述这次回答，不是能力或准确率；X 表示该组同分。`, `Current pattern: ${result.pattern}\nTypes to compare: ${result.candidates.join(", ")}\nScores describe these answers, not abilities or accuracy. X marks a tie.`], method: ["24 道观象原创情境题，每组 6 题；按选择方向计 0、1、2 分。非官方 MBTI 量表，未作标准化验证。", "24 original scenarios, six per pair; directional scores of 0, 1, or 2. Not the official MBTI instrument; not standardized."], capturedAt: new Date().toISOString(), source: "https://www.myersbriggs.org/my-mbti-personality-type/myers-briggs-overview/", pattern: result.pattern, dimensions: result.dimensions.map(d => ({ axis: d.axis, leftPoints: d.leftPoints, rightPoints: d.rightPoints, neutral: d.neutral })) }, result.candidates.length === 1 ? TYPES.find(p => p.code === result.candidates[0])!.growth[li] : t("选一组偏好，记录两种做法各自适用的情境。", "Choose a pair and record a setting where each approach fits."))}><Bookmark size={17} />{t("保存本次结果", "Keep this result")}</Button><Button variant="outline" onClick={() => onLearn("mbti-review")}><BookOpen size={17} />{t("以后怎样比较变化", "Comparing later results")}</Button></div>
        </div>}
      </section>}

      {tab === "types" && <div className="mbti-library"><aside className="mbti-type-picker"><div className="mbti-picker-heading"><h2>{t("选择一个类型", "Choose a type")}</h2><span>16</span></div><RadioGroup value={session.selectedType} onValueChange={value => setSession(s => ({ ...s, selectedType: value as TypeCode }))} className="mbti-type-grid" aria-label={t("16 型人格图鉴", "16-type library")}>{TYPES.map(type => <label key={type.code} className="mbti-type-option" htmlFor={`type-${type.code}`} data-selected={session.selectedType === type.code}><RadioGroupItem id={`type-${type.code}`} value={type.code} /><strong>{type.code}</strong><span>{type.name[li]}</span></label>)}</RadioGroup><p className="mbti-picker-note">{t("这是供浏览的类型卡。选择卡片不会改变自测结果。", "These are browsing cards. Selecting a card does not change your exercise result.")}</p></aside><section className="mbti-type-paper" aria-labelledby="mbti-type-name"><div className="mbti-type-header"><div><p className="eyebrow">PREFERENCE FIELD NOTES</p><span className="mbti-profile-code">{profile.code}</span><h2 id="mbti-type-name">{profile.name[li]}</h2></div><span className="mbti-type-stamp" aria-hidden="true">{t("知己", "SELF")}</span></div><p className="mbti-profile-overview">{profile.overview[li]}</p><div className="mbti-profile-pairs">{AXES.map((axis, i) => <div key={axis.id}><strong>{profile.code[i]}</strong><span>{axis.title[li]}<b>{(profile.code[i] === axis.id[0] ? axis.left : axis.right)[li]}</b></span></div>)}</div><div className="mbti-profile-prompts"><section><span>01</span><div><h3>{t("做事时，试着这样观察", "A prompt for work")}</h3><p>{WORK_PROMPTS[profile.code[3] as "J" | "P"][li]}</p></div></section><section><span>02</span><div><h3>{t("相处时，多留一个问题", "A prompt for relationships")}</h3><p>{RELATIONSHIP_PROMPTS[profile.code[2] as "T" | "F"][li]}</p></div></section><section><span>03</span><div><h3>{t("给成长一个小动作", "One small growth experiment")}</h3><p>{profile.growth[li]}</p></div></section></div><div className="mbti-profile-footer"><p>{t("把符合的部分留下，把不符合的部分当成一个问题。", "Keep what fits. Let what does not fit become a question.")}</p><Button variant="outline" onClick={() => setTab("quiz")}>{result ? t("回到自测结果", "Back to your results") : answered ? t("继续偏好自测", "Continue the exercise") : t("开始偏好自测", "Try the exercise")}</Button></div></section></div>}
    </>

    <p className="mbti-local-note">{t("自测答案与进度保存在本设备、当前浏览器；清理浏览器数据会移除。", "Answers and progress are stored in this browser on this device; clearing browser data removes them.")}</p>
    <Dialog open={method} onOpenChange={setMethod}><DialogContent className="knowledge-dialog"><DialogHeader><DialogTitle>{t("MBTI · 方法与出处", "MBTI · Method & sources")}</DialogTitle><DialogDescription>{t("认识偏好，回到实际的自己。", "Explore preferences and compare them with your lived experience.")}</DialogDescription></DialogHeader><div className="knowledge-body mbti-method"><h3>{t("四组偏好与 16 种组合", "Four pairs and 16 combinations")}</h3><p>{t("框架参考 MBTI 官方介绍中的 E/I、S/N、T/F、J/P 四组偏好。每个人都会使用两边，偏好不表示能力高低。", "The framework references the four E/I, S/N, T/F, and J/P pairs in the official MBTI overview. Both sides are available to everyone; preferences do not rank abilities.")}</p><h3>{t("观象的原创自测", "Guanxiang's original exercise")}</h3><p>{t("这 24 道日常情境题、类型称呼与建议由观象原创，不是官方 MBTI 量表，也没有做标准化或信效度验证。每组 6 题，按选择方向计 0、1 或 2 分；同分记 X，不强行指定类型。结果用于自我观察，不用于诊断或选人。", "These 24 everyday questions, card names, and prompts are original to Guanxiang. This is not the official MBTI instrument and has not undergone standardization, reliability, or validity testing. Six questions per pair score 0, 1, or 2 points by direction. Ties remain X. Results support reflection, not diagnosis or selection decisions.")}</p><h3>{t("数据保存在这里", "Your local data")}</h3><p>{t("答案、当前组数与浏览的类型卡保存在当前浏览器。本站不会将这些答案提交到服务器。重新开始只清除本模块的自测进度，问题手记另行保存。", "Answers, the current page, and your selected type card are saved in this browser. The site does not submit these answers to a server. Starting again clears only this exercise; your journal is stored separately.")}</p><div className="mbti-source-links"><a href="https://www.myersbriggs.org/my-mbti-personality-type/myers-briggs-overview/" target="_blank" rel="noreferrer">{t("Myers & Briggs Foundation · 官方框架介绍", "Myers & Briggs Foundation · Framework overview")}</a><a href="https://www.themyersbriggs.com/en-US/Access-Resources/All-About-the-MBTI-Assessment" target="_blank" rel="noreferrer">{t("The Myers-Briggs Company · 官方量表说明", "The Myers-Briggs Company · Official assessment information")}</a></div></div></DialogContent></Dialog>
    <AlertDialog open={reset} onOpenChange={setReset}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{t("清除这次自测，重新开始？", "Clear this exercise and start again?")}</AlertDialogTitle><AlertDialogDescription>{t("这会移除当前自测答案、结果与进度。问题手记会保留。", "This removes the current exercise answers, result, and progress. Your journal entries are retained.")}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>{t("保留当前进度", "Keep progress")}</AlertDialogCancel><AlertDialogAction onClick={clearSession}>{t("清除并重新开始", "Clear and start again")}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>;
}
