import { describe, expect, it } from "vitest";
import { roundExpectedRateToPlfGrid } from "@/lib/calculators/hecm/expected-rate";
import { HECM_PLF_TABLE_SOURCE } from "@/lib/calculators/hecm/plf-table";

describe("roundExpectedRateToPlfGrid — verified HUD rounding rule (round to nearest 0.125%)", () => {
  it("exact-grid values pass through unchanged", () => {
    expect(roundExpectedRateToPlfGrid(5.0)).toBe(5.0);
    expect(roundExpectedRateToPlfGrid(5.125)).toBe(5.125);
    expect(roundExpectedRateToPlfGrid(6.25)).toBe(6.25);
    expect(roundExpectedRateToPlfGrid(6.375)).toBe(6.375);
  });

  it("a rate just below a grid point rounds up to that grid point", () => {
    // 5.124 is 0.001 away from 5.125 and 0.124 away from 5.000 — nearest is 5.125.
    expect(roundExpectedRateToPlfGrid(5.124)).toBe(5.125);
  });

  it("a rate just above a grid point rounds down to that grid point", () => {
    // 5.001 is 0.001 away from 5.000 and 0.124 away from 5.125 — nearest is 5.000.
    expect(roundExpectedRateToPlfGrid(5.001)).toBe(5.0);
  });

  it("midpoint behavior: a rate exactly halfway between two grid points rounds up (documented assumption, not independently HUD-verified)", () => {
    // 5.0625 is exactly halfway between 5.000 and 5.125.
    expect(roundExpectedRateToPlfGrid(5.0625)).toBe(5.125);
    // 6.3125 is exactly halfway between 6.250 and 6.375.
    expect(roundExpectedRateToPlfGrid(6.3125)).toBe(6.375);
  });

  it("min/max boundaries: the table's own minimum and maximum round to themselves", () => {
    expect(roundExpectedRateToPlfGrid(HECM_PLF_TABLE_SOURCE.minExpectedRatePercent)).toBe(3.0);
    expect(roundExpectedRateToPlfGrid(HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent)).toBe(18.875);
  });

  it("min/max boundaries: a raw rate just below the table minimum can round into range", () => {
    // 2.99 is closer to 3.000 than to 2.875.
    expect(roundExpectedRateToPlfGrid(2.99)).toBe(3.0);
  });

  it("does not clamp — a genuinely out-of-range rate still rounds to its nearest grid point, out of range or not", () => {
    // This function's job is only rounding; range validation is a
    // separate, deliberate concern (see engine.ts).
    expect(roundExpectedRateToPlfGrid(19.0)).toBe(19.0);
    expect(roundExpectedRateToPlfGrid(0.0)).toBe(0.0);
  });

  it("throws on a non-finite input", () => {
    expect(() => roundExpectedRateToPlfGrid(NaN)).toThrow(RangeError);
    expect(() => roundExpectedRateToPlfGrid(Infinity)).toThrow(RangeError);
  });
});
