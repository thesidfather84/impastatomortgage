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
          reuse of the homepage photograph. Tall and cinematic, matching
          the homepage's visual weight. */}
      <section
        className="relative isolate flex items-center overflow-hidden text-ivory lg:min-h-[480px] xl:min-h-[520px]"
        style={{
          backgroundImage: [
            "radial-gradient(85% 60% at 80% 0%, rgba(199,160,74,0.22) 0%, transparent 55%)",
            "linear-gradient(160deg, #1a2014 0%, #2a1a12 45%, #3a1318 100%)",
          ].join(", "),
        }}
      >
        <LiveOak className="pointer-events-none absolute -right-10 -top-4 h-[260px] w-[380px] text-burgundy-500/15 sm:h-[340px] sm:w-[500px]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-16">
          <WroughtIronRail className="mb-8 h-4 w-44 text-brass-400/70" />
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-brass-300">
            Reverse Mortgage
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Using your home
            <br />
            for retirement.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ivory/90 sm:text-2xl">
            A reverse mortgage lets eligible homeowners access their home&apos;s
            equity without monthly mortgage payments. It&apos;s a meaningful
            financial decision, and it deserves a plain-English explanation
            before anything else.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <CallDawnButton size="lg" />
            <TextDawnButton size="lg" variant="outline-light" />
          </div>
        </div>

        <RooflineSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-cypress-900/50 sm:h-20" />
      </section>

      {/* In plain English — true editorial two-column composition. */}
      <section className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <h2 className="font-display text-4xl font-semibold leading-tight text-cypress-900 sm:text-5xl lg:sticky lg:top-28 lg:self-start">
              In Plain
              <br />
              English
            </h2>
            <div className="max-w-3xl space-y-7 text-xl leading-relaxed text-charcoal-800">
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
        </div>
      </section>

      {/* Common questions — full-width editorial rows, question left,
          answer right, using the whole page composition. */}
      <section className="bg-ivory-deep py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-semibold text-cypress-900 sm:text-5xl">
            Common Questions
          </h2>

          <div className="mt-14 border-t border-brass-400/30">
            {questions.map((item) => (
              <div
                key={item.q}
                className="grid gap-3 border-b border-brass-400/30 py-10 lg:grid-cols-[380px_1fr] lg:gap-14"
              >
                <p className="font-display text-2xl font-semibold text-cypress-900 sm:text-[1.75rem]">
                  {item.q}
                </p>
                <p className="max-w-2xl text-lg leading-relaxed text-charcoal-800 sm:text-xl">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-lg italic text-cypress-700">
            These are general answers. Your specific situation should be
            discussed directly with Dawn.
          </p>
        </div>
      </section>

      {/* Family section — full-width split layout, not a floating card. */}
      <section className="relative overflow-hidden bg-burgundy-800 py-24 text-ivory lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brass-300">
                For the Family
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Helping a parent think this through?
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-ivory/90">
                You&apos;re not alone in this. Dawn has a dedicated guide
                written for adult children — plain language about what
                happens to the home, what heirs can expect, and the
                questions worth asking together.
              </p>
              <Link
                href="/family/helping-mom-or-dad"
                className="mt-8 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-md bg-brass-400 px-8 py-4 text-lg font-semibold text-charcoal-900 transition-colors hover:bg-brass-300"
              >
                Visit Helping Mom or Dad →
              </Link>
            </div>

            <div className="relative hidden h-72 items-center justify-center lg:flex">
              <RooflineSkyline className="absolute inset-x-0 bottom-8 h-36 w-full text-ivory/10" />
              <MagnoliaBloom className="relative h-32 w-32 text-brass-300/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure — a deliberate full-width band, readable, secondary
          hierarchy but never microscopic. */}
      <section className="bg-ivory-deep py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <ReverseMortgageDisclosure />
          </div>
        </div>
      </section>

      {/* Final CTA — the conclusion of the page. */}
      <section className="bg-cypress-900 py-28 text-ivory lg:py-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">
            Ready to talk through your options?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-ivory/85 sm:text-2xl">
            This page is general education, not individual advice. Dawn can
            walk through your specific situation, in plain English, whenever
            you&apos;re ready.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <CallDawnButton size="lg" />
            <TextDawnButton size="lg" variant="outline-light" />
            <EmailDawnButton size="lg" variant="outline-light" />
          </div>

          <PublicLicenseSummary className="mx-auto mt-12 max-w-md space-y-1.5 text-base text-ivory/70" />
        </div>
      </section>
    </>
  );
}
