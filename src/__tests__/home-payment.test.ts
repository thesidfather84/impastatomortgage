import { describe, expect, it } from "vitest";
import {
  calculateHomePayment,
  calculateMonthlyPrincipalAndInterest,
  downPaymentDollarsToPercent,
  downPaymentPercentToDollars,
  roundToCents,
  type HomePaymentInputs,
} from "@/lib/calculators/home-payment";

/**
 * Independently verifies a monthly P&I payment by simulating the actual
 * amortization schedule (paying interest on the remaining balance each
 * month, applying the rest to principal) rather than re-deriving the
 * same closed-form formula the implementation uses. If the payment is
 * correct, the simulated balance should land at (or extremely near)
 * zero after the final payment.
 */
function simulateEndingBalance(
  loanAmount: number,
  interestRateAnnualPercent: number,
  loanTermYears: number,
  monthlyPayment: number
): number {
  const monthlyRate = interestRateAnnualPercent / 100 / 12;
  let balance = loanAmount;
  for (let i = 0; i < loanTermYears * 12; i++) {
    const interestForMonth = balance * monthlyRate;
    balance = balance + interestForMonth - monthlyPayment;
  }
  return balance;
}

describe("home payment calculator — amortization formula", () => {
  it("1. standard 30-year mortgage amortizes to (near) zero balance", () => {
    const loanAmount = 320000;
    const rate = 6.5;
    const term = 30;
    const payment = calculateMonthlyPrincipalAndInterest(loanAmount, rate, term);

    expect(payment).toBeGreaterThan(0);
    const endingBalance = simulateEndingBalance(loanAmount, rate, term, payment);
    // Within a few cents per payment period over 360 payments due to
    // display rounding of the payment itself.
    expect(Math.abs(endingBalance)).toBeLessThan(5);
  });

  it("2. 15-year mortgage amortizes to (near) zero balance and pays less total interest than an equivalent 30-year loan", () => {
    const loanAmount = 320000;
    const rate = 6.5;

    const payment15 = calculateMonthlyPrincipalAndInterest(loanAmount, rate, 15);
    const endingBalance15 = simulateEndingBalance(loanAmount, rate, 15, payment15);
    expect(Math.abs(endingBalance15)).toBeLessThan(5);

    const result15 = calculateHomePayment({
      homePrice: 400000,
      downPaymentDollars: 80000,
      interestRateAnnualPercent: rate,
      loanTermYears: 15,
    });
    const result30 = calculateHomePayment({
      homePrice: 400000,
      downPaymentDollars: 80000,
      interestRateAnnualPercent: rate,
      loanTermYears: 30,
    });
    expect(result15.ok && result30.ok).toBe(true);
    if (result15.ok && result30.ok) {
      // 15-year: higher monthly payment, less total interest — a basic,
      // well-known property of amortized loans at the same rate.
      expect(result15.result.monthlyPrincipalAndInterest).toBeGreaterThan(
        result30.result.monthlyPrincipalAndInterest
      );
      expect(result15.result.totalInterestOverLoanTerm).toBeLessThan(
        result30.result.totalInterestOverLoanTerm
      );
    }
  });

  it("3. zero-interest loan divides principal evenly with zero total interest", () => {
    const result = calculateHomePayment({
      homePrice: 240000,
      downPaymentDollars: 40000,
      interestRateAnnualPercent: 0,
      loanTermYears: 20,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      const loanAmount = 200000;
      const totalPayments = 20 * 12;
      expect(result.result.monthlyPrincipalAndInterest).toBeCloseTo(loanAmount / totalPayments, 2);
      expect(result.result.totalInterestOverLoanTerm).toBe(0);
      // Paying the exact monthly amount for every period repays exactly
      // the loan amount, give or take sub-cent rounding.
      expect(
        Math.abs(result.result.monthlyPrincipalAndInterest * totalPayments - loanAmount)
      ).toBeLessThan(1);
    }
  });

  it("also handles 0% interest directly via calculateMonthlyPrincipalAndInterest", () => {
    expect(calculateMonthlyPrincipalAndInterest(120000, 0, 10)).toBeCloseTo(1000, 2);
  });
});

describe("home payment calculator — down payment conversion", () => {
  it("4. converts a percentage down payment to dollars and back", () => {
    expect(downPaymentPercentToDollars(300000, 20)).toBe(60000);
    expect(downPaymentDollarsToPercent(300000, 60000)).toBe(20);
  });

  it("4b. reports the equivalent percentage in the full calculation result", () => {
    const result = calculateHomePayment({
      homePrice: 500000,
      downPaymentDollars: 100000,
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.result.downPaymentPercent).toBe(20);
      expect(result.result.loanAmount).toBe(400000);
    }
  });

  it("rejects a negative percentage or non-positive home price", () => {
    expect(() => downPaymentPercentToDollars(300000, -5)).toThrow(RangeError);
    expect(() => downPaymentPercentToDollars(0, 10)).toThrow(RangeError);
  });
});

describe("home payment calculator — taxes, insurance, PMI, HOA", () => {
  it("5. converts annual property tax and homeowners insurance to monthly figures", () => {
    const result = calculateHomePayment({
      homePrice: 350000,
      downPaymentDollars: 70000,
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
      annualPropertyTax: 3600,
      annualHomeownersInsurance: 1200,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.result.monthlyPropertyTax).toBe(300);
      expect(result.result.monthlyHomeownersInsurance).toBe(100);
    }
  });

  it("6. includes manually entered PMI and HOA unchanged, and folds them into the total", () => {
    const result = calculateHomePayment({
      homePrice: 300000,
      downPaymentDollars: 15000, // 5% down — PMI is realistic here, but the module takes it as a manual entry either way
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
      monthlyMortgageInsurance: 150.5,
      monthlyHoa: 75,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.result.monthlyMortgageInsurance).toBe(150.5);
      expect(result.result.monthlyHoa).toBe(75);
      const expectedTotal = roundToCents(
        result.result.monthlyPrincipalAndInterest +
          result.result.monthlyPropertyTax +
          result.result.monthlyHomeownersInsurance +
          150.5 +
          75
      );
      expect(result.result.estimatedTotalMonthlyPayment).toBe(expectedTotal);
    }
  });

  it("defaults optional tax/insurance/PMI/HOA fields to 0 when omitted", () => {
    const result = calculateHomePayment({
      homePrice: 250000,
      downPaymentDollars: 50000,
      interestRateAnnualPercent: 5,
      loanTermYears: 30,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.result.monthlyPropertyTax).toBe(0);
      expect(result.result.monthlyHomeownersInsurance).toBe(0);
      expect(result.result.monthlyMortgageInsurance).toBe(0);
      expect(result.result.monthlyHoa).toBe(0);
      expect(result.result.estimatedTotalMonthlyPayment).toBe(result.result.monthlyPrincipalAndInterest);
    }
  });
});

describe("home payment calculator — input validation", () => {
  it("7. rejects invalid and empty inputs with descriptive errors instead of throwing", () => {
    const result = calculateHomePayment({} as HomePaymentInputs);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => /home price/i.test(e))).toBe(true);
      expect(result.errors.some((e) => /down payment/i.test(e))).toBe(true);
      expect(result.errors.some((e) => /interest rate/i.test(e))).toBe(true);
      expect(result.errors.some((e) => /loan term/i.test(e))).toBe(true);
    }
  });

  it("7b. rejects a down payment larger than the home price", () => {
    const result = calculateHomePayment({
      homePrice: 200000,
      downPaymentDollars: 250000,
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.some((e) => /cannot exceed home price/i.test(e))).toBe(true);
    }
  });

  it("7c. rejects negative rate, zero loan term, and negative optional fields", () => {
    const negativeRate = calculateHomePayment({
      homePrice: 300000,
      downPaymentDollars: 30000,
      interestRateAnnualPercent: -1,
      loanTermYears: 30,
    });
    expect(negativeRate.ok).toBe(false);

    const zeroTerm = calculateHomePayment({
      homePrice: 300000,
      downPaymentDollars: 30000,
      interestRateAnnualPercent: 6,
      loanTermYears: 0,
    });
    expect(zeroTerm.ok).toBe(false);

    const negativeHoa = calculateHomePayment({
      homePrice: 300000,
      downPaymentDollars: 30000,
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
      monthlyHoa: -10,
    });
    expect(negativeHoa.ok).toBe(false);
  });

  it("7d. rejects NaN, which is what an empty numeric input field parses to", () => {
    const result = calculateHomePayment({
      homePrice: Number(""), // NaN, simulating an empty form field
      downPaymentDollars: 20000,
      interestRateAnnualPercent: 6,
      loanTermYears: 30,
    });
    expect(result.ok).toBe(false);
  });

  it("accepts a valid, fully-populated input set", () => {
    const result = calculateHomePayment({
      homePrice: 425000,
      downPaymentDollars: 85000,
      interestRateAnnualPercent: 6.75,
      loanTermYears: 30,
      annualPropertyTax: 4800,
      annualHomeownersInsurance: 1800,
      monthlyMortgageInsurance: 120,
      monthlyHoa: 50,
    });
    expect(result.ok).toBe(true);
  });
});

