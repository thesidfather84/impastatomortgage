/**
 * HOME PAYMENT EXPLORER — CALCULATION ENGINE
 * ============================================
 * Pure arithmetic only — no React, no UI, no live rate lookups, and no
 * FHA/VA/USDA/HECM-specific rules or eligibility logic. This is a plain
 * fixed-rate amortization calculator producing an *estimate*, not a loan
 * offer, approval, or qualification determination.
 *
 * Every dollar figure in/out is a plain number of US dollars. Callers
 * (the future UI) are responsible for parsing user input into numbers
 * before calling these functions, and for presenting the result as an
 * estimate alongside the site's standard calculator disclosures.
 */

export type HomePaymentInputs = {
  /** Total purchase price of the home, in dollars. */
  homePrice: number;
  /** Down payment amount, in dollars (not a percentage — see downPaymentPercentToDollars). */
  downPaymentDollars: number;
  /** Annual interest rate as a percentage, e.g. 6.5 for 6.5%. */
  interestRateAnnualPercent: number;
  /** Loan term in years, e.g. 30 or 15. */
  loanTermYears: number;
  /** Estimated annual property tax, in dollars. Optional — defaults to 0. */
  annualPropertyTax?: number;
  /** Estimated annual homeowners insurance, in dollars. Optional — defaults to 0. */
  annualHomeownersInsurance?: number;
  /** Manually entered monthly mortgage insurance (PMI/MIP), in dollars. Optional — defaults to 0. */
  monthlyMortgageInsurance?: number;
  /** Manually entered monthly HOA dues, in dollars. Optional — defaults to 0. */
  monthlyHoa?: number;
};

export type HomePaymentResult = {
  loanAmount: number;
  downPaymentPercent: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeownersInsurance: number;
  monthlyMortgageInsurance: number;
  monthlyHoa: number;
  /** Sum of P&I + monthly tax + monthly insurance + PMI/MIP + HOA. */
  estimatedTotalMonthlyPayment: number;
  /** Total interest paid over the full loan term, assuming every payment is made on schedule. */
  totalInterestOverLoanTerm: number;
};

export type HomePaymentCalculationResult =
  | { ok: true; result: HomePaymentResult }
  | { ok: false; errors: string[] };

const MAX_SANE_INTEREST_RATE_PERCENT = 100;
const MAX_SANE_LOAN_TERM_YEARS = 50;

/** Rounds a dollar amount to the nearest cent, avoiding binary-float artifacts like 1234.5599999999998. */
export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Converts a down payment expressed as a percentage of home price into a dollar amount. */
export function downPaymentPercentToDollars(homePrice: number, downPaymentPercent: number): number {
  if (!Number.isFinite(homePrice) || homePrice <= 0) {
    throw new RangeError("homePrice must be a finite number greater than 0.");
  }
  if (!Number.isFinite(downPaymentPercent) || downPaymentPercent < 0) {
    throw new RangeError("downPaymentPercent must be a finite number of 0 or greater.");
  }
  return roundToCents(homePrice * (downPaymentPercent / 100));
}

/** Converts a down payment expressed in dollars into a percentage of home price. */
export function downPaymentDollarsToPercent(homePrice: number, downPaymentDollars: number): number {
  if (!Number.isFinite(homePrice) || homePrice <= 0) {
    throw new RangeError("homePrice must be a finite number greater than 0.");
  }
  if (!Number.isFinite(downPaymentDollars) || downPaymentDollars < 0) {
    throw new RangeError("downPaymentDollars must be a finite number of 0 or greater.");
  }
  return (downPaymentDollars / homePrice) * 100;
}

function validateAmortizationInputs(
  loanAmount: number,
  interestRateAnnualPercent: number,
  loanTermYears: number
): void {
  if (!Number.isFinite(loanAmount) || loanAmount < 0) {
    throw new RangeError("loanAmount must be a finite number of 0 or greater.");
  }
  if (!Number.isFinite(interestRateAnnualPercent) || interestRateAnnualPercent < 0) {
    throw new RangeError("interestRateAnnualPercent must be a finite number of 0 or greater.");
  }
  if (!Number.isFinite(loanTermYears) || loanTermYears <= 0) {
    throw new RangeError("loanTermYears must be a finite number greater than 0.");
  }
}

/**
 * Unrounded monthly principal & interest payment, via the standard
 * amortization formula:
 *
 *   M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 *
 * where P is the loan amount, r is the monthly interest rate (annual
 * rate / 100 / 12), and n is the total number of monthly payments
 * (years * 12). At 0% interest the formula above divides by zero, so
 * that case is handled separately as simple, interest-free division.
 *
 * Kept internal and unrounded so total-interest math (which multiplies
 * this by hundreds of payments) doesn't compound cent-level rounding
 * error — only the final displayed figures get rounded, in
 * `calculateMonthlyPrincipalAndInterest` and `calculateHomePayment`.
 */
function calculateRawMonthlyPrincipalAndInterest(
  loanAmount: number,
  interestRateAnnualPercent: number,
  loanTermYears: number
): number {
  validateAmortizationInputs(loanAmount, interestRateAnnualPercent, loanTermYears);

  const totalPayments = loanTermYears * 12;

  if (loanAmount === 0) return 0;

  if (interestRateAnnualPercent === 0) {
    return loanAmount / totalPayments;
  }

  const monthlyRate = interestRateAnnualPercent / 100 / 12;
  const growth = Math.pow(1 + monthlyRate, totalPayments);
  return (loanAmount * (monthlyRate * growth)) / (growth - 1);
}

