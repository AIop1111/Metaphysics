import { hexagramByNumber } from "./hexagrams";
import { HEXAGRAM_NOTES } from "./hexagram-notes";
import type { ResultSnapshot } from "./iching";
export type KeepResult = (snapshot: ResultSnapshot, action?: string) => void;
export function patternSnapshot(number: number, baseNumber = number, movingLines: number[] = [], method: [string, string] = ["手动六爻结构练习；问题不参与计算。", "Manual six-line study; question text does not determine the pattern."]): ResultSnapshot {
  const h = hexagramByNumber(number), base = hexagramByNumber(baseNumber), note = HEXAGRAM_NOTES[number - 1];
  return { kind: "iching", title: [`${h.name} · 第 ${number} 卦`, `${h.name} · ${note.title} · ${number}`], capturedAt: new Date().toISOString(), method, summary: [`本卦：${base.name}；当前：${h.name}；上${h.upper}下${h.lower}。\n卦辞原文：${h.judgment}\n白话导读：${note.summary[0]}\n思考问题：${note.prompt[0]}\n六爻原文（自下而上）：\n${[...h.lineTexts, ...h.extra].join("\n")}`, `Original: ${base.name}; current: ${h.name}; upper ${h.upper}, lower ${h.lower}.\nOriginal judgment: ${h.judgment}\nEditorial note: ${note.summary[1]}\nReflection: ${note.prompt[1]}\nOriginal line texts (bottom to top):\n${[...h.lineTexts, ...h.extra].join("\n")}`], source: h.source, hexagramNumber: number, baseNumber, movingLines: [...movingLines] };
}
export const reflectionSnapshot = (): ResultSnapshot => ({ kind: "reflection", title: ["自由手记", "Personal reflection"], summary: ["自主记录，未关联测算或自测结果。", "A personal note without an attached reading or exercise result."], method: ["个人记录", "Personal record"], capturedAt: new Date().toISOString() });
