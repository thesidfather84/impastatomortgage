import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Equity / Options",
  description: "Understanding home equity options in plain English.",
  path: "/home-equity",
});

export default function HomeEquityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Home Equity"
        title="What your equity can do for you."
        intro="Home equity is the difference between what your home is worth and what you still owe on it. There are several ways homeowners can put that equity to work, depending on their goals."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Common paths">
          <ul className="list-disc space-y-2 pl-5">
            <li>A cash-out refinance, replacing your current loan with a larger one</li>
            <li>A home equity loan, a separate loan against your equity</li>
            <li>A home equity line of credit (HELOC), a flexible line you draw from as needed</li>
            <li>For homeowners 62+, a reverse mortgage</li>
          </ul>
        </InfoSection>

        <InfoSection title="What fits depends on you">
          <p>
            Each option has different costs, structures, and implications.
            The right one depends on your goals, your current loan, and
            your timeline — this is worth a real conversation with Dawn.
          </p>
        </InfoSection>
      </div>

      <PageCtaBand />
    </>
  );
}
