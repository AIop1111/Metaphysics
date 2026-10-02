"use client";

import { useEffect, useState } from "react";
import { CAST_SESSION_KEY } from "@/lib/cast";
import { STORAGE_KEY, parseEntries, type JournalEntry, type ResultSnapshot } from "@/lib/iching";

type Lang = "zh" | "en";
type Status = "idle" | "saved" | "blocked" | "error";

/** Shows the question kept in sessionStorage for this cast and saves the cast to the local journal. */
export function CastJournal({ lang, lines, snapshot }: { lang: Lang; lines: string; snapshot: ResultSnapshot }) {
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(CAST_SESSION_KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after mount
      if (saved?.lines === lines && typeof saved.question === "string") setQuestion(saved.question);
    } catch {}
  }, [lines]);

  function save() {
    let entries: JournalEntry[];
    try { entries = parseEntries(localStorage.getItem(STORAGE_KEY)); }
    catch { setStatus("blocked"); return; }
    if (entries.length >= 2000) { setStatus("blocked"); return; }
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      id: crypto.randomUUID(), question: question.trim() || snapshot.title[lang === "zh" ? 0 : 1],
      facts: "", understanding: "", unknown: "", action: "", exampleId: "plum", changed: false,
      snapshot: { ...snapshot, capturedAt: now }, createdAt: now, updatedAt: now, reviews: [],
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...entries])); setStatus("saved"); }
    catch { setStatus("error"); }
  }

  return <div className="cast-journal">
    <label htmlFor="cast-journal-question">{t("你的问题", "Your question")}</label>
    <textarea id="cast-journal-question" rows={2} maxLength={500} value={question} onChange={e => setQuestion(e.target.value)} placeholder={t("可以在这里补写问题，再留进手记。", "You can add or edit your question before saving.")} />
    <div className="actions">
      <button type="button" className="button primary" onClick={save} disabled={status === "saved"}>{status === "saved" ? t("已留进手记", "Saved to your journal") : t("留进手记", "Save to your journal")}</button>
      {status === "saved" && <a className="button" href={`/?lang=${lang}#journal`}>{t("打开手记，补充背景", "Open the journal to add context")}</a>}
    </div>
    <p className="fine" role="status">
      {status === "blocked" ? t("本设备已有的手记无法读取或已满，为保护原数据，这次没有保存。请先打开手记导出整理。", "Your existing journal could not be read or is full, so nothing was saved to protect it. Open the journal and export first.")
        : status === "error" ? t("浏览器存储不可用，未能保存。", "Browser storage is unavailable, so the entry could not be saved.")
        : t("手记只保存在本设备的浏览器中。", "Journal entries stay in this browser on this device.")}
    </p>
  </div>;
}
