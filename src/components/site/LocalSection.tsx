import Link from "next/link";
import { locations } from "@/content/locations/locations";
import { LakeRipple } from "./motifs/LakeRipple";

const featured = ["new-orleans", "metairie", "mandeville", "covington", "slidell", "st-tammany-parish"];

export function LocalSection() {
  const featuredLocations = featured
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <section className="relative overflow-hidden bg-ivory-deep py-20 lg:py-24">
      <LakeRipple className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-lake-500/25" />

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-burgundy-600">
          Rooted here
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
          New Orleans. The Northshore. The Southshore. St. Tammany. Louisiana.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cypress-700">
          This isn&apos;t a national call center pretending to understand
          Louisiana. Dawn knows this region — the neighborhoods, the pace,
          and the character on both sides of Lake Pontchartrain.
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {featuredLocations.map((location, i) => (
            <span key={location.slug} className="flex items-center gap-2">
              <Link
                href={`/locations/${location.slug}`}
                className="font-display text-lg font-medium text-cypress-800 underline decoration-brass-400/50 decoration-2 underline-offset-4 hover:text-burgundy-600"
              >
                {location.name}
              </Link>
              {i < featuredLocations.length - 1 && (
                <span className="text-brass-400/70" aria-hidden="true">
                  &middot;
                </span>
              )}
            </span>
          ))}
        </div>

        <Link
          href="/locations"
          className="mt-8 inline-block text-sm font-semibold text-cypress-700 underline underline-offset-4 hover:text-burgundy-600"
        >
          See all areas we serve →
        </Link>
      </div>
    </section>
  );
}
