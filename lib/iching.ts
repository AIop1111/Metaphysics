export type Language = "zh" | "en";
export type ExampleId = "plum" | "heaven" | "earth";
export type SymbolData = { name: string; english: string; number: number; upper: string; lower: string; lines: number[]; theme: [string, string] };
export type Example = { id: ExampleId; title: [string, string]; category: [string, string]; from: SymbolData; to: SymbolData; description: [string, string]; prompts: [string[], string[]]; source: string; sourceTitle: string };

export const EXAMPLES: Example[] = [
  {
    id: "plum", title: ["观梅之变", "The plum blossom example"], category: ["革 → 咸", "Ge → Xian"],
    from: { name: "革", english: "Ge · Change", number: 49, upper: "兑", lower: "离", lines: [1, 0, 1, 1, 1, 0], theme: ["革卦上兑下离：泽在上，火在下。传统解释以变革、更新为主题，强调改变需要时机与条件。这里把它作为观察结构的文化材料。", "Ge places Lake above Fire. Traditional readings associate it with change and renewal, and with the conditions that make change possible. Here it is a cultural example for observing structure."] },
    to: { name: "咸", english: "Xian · Response", number: 31, upper: "兑", lower: "艮", lines: [0, 0, 1, 1, 1, 0], theme: ["咸卦上兑下艮：泽在上，山在下。传统解释围绕感应、相互影响展开。从革到咸，只改变了最下方的一爻，其余五爻保持不变。", "Xian places Lake above Mountain. Traditional readings explore response and mutual influence. The move from Ge to Xian changes only the bottom line; the other five remain the same."] },
    description: ["复现《梅花易数》的观梅示例，逐步看到数字怎样落到卦象。", "Replay a fixed example from Mei Hua Yi Shu, from numbers to a six-line pattern."],
    prompts: [["眼下，你想改变的具体事情是什么？", "哪些事实已经确认，哪些还需要核实？", "这件事会影响谁，有没有必要先谈一谈？"], ["What, specifically, would you like to change?", "Which facts are confirmed, and which need checking?", "Who would be affected, and what conversation could help?"]],
    source: "https://www.eee-learning.com/book/4080", sourceTitle: "《梅花易数》卷一 · 观梅占",
  },
  {
    id: "heaven", title: ["一爻之间", "A single line changes"], category: ["乾 → 姤", "Qian → Gou"],
    from: { name: "乾", english: "Qian · Heaven", number: 1, upper: "乾", lower: "乾", lines: [1, 1, 1, 1, 1, 1], theme: ["乾卦由六条阳爻组成，上下皆为乾。传统解释将其与天、持续行动联系起来。这个例子让你先看清六爻的基本构成。", "Qian consists of six solid lines, with Heaven above Heaven. Traditional readings connect it with heaven and sustained activity. This example introduces the basic six-line structure."] },
    to: { name: "姤", english: "Gou · Encounter", number: 44, upper: "乾", lower: "巽", lines: [0, 1, 1, 1, 1, 1], theme: ["乾卦初爻由阳变阴，成为姤卦：上乾下巽。传统解释涉及相遇与接触；这里用它展示一条线的变化如何改变整体结构。", "Changing Qian’s bottom line from solid to broken produces Gou: Heaven above Wind. Traditional readings concern encounter and contact. Here it illustrates how one line changes the whole pattern."] },
    description: ["从六条阳爻出发，观察初爻变化带来的结构差别。", "Start with six solid lines and observe what changes when the first line flips."],
    prompts: [["你可以主动推进的事情是什么？", "做出决定之前，还有谁的观点值得听听？", "今天可以完成的一个小步骤是什么？"], ["What can you take initiative on?", "Whose perspective would help before you decide?", "What is one small step you can complete today?"]],
    source: "https://zh.wikisource.org/zh-hant/周易/姤", sourceTitle: "《周易》 · 乾、姤",
  },
  {
    id: "earth", title: ["从头再看", "A point of return"], category: ["坤 → 复", "Kun → Fu"],
    from: { name: "坤", english: "Kun · Earth", number: 2, upper: "坤", lower: "坤", lines: [0, 0, 0, 0, 0, 0], theme: ["坤卦由六条阴爻组成，上下皆为坤。传统解释将其与地、承载联系起来。这个例子与乾卦相对，展示另一种基本构成。", "Kun consists of six broken lines, with Earth above Earth. Traditional readings connect it with earth and receptivity. Alongside Qian, it introduces the other basic line pattern."] },
    to: { name: "复", english: "Fu · Return", number: 24, upper: "坤", lower: "震", lines: [1, 0, 0, 0, 0, 0], theme: ["坤卦初爻由阴变阳，成为复卦：上坤下震。传统解释以返回、重新开始为主题。这里的变化是固定的结构示例。", "Changing Kun’s bottom line from broken to solid produces Fu: Earth above Thunder. Traditional readings explore return and renewal. The change here is a fixed structural example."] },
    description: ["从六条阴爻出发，看看最下方的一点变化。", "Start with six broken lines and notice a change at the very bottom."],
    prompts: [["有没有一件搁置的事，你想重新开始？", "现有的条件中，哪些能够提供支持？", "怎样让这次重新开始更容易持续？"], ["Is there a sidelined task you would like to return to?", "What support is already available?", "What would make this restart easier to sustain?"]],
    source: "https://zh.wikisource.org/wiki/周易/復", sourceTitle: "《周易》 · 坤、复",
  },
];

