import Link from "next/link";
import { AskDawnHeroButton } from "@/components/ask-dawn/AskDawnHeroButton";
import { MagnoliaBloom } from "./motifs/MagnoliaBloom";

export function FamilySection() {
  return (
    <section className="relative overflow-hidden bg-burgundy-800 py-24 text-ivory lg:py-32">
      <MagnoliaBloom className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 text-ivory/10" />
      <MagnoliaBloom className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 text-ivory/10" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Your home has been part of your story.
          <br />
          Let&apos;s talk about what comes next.
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/reverse-mortgage"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-brass-400 px-7 py-3.5 text-lg font-semibold text-charcoal-900 hover:bg-brass-300"
          >
            Explore Reverse Mortgages
          </Link>
          <Link
            href="/family/helping-mom-or-dad"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-ivory/50 px-7 py-3.5 text-lg font-semibold text-ivory hover:bg-white/10"
          >
            I&apos;m Helping Mom or Dad
          </Link>
          <AskDawnHeroButton />
        </div>
      </div>
    </section>
  );
}
