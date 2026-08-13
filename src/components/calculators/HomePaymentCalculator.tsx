"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { CallDawnButton, TextDawnButton } from "@/components/ui/ContactButtons";
import {
  calculateHomePayment,
  downPaymentDollarsToPercent,
  downPaymentPercentToDollars,
  type HomePaymentInputs,
} from "@/lib/calculators/home-payment";
import { NumberField } from "./NumberField";
import { ToggleSwitch } from "./ToggleSwitch";
import { ResultRow } from "./ResultRow";

/**
 * "What would this house cost me?" — the first Home Payment Explorer
 * mode. Kept self-contained (its own form state, its own layout) so
 * future sibling modes (e.g. "what price feels comfortable?", "compare
 * two options") can live alongside it under src/app/calculators/ and
 * reuse the same primitives (NumberField, ToggleSwitch, ResultRow) and
 * the same pure engine in src/lib/calculators/home-payment.ts, without
 * this component needing to become a multi-mode switch itself.
 */
type FormState = {
  homePrice: number;
  downPaymentDollars: number;
  interestRateAnnualPercent: number;
  loanTermYears: number;
  annualPropertyTax: number;
  annualHomeownersInsurance: number;
  monthlyMortgageInsurance: number;
  monthlyHoa: number;
};

// Deliberately round, generic starting numbers — not a rate quote, not
// tied to any real program, just a sensible scenario so the page shows
// a live result before the visitor has typed anything.
const DEFAULT_STATE: FormState = {
  homePrice: 350000,
  downPaymentDollars: 70000,
  interestRateAnnualPercent: 6.5,
  loanTermYears: 30,
  annualPropertyTax: 3600,
  annualHomeownersInsurance: 1500,
  monthlyMortgageInsurance: 0,
  monthlyHoa: 0,
};

const LOAN_TERM_PRESETS = [15, 20, 30];
const DOWN_PAYMENT_PRESETS = [5, 10, 20];

const ASK_DAWN_HANDOFF_QUESTION =
  "I used the Home Payment Explorer and want to talk through my numbers with Dawn.";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd(value: number): string {
  return Number.isFinite(value) ? usdFormatter.format(value) : "—";
}

function safeDownPaymentPercent(homePrice: number, downPaymentDollars: number): number {
  if (!Number.isFinite(homePrice) || homePrice <= 0) return 0;
  if (!Number.isFinite(downPaymentDollars) || downPaymentDollars < 0) return 0;
  return downPaymentDollarsToPercent(homePrice, downPaymentDollars);
}

