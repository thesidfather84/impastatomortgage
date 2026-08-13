/**
 * HECM EXPECTED-RATE GRID ROUNDING
 * ===================================
 * VERIFIED regulatory rounding rule for mapping a raw expected interest
 * rate onto the PLF table's exact 0.125-point grid, confirmed two
 * independent ways rather than inferred:
 *
 * 1. HUD Handbook 4000.1, section II.B.3.d "Expected Rate and
 *    Mortgagee's Margin Lock In" (in effect with the Oct. 31, 2023
 *    publication of Handbook 4000.1, mandatory by April 29, 2024 — per
 *    HUD's own "HECM Origination and Servicing Overview" training deck,
 *    Dec. 6, 2023, which lists that exact section under "Allowable
 *    Mortgage Parameters"): a mortgagee may round the Expected Rate to
 *    the nearest one-eighth of one percentage point.
 * 2. HUD's own FHA Connection help documentation for the live HECM
 *    Calculator tool (entp.hud.gov/sfohlp/f17hcmcalcprhlpp.cfm), fetched
 *    2026-08-13, which states plainly: "Rates are rounded to the
 *    nearest 1/8th percent to determine the principal limit factor... The
 *    entered rate is used for other calculations." This is HUD's own
 *    operational calculator confirming ROUND TO NEAREST — not round up,
 *    not round down — specifically for the PLF lookup step.
 *
 * NOT independently verified: which way a rate exactly halfway between
 * two grid points resolves (e.g. 5.0625%, exactly between 5.000% and
 * 5.125%). Neither source states a midpoint tie-break rule. This
 * function breaks ties by rounding up, matching the standard "round
 * half up" convention (and JavaScript's own Math.round behavior) — that
 * specific tie-break choice is an assumption, not a HUD citation, and is
 * called out explicitly here so it can be revisited if HUD ever
 * publishes explicit midpoint guidance.
 */

import { HECM_PLF_TABLE_SOURCE } from "./plf-table";

export const EXPECTED_RATE_ROUNDING_SOURCE = {
  rule: "Round to the nearest 0.125 percentage point for Principal Limit Factor lookup.",
  primarySources: [
    {
      name: "HUD Handbook 4000.1, section II.B.3.d (\"Expected Rate and Mortgagee's Margin Lock In\")",
      inEffectDate: "2024-04-29",
    },
    {
      name: "HUD FHA Connection — HECM Calculator help page",
      url: "https://entp.hud.gov/sfohlp/f17hcmcalcprhlpp.cfm",
      retrievedDate: "2026-08-13",
      quote:
        "Rates are rounded to the nearest 1/8th percent to determine the principal limit factor displayed in the Prin Lim - Shared Prem Fac field. The entered rate is used for other calculations.",
    },
  ],
  midpointTieBreak: "round-half-up (assumed, not independently HUD-verified)",
} as const;

/**
 * Rounds a raw expected interest rate to HUD's exact 0.125-point PLF
 * grid, using ordinary "round to nearest" (half-up on ties). Does not
 * clamp to the table's min/max — an out-of-range result is left for the
 * caller's own bounds validation (e.g. selectPrincipalLimitFactor) to
 * reject, rather than this function silently reinterpreting it.
 */
export function roundExpectedRateToPlfGrid(rawExpectedRatePercent: number): number {
  if (!Number.isFinite(rawExpectedRatePercent)) {
    throw new RangeError("rawExpectedRatePercent must be a finite number.");
  }

  const step = HECM_PLF_TABLE_SOURCE.expectedRateStepPercent;
  const stepsFromZero = Math.round(rawExpectedRatePercent / step);
  // Round to 3 decimals to avoid binary-float artifacts like 5.000000000000001.
  return Math.round(stepsFromZero * step * 1000) / 1000;
}
