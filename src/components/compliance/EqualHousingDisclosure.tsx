import { compliance } from "@/config/compliance";
import { PendingNotice } from "./PendingNotice";

export function EqualHousingDisclosure({ className }: { className?: string }) {
  const field = compliance.equalHousingOpportunity;

  if (field.status === "todo") {
    return <PendingNotice label="Equal Housing Opportunity statement" className={className} />;
  }

  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-sm text-cypress-700">
        <span aria-hidden="true" className="text-lg">
          ⌂
        </span>
        {field.value}
      </p>
    </div>
  );
}
