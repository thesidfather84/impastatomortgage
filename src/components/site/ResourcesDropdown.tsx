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
        <div
          role="menu"
          className="absolute left-1/2 top-full z-40 mt-3 w-72 -translate-x-1/2 rounded-lg border border-brass-400/30 bg-ivory p-2 shadow-xl"
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
      )}
    </div>
  );
}
