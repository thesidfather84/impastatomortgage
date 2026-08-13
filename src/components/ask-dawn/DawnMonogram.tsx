import { cn } from "@/lib/cn";

/** A small signature-style monogram used as Dawn's "avatar" in Ask Dawn. */
export function DawnMonogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass-400 bg-burgundy-800 font-display text-sm font-semibold italic text-brass-200",
        className
      )}
      aria-hidden="true"
    >
      D
    </span>
  );
}