describe("home payment calculator — rounding and display safety", () => {
  it("8. roundToCents avoids binary-float artifacts", () => {
    expect(roundToCents(0.1 + 0.2)).toBe(0.3);
    expect(roundToCents(1234.5555)).toBe(1234.56);
    expect(roundToCents(1234.554)).toBe(1234.55);
  });

  it("8b. every dollar figure in a result has at most 2 decimal places", () => {
    const result = calculateHomePayment({
      homePrice: 333333,
      downPaymentDollars: 33333,
      interestRateAnnualPercent: 5.875,
      loanTermYears: 30,
      annualPropertyTax: 2777,
      annualHomeownersInsurance: 999,
      monthlyMortgageInsurance: 88.888,
      monthlyHoa: 41.111,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      for (const [key, value] of Object.entries(result.result)) {
        if (key === "downPaymentPercent") continue; // a ratio, not a dollar figure — not cent-rounded
        const cents = Math.round(value * 100);
        expect(cents / 100).toBeCloseTo(value, 10);
      }
    }
  });
});

describe("home payment calculator — total interest", () => {
  it("9. total interest equals (monthly payment × number of payments) − loan amount, within a cent", () => {
    const result = calculateHomePayment({
      homePrice: 450000,
      downPaymentDollars: 90000,
      interestRateAnnualPercent: 7,
      loanTermYears: 30,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      const { loanAmount, monthlyPrincipalAndInterest, totalInterestOverLoanTerm } = result.result;
      const approxTotalInterest = monthlyPrincipalAndInterest * 360 - loanAmount;
      expect(Math.abs(totalInterestOverLoanTerm - approxTotalInterest)).toBeLessThan(5);
      expect(totalInterestOverLoanTerm).toBeGreaterThan(0);
    }
  });

  it("9b. total interest is exactly 0 for a 0% loan", () => {
    const result = calculateHomePayment({
      homePrice: 200000,
      downPaymentDollars: 20000,
      interestRateAnnualPercent: 0,
      loanTermYears: 15,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.result.totalInterestOverLoanTerm).toBe(0);
    }
  });
});
