import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { pageMetadata } from "@/config/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "About Dawn",
  description: "About Dawn Impastato — decades of Louisiana real estate experience.",
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
          <InfoSection title="More than a mortgage perspective">
            <p>
              Dawn isn&apos;t simply a mortgage originator — she&apos;s also
              a Louisiana Associate Broker with real estate roots that go
              back decades. When you&apos;ve spent that long around
              Louisiana real estate, you learn the mortgage is only one
              piece of the story. That experience shapes how she talks about
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
            <p>
              Dawn is licensed as a mortgage loan originator through Argent
              Lending LLC and holds an active Louisiana real-estate license.
              Full licensing details, including NMLS numbers, are available
              on the{" "}
              <Link
                href="/licensing-disclosures"
                className="font-semibold underline underline-offset-2"
              >
                Licensing &amp; Disclosures
              </Link>{" "}
              page.
            </p>
          </InfoSection>
        </div>
      </div>

      <PageCtaBand title="Want to talk with Dawn directly?" body="Call, text, or email — whatever's easiest for you." />
    </>
  );
}
