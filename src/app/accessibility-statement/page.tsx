import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PendingNotice } from "@/components/compliance/PendingNotice";
import { contact } from "@/config/contact";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "Accessibility features and commitment for the Impastato Mortgage website.",
  path: "/accessibility-statement",
});

export default function AccessibilityStatementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        title="Accessibility Statement"
        intro="This site is built to be usable by people of all ages and abilities, from first-time phone users to lifelong desktop users."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="What's built in today">
          <ul className="list-disc space-y-2 pl-5">
            <li>Adjustable text size (Standard, Large, Extra Large)</li>
            <li>A progressive-enhancement &quot;Read This Page&quot; option, when your browser supports it</li>
            <li>Large, keyboard-accessible tap targets throughout</li>
            <li>Strong color contrast and visible focus states</li>
            <li>Reduced-motion support for users who prefer less animation</li>
            <li>Semantic HTML and screen-reader-friendly markup</li>
            <li>A &quot;Skip to main content&quot; link for keyboard users</li>
          </ul>
          <p>We&apos;re aiming for WCAG 2.2 AA conformance.</p>
        </InfoSection>

        <InfoSection title="Where this page stands today">
          <PendingNotice label="A formal, independent accessibility audit" />
        </InfoSection>

        <InfoSection title="Let us know">
          <p>
            If you run into an accessibility barrier anywhere on this site,
            please contact Dawn directly at{" "}
            <a href={contact.emailHref} className="font-semibold underline underline-offset-2">
              {contact.emailAddress}
            </a>{" "}
            or{" "}
            <a href={contact.phoneHref} className="font-semibold underline underline-offset-2">
              {contact.phoneDisplay}
            </a>
            .
          </p>
        </InfoSection>
      </div>
    </>
  );
}
