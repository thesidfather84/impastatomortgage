import { describe, expect, it } from "vitest";
import {
  calculateHecmPreliminaryEstimate,
  calculateInitialPrincipalLimit,
  determineMaximumClaimAmount,
  formatPlfRateKey,
  selectPrincipalLimitFactor,
  selectYoungestApplicableAge,
  subtractExistingLienBalance,
  validateHecmPreliminaryEstimateInputs,
  type HecmParty,
} from "@/lib/calculators/hecm/engine";
import { CURRENT_HECM_MCA_LIMIT } from "@/lib/calculators/hecm/mca-limit";

describe("1. selectYoungestApplicableAge", () => {
  it("returns the single borrower's age when there is only one party", () => {
    expect(selectYoungestApplicableAge([{ role: "borrower", age: 70 }])).toBe(70);
  });

  it("returns the youngest of multiple co-borrowers", () => {
    const parties: HecmParty[] = [
      { role: "borrower", age: 78 },
      { role: "borrower", age: 63 },
    ];
    expect(selectYoungestApplicableAge(parties)).toBe(63);
  });

  it("returns a non-borrowing spouse's younger age when it is the youngest (spouse/non-borrowing-spouse handling)", () => {
    const parties: HecmParty[] = [
      { role: "borrower", age: 75 },
      { role: "non-borrowing-spouse", age: 58 },
    ];
    expect(selectYoungestApplicableAge(parties)).toBe(58);
  });

  it("throws when there are no parties at all", () => {
    expect(() => selectYoungestApplicableAge([])).toThrow(RangeError);
  });

  it("throws when there is no borrower among the parties", () => {
    expect(() => selectYoungestApplicableAge([{ role: "non-borrowing-spouse", age: 40 }])).toThrow(
      /at least one borrower/i
    );
  });

  it("throws when a borrower's age is below the structural HECM floor of 62", () => {
    expect(() => selectYoungestApplicableAge([{ role: "borrower", age: 61 }])).toThrow(RangeError);
  });

  it("throws when a non-borrowing spouse's age is below 18", () => {
    expect(() =>
      selectYoungestApplicableAge([
        { role: "borrower", age: 70 },
        { role: "non-borrowing-spouse", age: 17 },
      ])
    ).toThrow(RangeError);
  });

  it("throws on a non-integer age", () => {
    expect(() => selectYoungestApplicableAge([{ role: "borrower", age: 70.5 }])).toThrow(RangeError);
  });
});

describe("2. determineMaximumClaimAmount", () => {
  it("uses the property value when it is below the 2026 HUD maximum", () => {
    expect(determineMaximumClaimAmount(400_000)).toBe(400_000);
  });

  it("caps at the 2026 HUD maximum claim amount ($1,249,125) when the property is above it", () => {
    expect(determineMaximumClaimAmount(2_000_000)).toBe(CURRENT_HECM_MCA_LIMIT.maximumClaimAmount);
    expect(determineMaximumClaimAmount(2_000_000)).toBe(1_249_125);
  });

  it("returns exactly the HUD limit when property value equals it", () => {
    expect(determineMaximumClaimAmount(1_249_125)).toBe(1_249_125);
  });

  it("throws on a non-positive property value", () => {
    expect(() => determineMaximumClaimAmount(0)).toThrow(RangeError);
    expect(() => determineMaximumClaimAmount(-100)).toThrow(RangeError);
  });

  it("supports overriding the HUD limit (e.g. to test a future calendar year's published limit)", () => {
    expect(determineMaximumClaimAmount(2_000_000, 1_500_000)).toBe(1_500_000);
  });
});

