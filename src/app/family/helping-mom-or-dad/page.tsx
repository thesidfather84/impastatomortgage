import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { ReverseMortgageDisclosure } from "@/components/compliance/ReverseMortgageDisclosure";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Helping Mom or Dad",
  description:
    "Plain-language answers for adult children helping a parent think through their home and finances.",
  path: "/family/helping-mom-or-dad",
});

export default function HelpingMomOrDadPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Family"
        title="I'm helping Mom or Dad."
        intro="If you're helping a parent think through their home and finances, you're not alone — this comes up often. Here are plain-language answers to the questions families ask most."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Does the bank own the home?">
          <p>
            No. With a reverse mortgage, your parent continues to own the
            home. The lender places a lien against it, similar to a
            traditional mortgage, but ownership stays with the homeowner.
          </p>
        </InfoSection>

        <InfoSection title="Can heirs keep the home?">
          <p>
            Often, yes — typically by repaying or refinancing the loan
            balance after the borrower passes away or moves out
            permanently. The specifics depend on the loan and the family&apos;s
            circumstances, so this is worth discussing directly.
          </p>
        </InfoSection>

        <InfoSection title="What happens when the borrower dies or moves out?">
          <p>
            The loan becomes due. Heirs or the estate generally have options:
            repay the loan and keep the home, sell the home to repay the
            loan, or, in some cases, allow the lender to sell it. There are
            protections and timelines involved that a family should
            understand ahead of time.
          </p>
        </InfoSection>

        <InfoSection title="Can the property be sold?">
          <p>
            Yes — the homeowner (or their estate) can sell the home at any
            time. Any loan balance is repaid from the proceeds.
          </p>
        </InfoSection>

        <InfoSection title="What responsibilities remain?">
          <p>
            The homeowner remains responsible for property taxes,
            homeowners insurance, and reasonable upkeep of the home for as
            long as they live there.
          </p>
        </InfoSection>

        <InfoSection title="Is counseling required?">
          <p>
            Yes, for HECM (FHA-insured) reverse mortgages, HUD-approved
            counseling is required before closing — a safeguard specifically
            meant to help families understand the decision before it&apos;s
            made.
          </p>
        </InfoSection>

        <InfoSection title="Good questions to ask together">
          <ul className="list-disc space-y-2 pl-5">
            <li>What are all the costs involved, and how are they paid?</li>
            <li>What happens to remaining equity, if any?</li>
            <li>What are the responsibilities that continue after closing?</li>
            <li>What alternatives should we consider first?</li>
          </ul>
        </InfoSection>

        <ReverseMortgageDisclosure className="mt-6" />
      </div>

      <PageCtaBand
        title="Bring your questions to Dawn"
        body="These are general answers. Every family's situation is different — Dawn is glad to talk it through with you and your parent."
      />
    </>
  );
}
