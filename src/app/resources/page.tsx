import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { pageMetadata } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description: "Plain-English mortgage resources, glossary, and tools.",
  path: "/resources",
});

const resourceLinks = [
  {
    title: "Glossary",
    description: "Plain-English definitions for common mortgage terms.",
    href: "/resources/glossary",
  },
  {
    title: "Dawn's Mortgage Compass",
    description: "A quick, educational routing tool to find your starting point.",
    href: "/mortgage-compass",
  },
  {
    title: "Ask Dawn",
    description: "Type a question and get a plain-English, approved answer.",
    href: "/ask-dawn",
  },
  {
    title: "Helping Mom or Dad",
    description: "A family-focused guide to reverse mortgage questions.",
    href: "/family/helping-mom-or-dad",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Plain-English tools and answers."
        intro="No jargon-first explanations here. Start wherever makes sense."
      />

      <div className="mx-auto grid max-w-4xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        {resourceLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-cypress-100 bg-white p-6 transition-colors hover:border-brass-400"
          >
            <p className="font-display text-xl font-semibold text-cypress-900">{link.title}</p>
            <p className="mt-1 text-cypress-700">{link.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
