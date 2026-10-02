import { hexagramByLines } from "./hexagrams";
import { HEXAGRAM_NOTES } from "./hexagram-notes";
import { leggeFor } from "./legge";
import { analyseCast, type LineValue } from "./cast";
import type { ResultSnapshot } from "./iching";

/** Journal snapshot of a coin cast; `capturedAt` is replaced with the save time on the client. */
export function castSnapshot(values: LineValue[]): ResultSnapshot {
  const { primary, relating, moving } = analyseCast(values);
  const base = hexagramByLines(primary), to = relating ? hexagramByLines(relating) : null;
  const note = HEXAGRAM_NOTES[base.number - 1], legge = leggeFor(base.number);
  const zhLines = moving.map(p => base.lineTexts[p - 1]);
  const enLines = moving.map(p => `Line ${p}: ${legge.lines[p - 1]}`);
  const allMoving = moving.length === 6 && base.extra.length > 0;
  return {
    kind: "iching",
    title: [to ? `起卦 · ${base.name}之${to.name}` : `起卦 · ${base.name}`, to ? `Cast · ${base.number} → ${to.number}` : `Cast · Hexagram ${base.number}`],
    capturedAt: new Date().toISOString(),
    method: ["三枚铜钱法，浏览器随机生成；问题只作记录，不影响结果。", "Three-coin method, browser randomness; the question is recorded but does not influence the coins."],
    summary: [
      [`本卦：${base.name}（第 ${base.number} 卦）${to ? `；之卦：${to.name}（第 ${to.number} 卦）` : "；无变爻"}`, `掷得（自下而上）：${values.join(" ")}`, `卦辞：${base.judgment}`, `白话导读：${note.summary[0]}`, ...(zhLines.length ? ["变爻：", ...(allMoving ? base.extra : zhLines)] : []), `思考问题：${note.prompt[0]}`].join("\n"),
      [`Primary: ${base.number}${to ? `; relating: ${to.number}` : "; no changing lines"}`, `Cast (bottom to top): ${values.join(" ")}`, `Judgment (Legge): ${legge.judgment}`, `Overview: ${note.summary[1]}`, ...(enLines.length ? ["Changing lines (Legge):", ...(allMoving ? legge.extra : enLines)] : []), `Reflection: ${note.prompt[1]}`].join("\n"),
    ],
    source: base.source,
    hexagramNumber: to?.number ?? base.number,
    baseNumber: base.number,
    movingLines: moving,
  };
}
