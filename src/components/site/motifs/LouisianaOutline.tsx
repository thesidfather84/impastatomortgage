import { cn } from "@/lib/cn";
import { FleurDeLis } from "./FleurDeLis";

/**
 * A simplified, original Louisiana state-outline line drawing with a small
 * fleur-de-lis marking the New Orleans / river-delta area. Purely
 * decorative — not a geographically precise map.
 */
export function LouisianaOutline({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <svg
        viewBox="0 0 120 140"
        className="h-full w-full overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M20 5 L70 5 L75 15 L68 35 L78 45 L85 60 L95 80 L100 95 L92 105 L85 98 L80 108 L74 92 L64 83 L55 100 L40 105 L25 100 L15 90 L10 75 L15 60 L8 45 L14 30 L10 15 Z"
        />
      </svg>
      <FleurDeLis className="absolute left-[58%] top-[56%] h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
