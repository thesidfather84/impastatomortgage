"use client";

import Link from "next/link";
import { useState } from "react";
import { useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { CallDawnButton, TextDawnButton } from "@/components/ui/ContactButtons";
import { LiveOak } from "@/components/site/motifs/LiveOak";
import {
  calculateHecmPreliminaryEstimate,
  type HecmParty,
  type HecmPreliminaryEstimateInputs,
} from "@/lib/calculators/hecm/engine";
import { NumberField } from "./NumberField";
import { ResultRow } from "./ResultRow";

/**
 * "See what your home could make possible in retirement" — Dawn's Home
 * Equity Explorer. Uses the existing HECM engine
 * (src/lib/calculators/hecm/engine.ts) exactly as built and tested —
 * nothing here recalculates or reinterprets HUD figures; this component
 * only collects input, calls the engine, and displays its output.
 *
 * PRIVACY: no name/email/phone/address field exists anywhere in this
 * component, no submit step gates the results, and nothing is sent to
 * Dawn automatically. Results update live from local component state
 * only, exactly like the Home Payment Explorer.
 */
type FormState = {
  borrowerAge: number;
  /** NaN means "not provided" — a spouse is optional, and blank is the default (see NumberField's own NaN-for-empty convention). */
  spouseAge: number;
  homeValue: number;
  existingLienBalance: number;
  expectedRatePercent: number;
  otherClosingCosts: number;
};

// Deliberately round, generic starting numbers — not a rate quote, not a
// promise about any real borrower, just a sensible scenario so the page
// shows a live result before the visitor has typed anything.
const DEFAULT_STATE: FormState = {
  borrowerAge: 72,
  spouseAge: NaN,
  homeValue: 400_000,
  existingLienBalance: 0,
  expectedRatePercent: 6.5,
  otherClosingCosts: 0,
};

const ASK_DAWN_HANDOFF_QUESTION =
  "I used the Home Equity Explorer and have questions about how a HECM works.";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd(value: number): string {
  return Number.isFinite(value) ? usdFormatter.format(value) : "—";
}

export function HomeEquityExplorer() {
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const { openWithQuestion } = useAskDawn();

  function updateField(field: keyof FormState) {
    return (value: number) => setForm((prev) => ({ ...prev, [field]: value }));
  }

  const parties: HecmParty[] = [{ role: "borrower", age: form.borrowerAge }];
  if (Number.isFinite(form.spouseAge)) {
    parties.push({ role: "non-borrowing-spouse", age: form.spouseAge });
  }

  const inputs: HecmPreliminaryEstimateInputs = {
    parties,
    propertyValue: form.homeValue,
    expectedRatePercent: form.expectedRatePercent,
    existingLienBalance: form.existingLienBalance,
    otherClosingCosts: form.otherClosingCosts,
  };

  const calc = calculateHecmPreliminaryEstimate(inputs);

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:items-start lg:gap-10">
      {/* INPUTS */}
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-lg border border-brass-400/30 bg-ivory-deep p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-cypress-900">About you and your home</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <NumberField
              id="borrower-age"
              label="Your age (or the youngest borrower)"
              value={form.borrowerAge}
              onChange={updateField("borrowerAge")}
              step={1}
              helpText="A HECM requires at least one borrower age 62 or older."
            />
            <NumberField
              id="spouse-age"
              label="Spouse's age, if not a co-borrower"
              value={form.spouseAge}
              onChange={updateField("spouseAge")}
              step={1}
              helpText="Leave blank if there's no spouse, or if your spouse is also a borrower on the loan."
            />
            <NumberField
              id="home-value"
              label="Estimated home value"
              adornment="$"
              value={form.homeValue}
              onChange={updateField("homeValue")}
              step={1000}
            />
            <NumberField
              id="existing-lien"
              label="Current mortgage or liens"
              adornment="$"
              value={form.existingLienBalance}
              onChange={updateField("existingLienBalance")}
              step={500}
              helpText="Any mortgage balance or liens that would need to be paid off."
            />
            <NumberField
              id="expected-rate"
              label="Expected interest rate"
              adornment="%"
              value={form.expectedRatePercent}
              onChange={updateField("expectedRatePercent")}
              step={0.125}
              helpText="HUD rounds this to the nearest 0.125% for the calculation."
            />
            <NumberField
              id="other-closing-costs"
              label="Other closing costs (optional)"
              adornment="$"
              value={form.otherClosingCosts}
              onChange={updateField("otherClosingCosts")}
              step={100}
              helpText="Title, appraisal, recording, counseling, and similar fees vary — enter an estimate if you have one."
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="lg:sticky lg:top-24 lg:col-span-2">
        <div className="relative overflow-hidden rounded-lg border border-brass-400/40 bg-white p-6 shadow-sm sm:p-8">
          <LiveOak className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-cypress-700/[0.06]" />

          {calc.ok ? (
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-cypress-600">
                Estimated net principal limit
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-tomato-600 sm:text-5xl">
                {formatUsd(calc.result.estimatedNetPrincipalLimitBeforeSetAsides)}
              </p>
              <p className="mt-2 text-sm text-cypress-700">
                What&apos;s estimated to remain after basic mandatory costs — before a few more required
                adjustments. This is an estimate only, not a final amount, approval, or eligibility
                determination.
              </p>

              <div className="mt-6 space-y-1.5 border-t border-cypress-100 pt-5 text-sm">
                <ResultRow label="Estimated home value used" value={formatUsd(form.homeValue)} />
                <ResultRow label="Maximum Claim Amount" value={formatUsd(calc.result.maximumClaimAmount)} />
                <ResultRow
                  label="Principal Limit Factor"
                  value={`${calc.result.principalLimitFactor.toFixed(3)} (${(calc.result.principalLimitFactor * 100).toFixed(1)}%)`}
                />
                <ResultRow label="Estimated Initial Principal Limit" value={formatUsd(calc.result.initialPrincipalLimit)} />
              </div>

              <div className="mt-6 border-t border-cypress-100 pt-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-cypress-600">
                  Mandatory obligations
                </p>
                <div className="mt-3 space-y-1.5 text-sm">
                  <ResultRow label="Existing mortgage / liens" value={formatUsd(calc.result.mandatoryObligations.existingLienBalance)} />
                  <ResultRow label="Estimated upfront MIP" value={formatUsd(calc.result.mandatoryObligations.upfrontMip)} />
                  <ResultRow label="Estimated origination fee" value={formatUsd(calc.result.mandatoryObligations.originationFee)} />
                  <ResultRow label="Other closing costs entered" value={formatUsd(calc.result.mandatoryObligations.otherClosingCosts)} />
                  <div className="flex items-center justify-between border-t border-cypress-100 pt-1.5 font-semibold text-charcoal-900">
                    <span>Total mandatory obligations</span>
                    <span>{formatUsd(calc.result.mandatoryObligations.totalMandatoryObligations)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-md border border-brass-400/30 bg-brass-100/20 p-4 text-sm leading-relaxed text-charcoal-800">
                Real HECM figures can differ from this estimate. This tool does not yet model a Life
                Expectancy Set-Aside (LESA), servicing-fee set-asides, initial disbursement-period limits,
                or payment plan options — all of which can further change the amount available.
              </div>

              <p className="mt-6 text-xs leading-relaxed text-cypress-600">
                <strong className="text-charcoal-800">Estimates only, for general education.</strong> Not a
                loan approval, commitment to lend, or eligibility determination. Actual HECM figures depend
                on HUD/FHA requirements and your specific circumstances, and HUD-approved counseling is
                required before obtaining a HECM.{" "}
                <Link href="/legal" className="underline underline-offset-2 hover:text-cypress-800">
                  Full disclosures
                </Link>
              </p>

              <div className="mt-6 border-t border-cypress-100 pt-5">
                <p className="font-display text-base font-semibold text-cypress-900">
                  Want Dawn to go over these numbers with you?
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <CallDawnButton size="md" />
                  <TextDawnButton size="md" />
                </div>
                <button
                  type="button"
                  onClick={() => openWithQuestion(ASK_DAWN_HANDOFF_QUESTION)}
                  className="mt-3 text-sm font-medium text-cypress-700 underline underline-offset-2 hover:text-cypress-900"
                >
                  Ask Dawn about how a HECM works
                </button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-md border border-burgundy-500/20 bg-burgundy-500/10 p-4">
              <p className="font-semibold text-burgundy-600">Let&apos;s fix a few numbers first</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-burgundy-600">
                {calc.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
