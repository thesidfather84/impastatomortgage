import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/config/seo";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { ARGENT_APPLICATION_URL } from "@/config/application";
import { CtaButton } from "@/components/ui/CtaButton";
import { AskDawnHeroButton } from "@/components/ask-dawn/AskDawnHeroButton";
import { PublicLicenseSummary } from "@/components/compliance/PublicLicenseSummary";
import { FleurDeLis } from "@/components/site/motifs/FleurDeLis";
import { LouisianaOutline } from "@/components/site/motifs/LouisianaOutline";

export const metadata: Metadata = pageMetadata({
  title: "About Dawn",
  description: "About Dawn Impastato — licensed in Louisiana real estate since 1991.",
  path: "/about-dawn",
});

const valuePoints = [
  {
    title: "Real Estate Expertise Since 1991",
    body: "Hands-on experience helping buyers, sellers, and investors throughout Louisiana.",
    icon: HomeIcon,
  },
  {
    title: "One Home. Every Stage.",
    body: "From first homes to forever homes — and using home equity later in life.",
    icon: PeopleIcon,
  },
  {
    title: "Local Knowledge. Lasting Relationships.",
    body: `Deep roots across ${brand.primaryMarket.areas.slice(0, 3).join(", ")}, and beyond.`,
    icon: KeyIcon,
  },
  {
    title: "Guidance You Can Trust",
    body: "Clear answers, honest advice, and plain-English explanations every step of the way.",
    icon: HeartIcon,
  },
];

export default function AboutDawnPage() {
  return (
    <>
      {/* Top intro — portrait left, introduction right on desktop */}
      <section className="bg-ivory-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <Image
              src="/images/dawn-portrait.png"
              alt="Portrait of Dawn Bullard Impastato, Louisiana mortgage loan originator and real estate professional"
              width={480}
              height={600}
              priority
              className="aspect-[4/5] w-full rounded-2xl border border-brass-400/40 object-cover shadow-lg shadow-charcoal-900/20"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brass-500">
              About
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-burgundy-800 sm:text-5xl">
              Dawn Bullard Impastato
            </h1>
            <div className="mt-4 flex items-center gap-3 text-brass-400">
              <span className="h-px w-10 bg-brass-400/60" />
              <FleurDeLis className="h-4 w-4" />
              <span className="h-px w-10 bg-brass-400/60" />
            </div>
            <p className="mt-4 text-lg font-semibold text-cypress-700">
              Licensed in Louisiana real estate since 1991.
            </p>
            <p className="mt-4 max-w-xl text-lg text-charcoal-800">
              Helping Louisiana families and individuals navigate life&apos;s
              mortgage decisions with experience, integrity, and heart.
            </p>
          </div>
        </div>
      </section>

      {/* Experience / value section */}
      <section className="border-t border-brass-400/20 bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.22em] text-burgundy-700">
            Local Roots. Real Experience. Result-Driven.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-charcoal-800">
            Dawn brings her Louisiana real estate license, held since 1991,
            to every conversation about home financing. As a licensed
            mortgage loan originator and real estate professional, she
            understands that every client&apos;s journey is unique — because
            she&apos;s walked alongside Louisiana families through just about
            every kind of real estate market this region has seen.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {valuePoints.map(({ title, body, icon: Icon }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brass-100/70">
                  <Icon className="h-6 w-6 text-cypress-700" />
                </div>
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-cypress-900">
                  {title}
                </p>
                <p className="mt-2 text-sm text-charcoal-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing — mortgage facts confirmed via centralized compliance
          config; real-estate detail intentionally stays limited to the
          dedicated Licensing & Disclosures page (see compliance.ts). */}
      <section className="relative overflow-hidden border-t border-brass-400/20 bg-ivory-deep">
        <LouisianaOutline className="pointer-events-none absolute -bottom-6 -right-6 hidden h-40 w-40 text-brass-400/25 sm:block lg:h-48 lg:w-48" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-brass-400/30 bg-ivory p-6 sm:p-8">
            <PublicLicenseSummary className="space-y-1.5 text-base text-cypress-700" />
            <p className="mt-4 max-w-2xl text-sm text-charcoal-700">
              Dawn also holds an active Louisiana real-estate license,
              separate from her mortgage relationship above. Full licensing
              details, including her real-estate affiliation, are available
              on the{" "}
              <Link
                href="/licensing-disclosures"
                className="font-semibold underline underline-offset-2 hover:text-burgundy-600"
              >
                Licensing &amp; Disclosures
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="bg-burgundy-800 text-ivory">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Let&apos;s Create Your Next Chapter.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-brass-400 px-7 py-3.5 font-display text-lg font-semibold text-charcoal-900 transition-colors hover:bg-brass-300"
            >
              Talk to Dawn
            </a>
            <AskDawnHeroButton variant="outline" />
            <CtaButton href={ARGENT_APPLICATION_URL} variant="secondary" size="lg" newTab>
              Start Application
            </CtaButton>
          </div>

          <p className="mt-6 text-sm text-ivory/80">
            Call or text Dawn:{" "}
            <a href={contact.phoneHref} className="text-base font-bold text-brass-200 hover:text-brass-100">
              {contact.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9.5" r="2.25" />
      <path d="M15.5 14.2c2.6.3 4.5 2.5 4.5 5.3" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11 20 20" />
      <path d="M16 16l2.5-2.5" />
      <path d="M18.5 18.5 21 16" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.2s-7.5-4.6-9.7-9.2C.8 7.6 2.5 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.5.5 5.2 3.6 3.7 7-2.2 4.6-9.7 9.2-9.7 9.2Z" />
    </svg>
  );
}
