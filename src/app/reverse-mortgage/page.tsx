import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { ReverseMortgageDisclosure } from "@/components/compliance/ReverseMortgageDisclosure";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reverse Mortgage",
  description:
    "Understanding reverse mortgages in plain English — what they are, how they work, and what to consider.",
  path: "/reverse-mortgage",
});

export default function ReverseMortgagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Reverse Mortgage"
        title="Using your home for retirement."
        intro="A reverse mortgage lets eligible homeowners access their home's equity without monthly mortgage payments. It's a meaningful financial decision, and it deserves a plain-English explanation before anything else."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="In plain English">
          <p>
            A reverse mortgage is a loan for homeowners — typically 62 or
            older — that lets you borrow against your home&apos;s equity
            without making monthly mortgage payments. The loan is repaid
            when you sell the home, permanently move out, or pass away.
          </p>
          <p>
            You remain responsible for property taxes, homeowners insurance,
            and home upkeep throughout. The most common type, a HECM, is
            insured by the FHA and requires HUD-approved counseling before
            closing.
          </p>
        </InfoSection>

        <InfoSection title="Common questions">
          <ul className="list-disc space-y-2 pl-5">
            <li>Does the bank own the home? No — you retain ownership.</li>
            <li>Can heirs keep the home? Often yes, typically by repaying or refinancing the loan balance — details depend on the loan and circumstances.</li>
            <li>What happens if I move or sell? The loan becomes due.</li>
            <li>Is counseling required? Yes, for HECM loans, HUD-approved counseling is required before closing.</li>
          </ul>
          <p className="text-sm italic text-cypress-700">
            These are general answers. Your specific situation should be
            discussed directly with Dawn.
          </p>
        </InfoSection>

        <InfoSection title="Helping a parent think this through?">
          <p>
            Visit{" "}
            <Link href="/family/helping-mom-or-dad" className="font-semibold text-cypress-700 underline underline-offset-2">
              Helping Mom or Dad
            </Link>{" "}
            for a family-focused explanation.
          </p>
        </InfoSection>

        <ReverseMortgageDisclosure className="mt-6" />
      </div>

      <PageCtaBand
        title="Ready to talk through your options?"
        body="This page is general education, not individual advice. Dawn can walk through your specific situation."
      />
    </>
  );
}
