import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/site/PageHeader";
import { PendingNotice } from "@/components/compliance/PendingNotice";
import { complianceFieldStatuses, missingComplianceFields } from "@/config/compliance";

/**
 * Internal, development-only view of unresolved compliance fields.
 * Never linked from public navigation or the sitemap, and 404s outright
 * in production so it can never be reached by a real visitor.
 */
export const metadata: Metadata = {
  title: "Compliance Status (Internal)",
  robots: { index: false, follow: false },
};

export default function ComplianceStatusPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow="Internal — Development Only"
        title="Compliance field status"
        intro="This page never renders in production. It exists so the team can see which regulated fields still need verification before anything is published."
      />

      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-cypress-900">
          {missingComplianceFields.length} of {complianceFieldStatuses.length} fields unresolved.
        </p>

        {missingComplianceFields.length === 0 ? (
          <p className="text-sm text-cypress-700">All compliance fields are confirmed.</p>
        ) : (
          missingComplianceFields.map((path) => <PendingNotice key={path} label={path} />)
        )}
      </div>
    </>
  );
}
