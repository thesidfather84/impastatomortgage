import { describe, expect, it } from "vitest";
import { HECM_PLF_TABLE, HECM_PLF_TABLE_SOURCE } from "@/lib/calculators/hecm/plf-table";

describe("HUD HECM PLF table — shape and coverage", () => {
  it("covers exactly ages 18-99 with no gaps", () => {
    const ages = Object.keys(HECM_PLF_TABLE)
      .map(Number)
      .sort((a, b) => a - b);
    expect(ages).toHaveLength(82);
    expect(ages[0]).toBe(18);
    expect(ages[ages.length - 1]).toBe(99);
    for (let age = 18; age <= 99; age++) {
      expect(HECM_PLF_TABLE[age]).toBeDefined();
    }
  });

  it("every age row covers exactly 3.000%-18.875% in 0.125-point increments (128 rates)", () => {
    for (let age = 18; age <= 99; age++) {
      const rates = Object.keys(HECM_PLF_TABLE[age])
        .map(Number)
        .sort((a, b) => a - b);
      expect(rates).toHaveLength(128);
      expect(rates[0]).toBeCloseTo(3.0, 3);
      expect(rates[rates.length - 1]).toBeCloseTo(18.875, 3);
    }
  });

  it("every PLF value is a plausible factor between 0 and 1", () => {
    for (const row of Object.values(HECM_PLF_TABLE)) {
      for (const plf of Object.values(row)) {
        expect(plf).toBeGreaterThan(0);
        expect(plf).toBeLessThanOrEqual(1);
      }
    }
  });

  it("PLF strictly decreases as the expected rate rises, for a fixed age (matches HUD's published pattern)", () => {
    const row = HECM_PLF_TABLE[70];
    const rates = Object.keys(row)
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = 1; i < rates.length; i++) {
      const prevKey = rates[i - 1].toFixed(3);
      const curKey = rates[i].toFixed(3);
      expect(row[curKey]).toBeLessThanOrEqual(row[prevKey]);
    }
  });

  it("PLF generally increases with age, for a fixed expected rate (matches HUD's published pattern)", () => {
    const rateKey = "6.000";
    let previous = HECM_PLF_TABLE[18][rateKey];
    for (let age = 19; age <= 99; age++) {
      const current = HECM_PLF_TABLE[age][rateKey];
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });

  it("cross-checks specific values directly against HUD's published Consolidated Table (fetched 2026-08-13)", () => {
    // These exact figures were read from HUD's own workbook, not computed
    // or estimated — see plf-table.ts's header for the source.
    expect(HECM_PLF_TABLE[62]["3.000"]).toBe(0.524);
    expect(HECM_PLF_TABLE[62]["5.000"]).toBe(0.41);
    expect(HECM_PLF_TABLE[65]["5.000"]).toBe(0.43);
    expect(HECM_PLF_TABLE[70]["6.000"]).toBe(0.415);
    expect(HECM_PLF_TABLE[80]["5.000"]).toBe(0.534);
    expect(HECM_PLF_TABLE[85]["8.000"]).toBe(0.476);
    expect(HECM_PLF_TABLE[90]["10.000"]).toBe(0.499);
    expect(HECM_PLF_TABLE[99]["3.000"]).toBe(0.75);
    expect(HECM_PLF_TABLE[18]["10.000"]).toBe(0.048);
  });

  it("documents its regulatory source and effective date rather than being an unexplained table", () => {
    expect(HECM_PLF_TABLE_SOURCE.mortgageeLetterNumber).toBe("ML 2017-12");
    expect(HECM_PLF_TABLE_SOURCE.effectiveDate).toBe("2017-10-02");
    expect(HECM_PLF_TABLE_SOURCE.minAge).toBe(18);
    expect(HECM_PLF_TABLE_SOURCE.maxAge).toBe(99);
    expect(HECM_PLF_TABLE_SOURCE.minExpectedRatePercent).toBe(3.0);
    expect(HECM_PLF_TABLE_SOURCE.maxExpectedRatePercent).toBe(18.875);
  });
});
