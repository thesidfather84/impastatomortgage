import { cn } from "@/lib/cn";

/**
 * Visible stand-in for a regulated disclosure that hasn't been confirmed
 * yet. Used so missing compliance data shows up as an obvious TODO instead
 * of silently disappearing from the page.
 */
export function PendingNotice({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded border border-dashed border-burgundy-500/60 bg-burgundy-500/10 px-3 py-2 text-sm text-burgundy-600",
        className
      )}
      data-compliance-todo="true"
    >
      <strong className="font-semibold">Pending:</strong> {label} has not
      been confirmed yet and is not published. This must be completed before
      production launch.
    </p>
  );
}
