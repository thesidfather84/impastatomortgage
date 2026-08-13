/**
 * Topics where Dawn's comedy/personality must switch off entirely — a
 * calm, straightforward tone only. This check runs before every other
 * routing decision (easter eggs, trivia, repeat-question humor), so a
 * sensitive query can never accidentally get a joke.
 */
const SENSITIVE_PATTERNS = [
  "foreclosure",
  "foreclose",
  "can't pay",
  "cant pay",
  "can't afford my payment",
  "behind on my payment",
  "behind on payments",
  "missed a payment",
  "missed payments",
  "died",
  "passed away",
  "death of",
  "my husband died",
  "my wife died",
  "my spouse died",
  "my mother died",
  "my father died",
  "my parent died",
  "inheritance",
  "inherited the house",
  "bankruptcy",
  "bankrupt",
  "loan denied",
  "denied my loan",
  "application was denied",
  "credit crisis",
  "financial hardship",
  "hardship",
  "divorce",
  "getting divorced",
  "fraud",
  "scammed",
  "scam",
  "eviction",
  "being evicted",
  "lose my home",
  "losing my home",
  "lose the house",
  "about to lose",
];

export function isSensitiveTopic(text: string): boolean {
  const q = text.toLowerCase();
  return SENSITIVE_PATTERNS.some((pattern) => q.includes(pattern));
}
