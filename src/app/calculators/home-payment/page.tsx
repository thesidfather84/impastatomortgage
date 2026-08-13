import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { HomePaymentCalculator } from "@/components/calculators/HomePaymentCalculator";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Payment Explorer",
  description:
    "Estimate your real monthly home payment — principal, interest, taxes, insurance, PMI, and HOA — in plain English.",
  path: "/calculators/home-payment",
});

export default function HomePaymentCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculators"
        title="What would this house cost me?"
        intro="Adjust the numbers below for a real, plain-English monthly estimate — not just the loan payment, but the costs people forget too."
      >
        <p className="mt-4 max-w-2xl text-base italic text-ivory/70">
          Alright, let&apos;s do some real math together — no smoke, no mirrors, just the numbers.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <HomePaymentCalculator />
      </div>
    </>
  );
}
