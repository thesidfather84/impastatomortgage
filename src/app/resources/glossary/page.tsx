import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { PageCtaBand } from "@/components/site/PageCtaBand";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Glossary",
  description: "Plain-English definitions for common mortgage terms.",
  path: "/resources/glossary",
});

export default function GlossaryPage() {
  const approvedTerms = knowledgeBase
    .filter((item) => item.approved)
    .slice()
    .sort((a, b) => a.topic.localeCompare(b.topic));

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="APR. PMI. FHA. HECM. Enough alphabet soup."
        intro="Here's the same plain-English translation Ask Dawn uses — no jargon-first definitions."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        {approvedTerms.map((term) => (
          <div key={term.id} className="border-b border-brass-400/20 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brass-600">
              {term.topic}
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-cypress-900">
              {term.questionVariants[0]}
            </h2>
            <p className="mt-2 text-base text-charcoal-800">{term.approvedAnswer}</p>
          </div>
        ))}
      </div>

      <PageCtaBand
        title="Have a term that's not here?"
        body="Ask Dawn directly, or reach out — Dawn is happy to explain anything in plain English."
      />
    </>
  );
}
