"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mobileNav } from "@/config/nav";
import { contact } from "@/config/contact";
import { ContactButtonRow } from "@/components/ui/ContactButtons";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";
import { FleurDeLis } from "./motifs/FleurDeLis";

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
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cypress-700/30 text-cypress-800"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ivory"
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between border-b border-brass-400/30 bg-cypress-900 px-4 py-4">
            <span className="font-display text-lg font-semibold text-ivory">
              Impastato <span className="text-brass-300">Mortgage</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ivory hover:bg-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <a
            href={contact.phoneHref}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 border-b border-cypress-100 bg-brass-100/40 py-3 font-display text-lg font-semibold text-cypress-900"
          >
            {contact.phoneDisplay}
          </a>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="divide-y divide-cypress-100">
              {mobileNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-lg font-medium text-cypress-900 hover:text-brass-600"
                  >
                    {item.label}
                    <FleurDeLis className="h-3.5 w-3.5 text-brass-400/60" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-3 border-t border-cypress-100 bg-ivory-deep px-4 py-4">
            <ContactButtonRow />
            <AccessibilityMenu />
          </div>
        </div>
      )}
    </div>
  );
}
