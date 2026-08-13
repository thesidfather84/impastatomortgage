"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Progressive-enhancement "Read This Page" control.
 * Only renders when the browser actually supports speech synthesis —
 * no unreliable polyfills or fake playback states.
 */
export function ReadThisPage({ className }: { className?: string }) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // Feature-detection must happen after mount: the server has no
    // `window`, so this stays false during SSR and flips on for browsers
    // that actually support speech synthesis — true progressive enhancement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) return null;

  function handleToggle() {
    const synth = window.speechSynthesis;

    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const main = document.getElementById("main-content");
    const text = main?.innerText ?? document.body.innerText;
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={speaking}
      className={cn(
        "w-full rounded px-3 py-2.5 text-left text-sm font-semibold text-cypress-900 hover:bg-brass-100/50",
        className
      )}
    >
      {speaking ? "Stop Reading" : "Read This Page"}
    </button>
  );
}
