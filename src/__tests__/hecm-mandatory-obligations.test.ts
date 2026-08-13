import { describe, expect, it } from "vitest";
import {
  calculateEstimatedNetPrincipalLimitBeforeSetAsides,
  calculateMandatoryObligations,
  calculateOriginationFee,
  calculateUpfrontMip,
  HECM_ORIGINATION_FEE_RULE,
  HECM_UPFRONT_MIP_RATE,
} from "@/lib/calculators/hecm/mandatory-obligations";

describe("calculateUpfrontMip — 2.00% of Maximum Claim Amount (ML 2017-12)", () => {
  it("calculates 2.00% of the Maximum Claim Amount", () => {
    expect(calculateUpfrontMip(400_000)).toBe(8_000);
    expect(calculateUpfrontMip(500_000)).toBe(10_000);
  });

  it("matches the current 2026 MCA limit exactly", () => {
    expect(calculateUpfrontMip(1_249_125)).toBe(24_982.5);
  });

  it("documents its source rate", () => {
    expect(HECM_UPFRONT_MIP_RATE.ratePercentOfMaximumClaimAmount).toBe(2.0);
    expect(HECM_UPFRONT_MIP_RATE.sourceDocument).toBe("HUD Mortgagee Letter 2017-12");
  });

  it("throws on a non-positive Maximum Claim Amount", () => {
    expect(() => calculateUpfrontMip(0)).toThrow(RangeError);
    expect(() => calculateUpfrontMip(-1)).toThrow(RangeError);
  });
});

describe("calculateOriginationFee — 24 CFR 206.31 tiered formula, $2,500 floor, $6,000 cap", () => {
  it("applies the $2,500 minimum when 2% of a small MCA would be less", () => {
    expect(calculateOriginationFee(100_000)).toBe(2_500);
  });

  it("returns exactly $2,500 at the break-even MCA of $125,000", () => {
    expect(calculateOriginationFee(125_000)).toBe(2_500);
  });

  it("applies the flat 2% first-tier rate up to $200,000 MCA", () => {
    expect(calculateOriginationFee(200_000)).toBe(4_000);
  });

  it("adds 1% of the portion above $200,000", () => {
    expect(calculateOriginationFee(300_000)).toBe(5_000);
  });

  it("hits the $6,000 cap exactly at a $400,000 MCA", () => {
    expect(calculateOriginationFee(400_000)).toBe(6_000);
  });

  it("stays capped at $6,000 for any MCA above $400,000, including the 2026 maximum", () => {
    expect(calculateOriginationFee(500_000)).toBe(6_000);
    expect(calculateOriginationFee(1_249_125)).toBe(6_000);
  });

  it("documents its source regulation and figures", () => {
    expect(HECM_ORIGINATION_FEE_RULE.sourceRegulation).toBe("24 CFR § 206.31");
    expect(HECM_ORIGINATION_FEE_RULE.minimumFee).toBe(2_500);
    expect(HECM_ORIGINATION_FEE_RULE.maximumFee).toBe(6_000);
  });

  it("throws on a non-positive Maximum Claim Amount", () => {
    expect(() => calculateOriginationFee(0)).toThrow(RangeError);
  });
});

describe("calculateMandatoryObligations — existing lien + upfront MIP + origination fee + user-entered closing costs", () => {
  it("accepts user-entered closing costs with no HUD-prescribed formula, purely as entered", () => {
    const result = calculateMandatoryObligations({
      maximumClaimAmount: 400_000,
      existingLienBalance: 0,
      otherClosingCosts: 3_275.5,
    });
    expect(result.otherClosingCosts).toBe(3_275.5);
  });

  it("sums every component into totalMandatoryObligations", () => {
    const result = calculateMandatoryObligations({
      maximumClaimAmount: 400_000,
      existingLienBalance: 50_000,
      otherClosingCosts: 1_000,
    });
    // lien 50,000 + MIP 8,000 + origination fee 6,000 + closing costs 1,000
    expect(result.existingLienBalance).toBe(50_000);
    expect(result.upfrontMip).toBe(8_000);
    expect(result.originationFee).toBe(6_000);
    expect(result.otherClosingCosts).toBe(1_000);
    expect(result.totalMandatoryObligations).toBe(65_000);
  });

  it("rounds every component to the nearest cent", () => {
    const result = calculateMandatoryObligations({
      maximumClaimAmount: 333_333,
      existingLienBalance: 10_000.006,
      otherClosingCosts: 500.004,
    });
    expect(result.existingLienBalance).toBe(10_000.01);
    expect(result.otherClosingCosts).toBe(500);
    expect(Number.isFinite(result.totalMandatoryObligations)).toBe(true);
  });

  it("throws on a negative existing lien balance", () => {
    expect(() =>
      calculateMandatoryObligations({ maximumClaimAmount: 400_000, existingLienBalance: -1, otherClosingCosts: 0 })
    ).toThrow(RangeError);
  });

  it("throws on negative other closing costs", () => {
    expect(() =>
      calculateMandatoryObligations({ maximumClaimAmount: 400_000, existingLienBalance: 0, otherClosingCosts: -1 })
    ).toThrow(RangeError);
  });
});

describe("calculateEstimatedNetPrincipalLimitBeforeSetAsides — principal limit less mandatory obligations", () => {
  it("subtracts total mandatory obligations from the Initial Principal Limit", () => {
    expect(calculateEstimatedNetPrincipalLimitBeforeSetAsides(166_000, 64_000)).toBe(102_000);
  });

  it("goes negative, without throwing, when obligations exceed the principal limit", () => {
    expect(calculateEstimatedNetPrincipalLimitBeforeSetAsides(166_000, 200_000)).toBe(-34_000);
  });

  it("rounds to the nearest cent", () => {
    expect(calculateEstimatedNetPrincipalLimitBeforeSetAsides(166_000.567, 64_000.001)).toBe(102_000.57);
  });

  it("throws on a negative Initial Principal Limit or negative total obligations", () => {
    expect(() => calculateEstimatedNetPrincipalLimitBeforeSetAsides(-1, 0)).toThrow(RangeError);
    expect(() => calculateEstimatedNetPrincipalLimitBeforeSetAsides(166_000, -1)).toThrow(RangeError);
  });
});
