import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Exercise real data and persistence contracts without adding a test dependency.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const ts = require("typescript");
const cache = new Map();
function load(filename) {
  const file = [filename, `${filename}.ts`, `${filename}.tsx`, `${filename}.json`].find(existsSync);
  assert.ok(file, `Missing module: ${filename}`);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  if (file.endsWith(".json")) module.exports = JSON.parse(readFileSync(file, "utf8"));
  else {
    const output = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const localRequire = id => id.startsWith("@/") ? load(path.join(root, id.slice(2))) : id.startsWith(".") ? load(path.resolve(path.dirname(file), id)) : require(id);
    new Function("require", "module", "exports", output)(localRequire, module, module.exports);
  }
  return module.exports;
}
const { HEXAGRAMS, TRIGRAM_INFO, hexagramByLines, hexagramByNumber } = load(path.join(root, "lib/hexagrams"));
const { HEXAGRAM_NOTES } = load(path.join(root, "lib/hexagram-notes"));
const { TOPICS, LESSONS, GLOSSARY, RESOURCES, CASES } = load(path.join(root, "lib/knowledge"));
const { EXAMPLES, parseEntries, entryMarkdown, entryKind, entryCaption, isSnapshot } = load(path.join(root, "lib/iching"));
const { patternSnapshot, reflectionSnapshot } = load(path.join(root, "lib/results"));
const { QUESTIONS, AXES, TYPE_CODES, scoreAnswers, parseSession } = load(path.join(root, "lib/mbti"));
const { ZODIAC_SIGNS, getDailyHoroscope, localDateKey } = load(path.join(root, "lib/horoscope"));

assert.equal(HEXAGRAMS.length, 64);
assert.equal(HEXAGRAM_NOTES.length, 64);
assert.equal(new Set(HEXAGRAMS.map(h => h.lines.join(""))).size, 64);
for (const [i, h] of HEXAGRAMS.entries()) {
  assert.equal(h.number, i + 1);
  assert.deepEqual(h.lines, [...TRIGRAM_INFO[h.lower].lines, ...TRIGRAM_INFO[h.upper].lines]);
  assert.ok(h.judgment.trim());
  assert.equal(h.lineTexts.length, 6);
  assert.equal(h.extra.length, i < 2 ? 1 : 0);
  assert.ok(new URL(h.source).searchParams.get("oldid"), `Unpinned source ${h.number}`);
  for (const [n, text] of h.lineTexts.entries()) {
    assert.match(text, /^(初[九六]|[九六][二三四五]|上[九六])/);
    const yang = text.slice(0, 2).includes("九");
    assert.equal(Number(yang), h.lines[n], `Text/line mismatch ${h.number}:${n + 1}`);
  }
  for (let n = 0; n < 6; n++) {
    const flipped = h.lines.map((v, j) => n === j ? 1 - v : v);
    const next = hexagramByLines(flipped);
    assert.ok(next && next.number !== h.number);
    assert.equal(hexagramByLines(next.lines.map((v, j) => n === j ? 1 - v : v)).number, h.number);
  }
  const note = HEXAGRAM_NOTES[i];
  assert.ok(note.title && note.summary.every(Boolean) && note.prompt.every(Boolean));
}
for (const example of EXAMPLES) {
  assert.deepEqual(example.from.lines, hexagramByNumber(example.from.number).lines);
  assert.deepEqual(example.to.lines, hexagramByNumber(example.to.number).lines);
  assert.equal(hexagramByLines(example.from.lines.map((v, i) => i === 0 ? 1 - v : v)).number, example.to.number);
}
assert.equal(LESSONS.length, 12);
assert.equal(new Set(LESSONS.map(l => l.id)).size, 12);
for (const topic of TOPICS) assert.equal(LESSONS.filter(l => l.topic === topic.id).length, 4);
for (const item of [...GLOSSARY, ...CASES]) assert.ok(LESSONS.some(l => l.id === item.lesson && l.topic === item.topic));
for (const resource of RESOURCES) {
  for (const field of ["title", "author", "edition", "format", "level", "description", "access"]) assert.ok(resource[field].length === 2 && resource[field].every(Boolean));
  assert.ok(resource.href.startsWith("https://") || TOPICS.some(t => resource.href === `#library/learn/${t.id}`));
}
assert.equal(RESOURCES.length, 9);
assert.equal(CASES.length, 3);
for (const example of CASES) assert.ok(example.review.every(Boolean) && example.alternative.every(Boolean));

