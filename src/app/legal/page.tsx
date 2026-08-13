import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PendingNotice } from "@/components/compliance/PendingNotice";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal Information",
  description: "General legal information for the Impastato Mortgage website.",
  path: "/legal",
});

export default function LegalPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <PageHeader eyebrow="Legal" title="Legal Information" />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="General use of this website">
          <p>
            This website provides general, informational content about
            mortgage topics and Dawn Impastato&apos;s services. It is
            intended for general educational purposes only, and the
            information on it may change at any time without notice. We do
            not warrant the completeness, timeliness, or accuracy of any
            information on this site.
          </p>
        </InfoSection>

        <InfoSection title="Not an offer">
          <p>
            Nothing on this website is an offer or solicitation to lend, a
            commitment to lend, a guarantee of loan approval, or a quote of
            current rates or terms. Any specific mortgage discussion happens
            directly with Dawn, based on your actual circumstances.
          </p>
        </InfoSection>

        <InfoSection title="Products and availability vary">
          <p>
            The mortgage products, programs, and options described on this
            site can vary by state, property type, and individual borrower
            circumstances, and not every product or program is available in
            every location. Always confirm current availability and
            eligibility directly with Dawn.
          </p>
        </InfoSection>

        <InfoSection title="Not professional advice">
          <p>
            Nothing on this site is tax, accounting, legal, investment, or
            other professional advice, and it should not be treated as an
            exhaustive treatment of any subject. Before making a financial
            decision, please consult your own qualified tax, legal, or
            financial advisor.
          </p>
        </InfoSection>

        <InfoSection title="Copyright">
          <p>
            &copy; {year} {brand.siteName}. All rights reserved. The content
            of this site — including text, graphics, and layout — is
            protected by copyright and may not be reproduced, distributed,
            or publicly displayed for commercial purposes without prior
            permission.
          </p>
        </InfoSection>

        <InfoSection title="Where this page stands today">
          <PendingNotice label="A formal, attorney-reviewed legal notice" />
        </InfoSection>

        <InfoSection title="Related pages">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <Link href="/privacy-policy" className="font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility-statement" className="font-semibold underline underline-offset-2">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link href="/licensing-disclosures" className="font-semibold underline underline-offset-2">
                Licensing &amp; Disclosures
              </Link>
            </li>
            <li>
              <Link href="/terms" className="font-semibold underline underline-offset-2">
                Terms of Use
              </Link>
            </li>
          </ul>
        </InfoSection>
      </div>
    </>
  );
}
