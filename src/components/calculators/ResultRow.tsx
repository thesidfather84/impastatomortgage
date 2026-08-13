export function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-cypress-700">{label}</span>
      <span className="font-medium text-charcoal-900">{value}</span>
    </div>
  );
}
