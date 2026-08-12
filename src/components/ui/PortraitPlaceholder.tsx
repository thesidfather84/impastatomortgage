import { cn } from "@/lib/cn";

/**
 * Professionally designed stand-in for Dawn's real portrait.
 * Replace with an <Image> of her actual headshot when available —
 * this component intentionally does not fabricate a photo.
 */
export function PortraitPlaceholder({
  className,
  label = "Dawn Impastato",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full items-end overflow-hidden rounded-2xl border border-brass-400/40 bg-gradient-to-br from-cypress-700 via-cypress-600 to-charcoal-900",
        className
      )}
      role="img"
      aria-label={`Portrait placeholder for ${label} — photo coming soon`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle cx="100" cy="70" r="130" fill="none" stroke="#f1e4bf" strokeWidth="1" />
        <circle cx="100" cy="70" r="100" fill="none" stroke="#f1e4bf" strokeWidth="1" />
      </svg>

      <svg
        className="absolute left-1/2 top-[38%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-brass-100/70"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 12c2.76 0 5-2.69 5-6s-2.24-6-5-6-5 2.69-5 6 2.24 6 5 6Zm0 2c-3.87 0-9 1.94-9 5.5V22h18v-2.5c0-3.56-5.13-5.5-9-5.5Z" />
      </svg>

      <div className="relative w-full bg-charcoal-900/70 px-4 py-3 text-center backdrop-blur-sm">
        <p className="font-display text-sm font-semibold text-ivory">{label}</p>
        <p className="text-xs text-ivory/70">Portrait coming soon</p>
      </div>
    </div>
  );
}
