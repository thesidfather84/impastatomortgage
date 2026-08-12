"use client";

import Link from "next/link";
import { useRef } from "react";
import { brand } from "@/config/brand";
import { ASK_DAWN_EASTER_EGG_EVENT } from "@/components/ask-dawn/events";
import { IMMonogram } from "./motifs/IMMonogram";

const EASTER_EGG_CLICK_THRESHOLD = 7;
const EASTER_EGG_WINDOW_MS = 3000;

/**
 * Wordmark logo. Tapping it repeatedly within a few seconds fires a
 * tasteful Ask Dawn easter egg — tracked locally, no persistence needed.
 */
export function Logo({ className }: { className?: string }) {
  const clickTimes = useRef<number[]>([]);

  function handleClick() {
    const now = Date.now();
    clickTimes.current = [
      ...clickTimes.current.filter((t) => now - t < EASTER_EGG_WINDOW_MS),
      now,
    ];

    if (clickTimes.current.length >= EASTER_EGG_CLICK_THRESHOLD) {
      clickTimes.current = [];
      window.dispatchEvent(new CustomEvent(ASK_DAWN_EASTER_EGG_EVENT));
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`flex items-center gap-2.5 ${className ?? ""}`}
      aria-label={`${brand.siteName} — home`}
    >
      <IMMonogram className="h-9 w-9 text-sm" />
      <span>
        <span className="font-display text-xl font-semibold tracking-tight text-cypress-900">
          Impastato
        </span>
        <span className="ml-1.5 font-display text-xl font-medium tracking-tight text-brass-600">
          Mortgage
        </span>
      </span>
    </Link>
  );
}