export function HomePaymentCalculator() {
  const [form, setForm] = useState<FormState>(DEFAULT_STATE);
  const [showRealPicture, setShowRealPicture] = useState(true);
  const { openWithQuestion } = useAskDawn();

  function updateField(field: keyof FormState) {
    return (value: number) => setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleDownPaymentPercentPreset(percent: number) {
    setForm((prev) => {
      if (!Number.isFinite(prev.homePrice) || prev.homePrice <= 0) return prev;
      return { ...prev, downPaymentDollars: downPaymentPercentToDollars(prev.homePrice, percent) };
    });
  }

  // Extra costs are only counted toward the estimate while "the real
  // picture" is switched on — the values themselves stay in state either
  // way, so switching back on restores them without re-typing.
  const effectiveInputs: HomePaymentInputs = {
    homePrice: form.homePrice,
    downPaymentDollars: form.downPaymentDollars,
    interestRateAnnualPercent: form.interestRateAnnualPercent,
    loanTermYears: form.loanTermYears,
    annualPropertyTax: showRealPicture ? form.annualPropertyTax : 0,
    annualHomeownersInsurance: showRealPicture ? form.annualHomeownersInsurance : 0,
    monthlyMortgageInsurance: showRealPicture ? form.monthlyMortgageInsurance : 0,
    monthlyHoa: showRealPicture ? form.monthlyHoa : 0,
  };

  const calc = calculateHomePayment(effectiveInputs);
  const downPaymentPercent = safeDownPaymentPercent(form.homePrice, form.downPaymentDollars);

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:items-start lg:gap-10">
      {/* INPUTS */}
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-lg border border-brass-400/30 bg-ivory-deep p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-cypress-900">The basics</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <NumberField
              id="home-price"
              label="Home price"
              adornment="$"
              value={form.homePrice}
              onChange={updateField("homePrice")}
              step={1000}
            />

            <div>
              <NumberField
                id="down-payment"
                label="Down payment"
                adornment="$"
                value={form.downPaymentDollars}
                onChange={updateField("downPaymentDollars")}
                step={500}
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {DOWN_PAYMENT_PRESETS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleDownPaymentPercentPreset(pct)}
                    className="min-h-[32px] rounded-full border border-brass-400/50 bg-brass-100/40 px-3 py-1 text-xs font-medium text-cypress-700 hover:bg-brass-100"
                  >
                    {pct}%
                  </button>
                ))}
                <span className="text-xs text-cypress-600">{downPaymentPercent.toFixed(1)}% down</span>
              </div>
            </div>

            <NumberField
              id="interest-rate"
              label="Interest rate"
              adornment="%"
              value={form.interestRateAnnualPercent}
              onChange={updateField("interestRateAnnualPercent")}
              step={0.125}
            />

            <div>
              <NumberField
                id="loan-term"
                label="Loan term (years)"
                value={form.loanTermYears}
                onChange={updateField("loanTermYears")}
                step={1}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {LOAN_TERM_PRESETS.map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, loanTermYears: years }))}
                    className={cn(
                      "min-h-[32px] rounded-full border px-3 py-1 text-xs font-medium",
                      form.loanTermYears === years
                        ? "border-brass-500 bg-brass-500 text-charcoal-900"
                        : "border-brass-400/50 bg-brass-100/40 text-cypress-700 hover:bg-brass-100"
                    )}
                  >
                    {years} yr
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-brass-400/30 bg-ivory-deep p-6 sm:p-8">
          <ToggleSwitch
            id="show-real-picture"
            checked={showRealPicture}
            onChange={setShowRealPicture}
            label="Show me the real monthly picture"
            description="Add the costs people forget — taxes, insurance, PMI, and HOA."
          />

          {showRealPicture && (
            <div className="mt-6 grid gap-5 border-t border-brass-400/20 pt-6 sm:grid-cols-2">
              <NumberField
                id="annual-property-tax"
                label="Annual property taxes"
                adornment="$"
                value={form.annualPropertyTax}
                onChange={updateField("annualPropertyTax")}
                step={100}
              />
              <NumberField
                id="annual-insurance"
                label="Annual homeowners insurance"
                adornment="$"
                value={form.annualHomeownersInsurance}
                onChange={updateField("annualHomeownersInsurance")}
                step={100}
              />
              <NumberField
                id="monthly-pmi"
                label="Monthly mortgage insurance (PMI)"
                adornment="$"
                value={form.monthlyMortgageInsurance}
                onChange={updateField("monthlyMortgageInsurance")}
                step={10}
                helpText="Only applies if your down payment requires mortgage insurance."
              />
              <NumberField
                id="monthly-hoa"
                label="Monthly HOA"
                adornment="$"
                value={form.monthlyHoa}
                onChange={updateField("monthlyHoa")}
                step={10}
                helpText="Leave at $0 if your home doesn't have HOA dues."
              />
            </div>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="lg:sticky lg:top-24 lg:col-span-2">
        <div className="rounded-lg border border-brass-400/40 bg-white p-6 shadow-sm sm:p-8">
          {calc.ok ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-cypress-600">
                Estimated monthly payment
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-tomato-600 sm:text-5xl">
                {formatUsd(calc.result.estimatedTotalMonthlyPayment)}
                <span className="text-lg font-medium text-cypress-600"> /mo</span>
              </p>

              {/* Purely decorative proportional bar — every figure it
                  represents is already stated in the accessible text rows
                  below, so this is aria-hidden and never load-bearing. */}
              {calc.result.estimatedTotalMonthlyPayment > 0 && (
                <div
                  aria-hidden="true"
                  className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-cypress-100"
                >
                  {[
                    { value: calc.result.monthlyPrincipalAndInterest, color: "bg-tomato-500" },
                    { value: calc.result.monthlyPropertyTax, color: "bg-brass-500" },
                    { value: calc.result.monthlyHomeownersInsurance, color: "bg-cypress-400" },
                    { value: calc.result.monthlyMortgageInsurance, color: "bg-burgundy-500" },
                    { value: calc.result.monthlyHoa, color: "bg-terracotta-500" },
                  ]
                    .filter((segment) => segment.value > 0)
                    .map((segment, index) => (
                      <span
                        key={index}
                        className={segment.color}
                        style={{
                          width: `${(segment.value / calc.result.estimatedTotalMonthlyPayment) * 100}%`,
                        }}
                      />
                    ))}
                </div>
              )}

              <div className="mt-6 space-y-1.5 border-t border-cypress-100 pt-5 text-sm">
                <ResultRow label="Principal & interest" value={formatUsd(calc.result.monthlyPrincipalAndInterest)} />
                {showRealPicture && (
                  <>
                    <ResultRow label="Property taxes" value={formatUsd(calc.result.monthlyPropertyTax)} />
                    <ResultRow
                      label="Homeowners insurance"
                      value={formatUsd(calc.result.monthlyHomeownersInsurance)}
                    />
                    <ResultRow label="Mortgage insurance (PMI)" value={formatUsd(calc.result.monthlyMortgageInsurance)} />
                    <ResultRow label="HOA" value={formatUsd(calc.result.monthlyHoa)} />
                  </>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-cypress-100 pt-5 text-sm">
                <div>
                  <p className="text-cypress-600">Loan amount</p>
                  <p className="font-display text-lg font-semibold text-charcoal-900">
                    {formatUsd(calc.result.loanAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-cypress-600">Down payment</p>
                  <p className="font-display text-lg font-semibold text-charcoal-900">
                    {formatUsd(form.downPaymentDollars)}{" "}
                    <span className="text-sm font-normal text-cypress-600">
                      ({downPaymentPercent.toFixed(1)}%)
                    </span>
                  </p>
                </div>
              </div>

              <details className="group mt-6 rounded-md border border-cypress-100 bg-ivory-deep p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-cypress-800">
                  Total estimated interest
                  <span aria-hidden="true" className="text-cypress-500 transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 font-display text-2xl font-semibold text-charcoal-900">
                  {formatUsd(calc.result.totalInterestOverLoanTerm)}
                </p>
                <p className="mt-1 text-sm text-cypress-600">
                  Over the full {form.loanTermYears}-year term, assuming every payment is made on schedule.
                </p>
              </details>

              <p className="mt-6 text-xs leading-relaxed text-cypress-600">
                <strong className="text-charcoal-800">Estimates only.</strong> Not a loan offer, approval, or
                rate quote. Actual terms and costs may vary.{" "}
                <Link href="/legal" className="underline underline-offset-2 hover:text-cypress-800">
                  Full disclosures
                </Link>
              </p>

              <div className="mt-6 border-t border-cypress-100 pt-5">
                <p className="font-display text-base font-semibold text-cypress-900">
                  Want Dawn to look at these numbers with you?
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
                  Ask Dawn about these numbers
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-md border border-burgundy-500/20 bg-burgundy-500/10 p-4">
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
