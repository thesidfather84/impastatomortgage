import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PendingNotice } from "@/components/compliance/PendingNotice";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Impastato Mortgage website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Where this page stands today">
          <PendingNotice label="A formal, attorney-reviewed terms of use" />
        </InfoSection>

        <InfoSection title="In the meantime">
          <p>
            This website provides general educational information about
            mortgage products and is not a loan application, a commitment
            to lend, an offer of credit, or a guarantee of loan approval.
            Nothing on this site should be relied on as individualized
            financial, legal, or tax advice.
          </p>
        </InfoSection>
      </div>
    </>
  );
}
