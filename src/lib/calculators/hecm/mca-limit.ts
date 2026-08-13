/**
 * HUD HECM NATIONWIDE MAXIMUM CLAIM AMOUNT (MCA) LIMIT
 * =======================================================
 * VERSIONED REGULATORY DATA — a single figure, but still versioned rather
 * than an unexplained magic constant, since it is set annually by HUD and
 * must never be assumed to still apply once its calendar year has passed.
 *
 * Source document : HUD Mortgagee Letter 2025-22, "2026 Home Equity
 *                    Conversion Mortgage (HECM) Limits" (Dec. 11, 2025).
 * Verified         : fetched and read directly from
 *                    https://www.hud.gov/sites/dfiles/hudclips/documents/2025-22hsgml.pdf
 *                    on 2026-08-13.
 *
 * Per that letter: "For the period of January 1, 2026, through December
 * 31, 2026, the HECM MCA will be $1,249,125 (150 percent of Federal Home
 * Loan Mortgage Corporation's (Freddie Mac) national conforming limit of
 * $832,750)." This single nationwide figure also applies to the special
 * exception areas (Alaska, Hawaii, Guam, and the U.S. Virgin Islands) —
 * unlike forward FHA loan limits, the HECM MCA does not vary by county.
 */
export const HECM_MCA_LIMIT_2026 = {
  calendarYear: 2026,
  maximumClaimAmount: 1_249_125,
  effectiveDescription: "FHA case numbers assigned January 1, 2026 through December 31, 2026",
  effectiveStart: "2026-01-01",
  effectiveEnd: "2026-12-31",
  sourceDocument: "HUD Mortgagee Letter 2025-22, \"2026 Home Equity Conversion Mortgage (HECM) Limits\"",
  sourceDocumentDate: "2025-12-11",
  sourceUrl: "https://www.hud.gov/sites/dfiles/hudclips/documents/2025-22hsgml.pdf",
  calculationBasis: "150% of Freddie Mac's 2026 national conforming loan limit of $832,750",
} as const;

/**
 * The currently active HECM MCA limit this engine uses. Deliberately a
 * single named export (not just "the 2026 one" baked into calculations)
 * so a future calendar year's limit can be swapped in by changing this
 * one line, without hunting through calculation logic — the same pattern
 * `compliance.ts` uses for other regulated, year-gated facts.
 */
export const CURRENT_HECM_MCA_LIMIT = HECM_MCA_LIMIT_2026;
