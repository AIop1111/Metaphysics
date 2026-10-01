import raw from "./hexagrams-legge.json";

/**
 * James Legge, "The Yî King" (Sacred Books of the East XVI, Oxford 1882), public domain.
 * Transcription vendored from opencosmos-ai/iching (CC0): hexagrams 1–31 proofread against
 * the scan on English Wikisource; 32–64 OCR of the 1882 scan, judgments taken from a
 * second Legge copy and line texts corrected by hand. `gaps` lists line positions whose
 * text is incomplete in the scan (shown with "…" rather than reconstructed).
 */
export type LeggeText = { number: number; judgment: string; lines: string[]; extra: string[]; source: string; proofread: boolean; gaps?: number[] };
export const LEGGE = raw as LeggeText[];
export const leggeFor = (number: number) => LEGGE[number - 1];
export const LEGGE_CITATION = "James Legge, The Yî King, Sacred Books of the East vol. XVI (Oxford, 1882)";
