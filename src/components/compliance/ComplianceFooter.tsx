import Link from "next/link";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { EqualHousingDisclosure } from "./EqualHousingDisclosure";
import { LicensingDisclosure } from "./LicensingDisclosure";
import { MortgageAdvertisingDisclosure } from "./MortgageAdvertisingDisclosure";

export function ComplianceFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cypress-100 bg-ivory-deep">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <LicensingDisclosure />
          <MortgageAdvertisingDisclosure />
          <div>
            <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-cypress-700">
              Contact
            </h3>
            <ul className="space-y-1 text-sm text-cypress-700">
              <li>
                <a href={contact.phoneHref} className="underline underline-offset-2">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="underline underline-offset-2">
                  {contact.emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <EqualHousingDisclosure />

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cypress-700">
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="underline underline-offset-2">
            Terms of Use
          </Link>
          <Link href="/accessibility-statement" className="underline underline-offset-2">
            Accessibility Statement
          </Link>
        </nav>

        <p className="text-xs text-cypress-700/80">
          &copy; {year} {brand.siteName}. This site has not yet completed
          formal legal/compliance review. Information is educational only
          and is not a commitment to lend.
        </p>
      </div>
    </footer>
  );
}
