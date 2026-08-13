"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibility, type TextSize } from "./AccessibilityProvider";
import { ReadThisPage } from "./ReadThisPage";
import { cn } from "@/lib/cn";

const SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "large", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

/**
 * A single consolidated accessibility control — replaces separate
 * Read This Page / A / A+ / A++ buttons with one "Aa Accessibility" menu.
 */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { textSize, setTextSize } = useAccessibility();

  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex min-h-[44px] flex-col items-center justify-center rounded-md border border-brass-400/60 px-3 py-1.5 leading-tight text-cypress-900 hover:bg-brass-100/40"
      >
        <span aria-hidden="true" className="font-display text-base font-semibold">
          Aa
        </span>
        <span className="flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-wide whitespace-nowrap">
          Accessibility
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-3 w-64 rounded-lg border border-brass-400/30 bg-ivory p-4 shadow-xl"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cypress-700">
            Text Size
          </p>
          <div role="group" aria-label="Adjust text size" className="flex items-center gap-1.5">
            {SIZE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={textSize === option.value}
                onClick={() => setTextSize(option.value)}
                title={option.label}
                className={cn(
                  "flex-1 rounded px-2 py-2.5 text-sm font-semibold transition-colors",
                  textSize === option.value
                    ? "bg-brass-500 text-charcoal-900"
                    : "bg-cypress-50 text-cypress-900 hover:bg-brass-100/60"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-3 border-t border-cypress-100 pt-2">
            <ReadThisPage />
          </div>
        </div>
      )}
    </div>
  );
}
