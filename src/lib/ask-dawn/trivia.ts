import { tokenize } from "./text";
import type { TriviaCategory, TriviaFact } from "@/content/ask-dawn/louisiana-trivia";

/** Strict trigger match — same "all words present" rule as easter eggs. */
export function matchTriviaTrigger(query: string, facts: TriviaFact[]): TriviaFact | null {
  const queryTokens = new Set(tokenize(query));
  if (queryTokens.size === 0) return null;

  let best: { fact: TriviaFact; score: number } | null = null;

  for (const fact of facts) {
    for (const trigger of fact.triggers) {
      const triggerTokens = new Set(tokenize(trigger));
      if (triggerTokens.size === 0) continue;

      const overlap = [...triggerTokens].filter((t) => queryTokens.has(t)).length;
      if (overlap < triggerTokens.size) continue;

      const score = overlap / triggerTokens.size;
      if (!best || score > best.score) best = { fact, score };
    }
  }

  return best ? best.fact : null;
}

const LAGNIAPPE_PHRASES = [
  "lagniappe",
  "give me trivia",
  "louisiana trivia",
  "new orleans trivia",
  "italian trivia",
  "something weird about louisiana",
  "give me some lagniappe",
];

/** Explicit "surprise me" request — always returns a random fact. */
export function isLagniappeRequest(query: string): boolean {
  const q = query.toLowerCase();
  return LAGNIAPPE_PHRASES.some((p) => q.includes(p));
}

const TRIVIA_INTENT_HINTS = [
  "tell me something",
  "tell me about",
  "why is",
  "why are",
  "why does",
  "what's a",
  "whats a",
  "history of",
  "trivia",
];

const LOUISIANA_HINTS = [
  "louisiana",
  "new orleans",
  "nola",
  "sicilian",
  "italian",
  "northshore",
  "southshore",
  "st. tammany",
  "st tammany",
  "mandeville",
  "covington",
  "slidell",
  "lacombe",
  "madisonville",
  "causeway",
  "french quarter",
];

/**
 * Looser detector used only to decide whether a *miss* (no specific fact
 * matched) should get a friendly "don't have that one yet" trivia
 * fallback instead of the mortgage escalation message.
 */
export function looksLikeTriviaAsk(query: string): boolean {
  const q = query.toLowerCase();
  const hasIntentHint = TRIVIA_INTENT_HINTS.some((h) => q.includes(h));
  const hasLouisianaHint = LOUISIANA_HINTS.some((h) => q.includes(h));
  return hasIntentHint && hasLouisianaHint;
}

export function detectTriviaCategory(query: string): TriviaCategory | null {
  const q = query.toLowerCase();
  if (q.includes("italian") || q.includes("sicilian")) return "italian-history";
  if (
    q.includes("northshore") ||
    q.includes("southshore") ||
    q.includes("st. tammany") ||
    q.includes("st tammany") ||
    q.includes("mandeville") ||
    q.includes("covington") ||
    q.includes("slidell") ||
    q.includes("causeway")
  ) {
    return "northshore";
  }
  if (q.includes("new orleans") || q.includes("nola") || q.includes("french quarter")) return "new-orleans";
  return null;
}

export function pickRandomTrivia(
  facts: TriviaFact[],
  opts?: { category?: TriviaCategory | null; excludeIds?: string[] }
): TriviaFact {
  let pool = facts;

  if (opts?.category) {
    const filtered = facts.filter((f) => f.category === opts.category);
    if (filtered.length > 0) pool = filtered;
  }

  if (opts?.excludeIds && opts.excludeIds.length > 0) {
    const filtered = pool.filter((f) => !opts.excludeIds!.includes(f.id));
    if (filtered.length > 0) pool = filtered;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
