/**
 * HECM BASIC MANDATORY OBLIGATIONS
 * ====================================
 * Only the obligations with a universal, HUD-prescribed calculation are
 * computed here (upfront MIP, the origination fee cap). Everything else
 * without a universal HUD-prescribed amount — title, appraisal,
 * recording, counseling, servicing, or other third-party fees — is never
 * invented; it is accepted only as a plain user-entered dollar figure
 * ("other closing costs" below).
 *
 * OUT OF SCOPE for this file (future, separate work): LESA, servicing-fee
 * set-asides, initial disbursement-period limits, tenure/term payment
 * plans, line-of-credit growth, HECM for Purchase, and proprietary
 * (non-FHA) reverse mortgages.
 */

/**
 * Initial (upfront) Mortgage Insurance Premium.
 * Source: HUD Mortgagee Letter 2017-12 (Aug. 29, 2017) — "The initial MIP
 * rate is changed to two percent (2.00%) of the Maximum Claim Amount
 * (MCA)." Effective for HECM case numbers assigned on or after October
 * 2, 2017. Cross-checked 2026-08-13 against current reverse-mortgage
 * industry references dated for 2025-2026 originations, none of which
 * indicate this rate has since been superseded by a later Mortgagee
 * Letter — 2.00% of MCA remains the figure used here.
 */
export const HECM_UPFRONT_MIP_RATE = {
  ratePercentOfMaximumClaimAmount: 2.0,
  sourceDocument: "HUD Mortgagee Letter 2017-12",
  sourceDocumentDate: "2017-08-29",
  effectiveDescription: "HECM case numbers assigned on or after October 2, 2017",
  crossCheckedAsOf: "2026-08-13",
} as const;

/**
 * Loan origination fee limit, per 24 CFR § 206.31 ("Allowable Charges and
 * Fees"), fetched and read directly 2026-08-13: "The loan origination fee
 * limit shall be the greater of $2,500 or two percent of the maximum
 * claim amount of $200,000, plus one percent of any portion of the
 * maximum claim amount that is greater than $200,000. The total amount
 * of the loan origination fee may not exceed $6,000, except that the
 * Commissioner may through notice adjust the maximum limit in accordance
 * with the annual percentage increase in the Consumer Price Index."
 * No such CPI-based notice raising the $6,000 cap was found — every
 * current (2025-2026) reference checked still cites $6,000, unchanged
 * since Mortgagee Letter 2008-34 first set it.
 */
export const HECM_ORIGINATION_FEE_RULE = {
  minimumFee: 2_500,
  firstTierMaximumClaimAmount: 200_000,
  firstTierRatePercent: 2.0,
  secondTierRatePercent: 1.0,
  maximumFee: 6_000,
  sourceRegulation: "24 CFR § 206.31",
  crossCheckedAsOf: "2026-08-13",
} as const;

/** Rounds a dollar amount to the nearest cent. */
function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Initial (upfront) MIP = 2.00% of the Maximum Claim Amount. */
export function calculateUpfrontMip(maximumClaimAmount: number): number {
  if (!Number.isFinite(maximumClaimAmount) || maximumClaimAmount <= 0) {
    throw new RangeError("maximumClaimAmount must be a finite number greater than 0.");
  }
  return roundToCents(
    maximumClaimAmount * (HECM_UPFRONT_MIP_RATE.ratePercentOfMaximumClaimAmount / 100)
  );
}

/**
 * Loan origination fee, per 24 CFR § 206.31's tiered formula, floored at
 * $2,500 and capped at $6,000.
 */
export function calculateOriginationFee(maximumClaimAmount: number): number {
  if (!Number.isFinite(maximumClaimAmount) || maximumClaimAmount <= 0) {
    throw new RangeError("maximumClaimAmount must be a finite number greater than 0.");
  }

  const { firstTierMaximumClaimAmount, firstTierRatePercent, secondTierRatePercent, minimumFee, maximumFee } =
    HECM_ORIGINATION_FEE_RULE;

  const tieredAmount =
    maximumClaimAmount <= firstTierMaximumClaimAmount
      ? maximumClaimAmount * (firstTierRatePercent / 100)
      : firstTierMaximumClaimAmount * (firstTierRatePercent / 100) +
        (maximumClaimAmount - firstTierMaximumClaimAmount) * (secondTierRatePercent / 100);

  const flooredAmount = Math.max(minimumFee, tieredAmount);
  return roundToCents(Math.min(flooredAmount, maximumFee));
}

export type HecmMandatoryObligationsInputs = {
  maximumClaimAmount: number;
  existingLienBalance: number;
  /** No universal HUD-prescribed amount exists for these — accepted only as a user-entered figure, never invented. */
  otherClosingCosts: number;
};

export type HecmMandatoryObligations = {
  existingLienBalance: number;
  upfrontMip: number;
  originationFee: number;
  otherClosingCosts: number;
  totalMandatoryObligations: number;
};

/** Sums every currently-supported mandatory obligation: existing lien + upfront MIP + origination fee + user-entered closing costs. */
export function calculateMandatoryObligations(
  inputs: HecmMandatoryObligationsInputs
): HecmMandatoryObligations {
  if (!Number.isFinite(inputs.maximumClaimAmount) || inputs.maximumClaimAmount <= 0) {
    throw new RangeError("maximumClaimAmount must be a finite number greater than 0.");
  }
  if (!Number.isFinite(inputs.existingLienBalance) || inputs.existingLienBalance < 0) {
    throw new RangeError("existingLienBalance must be a finite number of 0 or greater — a lien cannot be negative.");
  }
  if (!Number.isFinite(inputs.otherClosingCosts) || inputs.otherClosingCosts < 0) {
    throw new RangeError("otherClosingCosts must be a finite number of 0 or greater.");
  }

  const existingLienBalance = roundToCents(inputs.existingLienBalance);
  const upfrontMip = calculateUpfrontMip(inputs.maximumClaimAmount);
  const originationFee = calculateOriginationFee(inputs.maximumClaimAmount);
  const otherClosingCosts = roundToCents(inputs.otherClosingCosts);

  return {
    existingLienBalance,
    upfrontMip,
    originationFee,
    otherClosingCosts,
    totalMandatoryObligations: roundToCents(
      existingLienBalance + upfrontMip + originationFee + otherClosingCosts
    ),
  };
}

/**
 * Initial Principal Limit minus total mandatory obligations.
 *
 * NOT "cash available," NOT "proceeds," NOT "money you get," and NOT
 * "the amount you qualify for." It is only what remains of the Initial
 * Principal Limit after the existing lien, upfront MIP, the origination
 * fee, and any user-entered closing costs — before a LESA, any
 * servicing-fee set-aside, or initial disbursement-period limits are
 * applied. All of those still further reduce what a borrower could
 * actually access, and none of them are calculated by this engine yet.
 * Can be negative when mandatory obligations exceed the Initial
 * Principal Limit — that is valid output, not an error.
 */
export function calculateEstimatedNetPrincipalLimitBeforeSetAsides(
  initialPrincipalLimit: number,
  totalMandatoryObligations: number
): number {
  if (!Number.isFinite(initialPrincipalLimit) || initialPrincipalLimit < 0) {
    throw new RangeError("initialPrincipalLimit must be a finite number of 0 or greater.");
  }
  if (!Number.isFinite(totalMandatoryObligations) || totalMandatoryObligations < 0) {
    throw new RangeError("totalMandatoryObligations must be a finite number of 0 or greater.");
  }

  return roundToCents(initialPrincipalLimit - totalMandatoryObligations);
}
