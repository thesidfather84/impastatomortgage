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

/** The exact text the "Random Louisiana fact" chip sends as the user's message. */
export const LAGNIAPPE_TRIGGER_TEXT = "🎲 Random Louisiana fact";

// Broad, low-collision substrings — none of these words appear in any
// mortgage knowledge-base question, so matching them anywhere in the
// query is safe. "trivia" alone covers every "___ trivia" phrasing
// ("louisiana trivia", "new orleans trivia", "give me trivia", ...).
const LAGNIAPPE_PHRASES = [
  "lagniappe",
  "trivia",
  "give me a fact",
  "another fact",
  "fun fact",
  "random fact",
  "louisiana fact",
  "something weird about louisiana",
  "louisiana history",
  "italian history",
  "sicilian history",
];

// Generic phrasings with no Louisiana/Italian keyword of their own — only
// safe as a *whole-query* match (not a substring) so a real question like
// "tell me something about FHA" is never swallowed.
const EXACT_TRIVIA_PHRASES = [
  "tell me something interesting",
  "something interesting",
  "surprise me",
];

/** Explicit "surprise me" request — always returns a random fact. */
export function isLagniappeRequest(query: string): boolean {
  const q = query.toLowerCase().trim();
  if (LAGNIAPPE_PHRASES.some((p) => q.includes(p))) return true;
  return EXACT_TRIVIA_PHRASES.includes(q);
}

const TRIVIA_INTENT_HINTS = [
  "tell me something",
  "tell me about",
  "why is",
  "why are",
  "why does",
  "what's a",
  "whats a",
  "history",
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
