import type { ReactNode } from "react";
import { WroughtIronRail } from "./motifs/WroughtIronRail";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-burgundy-800 text-ivory">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <WroughtIronRail className="mb-6 h-3.5 w-36 text-brass-400/70" />
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brass-300">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-ivory/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
