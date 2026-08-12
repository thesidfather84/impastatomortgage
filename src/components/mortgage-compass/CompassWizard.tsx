"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { compassSteps, type CompassAnswers } from "@/content/mortgage-compass/questions";
import { getCompassResult } from "@/lib/mortgage-compass/results";
import { ContactButtonRow } from "@/components/ui/ContactButtons";

export function CompassWizard() {
  const [answers, setAnswers] = useState<CompassAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const visibleSteps = useMemo(
    () => compassSteps.filter((step) => step.shouldShow(answers)),
    [answers]
  );

  const currentStep = visibleSteps[stepIndex];
  const progress = finished
    ? visibleSteps.length
    : Math.min(stepIndex, visibleSteps.length);

  function handleSelect(value: string) {
    if (!currentStep) return;
    const updated: CompassAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(updated);

    const nextVisible = compassSteps.filter((step) => step.shouldShow(updated));
    const currentPositionInNext = nextVisible.findIndex((s) => s.id === currentStep.id);
    const nextIndex = currentPositionInNext + 1;

    if (nextIndex >= nextVisible.length) {
      setFinished(true);
    } else {
      setStepIndex(nextIndex);
    }
  }

  function handleBack() {
    if (stepIndex === 0) return;
    setFinished(false);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setFinished(false);
  }

  if (finished) {
    const result = getCompassResult(answers);
    return (
      <div className="space-y-6">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brass-600">
            Your starting point
          </p>
          <h2 className="font-display text-2xl font-semibold text-cypress-900 sm:text-3xl">
            {result.headline}
          </h2>
        </div>
        <p className="text-lg text-charcoal-800">{result.summary}</p>

        <div className="flex flex-wrap gap-3">
          {result.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-cypress-100 bg-white px-4 py-2 text-sm font-semibold text-cypress-700 hover:bg-cypress-50"
            >
              {link.label} →
            </Link>
          ))}
        </div>

        <div className="rounded-lg border border-brass-400/40 bg-brass-100/30 p-4 text-sm text-charcoal-800">
          <p className="font-semibold">This is informational only.</p>
          <p className="mt-1">
            Dawn&apos;s Mortgage Compass is an educational tool, not a loan
            approval, offer, commitment to lend, or guarantee of any kind.
            Your actual options depend on a full conversation with Dawn.
          </p>
        </div>

        <ContactButtonRow />

        <button
          type="button"
          onClick={handleRestart}
          className="text-sm font-medium text-cypress-600 underline underline-offset-2"
        >
          Start over
        </button>
      </div>
    );
  }

  if (!currentStep) return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-cypress-600">
          Step {progress + 1} of {visibleSteps.length}
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cypress-100">
          <div
            className="h-full rounded-full bg-brass-500 transition-all"
            style={{ width: `${((progress + 1) / visibleSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl font-semibold text-cypress-900 sm:text-3xl">
        {currentStep.question}
      </h2>
      {currentStep.helpText && (
        <p className="text-base text-cypress-700">{currentStep.helpText}</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {currentStep.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className="min-h-[64px] rounded-lg border border-cypress-100 bg-white px-5 py-4 text-left text-lg font-medium text-charcoal-900 transition-colors hover:border-brass-400 hover:bg-brass-100/30"
          >
            {option.label}
          </button>
        ))}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="text-sm font-medium text-cypress-600 underline underline-offset-2"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
