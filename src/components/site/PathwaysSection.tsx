import { pathways, acrossTheLakePathway } from "@/config/pathways";
import { PathwayCard } from "./PathwayCard";

export function PathwaysSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
        What can Dawn help you do?
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-cypress-700">
        Tap the option that sounds most like you — no jargon required.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pathway) => (
          <PathwayCard key={pathway.id} pathway={pathway} />
        ))}
        <PathwayCard pathway={acrossTheLakePathway} accent />
      </div>
    </section>
  );
}
