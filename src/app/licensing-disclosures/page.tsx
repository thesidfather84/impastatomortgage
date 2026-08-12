import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { LicensingDisclosure } from "@/components/compliance/LicensingDisclosure";
import { EqualHousingDisclosure } from "@/components/compliance/EqualHousingDisclosure";
import { MortgageAdvertisingDisclosure } from "@/components/compliance/MortgageAdvertisingDisclosure";
import { compliance } from "@/config/compliance";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Licensing & Disclosures",
  description:
    "Dawn Impastato's mortgage and Louisiana real-estate licensing information.",
  path: "/licensing-disclosures",
});

export default function LicensingDisclosuresPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance"
        title="Licensing & Disclosures"
        intro="Impastato Mortgage is Dawn Impastato's personal brand. Here's exactly who she is licensed with, and how."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="About this relationship">
          <p>
            <strong>Impastato Mortgage</strong> is Dawn Impastato&apos;s
            personal brand and website. It is not, itself, a licensed
            mortgage lender or broker. Dawn currently originates mortgage
            business as a loan originator through a licensed company,{" "}
            <strong>{compliance.mortgage.currentCompanyLegalName.value}</strong>.
            The information below identifies that relationship factually and
            will be kept current if it changes.
          </p>
        </InfoSection>

        <InfoSection title="Mortgage licensing">
          <LicensingDisclosure />
        </InfoSection>

        <InfoSection title="Advertising disclosure">
          <MortgageAdvertisingDisclosure />
        </InfoSection>

        <InfoSection title="Equal housing">
          <EqualHousingDisclosure />
        </InfoSection>

        <InfoSection title="A note on Dawn's real-estate license">
          <p>
            Dawn&apos;s Louisiana real-estate license is held separately from
            her mortgage relationship above.{" "}
            {compliance.realEstate.supervisingBrokerage.value} is not
            affiliated with {compliance.mortgage.currentCompanyLegalName.value}{" "}
            unless separately confirmed.
          </p>
        </InfoSection>
      </div>
    </>
  );
}
