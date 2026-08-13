const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "what", "whats", "how",
  "do", "does", "did", "i", "im", "my", "me", "you", "your", "can",
  "could", "should", "would", "of", "for", "to", "in", "on", "about",
  "dawn", "please", "hi", "hello", "hey", "and", "or", "it", "this",
  "that",
]);

export function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Shared tokenizer for all Ask Dawn matchers (mortgage KB, easter eggs,
 * trivia). `keepShort` lets a caller preserve short tokens that would
 * otherwise be dropped as stopwords (e.g. acronyms like "fha").
 */
export function tokenize(text: string, keepShort: Set<string> = new Set()): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 0)
    .filter((t) => keepShort.has(t) || !STOPWORDS.has(t));
}
