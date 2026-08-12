"use client";

import { useState } from "react";
import { unconfiguredFeatures } from "@/config/contact";

/**
 * Deliberately NOT a working scheduler. Clicking reveals an honest
 * "not yet configured" message instead of a fake form or fake success state.
 */
export function ScheduleConversationButton({ className }: { className?: string }) {
  const [showNotice, setShowNotice] = useState(false);
  const feature = unconfiguredFeatures.onlineScheduling;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setShowNotice((v) => !v)}
        aria-expanded={showNotice}
        aria-describedby={showNotice ? "schedule-notice" : undefined}
        className="rounded px-2 py-1 text-xs font-semibold tracking-wide text-ivory/80 underline decoration-dotted underline-offset-4 hover:text-ivory"
      >
        {feature.label} (not yet available)
      </button>
      {showNotice && (
        <p
          id="schedule-notice"
          role="status"
          className="mt-1 max-w-xs text-xs text-ivory/90"
        >
          {feature.disabledMessage}
        </p>
      )}
    </div>
  );
}
