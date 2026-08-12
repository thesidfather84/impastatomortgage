import type { Metadata } from "next";
import { CompassWizard } from "@/components/mortgage-compass/CompassWizard";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dawn's Mortgage Compass",
  description:
    "An educational routing tool to help you find your starting point — not a loan approval or offer.",
  path: "/mortgage-compass",
});

export default function MortgageCompassPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brass-600">
        Dawn&apos;s Mortgage Compass
      </p>
      <h1 className="mb-4 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
        Let&apos;s find your starting point.
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-charcoal-800">
        A few quick questions to help point you toward the right information.
        This isn&apos;t a loan application — no sensitive financial
        information is collected, and nothing here is an approval, offer, or
        commitment to lend.
      </p>

      <div className="rounded-2xl border border-cypress-100 bg-ivory-deep p-6 sm:p-10">
        <CompassWizard />
      </div>
    </div>
  );
}
