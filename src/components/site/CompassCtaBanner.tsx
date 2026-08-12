import Link from "next/link";
import { FleurDeLis } from "./motifs/FleurDeLis";

export function CompassCtaBanner() {
  return (
    <section className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <FleurDeLis className="mx-auto h-6 w-6 text-brass-500" />
        <h2 className="mt-4 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-cypress-700">
          Dawn&apos;s Mortgage Compass asks a few simple questions and points
          you toward the right information — no pressure, no jargon.
        </p>
        <Link
          href="/mortgage-compass"
          className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-md border border-cypress-900 px-7 py-3 text-base font-semibold text-cypress-900 hover:bg-cypress-900 hover:text-ivory"
        >
          Try the Compass →
        </Link>
      </div>
    </section>
  );
}
