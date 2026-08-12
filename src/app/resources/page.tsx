import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { EditorialLinkList } from "@/components/site/EditorialLinkList";
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

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <EditorialLinkList items={resourceLinks} />
      </div>
    </>
  );
}
