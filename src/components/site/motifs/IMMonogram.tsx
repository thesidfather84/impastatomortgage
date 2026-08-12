import { cn } from "@/lib/cn";

/**
 * The Impastato Mortgage heritage monogram — an original mark, not a
 * restaurant/family-business logo. Sized to work as a favicon-scale mark,
 * a nav badge, or a larger seal element.
 */
export function IMMonogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border border-brass-400 bg-tomato-900",
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-[3px] rounded-full border border-brass-400/40" />
      <span className="font-display text-[0.9em] font-semibold italic leading-none text-brass-200">
        IM
      </span>
    </span>
  );
}
