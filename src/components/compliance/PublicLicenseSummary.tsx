import { compliance } from "@/config/compliance";

/**
 * The compact, customer-facing licensing line used in the site footer —
 * intentionally minimal. For the full breakdown, see LicensingDisclosure
 * on /licensing-disclosures. Silently renders nothing if the underlying
 * fields aren't confirmed, rather than showing a placeholder.
 */
export function PublicLicenseSummary({ className }: { className?: string }) {
  const { loanOriginatorLegalName, loanOriginatorNmlsId, currentCompanyLegalName, companyNmlsId } =
    compliance.mortgage;

  const originatorLine =
    loanOriginatorLegalName.status === "confirmed" && loanOriginatorNmlsId.status === "confirmed"
      ? `${loanOriginatorLegalName.value} | NMLS #${loanOriginatorNmlsId.value}`
      : null;

  const companyLine =
    currentCompanyLegalName.status === "confirmed" && companyNmlsId.status === "confirmed"
      ? `Mortgage services through ${currentCompanyLegalName.value} | NMLS #${companyNmlsId.value}`
      : null;

  if (!originatorLine && !companyLine) return null;

  return (
    <div className={className}>
      {originatorLine && <p>{originatorLine}</p>}
      {companyLine && <p>{companyLine}</p>}
      <p>
        <a
          href="https://www.nmlsconsumeraccess.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-burgundy-600"
        >
          NMLS Consumer Access
        </a>
      </p>
    </div>
  );
}