assert.equal(QUESTIONS.length, 24);
for (const axis of AXES) assert.equal(QUESTIONS.filter(q => q.axis === axis.id).length, 6);
const neutral = Object.fromEntries(QUESTIONS.map(q => [q.id, 0]));
assert.equal(scoreAnswers(neutral).pattern, "XXXX");
assert.equal(scoreAnswers(neutral).candidates.length, 16);
for (const code of TYPE_CODES) {
  const answers = Object.fromEntries(QUESTIONS.map(q => [q.id, (code[AXES.findIndex(a => a.id === q.axis)] === q.axis[0] ? 2 : -2) * q.direction]));
  assert.equal(scoreAnswers(answers).pattern, code);
  assert.equal(parseSession(JSON.stringify({ version: 1, answers, step: 5, finished: true, selectedType: code })).selectedType, code);
}
const close = { ...neutral, [QUESTIONS[0].id]: QUESTIONS[0].direction };
assert.ok(scoreAnswers(close).dimensions[0].close);
assert.throws(() => scoreAnswers({}));
assert.throws(() => parseSession(JSON.stringify({ version: 1, answers: {}, step: 5, finished: true, selectedType: "ISTJ" })));
for (const sign of ZODIAC_SIGNS) assert.deepEqual(getDailyHoroscope(sign.id, "2026-10-01"), getDailyHoroscope(sign.id, "2026-10-01"));
assert.equal(localDateKey(new Date(2026, 9, 1, 0, 1)), "2026-10-01");

const legacy = { id: "old-entry", question: "原来的问题", facts: "旧背景", understanding: "旧理解", unknown: "待核实", action: "旧动作", exampleId: "plum", changed: true, createdAt: "2025-01-01T12:00:00.000Z", updatedAt: "2025-01-01T12:00:00.000Z", reviews: [{ at: "2025-01-03T12:00:00.000Z", text: "旧回看" }] };
assert.deepEqual(parseEntries(JSON.stringify([legacy]))[0], legacy);
assert.equal(entryKind(legacy), "iching");
assert.equal(entryCaption(legacy, "zh"), "革 → 咸");
assert.match(entryMarkdown(legacy), /当前结构 \/ Current pattern: 咸/);
const moves = [1];
const iching = patternSnapshot(31, 49, moves);
moves.push(6);
assert.deepEqual(iching.movingLines, [1]);
const scored = scoreAnswers(neutral);
const mbti = { kind: "mbti", title: [scored.pattern, scored.pattern], summary: ["当时的偏好观察", "Captured preferences"], method: ["24 题原创练习", "24 original questions"], capturedAt: "2026-10-01T10:00:00.000Z", pattern: scored.pattern, dimensions: scored.dimensions.map(({ axis, leftPoints, rightPoints, neutral }) => ({ axis, leftPoints, rightPoints, neutral })) };
const daily = getDailyHoroscope("libra", "2026-10-01");
const zodiac = { kind: "zodiac", title: ["天秤座", "Libra"], summary: [...daily.action], method: ["原创娱乐阅读", "Original entertainment reading"], capturedAt: "2026-10-01T10:00:00.000Z", signId: "libra", dateKey: "2026-10-01" };
const mixed = [legacy, ...[iching, zodiac, mbti, reflectionSnapshot()].map((snapshot, i) => ({ ...legacy, id: `new-${i}`, snapshot }))];
const restored = parseEntries(JSON.stringify(mixed));
assert.deepEqual(restored, mixed);
assert.deepEqual(restored.map(entryKind), ["iching", "iching", "zodiac", "mbti", "reflection"]);
assert.match(entryMarkdown(restored[1]), /Current hexagram: 31/);
assert.match(entryMarkdown(restored[2]), /Reading date: 2026-10-01/);
assert.match(entryMarkdown(restored[3]), /EI: 0 \/ 0/);
assert.ok(!entryMarkdown(restored[2]).includes("Learning example:"));
getDailyHoroscope("libra", "2026-10-02");
assert.deepEqual(restored[2].snapshot, zodiac);
const corrupt = { ...mbti, dimensions: mbti.dimensions.map((d, i) => i ? d : { ...d, leftPoints: -1 }) };
assert.equal(isSnapshot(corrupt), false);
assert.throws(() => parseEntries(JSON.stringify([{ ...legacy, snapshot: corrupt }])));
assert.throws(() => parseEntries("{broken"));
assert.deepEqual(parseEntries(null), []);
console.log(`Content checks passed: 64 hexagrams, 384 line texts, 384 reversible changes, ${GLOSSARY.length} terms, 12 lessons, 9 resources, 3 cases, 16 MBTI patterns, and legacy/new journal compatibility.`);

