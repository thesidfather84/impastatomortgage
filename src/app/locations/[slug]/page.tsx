import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug } from "@/content/locations/locations";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { pageMetadata } from "@/config/seo";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata(
  props: PageProps<"/locations/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return pageMetadata({
    title: `Mortgages in ${location.name}, Louisiana`,
    description: location.blurb,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage(props: PageProps<"/locations/[slug]">) {
  const { slug } = await props.params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return (
    <>
      <PageHeader
        eyebrow={location.region}
        title={`Serving borrowers in ${location.name}`}
        intro={location.intro}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Local character">
          <ul className="list-disc space-y-2 pl-5">
            {location.characterNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Financing options">
          <p>
            Dawn helps borrowers in {location.name} with purchase mortgages,
            refinancing, first-time buyer financing, home equity options,
            and reverse mortgages — all explained in plain English.
          </p>
        </InfoSection>
      </div>

      <PageCtaBand
        title={`Ready to talk about ${location.name}?`}
        body="Reach out directly, or ask Dawn a question first."
      />
    </>
  );
}
