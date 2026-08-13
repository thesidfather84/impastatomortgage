/**
 * HECM HOME EQUITY EXPLORER — CALCULATION ENGINE FOUNDATION
 * =============================================================
 * Pure arithmetic only — no React, no UI. Covers, as of the 2026-08
 * "expected-rate handling + basic mandatory obligations" pass: Maximum
 * Claim Amount, expected-rate grid rounding (see expected-rate.ts),
 * Principal Limit Factor selection, Initial Principal Limit, and basic
 * mandatory obligations (existing lien, upfront MIP, the origination fee
 * cap, and user-entered closing costs — see mandatory-obligations.ts).
 *
 * Explicitly OUT OF SCOPE (future, separate work): a LESA, servicing-fee
 * set-asides, initial disbursement-period limits, tenure/term payment
 * plans, line-of-credit growth, refinance credits, HECM for Purchase, and
 * proprietary (non-FHA) reverse mortgages. None of those are calculated,
 * estimated, or referenced anywhere in this file.
 *
 * This engine makes NO eligibility or approval determination. It never
 * states that a person qualifies for a HECM, that a property qualifies,
 * or that a loan would be approved — it only performs the arithmetic HUD
 * publishes, using HUD's own published data, with no invented numbers.
 */

import { HECM_PLF_TABLE, HECM_PLF_TABLE_SOURCE } from "./plf-table";
import { CURRENT_HECM_MCA_LIMIT } from "./mca-limit";
import { roundExpectedRateToPlfGrid } from "./expected-rate";
import {
  calculateEstimatedNetPrincipalLimitBeforeSetAsides,
  calculateMandatoryObligations,
  type HecmMandatoryObligations,
} from "./mandatory-obligations";

/** Rounds a dollar amount to the nearest cent, avoiding binary-float artifacts. */
function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export type HecmPartyRole = "borrower" | "non-borrowing-spouse";

export type HecmParty = {
  role: HecmPartyRole;
  /** Age in whole years as of the date of calculation. */
  age: number;
};

/**
 * A HECM structurally requires at least one borrower age 62 or older —
 * the PLF table itself has no borrower-applicable entries below 62 (HUD's
 * own "General Table" starts there). Validating that boundary here is a
 * structural/mathematical constraint of the calculation, not a broader
 * eligibility judgment (residency, home equity sufficiency, counseling,
 * credit/financial assessment, etc. are untouched by this engine).
 */
const MINIMUM_BORROWER_AGE = 62;

/**
 * A non-borrowing spouse may be younger — HUD extended the PLF table down
 * to age 18 (via ML 2017-12's "Special Table") specifically so a younger
 * spouse's age can become the "youngest applicable age" used for the PLF
 * lookup, without disqualifying the loan. 18 is a plain legal-adult floor,
 * not a HUD-specific number.
 */
const MINIMUM_NON_BORROWING_SPOUSE_AGE = 18;

function validateParty(party: HecmParty, index: number): string[] {
  const errors: string[] = [];
  const label = `parties[${index}]`;

  if (party.role !== "borrower" && party.role !== "non-borrowing-spouse") {
    errors.push(`${label}: role must be "borrower" or "non-borrowing-spouse".`);
    return errors;
  }

  if (!Number.isInteger(party.age)) {
    errors.push(`${label}: age must be a whole number of years.`);
    return errors;
  }

  if (party.role === "borrower") {
    if (party.age < MINIMUM_BORROWER_AGE || party.age > HECM_PLF_TABLE_SOURCE.maxAge) {
      errors.push(
        `${label}: a borrower's age must be between ${MINIMUM_BORROWER_AGE} and ${HECM_PLF_TABLE_SOURCE.maxAge}.`
      );
    }
  } else {
    if (
      party.age < MINIMUM_NON_BORROWING_SPOUSE_AGE ||
      party.age > HECM_PLF_TABLE_SOURCE.maxAge
    ) {
      errors.push(
        `${label}: a non-borrowing spouse's age must be between ${MINIMUM_NON_BORROWING_SPOUSE_AGE} and ${HECM_PLF_TABLE_SOURCE.maxAge}.`
      );
    }
  }

  return errors;
}

/**
 * Selects the "youngest applicable age" used for the PLF lookup — the
 * youngest of all borrowers and any eligible non-borrowing spouse. Throws
 * on structurally invalid input (no parties, no borrower, an out-of-range
 * age) rather than silently guessing a value.
 */
