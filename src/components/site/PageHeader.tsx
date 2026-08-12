import type { ReactNode } from "react";

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
    <section className="border-b border-cypress-100 bg-ivory-deep">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brass-600">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-semibold text-cypress-900 sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-charcoal-800">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
