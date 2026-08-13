import { compliance } from "@/config/compliance";

export function EqualHousingDisclosure({ className }: { className?: string }) {
  const field = compliance.equalHousingOpportunity;

  if (field.status !== "confirmed") return null;

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