export const TRIGRAMS: Record<string, [string, string]> = { "乾": ["天", "Heaven"], "坤": ["地", "Earth"], "兑": ["泽", "Lake"], "离": ["火", "Fire"], "艮": ["山", "Mountain"], "巽": ["风", "Wind"], "震": ["雷", "Thunder"], "坎": ["水", "Water"] };
export function calculatePlum() {
  const input = { yearBranch: 5, lunarMonth: 12, lunarDay: 17, hourBranch: 9 };
  const upperTotal = input.yearBranch + input.lunarMonth + input.lunarDay;
  const lowerTotal = upperTotal + input.hourBranch;
  return { input, upperTotal, lowerTotal, upperRemainder: upperTotal % 8, lowerRemainder: lowerTotal % 8, movingLine: lowerTotal % 6, base: "革", changed: "咸" };
}
export function getLearningResult(id: ExampleId, changed: boolean) {
  const example = EXAMPLES.find(e => e.id === id);
  if (!example || typeof changed !== "boolean") throw new Error("Invalid learning example");
  const symbol = changed ? example.to : example.from;
  return { exampleId: id, changed, name: symbol.name, number: symbol.number, linesBottomToTop: [...symbol.lines], upper: symbol.upper, lower: symbol.lower, movingLine: 1 };
}

