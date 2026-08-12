import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/content/locations/locations";
import { PageHeader } from "@/components/site/PageHeader";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Areas We Serve",
  description: "Louisiana communities Dawn serves, from New Orleans to the Northshore and Southshore.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Louisiana"
        title="Areas we serve"
        intro="From New Orleans to the Northshore and Southshore, here's a closer look at the communities Dawn works with."
      />

      <div className="mx-auto grid max-w-4xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        {locations.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="rounded-xl border border-cypress-100 bg-white p-6 transition-colors hover:border-brass-400"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brass-600">
              {location.region}
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-cypress-900">
              {location.name}
            </p>
            <p className="mt-1 text-cypress-700">{location.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
