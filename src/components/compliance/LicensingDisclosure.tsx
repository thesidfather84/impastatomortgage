import { compliance } from "@/config/compliance";

function formatUsDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

/**
 * Clean, professional licensing block for the full /licensing-disclosures
 * page. Only confirmed fields render — anything still unconfirmed is
 * silently omitted, never shown as a "Pending" placeholder.
 */
export function LicensingDisclosure({ className }: { className?: string }) {
  const { mortgage, realEstate } = compliance;

  const mortgageLines = [
    mortgage.loanOriginatorLegalName.status === "confirmed" ? mortgage.loanOriginatorLegalName.value : null,
    mortgage.loanOriginatorNmlsId.status === "confirmed" ? `NMLS #${mortgage.loanOriginatorNmlsId.value}` : null,
    mortgage.currentCompanyLegalName.status === "confirmed" ? mortgage.currentCompanyLegalName.value : null,
    mortgage.companyNmlsId.status === "confirmed" ? `NMLS #${mortgage.companyNmlsId.value}` : null,
    mortgage.nmlsListedLocation.status === "confirmed" ? mortgage.nmlsListedLocation.value : null,
  ].filter((line): line is string => Boolean(line));

  const realEstateLines = [
    realEstate.licenseeLegalName.status === "confirmed" ? realEstate.licenseeLegalName.value : null,
    realEstate.licenseType.status === "confirmed" ? `Louisiana ${realEstate.licenseType.value}` : null,
    realEstate.licenseNumber.status === "confirmed" ? realEstate.licenseNumber.value : null,
    realEstate.licenseStatus.status === "confirmed" ? realEstate.licenseStatus.value : null,
    realEstate.firstIssueDate.status === "confirmed"
      ? `First issued ${formatUsDate(realEstate.firstIssueDate.value)}`
      : null,
    realEstate.supervisingBrokerage.status === "confirmed" ? realEstate.supervisingBrokerage.value : null,
    realEstate.sponsoringBrokerOfficeAddress.status === "confirmed"
      ? realEstate.sponsoringBrokerOfficeAddress.value
      : null,
  ].filter((line): line is string => Boolean(line));

  const showFranchiseDisclosure =
    realEstate.sponsoringBrokerFranchiseStatus.status === "confirmed" &&
    realEstate.sponsoringBrokerFranchiseStatus.value === true &&
    realEstate.independentlyOwnedAndOperatedDisclosure.status === "confirmed";

  return (
    <div className={className}>
      {mortgageLines.length > 0 && (
        <div>
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
            Mortgage
          </h3>
          <div className="space-y-0.5 text-sm text-cypress-700">
            {mortgageLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <a
                href="https://www.nmlsconsumeraccess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-burgundy-600"
              >
                Verify on NMLS Consumer Access
              </a>
            </p>
          </div>
        </div>
      )}

      {realEstateLines.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
            Real Estate
          </h3>
          <div className="space-y-0.5 text-sm text-cypress-700">
            {realEstateLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {showFranchiseDisclosure && (
              <p className="pt-1 italic">
                {realEstate.independentlyOwnedAndOperatedDisclosure.value}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