describe("3. selectPrincipalLimitFactor — known PLF table lookups", () => {
  it("returns HUD's exact published factor for known (age, rate) pairs", () => {
    expect(selectPrincipalLimitFactor(62, 5.0)).toBe(0.41);
    expect(selectPrincipalLimitFactor(70, 6.0)).toBe(0.415);
    expect(selectPrincipalLimitFactor(58, 5.0)).toBe(0.375);
    expect(selectPrincipalLimitFactor(99, 18.875)).toBe(0.48);
    expect(selectPrincipalLimitFactor(18, 3.0)).toBe(0.317);
  });

  it("formatPlfRateKey builds the same three-decimal key the table uses", () => {
    expect(formatPlfRateKey(5)).toBe("5.000");
    expect(formatPlfRateKey(5.125)).toBe("5.125");
    expect(formatPlfRateKey(18.875)).toBe("18.875");
  });

  it("expected-rate boundaries: accepts the exact table minimum and maximum", () => {
    expect(() => selectPrincipalLimitFactor(70, 3.0)).not.toThrow();
    expect(() => selectPrincipalLimitFactor(70, 18.875)).not.toThrow();
  });

  it("expected-rate boundaries: rejects a rate just below the table minimum", () => {
    expect(() => selectPrincipalLimitFactor(70, 2.999)).toThrow(RangeError);
  });

  it("expected-rate boundaries: rejects a rate just above the table maximum", () => {
    expect(() => selectPrincipalLimitFactor(70, 18.876)).toThrow(RangeError);
  });

  it("rejects a rate that doesn't fall exactly on HUD's 0.125-point grid, rather than rounding or interpolating", () => {
    expect(() => selectPrincipalLimitFactor(70, 5.05)).toThrow(/0\.125-point increments/i);
    expect(() => selectPrincipalLimitFactor(70, 6.2)).toThrow(RangeError);
  });

  it("rejects an age outside the table's 18-99 coverage", () => {
    expect(() => selectPrincipalLimitFactor(17, 5.0)).toThrow(RangeError);
    expect(() => selectPrincipalLimitFactor(100, 5.0)).toThrow(RangeError);
  });

  it("rejects a non-integer age", () => {
    expect(() => selectPrincipalLimitFactor(70.5, 5.0)).toThrow(RangeError);
  });
});

describe("4. calculateInitialPrincipalLimit", () => {
  it("multiplies Maximum Claim Amount by the Principal Limit Factor", () => {
    expect(calculateInitialPrincipalLimit(400_000, 0.415)).toBe(166_000);
  });

  it("rounds to the nearest cent (rounding behavior)", () => {
    expect(calculateInitialPrincipalLimit(333_333, 0.41)).toBe(136_666.53);
  });

  it("throws on a non-positive Maximum Claim Amount", () => {
    expect(() => calculateInitialPrincipalLimit(0, 0.5)).toThrow(RangeError);
  });

  it("throws on a Principal Limit Factor outside (0, 1]", () => {
    expect(() => calculateInitialPrincipalLimit(400_000, 0)).toThrow(RangeError);
    expect(() => calculateInitialPrincipalLimit(400_000, 1.01)).toThrow(RangeError);
  });
});

describe("5. subtractExistingLienBalance — preliminary remaining figure, never called 'cash available'", () => {
  it("subtracts a normal existing lien balance", () => {
    const result = subtractExistingLienBalance(166_000, 50_000);
    expect(result.preliminaryRemainingPrincipalLimit).toBe(116_000);
    expect(result.initialPrincipalLimit).toBe(166_000);
    expect(result.existingLienBalance).toBe(50_000);
  });

  it("handles a lien greater than the preliminary principal limit by returning a negative figure, not an error", () => {
    const result = subtractExistingLienBalance(100_000, 250_000);
    expect(result.preliminaryRemainingPrincipalLimit).toBe(-150_000);
  });

  it("handles a zero lien balance", () => {
    const result = subtractExistingLienBalance(166_000, 0);
    expect(result.preliminaryRemainingPrincipalLimit).toBe(166_000);
  });

  it("rounds to the nearest cent", () => {
    const result = subtractExistingLienBalance(136_666.567, 10_000.001);
    expect(result.preliminaryRemainingPrincipalLimit).toBe(126_666.57);
  });

  it("throws when the existing lien balance is negative — a lien cannot be negative", () => {
    expect(() => subtractExistingLienBalance(166_000, -1)).toThrow(RangeError);
  });

  it("throws when the initial principal limit itself is negative", () => {
    expect(() => subtractExistingLienBalance(-1, 0)).toThrow(RangeError);
  });
});

