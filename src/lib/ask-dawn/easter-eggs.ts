import { tokenize } from "./text";
import type { EasterEgg } from "@/content/ask-dawn/easter-eggs";

export type EasterEggMatch = { egg: EasterEgg; score: number };

/**
 * Strict matcher: a trigger only counts if every one of its words is
 * present in the query. This is intentionally conservative so a fun
 * Easter egg can never shadow a real mortgage question.
 */
export function matchEasterEgg(query: string, eggs: EasterEgg[]): EasterEgg | null {
  const queryTokens = new Set(tokenize(query));
  if (queryTokens.size === 0) return null;

  let best: EasterEggMatch | null = null;

  for (const egg of eggs) {
    for (const trigger of egg.triggers) {
      const triggerTokens = new Set(tokenize(trigger));
      if (triggerTokens.size === 0) continue;

      const overlap = [...triggerTokens].filter((t) => queryTokens.has(t)).length;
      if (overlap < triggerTokens.size) continue;

      const score = overlap / triggerTokens.size;
      if (!best || score > best.score) best = { egg, score };
    }
  }

  return best ? best.egg : null;
}
