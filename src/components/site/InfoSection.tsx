import type { ReactNode } from "react";

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-brass-400/20 py-6">
      <h2 className="font-display text-xl font-semibold text-cypress-900 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base text-charcoal-800 sm:text-lg">
        {children}
      </div>
    </section>
  );
}