export function selectYoungestApplicableAge(parties: HecmParty[]): number {
  if (!Array.isArray(parties) || parties.length === 0) {
    throw new RangeError("selectYoungestApplicableAge requires at least one party.");
  }

  const errors = parties.flatMap((party, index) => validateParty(party, index));
  if (errors.length > 0) {
    throw new RangeError(errors.join(" "));
  }

  if (!parties.some((party) => party.role === "borrower")) {
    throw new RangeError("selectYoungestApplicableAge requires at least one borrower.");
  }

  return Math.min(...parties.map((party) => party.age));
}

/**
 * Maximum Claim Amount is the lesser of the appraised property value and
 * the applicable HUD HECM limit for the calendar year — never a live or
 * estimated appraisal, and never higher than HUD's published ceiling.
 */
export function determineMaximumClaimAmount(
  propertyValue: number,
  hecmLimit: number = CURRENT_HECM_MCA_LIMIT.maximumClaimAmount
): number {
  if (!Number.isFinite(propertyValue) || propertyValue <= 0) {
    throw new RangeError("propertyValue must be a finite number greater than 0.");
  }
  if (!Number.isFinite(hecmLimit) || hecmLimit <= 0) {
    throw new RangeError("hecmLimit must be a finite number greater than 0.");
  }

  return Math.min(propertyValue, hecmLimit);
}

/**
 * Formats an expected-rate percentage as the exact three-decimal string
 * key the PLF table uses (e.g. 5 -> "5.000", 5.125 -> "5.125"). Exported
 * so callers/tests can build the same key the table itself uses, instead
 * of comparing raw floats.
 */
export function formatPlfRateKey(expectedRatePercent: number): string {
  return expectedRatePercent.toFixed(3);
}

/** True only when the rate falls exactly on one of HUD's published 0.125-point increments. */
function isOnPlfRateGrid(expectedRatePercent: number): boolean {
  const thousandths = Math.round(expectedRatePercent * 1000);
  return thousandths % 125 === 0;
}

/**
 * Looks up the exact HUD-published Principal Limit Factor for a given
 * age and expected interest rate. Never rounds, interpolates, or
 * extrapolates — if the exact (age, rate) pair isn't in HUD's published
 * table, this throws rather than approximating one.
 *
 * The expected rate must already be on HUD's exact 0.125-point grid
 * (3.000%-18.875%). This engine does not itself round a raw index+margin
 * rate onto that grid — the precise HUD rounding convention for that step
 * (e.g. nearest vs. floor) was not verified against a primary source in
 * this pass, so it is intentionally left to a future, separately-sourced
 * step rather than guessed here.
 */
export function selectPrincipalLimitFactor(age: number, expectedRatePercent: number): number {
  if (!Number.isInteger(age) || age < HECM_PLF_TABLE_SOURCE.minAge || age > HECM_PLF_TABLE_SOURCE.maxAge) {
    throw new RangeError(
      `age must be a whole number between ${HECM_PLF_TABLE_SOURCE.minAge} and ${HECM_PLF_TABLE_SOURCE.maxAge}.`
    );
  }
  if (!Number.isFinite(expectedRatePercent)) {
    throw new RangeError("expectedRatePercent must be a finite number.");
  }
  if (
    expectedRatePercent < HECM_PLF_TABLE_SOURCE.minExpectedRatePercent ||
    expectedRatePercent > HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent
  ) {
    throw new RangeError(
      `expectedRatePercent must be between ${HECM_PLF_TABLE_SOURCE.minExpectedRatePercent} and ${HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent}.`
    );
  }
  if (!isOnPlfRateGrid(expectedRatePercent)) {
    throw new RangeError(
      `expectedRatePercent must fall exactly on one of HUD's published ${HECM_PLF_TABLE_SOURCE.expectedRateStepPercent}-point increments (e.g. 5.000, 5.125, 5.250...).`
    );
  }

  const row = HECM_PLF_TABLE[age];
  const key = formatPlfRateKey(expectedRatePercent);
  const plf = row?.[key];

  if (plf === undefined) {
    throw new RangeError(
      `No published HUD Principal Limit Factor found for age ${age} at expected rate ${key}%.`
    );
  }

  return plf;
}

