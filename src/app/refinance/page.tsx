import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { ApplicationCta } from "@/components/ui/ApplicationCta";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Refinance",
  description:
    "Exploring a mortgage refinance in Louisiana — what it means and how to know if it's worth a conversation.",
  path: "/refinance",
});

export default function RefinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Refinance"
        title="Lower my payment. Change my terms. Use my equity."
        intro="Refinancing means replacing your current mortgage with a new one. People do it for different reasons — and what makes sense for you depends entirely on your situation."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Common reasons people refinance">
          <ul className="list-disc space-y-2 pl-5">
            <li>Lowering a monthly payment</li>
            <li>Shortening or lengthening a loan term</li>
            <li>Moving from an adjustable rate to a fixed rate (or vice versa)</li>
            <li>Accessing home equity for a specific need</li>
          </ul>
        </InfoSection>

        <InfoSection title="What actually determines whether it's worth it">
          <p>
            Your current loan terms, today&apos;s terms, how long you plan
            to stay in the home, and any costs involved all factor in.
            There&apos;s no shortcut formula that applies to everyone — this
            is genuinely worth a real conversation rather than a guess.
          </p>
        </InfoSection>

        <InfoSection title="Next step">
          <p>
            <Link href="/mortgage-compass" className="font-semibold text-cypress-700 underline underline-offset-2">
              Try Dawn&apos;s Mortgage Compass
            </Link>{" "}
            or{" "}
            <Link href="/ask-dawn" className="font-semibold text-cypress-700 underline underline-offset-2">
              Ask Dawn
            </Link>{" "}
            a specific question to get started.
          </p>
        </InfoSection>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-brass-400/30 bg-ivory-deep p-6 sm:p-8">
          <ApplicationCta />
        </div>
      </div>

      <PageCtaBand />
    </>
  );
}
