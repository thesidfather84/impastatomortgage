import Link from "next/link";
import { brand } from "@/config/brand";

export function AboutTeaser() {
  return (
    <section className="border-y border-cypress-100 bg-ivory-deep">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brass-600">
          {brand.experienceHeadline}
        </p>
        <h2 className="font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
          {brand.positioningStatement}
        </h2>
        <p className="mt-4 text-lg text-cypress-700">
          Before a single loan, Dawn spent decades in Louisiana living
          rooms, walk-throughs, and closing tables — learning how families
          actually make housing decisions. That&apos;s the lens she brings to
          every conversation about financing.
        </p>
        <Link
          href="/about-dawn"
          className="mt-6 inline-block text-base font-semibold text-cypress-700 underline underline-offset-4 hover:text-brass-600"
        >
          More about Dawn →
        </Link>
      </div>
    </section>
  );
}
