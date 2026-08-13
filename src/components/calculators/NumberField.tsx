"use client";

import { cn } from "@/lib/cn";

type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  adornment?: "$" | "%";
  step?: number;
  min?: number;
  helpText?: string;
};

/**
 * Large, touch-friendly numeric input with an optional $/% adornment.
 * Renders as an empty field (not the string "NaN") when cleared, and
 * reports a cleared field back to the caller as NaN — so the calculation
 * engine's own validation surfaces a clear "this field is required"
 * message rather than a component silently guessing a default.
 */
export function NumberField({
  id,
  label,
  value,
  onChange,
  adornment,
  step = 1,
  min = 0,
  helpText,
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-cypress-800">
        {label}
      </label>
      <div className="relative">
        {adornment === "$" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-cypress-500"
          >
            $
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => {
            const raw = event.target.value;
            onChange(raw === "" ? NaN : Number(raw));
          }}
          className={cn(
            "min-h-[48px] w-full rounded-md border border-cypress-100 bg-white py-2.5 text-base text-charcoal-900",
            "focus-visible:outline-brass-500",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            adornment === "$" ? "pl-8 pr-3" : adornment === "%" ? "pl-3 pr-8" : "px-3"
          )}
        />
        {adornment === "%" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-cypress-500"
          >
            %
          </span>
        )}
      </div>
      {helpText && <p className="mt-1 text-xs text-cypress-600">{helpText}</p>}
    </div>
  );
}
