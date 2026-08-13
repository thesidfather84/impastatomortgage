import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { HomeEquityExplorer } from "@/components/calculators/HomeEquityExplorer";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Equity Explorer",
  description:
    "Estimate what a HECM reverse mortgage could make possible — Maximum Claim Amount, Principal Limit Factor, and mandatory obligations, in plain English.",
  path: "/calculators/home-equity",
});

export default function HomeEquityExplorerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculators"
        title="See what your home could make possible in retirement."
        intro="Dawn's Home Equity Explorer uses HUD's own published rules to give you a real, plain-English starting estimate — no sign-in, no contact information required."
      >
        <p className="mt-4 max-w-2xl text-base italic text-ivory/70">
          This is estimate math, straight from HUD&apos;s own tables — not a sales pitch.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <HomeEquityExplorer />
      </div>
    </>
  );
}
