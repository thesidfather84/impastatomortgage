import { compliance } from "@/config/compliance";
import { PendingNotice } from "./PendingNotice";

export function LicensingDisclosure({ className }: { className?: string }) {
  const fields = [
    { label: "Loan originator NMLS ID", field: compliance.dawnNmlsId },
    { label: "Company NMLS ID", field: compliance.companyNmlsId },
    { label: "Legal company name", field: compliance.legalCompanyName },
    {
      label: "Broker/lender status",
      field: compliance.brokerOrLenderStatus,
    },
    {
      label: "Louisiana license number",
      field: compliance.louisianaLicenseNumber,
    },
    { label: "Licensed states", field: compliance.licensingStates },
  ] as const;

  return (
    <div className={className}>
      <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
        Licensing
      </h3>
      <ul className="space-y-2">
        {fields.map(({ label, field }) => (
          <li key={label}>
            {field.status === "confirmed" ? (
              <p className="text-sm text-cypress-700">
                <span className="font-semibold">{label}:</span>{" "}
                {Array.isArray(field.value)
                  ? field.value.join(", ")
                  : field.value}
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
