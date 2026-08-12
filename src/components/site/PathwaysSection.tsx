import { pathways } from "@/config/pathways";
import { PathwayCard } from "./PathwayCard";
import { SectionDivider } from "./SectionDivider";

export function PathwaysSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass-600">
          Where to begin
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
          How can Dawn help?
        </h2>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pathway, index) => (
          <PathwayCard key={pathway.id} pathway={pathway} index={index} />
        ))}
      </div>

      <SectionDivider className="mt-16" />
    </section>
  );
}
