"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/config/nav";
import { ContactButtonRow } from "@/components/ui/ContactButtons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label="Open menu"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cypress-100 text-cypress-900"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory" id="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="flex items-center justify-between border-b border-cypress-100 px-4 py-3">
            <span className="font-display text-lg font-semibold text-cypress-900">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cypress-100 text-cypress-900"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-4 text-lg font-medium text-cypress-900 hover:bg-cypress-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/mortgage-compass"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-4 text-lg font-medium text-brass-600 hover:bg-cypress-50"
                >
                  Dawn&apos;s Mortgage Compass
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-cypress-100 px-4 py-4">
            <ContactButtonRow />
          </div>
        </div>
      )}
    </div>
  );
}
