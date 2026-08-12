import { compliance } from "@/config/compliance";
import { PendingNotice } from "./PendingNotice";

export function ReverseMortgageDisclosure({ className }: { className?: string }) {
  const field = compliance.reverseMortgageDisclosure;

  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
        Reverse Mortgage Disclosure
      </h3>
      {field.status === "confirmed" ? (
        <p className="text-sm text-cypress-700">{field.value}</p>
      ) : (
        <PendingNotice label="Required reverse mortgage / HECM advertising disclosure" />
      )}
      <p className="mt-2 text-sm text-cypress-700">
        A reverse mortgage is a loan that must be repaid, typically when the
        borrower sells the home, permanently moves out, or passes away.
        Borrowers remain responsible for property taxes, homeowners
        insurance, and home maintenance. HUD-approved counseling is required
        for HECM (FHA-insured) reverse mortgages. This is general education,
        not individual advice — talk with Dawn about your specific
        situation.
      </p>
    </div>
  );
}