/** Initial Principal Limit = Maximum Claim Amount x Principal Limit Factor. */
export function calculateInitialPrincipalLimit(
  maximumClaimAmount: number,
  principalLimitFactor: number
): number {
  if (!Number.isFinite(maximumClaimAmount) || maximumClaimAmount <= 0) {
    throw new RangeError("maximumClaimAmount must be a finite number greater than 0.");
  }
  if (!Number.isFinite(principalLimitFactor) || principalLimitFactor <= 0 || principalLimitFactor > 1) {
    throw new RangeError("principalLimitFactor must be a finite number greater than 0 and no greater than 1.");
  }

  return roundToCents(maximumClaimAmount * principalLimitFactor);
}

export type PreliminaryRemainingPrincipalLimit = {
  initialPrincipalLimit: number;
  existingLienBalance: number;
  /**
   * IMPORTANT: this is NOT "cash available to the borrower." It is only
   * the Initial Principal Limit minus whatever existing mortgage/lien
   * balance was entered — before closing costs, the origination fee,
   * upfront MIP, servicing-fee set-asides, any LESA, or initial
   * disbursement-period limits are applied. Every one of those still
   * reduces what a borrower could actually access, and none of them are
   * calculated by this engine yet. Can be negative when the existing lien
   * exceeds the preliminary principal limit — that is valid output, not
   * an error, and simply signals the estimate goes negative at this
   * preliminary stage.
   */
  preliminaryRemainingPrincipalLimit: number;
};

/** Subtracts an existing mortgage/lien balance from the Initial Principal Limit. */
export function subtractExistingLienBalance(
  initialPrincipalLimit: number,
  existingLienBalance: number
): PreliminaryRemainingPrincipalLimit {
  if (!Number.isFinite(initialPrincipalLimit) || initialPrincipalLimit < 0) {
    throw new RangeError("initialPrincipalLimit must be a finite number of 0 or greater.");
  }
  if (!Number.isFinite(existingLienBalance) || existingLienBalance < 0) {
    throw new RangeError("existingLienBalance must be a finite number of 0 or greater — a lien cannot be negative.");
  }

  const roundedLimit = roundToCents(initialPrincipalLimit);
  const roundedLien = roundToCents(existingLienBalance);

  return {
    initialPrincipalLimit: roundedLimit,
    existingLienBalance: roundedLien,
    preliminaryRemainingPrincipalLimit: roundToCents(roundedLimit - roundedLien),
  };
}

// ---------------------------------------------------------------------
// Composed, UI-friendly entry point — mirrors the discriminated-union
// shape used by the forward Home Payment Explorer's calculateHomePayment,
// so a future UI step can consume both engines the same way. Nothing
// here calculates anything the individual functions above don't already
// calculate; it only sequences them and turns thrown validation errors
// into a renderable list.
// ---------------------------------------------------------------------

export type HecmPreliminaryEstimateInputs = {
  parties: HecmParty[];
  propertyValue: number;
  /** Raw entered expected rate — rounded onto HUD's 0.125-point PLF grid internally; see expected-rate.ts. */
  expectedRatePercent: number;
  existingLienBalance: number;
  /** No universal HUD-prescribed amount exists for these — optional, defaults to 0, never invented. */
  otherClosingCosts?: number;
  /** Defaults to the current HUD MCA limit — override only for testing a different calendar year's published limit. */
  hecmMaximumClaimAmountLimit?: number;
};

export type HecmPreliminaryEstimateResult = {
  youngestApplicableAge: number;
  maximumClaimAmount: number;
  /** The rate as entered, before grid rounding. */
  expectedRatePercent: number;
  /** The rate actually used for the PLF lookup, after rounding to HUD's 0.125-point grid. */
  roundedExpectedRatePercent: number;
  principalLimitFactor: number;
  initialPrincipalLimit: number;
  /** From subtractExistingLienBalance — existing lien only, nothing else subtracted yet. Kept for continuity with the original foundation step. */
  preliminaryRemainingPrincipalLimit: number;
  /** Existing lien + upfront MIP + origination fee + user-entered closing costs. */
  mandatoryObligations: HecmMandatoryObligations;
  /**
   * Initial Principal Limit minus total mandatory obligations. NOT "cash
   * available," "proceeds," "money you get," or "the amount you qualify
   * for" — see calculateEstimatedNetPrincipalLimitBeforeSetAsides's doc
   * comment for exactly what's still excluded.
   */
  estimatedNetPrincipalLimitBeforeSetAsides: number;
};

export type HecmPreliminaryEstimateCalculation =
  | { ok: true; result: HecmPreliminaryEstimateResult }
  | { ok: false; errors: string[] };

