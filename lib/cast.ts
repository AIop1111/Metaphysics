/**
 * Three-coin casting. Each line is three coins: heads = 3, tails = 2.
 * 6 old yin (moving) · 7 young yang · 8 young yin · 9 old yang (moving),
 * with probabilities 1/8, 3/8, 3/8, 1/8. Lines are listed bottom to top.
 */
export type LineValue = 6 | 7 | 8 | 9;
export type Coin = 2 | 3;
export type Toss = { coins: [Coin, Coin, Coin]; value: LineValue };

export const CAST_SESSION_KEY = "guanxiang.cast.v1";

/** Toss three coins using the platform CSPRNG (or an injected source for tests). */
export function tossLine(randomBit: () => 0 | 1 = cryptoBit): Toss {
  const coins = [randomBit(), randomBit(), randomBit()].map(bit => (bit ? 3 : 2)) as [Coin, Coin, Coin];
  return { coins, value: (coins[0] + coins[1] + coins[2]) as LineValue };
}

function cryptoBit(): 0 | 1 {
  const buffer = new Uint8Array(1);
  globalThis.crypto.getRandomValues(buffer);
  return (buffer[0] & 1) as 0 | 1;
}

export const isMoving = (value: LineValue) => value === 6 || value === 9;
/** 1 = solid (yang), 0 = broken (yin), matching lib/hexagrams line arrays. */
export const primaryLine = (value: LineValue) => (value === 7 || value === 9 ? 1 : 0);
export const relatingLine = (value: LineValue) => (value === 6 ? 1 : value === 9 ? 0 : primaryLine(value));

/** Parses the six-digit `lines` query value, e.g. "789687"; returns null if invalid. */
export function parseCast(raw: unknown): LineValue[] | null {
  if (typeof raw !== "string" || !/^[6-9]{6}$/.test(raw)) return null;
  return [...raw].map(Number) as LineValue[];
}

export const castKey = (values: LineValue[]) => values.join("");

export function analyseCast(values: LineValue[]) {
  if (values.length !== 6) throw new Error("A cast has six lines");
  const primary = values.map(primaryLine);
  const moving = values.flatMap((value, i) => (isMoving(value) ? [i + 1] : []));
  const relating = moving.length ? values.map(relatingLine) : null;
  return { primary, relating, moving };
}
