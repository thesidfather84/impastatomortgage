import { FleurDeLis } from "./FleurDeLis";
import { compliance } from "@/config/compliance";

const licenseYear = compliance.realEstate.firstIssueDate.value?.slice(0, 4);

/**
 * A provenance-style heritage medallion — a seal, not a badge/pill.
 *
 * IMPORTANT: this seal reflects Dawn's verified Louisiana real-estate
 * license history (first issued 2005), NOT a founding date for Impastato
 * Mortgage as a company. Never word this as "Impastato Mortgage Est.
 * 2005" — that would misrepresent when the brand itself started.
 */
export function HeritageSeal({
  eyebrow = "Louisiana Real Estate",
  since = licenseYear,
  className,
}: {
  eyebrow?: string;
  since?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-brass-400/70 text-brass-100 ${className ?? ""}`}
    >
      <div className="absolute inset-2 rounded-full border border-brass-400/40" />
      <div className="flex flex-col items-center gap-1 px-3 text-center">
        <FleurDeLis className="h-4 w-4 text-brass-400" />
        <p className="max-w-[6.5rem] text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.12em]">
          {eyebrow}
        </p>
        {since && (
          <p className="font-display text-base font-semibold uppercase tracking-wide text-brass-300">
            Since {since}
          </p>
        )}
      </div>
    </div>
  );
}
