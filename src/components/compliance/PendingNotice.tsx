import { cn } from "@/lib/cn";

/**
 * INTERNAL USE ONLY. Renders a visible "not confirmed yet" flag for a
 * compliance field. This must never appear on a public-facing page — it
 * is only used by the internal /dev/compliance-status page, which itself
 * 404s in production. Public components silently omit unconfirmed fields
 * instead of rendering this.
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
