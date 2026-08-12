import Link from "next/link";
import { primaryNav } from "@/config/nav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { TopUtilityBar } from "./TopUtilityBar";
import { CallDawnButton, TextDawnButton } from "@/components/ui/ContactButtons";

export function SiteHeader() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopUtilityBar />
      <header className="sticky top-0 z-40 border-b border-cypress-100 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] font-medium text-cypress-900 hover:text-brass-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <TextDawnButton size="md" />
            <CallDawnButton size="md" />
          </div>

          <MobileMenu />
        </div>
      </header>
    </>
  );
}
