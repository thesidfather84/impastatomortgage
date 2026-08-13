import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { AskDawnInline } from "@/components/ask-dawn/AskDawnInline";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ask Dawn",
  description:
    "Ask a plain-English mortgage question and get an approved answer, or get connected with Dawn directly.",
  path: "/ask-dawn",
});

export default function AskDawnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ask Dawn"
        title="Type a question. Get a straight answer."
        intro="Ask Dawn only answers from an approved knowledge base — it never guesses. If there's no approved answer, you'll be connected with Dawn directly."
      />

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <AskDawnInline />

        <p className="mt-6 text-center text-sm text-cypress-700">
          Curious what a home might really cost each month?{" "}
          <Link
            href="/calculators/home-payment"
            className="font-semibold underline underline-offset-2 hover:text-cypress-900"
          >
            Try Dawn&apos;s Home Payment Explorer
          </Link>
          .
        </p>
      </div>
    </>
  );
}
