"use client";

/** Shared accessible toggle — a real checkbox under the hood, styled as a switch. */
export function ToggleSwitch({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block font-display text-lg font-semibold text-cypress-900">{label}</span>
        {description && <span className="mt-1 block text-sm text-cypress-700">{description}</span>}
      </span>
      <span className="relative mt-1 inline-flex h-7 w-12 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          className="peer sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-cypress-100 transition-colors peer-checked:bg-brass-500 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-brass-500 peer-focus-visible:outline-offset-2" />
        <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
