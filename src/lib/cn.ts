type ClassValue = string | number | null | false | undefined;

/** Minimal classname joiner — avoids pulling in clsx/tailwind-merge for this. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