export type ResultKind = "iching" | "zodiac" | "mbti" | "reflection";
export type ResultSnapshot = { kind: ResultKind; title: [string, string]; summary: [string, string]; method: [string, string]; capturedAt: string; source?: string; hexagramNumber?: number; baseNumber?: number; movingLines?: number[]; pattern?: string; dimensions?: { axis: string; leftPoints: number; rightPoints: number; neutral: number }[]; signId?: string; dateKey?: string };
export type JournalEntry = { id: string; question: string; facts: string; understanding: string; unknown: string; action: string; exampleId: ExampleId; changed: boolean; snapshot?: ResultSnapshot; createdAt: string; updatedAt: string; reviews: { at: string; text: string }[] };
export const STORAGE_KEY = "guanxiang.journal.v1";
export const RESULT_KINDS: { id: ResultKind; label: [string, string] }[] = [{ id: "iching", label: ["卦象", "I Ching"] }, { id: "zodiac", label: ["星座", "Zodiac"] }, { id: "mbti", label: ["MBTI", "MBTI"] }, { id: "reflection", label: ["自由手记", "Reflection"] }];
export function isSnapshot(value: unknown): value is ResultSnapshot {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const s = value as ResultSnapshot;
  const copy = (v: unknown) => Array.isArray(v) && v.length === 2 && v.every(x => typeof x === "string");
  return RESULT_KINDS.some(k => k.id === s.kind) && copy(s.title) && copy(s.summary) && copy(s.method) && typeof s.capturedAt === "string" && !Number.isNaN(Date.parse(s.capturedAt))
    && (s.source === undefined || (typeof s.source === "string" && /^https:\/\//.test(s.source)))
    && [s.hexagramNumber, s.baseNumber].every(n => n === undefined || (Number.isInteger(n) && n! >= 1 && n! <= 64))
    && (s.movingLines === undefined || (Array.isArray(s.movingLines) && s.movingLines.every(n => Number.isInteger(n) && n >= 1 && n <= 6)))
    && (s.pattern === undefined || (typeof s.pattern === "string" && /^[EIX][SNX][TFX][JPX]$/.test(s.pattern)))
    && (s.signId === undefined || typeof s.signId === "string") && (s.dateKey === undefined || (typeof s.dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.dateKey)))
    && (s.dimensions === undefined || (Array.isArray(s.dimensions) && s.dimensions.length === 4 && s.dimensions.every((d, i) => d && d.axis === ["EI", "SN", "TF", "JP"][i] && [d.leftPoints, d.rightPoints, d.neutral].every(n => Number.isInteger(n) && n >= 0) && d.leftPoints + d.rightPoints <= 12 && d.neutral <= 6)));
}
export function entryKind(entry: JournalEntry): ResultKind { return entry.snapshot?.kind ?? "iching"; }
export function entryCaption(entry: JournalEntry, lang: Language): string {
  const i = lang === "zh" ? 0 : 1;
  return entry.snapshot ? entry.snapshot.title[i] : EXAMPLES.find(e => e.id === entry.exampleId)!.category[i];
}
export function parseEntries(raw: string | null): JournalEntry[] {
  if (raw === null) return [];
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data) || data.length > 2000) throw new Error("Unreadable journal");
  const textKeys = ["id", "question", "facts", "understanding", "unknown", "action", "createdAt", "updatedAt"];
  for (const item of data) {
    if (!item || typeof item !== "object" || textKeys.some(k => typeof item[k] !== "string") || !EXAMPLES.some(e => e.id === item.exampleId) || typeof item.changed !== "boolean" || (item.snapshot !== undefined && !isSnapshot(item.snapshot)) || !Array.isArray(item.reviews) || item.reviews.some((r: unknown) => !r || typeof r !== "object" || typeof (r as { at?: unknown }).at !== "string" || typeof (r as { text?: unknown }).text !== "string")) throw new Error("Unreadable journal");
  }
  return data as JournalEntry[];
}
export function entryMarkdown(entry: JournalEntry): string {
  const example = EXAMPLES.find(e => e.id === entry.exampleId)!;
  const s = entry.snapshot;
  const result = s ? ["## 当时的结果 / Captured result", ...s.title, `记录 / Captured: ${s.capturedAt}`, ...s.method, "", ...s.summary, ...(s.hexagramNumber ? [`当前卦序 / Current hexagram: ${s.hexagramNumber}`, `本卦卦序 / Original hexagram: ${s.baseNumber ?? s.hexagramNumber}`, `变化位置 / Changed positions: ${s.movingLines?.join(", ") || "无 / none"}`] : []), ...(s.dateKey ? [`阅读日期 / Reading date: ${s.dateKey}`] : []), ...(s.dimensions?.map(d => `${d.axis}: ${d.leftPoints} / ${d.rightPoints}; 中间项 / middle answers: ${d.neutral}`) ?? []), ...(s.source ? [`出处 / Source: ${s.source}`] : [])] : [`学习示例 / Learning example: ${example.from.name} → ${example.to.name}`, `当前结构 / Current pattern: ${entry.changed ? example.to.name : example.from.name}`, "固定文化学习示例；问题不参与卦象计算。 / A fixed cultural example; your question does not affect the calculation.", `出处 / Source: ${example.source}`];
  return ["# 观象 · Guanxiang", "", "## 问题 / Question", entry.question, "", `创建 / Created: ${entry.createdAt}`, `更新 / Updated: ${entry.updatedAt}`, "", ...result, "", "## 已知事实 / Known facts", entry.facts, "", "## 我的理解 / My interpretation", entry.understanding, "", "## 尚不确定 / Still unknown", entry.unknown, "", "## 下一小步 / One small action", entry.action, "", "## 后续回看 / Follow-up reflections", ...entry.reviews.flatMap(r => [`### ${r.at}`, r.text, ""]), ""].join("\n");
}
