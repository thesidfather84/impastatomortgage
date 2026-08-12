import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
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
    <>
      <PageHeader
        eyebrow="Dawn's Mortgage Compass"
        title="Let's find your direction."
        intro="A few quick questions to help point you toward the right information. This isn't a loan application — no sensitive financial information is collected, and nothing here is an approval, offer, or commitment to lend."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-brass-400/30 bg-ivory-deep p-6 sm:p-10">
          <CompassWizard />
        </div>
      </div>
    </>
  );
}
