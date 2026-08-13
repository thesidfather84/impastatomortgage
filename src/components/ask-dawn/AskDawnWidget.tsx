"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAskDawn } from "./AskDawnProvider";
import { AskDawnPanel } from "./AskDawnPanel";
import { DawnMonogram } from "./DawnMonogram";

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
        className="fixed bottom-5 right-5 z-40 flex min-h-[56px] items-center gap-2.5 rounded-full border border-brass-400/70 bg-burgundy-800 py-2 pl-2 pr-5 shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <DawnMonogram />
        <span className="font-display text-base font-semibold text-ivory">
          {isOpen ? "Close" : "Ask Dawn"}
        </span>
      </button>

      {isOpen && <AskDawnPanel />}
    </>
  );
}