const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const Home = load(path.join(root, "app/(app)/page")).default;
const { KnowledgeLibrary } = load(path.join(root, "components/knowledge-library"));
const { Horoscope } = load(path.join(root, "components/horoscope"));
const { Mbti } = load(path.join(root, "components/mbti"));
const homeHtml = renderToStaticMarkup(React.createElement(Home));
assert.equal((homeHtml.match(/class="home-portal home-portal-/g) ?? []).length, 3);
assert.match(homeHtml, /id="home-iching-title"/);
assert.match(homeHtml, /id="home-zodiac-title"/);
assert.match(homeHtml, /id="home-mbti-title"/);
for (const lang of ["zh", "en"]) {
  const props = { lang, onKeep() {}, onGo() {}, onLearn() {} };
  const libraryHtml = renderToStaticMarkup(React.createElement(KnowledgeLibrary, props));
  assert.equal((libraryHtml.match(/class="hexagram-card"/g) ?? []).length, 16);
  assert.equal((libraryHtml.match(/role="tab"/g) ?? []).length, 5);
  assert.match(libraryHtml, /aria-label=/);
  assert.ok(renderToStaticMarkup(React.createElement(Horoscope, props)).length > 500);
  const mbtiHtml = renderToStaticMarkup(React.createElement(Mbti, props));
  assert.match(mbtiHtml, /class="mbti-loading"/);
  assert.ok(mbtiHtml.includes(lang === "zh" ? "正在读取本地进度" : "Loading your local progress"));
}
console.log("Server render checks passed: three parallel home portals, both library languages, and zodiac/MBTI initial render states.");

const { LEGGE } = load(path.join(root, "lib/legge"));
const { READINGS_EN } = load(path.join(root, "lib/hexagram-readings-en"));
assert.equal(LEGGE.length, 64);
LEGGE.forEach((entry, i) => {
  const n = i + 1, reading = READINGS_EN[n];
  assert.equal(entry.number, n);
  assert.ok(entry.judgment.length > 20, `Legge judgment ${n}`);
  assert.equal(entry.lines.length, 6, `Legge lines ${n}`);
  entry.lines.forEach((line, j) => {
    assert.ok(line.length > 15 && !/[/[\]]|\bKING\.|\d{3}/.test(line), `Legge line ${n}.${j + 1}`);
    if (line.startsWith("…")) assert.ok(entry.gaps?.includes(j + 1), `Unmarked gap ${n}.${j + 1}`);
  });
  assert.equal(entry.extra.length, HEXAGRAMS[i].extra.length, `Legge extra ${n}`);
  assert.ok(/^https:\/\//.test(entry.source));
  assert.ok(reading && reading.essay.length === 2 && reading.lines.length === 6 && [...reading.essay, ...reading.lines].every(text => text.length >= 5), `Reading ${n}`);
  assert.equal(Boolean(reading.extra), HEXAGRAMS[i].extra.length > 0, `Reading extra ${n}`);
});
console.log("English reference checks passed: 64 Legge judgments, 384 Legge lines (2 marked gaps), 64 original readings.");
