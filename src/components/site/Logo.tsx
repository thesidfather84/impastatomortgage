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
      className={`flex items-center gap-3 ${className ?? ""}`}
      aria-label={`${brand.siteName} — home`}
    >
      <IMMonogram className="h-10 w-10 shrink-0 text-sm sm:h-11 sm:w-11" />
      <span className="whitespace-nowrap">
        <span className="font-display text-xl font-semibold tracking-tight text-cypress-900 sm:text-2xl">
          Impastato
        </span>
        <span className="ml-1.5 font-display text-xl font-medium tracking-tight text-brass-600 sm:text-2xl">
          Mortgage
        </span>
      </span>
    </Link>
  );
}
