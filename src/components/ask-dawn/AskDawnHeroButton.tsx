"use client";

import { useAskDawn } from "./AskDawnProvider";

export function AskDawnHeroButton() {
  const { open } = useAskDawn();

  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-ivory/60 bg-transparent px-7 py-4 text-lg font-semibold tracking-wide text-ivory transition-colors hover:bg-white/10"
    >
      Ask Dawn
    </button>
  );
}
