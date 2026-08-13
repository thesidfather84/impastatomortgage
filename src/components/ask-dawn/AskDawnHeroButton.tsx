"use client";

import { useAskDawn } from "./AskDawnProvider";
import { cn } from "@/lib/cn";

const VARIANTS = {
  outline: "border border-ivory/60 bg-transparent text-ivory hover:bg-white/10",
  filled: "border border-transparent bg-burgundy-600 text-ivory hover:bg-burgundy-500",
};

export function AskDawnHeroButton({
  variant = "outline",
  className,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const { open } = useAskDawn();

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-4 text-lg font-semibold tracking-wide transition-colors",
        VARIANTS[variant],
        className
      )}
    >
      Ask Dawn
    </button>
  );
}
