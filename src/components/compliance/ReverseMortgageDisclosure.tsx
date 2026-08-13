import { compliance } from "@/config/compliance";

export function ReverseMortgageDisclosure({ className }: { className?: string }) {
  const field = compliance.reverseMortgageDisclosure;

  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-base font-semibold uppercase tracking-wide text-cypress-700">
        Reverse Mortgage Disclosure
      </h3>
      {field.status === "confirmed" && <p className="text-lg text-cypress-700">{field.value}</p>}
      <p className="mt-2 text-lg leading-relaxed text-cypress-700">
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
