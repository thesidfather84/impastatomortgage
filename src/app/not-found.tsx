import Link from "next/link";
import { ContactButtonRow } from "@/components/ui/ContactButtons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-brass-600">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 text-lg text-cypress-700">
        Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-brass-500 px-6 py-3 font-semibold text-charcoal-900 hover:bg-brass-600"
      >
        Back to Home
      </Link>
      <div className="mt-8 flex justify-center">
        <ContactButtonRow />
      </div>
    </div>
  );
}
