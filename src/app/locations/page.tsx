import type { Metadata } from "next";
import { locations } from "@/content/locations/locations";
import { PageHeader } from "@/components/site/PageHeader";
import { EditorialLinkList } from "@/components/site/EditorialLinkList";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Areas We Serve",
  description: "Louisiana communities Dawn serves, from New Orleans to the Northshore and Southshore.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  const items = locations.map((location) => ({
    href: `/locations/${location.slug}`,
    title: location.name,
    description: location.blurb,
    eyebrow: location.region,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Louisiana"
        title="Areas we serve"
        intro="From New Orleans to the Northshore and Southshore, here's a closer look at the communities Dawn works with."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <EditorialLinkList items={items} />
      </div>
    </>
  );
}
