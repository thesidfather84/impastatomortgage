import Link from "next/link";
import { primaryNav } from "@/config/nav";
import { contact } from "@/config/contact";
import { brand } from "@/config/brand";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { TopUtilityBar } from "./TopUtilityBar";
import { ResourcesDropdown } from "./ResourcesDropdown";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";

export function SiteHeader() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopUtilityBar />
      <header className="sticky top-0 z-40 border-b border-cypress-100 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="shrink-0">
            <Logo />
            <p className="mt-1 hidden pl-[3.4rem] text-[0.65rem] font-medium uppercase tracking-[0.12em] text-cypress-700/70 sm:block">
              {brand.headerTagline}
            </p>
          </div>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {/* Buy, Refinance, Reverse Mortgage */}
              {primaryNav.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-[0.95rem] font-medium text-cypress-900 hover:text-burgundy-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <ResourcesDropdown />
              </li>
              {/* About Dawn */}
              {primaryNav.slice(3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-[0.95rem] font-medium text-cypress-900 hover:text-burgundy-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ask-dawn"
                  className="whitespace-nowrap text-[0.95rem] font-semibold text-burgundy-600 hover:text-burgundy-800"
                >
                  Ask Dawn
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            <a
              href={contact.phoneHref}
              className="flex flex-col items-start rounded-md border border-brass-400/60 px-4 py-2 leading-tight text-cypress-900 hover:bg-brass-100/40"
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 2c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                Call Dawn
              </span>
              <span className="whitespace-nowrap font-display text-base font-semibold">
                {contact.phoneDisplay}
              </span>
            </a>
            <AccessibilityMenu />
          </div>

          <MobileMenu />
        </div>
      </header>
    </>
  );
}