/** Non-throwing validation pass — collects every problem instead of stopping at the first. */
export function validateHecmPreliminaryEstimateInputs(
  inputs: Partial<HecmPreliminaryEstimateInputs>
): string[] {
  const errors: string[] = [];

  if (!Array.isArray(inputs.parties) || inputs.parties.length === 0) {
    errors.push("At least one party (borrower) is required.");
  } else {
    for (let i = 0; i < inputs.parties.length; i++) {
      errors.push(...validateParty(inputs.parties[i], i));
    }
    if (errors.length === 0 && !inputs.parties.some((party) => party.role === "borrower")) {
      errors.push("At least one party must be a borrower.");
    }
  }

  if (!Number.isFinite(inputs.propertyValue) || (inputs.propertyValue as number) <= 0) {
    errors.push("Property value must be a number greater than 0.");
  }

  const rate = inputs.expectedRatePercent;
  if (!Number.isFinite(rate)) {
    errors.push("Expected rate must be a number.");
  } else {
    // Rounded first, per HUD's own PLF-lookup rounding rule (see
    // expected-rate.ts) — a raw rate just outside the table's bounds can
    // legitimately round into range (e.g. 2.99% rounds to 3.000%), so
    // bounds are checked on the rounded value, not the raw entry.
    const rounded = roundExpectedRateToPlfGrid(rate as number);
    if (
      rounded < HECM_PLF_TABLE_SOURCE.minExpectedRatePercent ||
      rounded > HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent
    ) {
      errors.push(
        `Expected rate must round to a value between ${HECM_PLF_TABLE_SOURCE.minExpectedRatePercent}% and ${HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent}% (HUD's published PLF table range).`
      );
    }
  }

  if (!Number.isFinite(inputs.existingLienBalance) || (inputs.existingLienBalance as number) < 0) {
    errors.push("Existing lien balance must be a number of 0 or greater.");
  }

  if (
    inputs.otherClosingCosts !== undefined &&
    (!Number.isFinite(inputs.otherClosingCosts) || inputs.otherClosingCosts < 0)
  ) {
    errors.push("Other closing costs must be a number of 0 or greater when provided.");
  }

  return errors;
}

/**
 * Runs the full foundation calculation: youngest applicable age -> Maximum
 * Claim Amount -> expected-rate grid rounding -> Principal Limit Factor ->
 * Initial Principal Limit -> mandatory obligations (existing lien,
 * upfront MIP, origination fee, other entered closing costs) ->
 * estimated net principal limit before set-asides. Returns a
 * discriminated union instead of throwing, for a future UI to render
 * validation errors inline.
 */
export function calculateHecmPreliminaryEstimate(
  inputs: HecmPreliminaryEstimateInputs
): HecmPreliminaryEstimateCalculation {
  const errors = validateHecmPreliminaryEstimateInputs(inputs);
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const youngestApplicableAge = selectYoungestApplicableAge(inputs.parties);
  const maximumClaimAmount = determineMaximumClaimAmount(
    inputs.propertyValue,
    inputs.hecmMaximumClaimAmountLimit
  );
  const roundedExpectedRatePercent = roundExpectedRateToPlfGrid(inputs.expectedRatePercent);
  const principalLimitFactor = selectPrincipalLimitFactor(youngestApplicableAge, roundedExpectedRatePercent);
  const initialPrincipalLimit = calculateInitialPrincipalLimit(maximumClaimAmount, principalLimitFactor);
  const { preliminaryRemainingPrincipalLimit } = subtractExistingLienBalance(
    initialPrincipalLimit,
    inputs.existingLienBalance
  );

  const mandatoryObligations = calculateMandatoryObligations({
    maximumClaimAmount,
    existingLienBalance: inputs.existingLienBalance,
    otherClosingCosts: inputs.otherClosingCosts ?? 0,
  });
  const estimatedNetPrincipalLimitBeforeSetAsides = calculateEstimatedNetPrincipalLimitBeforeSetAsides(
    initialPrincipalLimit,
    mandatoryObligations.totalMandatoryObligations
  );

  return {
    ok: true,
    result: {
      youngestApplicableAge,
      maximumClaimAmount,
      expectedRatePercent: inputs.expectedRatePercent,
      roundedExpectedRatePercent,
      principalLimitFactor,
      initialPrincipalLimit,
      preliminaryRemainingPrincipalLimit,
      mandatoryObligations,
      estimatedNetPrincipalLimitBeforeSetAsides,
    },
  };
}
