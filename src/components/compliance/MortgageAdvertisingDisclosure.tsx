import { compliance } from "@/config/compliance";

export function MortgageAdvertisingDisclosure({ className }: { className?: string }) {
  const field = compliance.mortgageAdvertisingDisclosure;

  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
        Advertising Disclosure
      </h3>
      {field.status === "confirmed" && <p className="text-sm text-cypress-700">{field.value}</p>}
      <p className="mt-2 text-sm text-cypress-700">
        This website is for general educational information only. It is not
        a loan approval, a commitment to lend, or an offer of credit. Rates,
        terms, and program availability are not published on this site and
        must be confirmed directly with Dawn.
      </p>
    </div>
  );
}
