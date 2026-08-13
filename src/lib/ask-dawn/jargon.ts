const JARGON_TERMS = ["apr", "pmi", "fha", "hecm", "ltv", "dti", "arm"];

/** Whether the raw query contains mortgage-alphabet-soup terminology. */
export function containsJargon(text: string): boolean {
  const q = text.toLowerCase();
  return JARGON_TERMS.some((term) => new RegExp(`\\b${term}\\b`).test(q));
}
