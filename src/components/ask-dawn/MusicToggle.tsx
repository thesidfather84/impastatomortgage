"use client";

import { cn } from "@/lib/cn";
import { useAskDawnMusic } from "./AskDawnMusicProvider";

/**
 * Small, tasteful "A Little Musica?" control — something a visitor
 * discovers, not a music player. A single toggle serves as play, pause,
 * resume, and "stop" all at once (pressing it while playing silences the
 * audio immediately) rather than a multi-button player. Styled quiet and
 * understated against the light body background, sitting alongside the
 * other small discoverable extras (the trivia chip) rather than in the
 * header chrome.
 */
export function MusicToggle({ className }: { className?: string }) {
  const { isPlaying, toggle } = useAskDawnMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Musica playing — pause" : "A Little Musica? Play background music"}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
        isPlaying
          ? "border-brass-500 bg-brass-100/60 text-brass-700"
          : "border-cypress-100 bg-transparent text-cypress-500 hover:bg-cypress-50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("text-sm", isPlaying && "motion-safe:animate-pulse")}
      >
        ♪
      </span>
      <span className="whitespace-nowrap">
        {isPlaying ? "Musica Playing — Pause" : "A Little Musica?"}
      </span>
    </button>
  );
}