/** Rounded, display-safe monthly principal & interest payment — see calculateRawMonthlyPrincipalAndInterest for the formula. */
export function calculateMonthlyPrincipalAndInterest(
  loanAmount: number,
  interestRateAnnualPercent: number,
  loanTermYears: number
): number {
  return roundToCents(
    calculateRawMonthlyPrincipalAndInterest(loanAmount, interestRateAnnualPercent, loanTermYears)
  );
}

/**
 * Validates a set of Home Payment Explorer inputs. Returns an empty array
 * when valid. Every bound here is a plain arithmetic sanity check, not a
 * lending rule — e.g. the 100% interest-rate ceiling exists to catch a
 * fat-fingered input, not to describe a real loan product limit.
 */
export function validateHomePaymentInputs(inputs: Partial<HomePaymentInputs>): string[] {
  const errors: string[] = [];

  if (!Number.isFinite(inputs.homePrice) || (inputs.homePrice as number) <= 0) {
    errors.push("Home price must be a number greater than 0.");
  }

  if (!Number.isFinite(inputs.downPaymentDollars) || (inputs.downPaymentDollars as number) < 0) {
    errors.push("Down payment must be a number of 0 or greater.");
  } else if (
    Number.isFinite(inputs.homePrice) &&
    (inputs.homePrice as number) > 0 &&
    (inputs.downPaymentDollars as number) > (inputs.homePrice as number)
  ) {
    errors.push("Down payment cannot exceed home price.");
  }

  if (
    !Number.isFinite(inputs.interestRateAnnualPercent) ||
    (inputs.interestRateAnnualPercent as number) < 0
  ) {
    errors.push("Interest rate must be a number of 0 or greater.");
  } else if ((inputs.interestRateAnnualPercent as number) > MAX_SANE_INTEREST_RATE_PERCENT) {
    errors.push(`Interest rate must be ${MAX_SANE_INTEREST_RATE_PERCENT} or less.`);
  }

  if (!Number.isFinite(inputs.loanTermYears) || (inputs.loanTermYears as number) <= 0) {
    errors.push("Loan term must be a number of years greater than 0.");
  } else if ((inputs.loanTermYears as number) > MAX_SANE_LOAN_TERM_YEARS) {
    errors.push(`Loan term must be ${MAX_SANE_LOAN_TERM_YEARS} years or fewer.`);
  }

  const optionalNonNegativeFields: (keyof HomePaymentInputs)[] = [
    "annualPropertyTax",
    "annualHomeownersInsurance",
    "monthlyMortgageInsurance",
    "monthlyHoa",
  ];
  for (const field of optionalNonNegativeFields) {
    const value = inputs[field];
    if (value !== undefined && (!Number.isFinite(value) || (value as number) < 0)) {
      errors.push(`${field} must be a number of 0 or greater when provided.`);
    }
  }

  return errors;
}

/**
 * Calculates the full Home Payment Explorer estimate. Returns a
 * discriminated union rather than throwing, so a future UI can render
 * validation errors inline without a try/catch.
 */
export function calculateHomePayment(inputs: HomePaymentInputs): HomePaymentCalculationResult {
  const errors = validateHomePaymentInputs(inputs);
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const {
    homePrice,
    downPaymentDollars,
    interestRateAnnualPercent,
    loanTermYears,
    annualPropertyTax = 0,
    annualHomeownersInsurance = 0,
    monthlyMortgageInsurance = 0,
    monthlyHoa = 0,
  } = inputs;

  const loanAmount = roundToCents(homePrice - downPaymentDollars);
  const downPaymentPercent = downPaymentDollarsToPercent(homePrice, downPaymentDollars);

  const rawMonthlyPrincipalAndInterest = calculateRawMonthlyPrincipalAndInterest(
    loanAmount,
    interestRateAnnualPercent,
    loanTermYears
  );
  const monthlyPrincipalAndInterest = roundToCents(rawMonthlyPrincipalAndInterest);

  const monthlyPropertyTax = roundToCents(annualPropertyTax / 12);
  const monthlyHomeownersInsurance = roundToCents(annualHomeownersInsurance / 12);

  const estimatedTotalMonthlyPayment = roundToCents(
    monthlyPrincipalAndInterest +
      monthlyPropertyTax +
      monthlyHomeownersInsurance +
      monthlyMortgageInsurance +
      monthlyHoa
  );

  // Total interest is derived from the *unrounded* payment total minus
  // principal, then rounded once at the end — using the display-rounded
  // monthly payment here instead would drift from the true total by a
  // few dollars once multiplied across hundreds of payments.
  const totalPayments = loanTermYears * 12;
  const totalInterestOverLoanTerm =
    interestRateAnnualPercent === 0
      ? 0
      : roundToCents(rawMonthlyPrincipalAndInterest * totalPayments - loanAmount);

  return {
    ok: true,
    result: {
      loanAmount,
      downPaymentPercent,
      monthlyPrincipalAndInterest,
      monthlyPropertyTax,
      monthlyHomeownersInsurance,
      monthlyMortgageInsurance: roundToCents(monthlyMortgageInsurance),
      monthlyHoa: roundToCents(monthlyHoa),
      estimatedTotalMonthlyPayment,
      totalInterestOverLoanTerm,
    },
  };
}
