import Link from "next/link";
import { HeritageSeal } from "./motifs/HeritageSeal";
import { SectionDivider } from "./SectionDivider";

const steps = [
  {
    title: "Real estate, Louisiana",
    body: "Decades spent inside Louisiana homes — walk-throughs, negotiations, and closing tables across the Southshore and Northshore.",
  },
  {
    title: "Understanding the whole transaction",
    body: "Learning how families actually make housing decisions — not just how to process paperwork.",
  },
  {
    title: "Mortgage guidance, today",
    body: "Bringing that experience to financing conversations, explained the same plain way, every time.",
  },
];

export function StorySection() {
  return (
    <section className="bg-cypress-900 py-20 text-ivory lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <HeritageSeal className="border-brass-300/60" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass-200/90">
                Dawn&apos;s story
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Decades around
                <br />
                Louisiana homes.
              </h2>
              <p className="mt-4 max-w-sm text-ivory/75">
                She understands more than the mortgage — she understands the
                home, and the transaction behind it.
              </p>
              <Link
                href="/about-dawn"
                className="mt-5 inline-block text-sm font-semibold text-brass-200 underline underline-offset-4 hover:text-brass-100"
              >
                More about Dawn →
              </Link>
            </div>
          </div>

          <ol className="relative space-y-10 border-l border-brass-400/30 pl-8">
            {steps.map((step) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-brass-300 bg-cypress-900" />
                <p className="font-display text-xl font-semibold text-brass-100">{step.title}</p>
                <p className="mt-2 max-w-md text-ivory/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <SectionDivider className="mt-16 text-brass-300/50" />
      </div>
    </section>
  );
}
