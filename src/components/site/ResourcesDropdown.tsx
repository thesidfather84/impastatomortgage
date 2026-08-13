"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { resourcesNav } from "@/config/nav";

export function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        // Only close once focus leaves the trigger AND the panel — a Tab
        // press between menu links fires blur/focus in the same tick, so
        // this must check where focus is *going*, not just that it left.
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 text-[0.95rem] font-medium text-cypress-900 hover:text-brass-600"
      >
        Resources
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        // No margin between the trigger and this wrapper — a margin-created
        // gap isn't part of either element's hit-box, so the pointer can
        // cross it while briefly hovering nothing, which fires mouseleave
        // and closes the menu before the cursor ever reaches it. The visual
        // gap instead lives as *padding* inside this box, so it's part of
        // one continuous hoverable region from the trigger down through the
        // menu card.
        <div className="absolute left-1/2 top-full z-40 w-72 -translate-x-1/2 pt-3">
          <div
            role="menu"
            className="rounded-lg border border-brass-400/30 bg-ivory p-2 shadow-xl"
          >
            {resourcesNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-cypress-900 hover:bg-cypress-50"
              >
                <span className="block text-sm font-semibold">{item.label}</span>
                {item.description && (
                  <span className="block text-xs text-cypress-700">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
