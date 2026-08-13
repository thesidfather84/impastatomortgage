import type { Metadata } from "next";
import Link from "next/link";
import { LiveOak } from "@/components/site/motifs/LiveOak";
import { RooflineSkyline } from "@/components/site/motifs/RooflineSkyline";
import { WroughtIronRail } from "@/components/site/motifs/WroughtIronRail";
import { MagnoliaBloom } from "@/components/site/motifs/MagnoliaBloom";
import {
  CallDawnButton,
  TextDawnButton,
  EmailDawnButton,
} from "@/components/ui/ContactButtons";
import { ReverseMortgageDisclosure } from "@/components/compliance/ReverseMortgageDisclosure";
import { PublicLicenseSummary } from "@/components/compliance/PublicLicenseSummary";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reverse Mortgage",
  description:
    "Understanding reverse mortgages in plain English — what they are, how they work, and what to consider.",
  path: "/reverse-mortgage",
});

const questions = [
  {
    q: "Does the bank own the home?",
    a: "No — you retain ownership of your home the entire time.",
  },
  {
    q: "Can heirs keep the home?",
    a: "Often yes, typically by repaying or refinancing the loan balance. The details depend on the loan and your family's circumstances.",
  },
  {
    q: "What happens if I move or sell?",
    a: "The loan becomes due at that time, repaid from the proceeds of the sale.",
  },
  {
    q: "Is counseling required?",
    a: "Yes. For HECM loans, HUD-approved counseling is required before closing — a safeguard built into the process.",
  },
];

export default function ReverseMortgagePage() {
  return (
    <>
      {/* Hero — related to the homepage's brand system (burgundy, olive,
          aged gold, live oak, rooflines) but its own composition, not a
          reuse of the homepage photograph. */}
      <section
        className="relative isolate overflow-hidden text-ivory"
        style={{
          backgroundImage: [
            "radial-gradient(85% 60% at 80% 0%, rgba(199,160,74,0.22) 0%, transparent 55%)",
            "linear-gradient(160deg, #1a2014 0%, #2a1a12 45%, #3a1318 100%)",
          ].join(", "),
        }}
      >
        <LiveOak className="pointer-events-none absolute -right-10 -top-4 h-[220px] w-[320px] text-burgundy-500/15 sm:h-[280px] sm:w-[420px]" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <WroughtIronRail className="mb-7 h-3.5 w-40 text-brass-400/70" />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brass-300">
            Reverse Mortgage
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Using your home
            <br />
            for retirement.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ivory/90">
            A reverse mortgage lets eligible homeowners access their home&apos;s
            equity without monthly mortgage payments. It&apos;s a meaningful
            financial decision, and it deserves a plain-English explanation
            before anything else.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CallDawnButton size="lg" />
            <TextDawnButton size="lg" variant="outline-light" />
          </div>
        </div>

        <RooflineSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-cypress-900/50 sm:h-20" />
      </section>

      {/* In plain English — the core explanation, sized for comfortable
          reading at any age. */}
      <section className="bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
            In plain English
          </h2>
          <div className="mt-8 space-y-7 text-xl leading-relaxed text-charcoal-800">
            <p>
              A reverse mortgage is a loan for homeowners — typically 62 or
              older — that lets you borrow against your home&apos;s equity
              without making monthly mortgage payments.
            </p>
            <p>
              The loan is repaid when you sell the home, permanently move
              out, or pass away.
            </p>
            <p>
              You remain responsible for property taxes, homeowners
              insurance, and home upkeep throughout. The most common type, a
              HECM, is insured by the FHA and requires HUD-approved
              counseling before closing.
            </p>
          </div>
        </div>
      </section>

      {/* Common questions — spacious editorial Q&A, not a dense list. */}
      <section className="bg-ivory-deep py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
            Common questions
          </h2>

          <div className="mt-10 divide-y divide-brass-400/25">
            {questions.map((item) => (
              <div key={item.q} className="py-8 first:pt-0">
                <p className="font-display text-2xl font-semibold text-cypress-900">
                  {item.q}
                </p>
                <p className="mt-3 max-w-3xl text-xl leading-relaxed text-charcoal-800">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-lg italic text-cypress-700">
            These are general answers. Your specific situation should be
            discussed directly with Dawn.
          </p>
        </div>
      </section>

      {/* Family callout */}
      <section className="relative overflow-hidden bg-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg border border-brass-400/40 bg-burgundy-800 px-7 py-10 text-ivory sm:px-12 sm:py-12">
            <MagnoliaBloom className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-ivory/10" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass-300">
                For the family
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Helping a parent think this through?
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-ivory/90">
                You&apos;re not alone in this. Dawn has a dedicated guide
                written for adult children — plain language about what
                happens to the home, what heirs can expect, and the
                questions worth asking together.
              </p>
              <Link
                href="/family/helping-mom-or-dad"
                className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-brass-400 px-7 py-3.5 text-lg font-semibold text-charcoal-900 transition-colors hover:bg-brass-300"
              >
                Visit Helping Mom or Dad →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure — kept plainly readable, not tiny fine print. */}
      <section className="bg-ivory pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ReverseMortgageDisclosure />
        </div>
      </section>

      {/* Final CTA — large and premium. */}
      <section className="bg-cypress-900 py-24 text-ivory lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Ready to talk through your options?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-xl text-ivory/85">
            This page is general education, not individual advice. Dawn can
            walk through your specific situation, in plain English, whenever
            you&apos;re ready.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CallDawnButton size="lg" />
            <TextDawnButton size="lg" variant="outline-light" />
            <EmailDawnButton size="lg" variant="outline-light" />
          </div>

          <PublicLicenseSummary className="mx-auto mt-10 max-w-md space-y-1 text-sm text-ivory/60" />
        </div>
      </section>
    </>
  );
}
