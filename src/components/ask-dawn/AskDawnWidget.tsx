"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAskDawn } from "./AskDawnProvider";
import { AskDawnPanel } from "./AskDawnPanel";

export function AskDawnWidget() {
  const { isOpen, toggleOpen, close } = useAskDawn();
  const pathname = usePathname();
  const onAskDawnPage = pathname === "/ask-dawn";

  useEffect(() => {
    if (onAskDawnPage && isOpen) close();
  }, [onAskDawnPage, isOpen, close]);

  // The /ask-dawn page embeds its own full inline conversation — skip the
  // floating duplicate there.
  if (onAskDawnPage) return null;

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="fixed bottom-5 right-5 z-40 flex min-h-[56px] items-center gap-2 rounded-full bg-cypress-700 px-5 py-3 font-display text-base font-semibold text-ivory shadow-lg transition-transform hover:scale-105 hover:bg-cypress-600 sm:bottom-6 sm:right-6"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4h16v11H8l-4 4V4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
        {isOpen ? "Close" : "Ask Dawn"}
      </button>

      {isOpen && <AskDawnPanel />}
    </>
  );
}
