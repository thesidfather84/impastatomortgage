import { FleurDeLis } from "./FleurDeLis";
import { compliance } from "@/config/compliance";

const licenseYear = compliance.realEstate.firstIssueDate.value?.slice(0, 4);

/**
 * A provenance-style heritage medallion — a seal, not a badge/pill. Defaults
 * to the verified Louisiana real-estate license year rather than an
 * unverified "years of experience" figure. Used in the hero and the story
 * section.
 */
export function HeritageSeal({
  line1 = licenseYear ? `Est. ${licenseYear}` : "Louisiana",
  line2 = "Louisiana Real Estate",
  className,
}: {
  line1?: string;
  line2?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-brass-400/70 text-brass-100 ${className ?? ""}`}
    >
      <div className="absolute inset-2 rounded-full border border-brass-400/40" />
      <div className="flex flex-col items-center gap-1 px-3 text-center">
        <FleurDeLis className="h-4 w-4 text-brass-400" />
        <p className="font-display text-lg font-semibold leading-none">{line1}</p>
        <p className="max-w-[6.5rem] text-[0.6rem] font-medium uppercase tracking-[0.14em] text-brass-100/80">
          {line2}
        </p>
      </div>
    </div>
  );
}
