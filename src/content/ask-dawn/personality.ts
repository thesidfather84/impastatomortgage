/**
 * Dawn's personality layer for Ask Dawn.
 *
 * STRICT RULE: this file may only supply copy for greetings, short
 * answer intros, escalation hand-offs, and the logo easter egg. It must
 * never be consulted when rendering an approved knowledge-base answer,
 * a rate, APR, legal disclosure, eligibility statement, or any other
 * regulated content — those always render exactly as written in
 * src/content/ask-dawn/knowledge-base.ts, unchanged.
 *
 * There is no on/off toggle for this — it's simply how Dawn talks.
 * Keep the Italian/Louisiana touches occasional, not on every line.
 */

export const greeting =
  "Hi, I'm Ask Dawn. Go ahead, ask me — mortgages don't have to sound like alphabet soup.";

export const escalation =
  "Fuggedaboutit — I'm not guessing when your home is involved. Let's get the real Dawn.";

/** Topics dense with acronyms/jargon get the "alphabet soup" framing. */
const JARGON_TOPICS = new Set(["Loan Terms", "Loan Types"]);

/**
 * A short, deterministic lead-in shown above an approved answer. Varies by
 * topic (not random) so it stays predictable for tests, while still
 * reading like Dawn's natural voice rather than a canned line repeated
 * everywhere.
 */
export function getAnswerIntro(topic: string): string {
  if (JARGON_TOPICS.has(topic)) {
    return "Before all these mortgage letters start looking like alphabet soup — here's what that actually means.";
  }
  return "Alright, let's make this simple.";
}

export const easterEggLines = [
  "Okay, okay — I saw you the first time.",
  "Alright already, I'm here.",
  "Madonna, you really like that logo.",
  "Okay, you found the secret. Now ask me about a mortgage.",
  "Fuggedaboutit — I'm not giving you the family sauce recipe.",
];

export function pickEasterEggLine(): string {
  return easterEggLines[Math.floor(Math.random() * easterEggLines.length)];
}
