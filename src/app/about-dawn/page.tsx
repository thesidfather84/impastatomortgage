import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { LicensingDisclosure } from "@/components/compliance/LicensingDisclosure";
import { pageMetadata } from "@/config/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "About Dawn",
  description: "About Dawn Impastato — nearly 30 years of Louisiana real estate experience.",
  path: "/about-dawn",
});

export default function AboutDawnPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Dawn"
        title={brand.ownerName}
        intro="A Louisiana guide for every chapter of homeownership."
      />

      <div className="mx-auto grid max-w-4xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="mx-auto w-full max-w-xs">
          <PortraitPlaceholder />
        </div>

        <div>
          <InfoSection title="Nearly 30 years of real estate experience">
            <p>
              Before helping people with mortgages, Dawn spent decades in
              Louisiana real estate — in living rooms, at walk-throughs, and
              at closing tables. That experience shapes how she talks about
              financing: in plain English, grounded in how families actually
              make housing decisions.
            </p>
          </InfoSection>

          <InfoSection title="Traditional and reverse mortgage knowledge">
            <p>
              Dawn works with a full range of residential financing —
              purchase loans, refinancing, first-time buyer programs, home
              equity options, and reverse mortgages — and believes every
              client deserves a plain-English explanation before anything
              else.
            </p>
          </InfoSection>

          <InfoSection title="Rooted in Louisiana">
            <p>
              From New Orleans to the Northshore and Southshore communities
              around Lake Pontchartrain, Dawn understands the neighborhoods,
              the pace, and the character of Southeast Louisiana housing.
            </p>
          </InfoSection>

          <InfoSection title="Licensing">
            <LicensingDisclosure />
          </InfoSection>
        </div>
      </div>

      <PageCtaBand title="Want to talk with Dawn directly?" body="Call, text, or email — whatever's easiest for you." />
    </>
  );
}
