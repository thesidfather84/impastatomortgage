import { useAskDawn } from "./AskDawnProvider";

export function ItalianModeToggle() {
  const { italianMode, setItalianMode } = useAskDawn();

  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ivory/90">
      <span>Italian Mode 🇮🇹</span>
      <span className="relative inline-flex h-5 w-9 items-center">
        <input
          type="checkbox"
          checked={italianMode}
          onChange={(e) => setItalianMode(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-ivory/30 transition-colors peer-checked:bg-brass-500" />
        <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
