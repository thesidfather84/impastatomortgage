import { compliance } from "@/config/compliance";
import { PendingNotice } from "./PendingNotice";

export function LicensingDisclosure({ className }: { className?: string }) {
  const mortgageFields = [
    { label: "Loan originator", field: compliance.mortgage.loanOriginatorLegalName },
    { label: "Loan originator NMLS ID", field: compliance.mortgage.loanOriginatorNmlsId },
    { label: "Mortgage company", field: compliance.mortgage.currentCompanyLegalName },
    { label: "Company NMLS ID", field: compliance.mortgage.companyNmlsId },
    { label: "NMLS-listed location", field: compliance.mortgage.nmlsListedLocation },
    { label: "Broker/lender status", field: compliance.mortgage.brokerOrLenderStatus },
    { label: "Licensed states", field: compliance.mortgage.licensingStates },
  ] as const;

  const realEstateFields = [
    { label: "Licensee", field: compliance.realEstate.licenseeLegalName },
    { label: "License type", field: compliance.realEstate.licenseType },
    { label: "License number", field: compliance.realEstate.licenseNumber },
    { label: "License status", field: compliance.realEstate.licenseStatus },
    { label: "First issued", field: compliance.realEstate.firstIssueDate },
    { label: "Supervising brokerage", field: compliance.realEstate.supervisingBrokerage },
  ] as const;

  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
        Mortgage Licensing
      </h3>
      <ul className="space-y-2">
        {mortgageFields.map(({ label, field }) => (
          <li key={label}>
            {field.status === "confirmed" ? (
              <p className="text-sm text-cypress-700">
                <span className="font-semibold">{label}:</span>{" "}
                {Array.isArray(field.value) ? field.value.join(", ") : field.value}
              </p>
            ) : (
              <PendingNotice label={label} />
            )}
          </li>
        ))}
      </ul>

      <h3 className="mb-2 mt-5 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
        Louisiana Real Estate Licensing
      </h3>
      <ul className="space-y-2">
        {realEstateFields.map(({ label, field }) => (
          <li key={label}>
            {field.status === "confirmed" ? (
              <p className="text-sm text-cypress-700">
                <span className="font-semibold">{label}:</span>{" "}
                {Array.isArray(field.value) ? field.value.join(", ") : field.value}
              </p>
            ) : (
              <PendingNotice label={label} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