describe("validateHecmPreliminaryEstimateInputs — invalid inputs", () => {
  it("flags a completely empty input object with multiple distinct errors", () => {
    const errors = validateHecmPreliminaryEstimateInputs({});
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => /at least one party/i.test(e))).toBe(true);
    expect(errors.some((e) => /property value/i.test(e))).toBe(true);
    expect(errors.some((e) => /expected rate/i.test(e))).toBe(true);
    expect(errors.some((e) => /lien/i.test(e))).toBe(true);
  });

  it("flags a borrower under 62 without throwing", () => {
    const errors = validateHecmPreliminaryEstimateInputs({
      parties: [{ role: "borrower", age: 40 }],
      propertyValue: 300_000,
      expectedRatePercent: 5.0,
      existingLienBalance: 0,
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it("no longer flags an off-grid expected rate as an error — it now rounds instead (see Part A)", () => {
    const errors = validateHecmPreliminaryEstimateInputs({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 300_000,
      expectedRatePercent: 5.05,
      existingLienBalance: 0,
    });
    expect(errors.some((e) => /expected rate/i.test(e))).toBe(false);
  });

  it("still flags an expected rate that is out of HUD's table range even after rounding", () => {
    const errors = validateHecmPreliminaryEstimateInputs({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 300_000,
      expectedRatePercent: 25.0,
      existingLienBalance: 0,
    });
    expect(errors.some((e) => /expected rate/i.test(e))).toBe(true);
  });

  it("flags a negative lien balance", () => {
    const errors = validateHecmPreliminaryEstimateInputs({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 300_000,
      expectedRatePercent: 5.0,
      existingLienBalance: -1,
    });
    expect(errors.some((e) => /lien/i.test(e))).toBe(true);
  });

  it("returns no errors for a fully valid input set", () => {
    const errors = validateHecmPreliminaryEstimateInputs({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 400_000,
      expectedRatePercent: 6.0,
      existingLienBalance: 50_000,
    });
    expect(errors).toEqual([]);
  });
});

describe("calculateHecmPreliminaryEstimate — composed end-to-end", () => {
  it("produces a coherent estimate for a single borrower with an existing lien", () => {
    const calc = calculateHecmPreliminaryEstimate({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 400_000,
      expectedRatePercent: 6.0,
      existingLienBalance: 50_000,
    });

    expect(calc.ok).toBe(true);
    if (calc.ok) {
      expect(calc.result.youngestApplicableAge).toBe(70);
      expect(calc.result.maximumClaimAmount).toBe(400_000);
      expect(calc.result.principalLimitFactor).toBe(0.415);
      expect(calc.result.initialPrincipalLimit).toBe(166_000);
      expect(calc.result.preliminaryRemainingPrincipalLimit).toBe(116_000);
      // Mandatory obligations: lien 50,000 + upfront MIP (2% of 400,000 =
      // 8,000) + origination fee (capped at 6,000 for a 400,000 MCA) + 0
      // other closing costs = 64,000.
      expect(calc.result.mandatoryObligations.upfrontMip).toBe(8_000);
      expect(calc.result.mandatoryObligations.originationFee).toBe(6_000);
      expect(calc.result.mandatoryObligations.otherClosingCosts).toBe(0);
      expect(calc.result.mandatoryObligations.totalMandatoryObligations).toBe(64_000);
      expect(calc.result.estimatedNetPrincipalLimitBeforeSetAsides).toBe(102_000);
    }
  });

  it("uses the younger non-borrowing spouse's age for the PLF lookup", () => {
    const calc = calculateHecmPreliminaryEstimate({
      parties: [
        { role: "borrower", age: 75 },
        { role: "non-borrowing-spouse", age: 58 },
      ],
      propertyValue: 300_000,
      expectedRatePercent: 5.0,
      existingLienBalance: 0,
    });

    expect(calc.ok).toBe(true);
    if (calc.ok) {
      expect(calc.result.youngestApplicableAge).toBe(58);
      expect(calc.result.principalLimitFactor).toBe(0.375);
    }
  });

  it("caps the Maximum Claim Amount at the 2026 HUD limit for a high-value property", () => {
    const calc = calculateHecmPreliminaryEstimate({
      parties: [{ role: "borrower", age: 80 }],
      propertyValue: 3_000_000,
      expectedRatePercent: 5.0,
      existingLienBalance: 0,
    });

    expect(calc.ok).toBe(true);
    if (calc.ok) {
      expect(calc.result.maximumClaimAmount).toBe(1_249_125);
    }
  });

  it("returns ok:false with descriptive errors instead of throwing for invalid input", () => {
    const calc = calculateHecmPreliminaryEstimate({
      parties: [{ role: "borrower", age: 40 }],
      propertyValue: -1,
      expectedRatePercent: 99,
      existingLienBalance: -1,
    });

    expect(calc.ok).toBe(false);
    if (!calc.ok) {
      expect(calc.errors.length).toBeGreaterThan(1);
    }
  });

  it("never claims eligibility or approval anywhere in its output shape", () => {
    const calc = calculateHecmPreliminaryEstimate({
      parties: [{ role: "borrower", age: 70 }],
      propertyValue: 400_000,
      expectedRatePercent: 6.0,
      existingLienBalance: 50_000,
    });
    expect(calc.ok).toBe(true);
    if (calc.ok) {
      const keys = Object.keys(calc.result).join(" ").toLowerCase();
      expect(keys).not.toMatch(/eligib|approv|qualif/);
    }
  });
});
