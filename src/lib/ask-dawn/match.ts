import type { KnowledgeItem } from "@/content/ask-dawn/types";
import { tokenize } from "./text";

// Short acronyms that ARE meaningful even though they're short — never
// treat these as noise.
const KEEP_SHORT = new Set(["fha", "apr", "dti", "ltv", "arm", "hecm"]);

export type MatchResult = {
  item: KnowledgeItem;
  score: number;
};

/**
 * Deterministic keyword-overlap matcher against the approved knowledge
 * base. Intentionally simple and inspectable — this is retrieval, not
 * generation, so there is nothing here that can hallucinate an answer.
 */
export function findBestMatch(
  query: string,
  knowledgeBase: KnowledgeItem[]
): MatchResult | null {
  const queryTokens = new Set(tokenize(query, KEEP_SHORT));
  if (queryTokens.size === 0) return null;

  let best: MatchResult | null = null;

  for (const item of knowledgeBase) {
    if (!item.approved) continue;

    for (const variant of item.questionVariants) {
      const variantTokens = new Set(tokenize(variant, KEEP_SHORT));
      if (variantTokens.size === 0) continue;

      const overlap = [...variantTokens].filter((t) => queryTokens.has(t)).length;
      const score = overlap / variantTokens.size;

      // Require every meaningful word in short variants (acronyms like
      // "apr", "fha") to be present, to avoid loose false positives.
      const isShortVariant = variantTokens.size <= 2;
      if (isShortVariant && overlap < variantTokens.size) continue;

      if (!best || score > best.score) {
        best = { item, score };
      }
    }
  }

  const MATCH_THRESHOLD = 0.6;
  if (best && best.score >= MATCH_THRESHOLD) return best;
  return null;
}
