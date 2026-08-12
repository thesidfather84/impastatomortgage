"use client";

import { useAccessibility, type TextSize } from "./AccessibilityProvider";
import { cn } from "@/lib/cn";

const OPTIONS: { value: TextSize; label: string; shortLabel: string }[] = [
  { value: "standard", label: "Standard text", shortLabel: "A" },
  { value: "large", label: "Large text", shortLabel: "A+" },
  { value: "xl", label: "Extra large text", shortLabel: "A++" },
];

export function TextSizeControl() {
  const { textSize, setTextSize } = useAccessibility();

  return (
    <div
      role="group"
      aria-label="Adjust text size"
      className="flex items-center gap-1"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={textSize === option.value}
          onClick={() => setTextSize(option.value)}
          className={cn(
            "rounded px-2 py-1 text-xs font-semibold tracking-wide transition-colors",
            textSize === option.value
              ? "bg-brass-500 text-charcoal-900"
              : "bg-transparent text-ivory hover:bg-cypress-600"
          )}
          title={option.label}
        >
          {option.shortLabel}
          <span className="sr-only"> — {option.label}</span>
        </button>
      ))}
    </div>
  );
}
