import Link from "next/link";
import { FleurDeLis } from "./motifs/FleurDeLis";

export function CompassCtaBanner() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <FleurDeLis className="mx-auto h-7 w-7 text-brass-500" />
        <h2 className="mt-5 font-display text-4xl font-semibold text-cypress-900 sm:text-5xl">
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl text-cypress-700">
          Dawn&apos;s Mortgage Compass asks a few simple questions and points
          you toward the right information — no pressure, no jargon.
        </p>
        <Link
          href="/mortgage-compass"
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-md border-2 border-cypress-900 px-8 py-3.5 text-lg font-semibold text-cypress-900 hover:bg-cypress-900 hover:text-ivory"
        >
          Try the Compass →
        </Link>
      </div>
    </section>
  );
}
