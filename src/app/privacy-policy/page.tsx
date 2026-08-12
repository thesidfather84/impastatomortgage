import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { InfoSection } from "@/components/site/InfoSection";
import { PendingNotice } from "@/components/compliance/PendingNotice";
import { contact } from "@/config/contact";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Impastato Mortgage handles information on this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <InfoSection title="Where this page stands today">
          <PendingNotice label="A formal, attorney-reviewed privacy policy" />
        </InfoSection>

        <InfoSection title="What this site currently does">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Your text-size preference and Italian Mode preference are saved
              only in your browser (localStorage) — they are never sent to a
              server.
            </li>
            <li>
              Ask Dawn conversations happen entirely in your browser using a
              local, approved knowledge base. There is no backend yet, so
              nothing you type into Ask Dawn is transmitted, stored, or
              logged anywhere.
            </li>
            <li>
              This site does not currently collect Social Security numbers,
              bank account or routing numbers, or credit report information.
            </li>
            <li>No contact form is connected to a backend yet.</li>
          </ul>
        </InfoSection>

        <InfoSection title="Questions">
          <p>
            If you have privacy questions in the meantime, contact Dawn
            directly at{" "}
            <a href={contact.emailHref} className="font-semibold underline underline-offset-2">
              {contact.emailAddress}
            </a>
            .
          </p>
        </InfoSection>
      </div>
    </>
  );
}
