import raw from "./hexagrams-data.json";
import type { Language } from "./iching";

export type HexagramText = { number: number; name: string; traditional: string; upper: string; lower: string; lines: number[]; judgment: string; lineTexts: string[]; extra: string[]; source: string };
export const HEXAGRAMS = raw as HexagramText[];
export const TRIGRAM_INFO: Record<string, { symbol: string; image: [string, string]; lines: number[] }> = {
  乾: { symbol: "☰", image: ["天", "Heaven"], lines: [1, 1, 1] },
  坤: { symbol: "☷", image: ["地", "Earth"], lines: [0, 0, 0] },
  震: { symbol: "☳", image: ["雷", "Thunder"], lines: [1, 0, 0] },
  巽: { symbol: "☴", image: ["风", "Wind"], lines: [0, 1, 1] },
  坎: { symbol: "☵", image: ["水", "Water"], lines: [0, 1, 0] },
  离: { symbol: "☲", image: ["火", "Fire"], lines: [1, 0, 1] },
  艮: { symbol: "☶", image: ["山", "Mountain"], lines: [0, 0, 1] },
  兑: { symbol: "☱", image: ["泽", "Lake"], lines: [1, 1, 0] },
};
export const hexagramByNumber = (number: number) => HEXAGRAMS.find(h => h.number === number)!;
export const hexagramByLines = (lines: number[]) => HEXAGRAMS.find(h => h.lines.join("") === lines.join(""))!;
export const hexagramSymbol = (number: number) => String.fromCodePoint(0x4dc0 + number - 1);
export const trigramLabel = (name: string, lang: Language) => `${name} · ${TRIGRAM_INFO[name].image[lang === "zh" ? 0 : 1]}`;
