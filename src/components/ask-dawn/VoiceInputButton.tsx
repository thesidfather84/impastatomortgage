/**
 * Architecture placeholder for future voice input. Intentionally disabled —
 * no fake "listening" state. Wire this up to the Web Speech API (or a
 * provider) when voice input is actually implemented.
 */
export function VoiceInputButton() {
  return (
    <button
      type="button"
      disabled
      aria-label="Voice input — coming soon"
      title="Voice input isn't available yet"
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cypress-100 text-cypress-400 opacity-60"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5 11a7 7 0 0 0 14 0M12 18v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
