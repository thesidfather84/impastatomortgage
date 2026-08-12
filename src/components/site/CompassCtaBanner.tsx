import Link from "next/link";

export function CompassCtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-brass-400/40 bg-cypress-700 px-6 py-10 text-ivory sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mt-2 max-w-xl text-ivory/85">
            Dawn&apos;s Mortgage Compass asks a few simple questions and
            points you toward the right information — no pressure, no
            jargon.
          </p>
        </div>
        <Link
          href="/mortgage-compass"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-brass-500 px-6 py-3 text-base font-semibold text-charcoal-900 hover:bg-brass-600"
        >
          Try the Compass →
        </Link>
      </div>
    </section>
  );
}
