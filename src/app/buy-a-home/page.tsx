import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { ApplicationCta } from "@/components/ui/ApplicationCta";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Buy a Home",
  description:
    "Buying your first home or your next home in Louisiana — plain-English guidance from Dawn Impastato.",
  path: "/buy-a-home",
});

export default function BuyAHomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Buying a Home"
        title="Your first home, or your next one."
        intro="Buying a home is one of the biggest decisions you'll make — and one of the most personal. Dawn brings decades of real estate experience to the financing side of that decision, so you're not learning it alone."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Where most people start">
          <p>
            Whether you&apos;re buying for the first time or you&apos;ve done
            this before, the questions are usually the same: what can I
            reasonably plan for, what will the process look like, and what
            should I watch out for?
          </p>
          <p>
            Dawn walks through those questions in plain English before any
            paperwork starts — no assumptions, no jargon-first
            conversations.
          </p>
        </InfoSection>

        <InfoSection title="First-time buyers">
          <p>
            There are financing paths built specifically for first-time
            buyers, often with more flexible down payment options. Dawn can
            walk through what&apos;s available and what tends to fit
            different situations.
          </p>
        </InfoSection>

        <InfoSection title="Moving up, relocating, or downsizing">
          <p>
            Buying your next home comes with its own set of questions —
            timing a sale alongside a purchase, understanding how existing
            equity factors in, and deciding what fits this next chapter.
          </p>
        </InfoSection>

        <InfoSection title="Not sure where to start?">
          <p>
            That&apos;s completely normal.{" "}
            <Link href="/mortgage-compass" className="font-semibold text-cypress-700 underline underline-offset-2">
              Try Dawn&apos;s Mortgage Compass
            </Link>{" "}
            for a few quick questions that point you toward the right next
            step, or{" "}
            <Link href="/ask-dawn" className="font-semibold text-cypress-700 underline underline-offset-2">
              Ask Dawn
            </Link>{" "}
            directly.
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
