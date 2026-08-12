import Link from "next/link";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { primaryNav, resourcesNav } from "@/config/nav";
import { WroughtIronRail } from "@/components/site/motifs/WroughtIronRail";
import { IMMonogram } from "@/components/site/motifs/IMMonogram";
import { EqualHousingDisclosure } from "./EqualHousingDisclosure";
import { LicensingDisclosure } from "./LicensingDisclosure";
import { MortgageAdvertisingDisclosure } from "./MortgageAdvertisingDisclosure";

export function ComplianceFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-cypress-900 text-ivory">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <IMMonogram className="h-8 w-8 text-xs" />
                Impastato <span className="text-brass-300">Mortgage</span>
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-ivory/70">{brand.tagline}</p>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Explore
              </h3>
              <ul className="space-y-2 text-sm text-ivory/80">
                {[...primaryNav, { label: "Ask Dawn", href: "/ask-dawn" }].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-brass-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-ivory/80">
                {resourcesNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-brass-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-ivory/80">
                <li>
                  <a href={contact.phoneHref} className="hover:text-brass-200">
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.emailHref} className="hover:text-brass-200">
                    {contact.emailAddress}
                  </a>
                </li>
              </ul>
              <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-ivory/80">
                <li>
                  <Link href="/privacy-policy" className="hover:text-brass-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-brass-200">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility-statement" className="hover:text-brass-200">
                    Accessibility Statement
                  </Link>
                </li>
                <li>
                  <Link href="/licensing-disclosures" className="hover:text-brass-200">
                    Licensing &amp; Disclosures
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <WroughtIronRail className="mx-auto mt-12 h-4 w-44 text-brass-400/40" />
        </div>
      </div>

      <div className="border-t border-cypress-100 bg-ivory-deep">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <LicensingDisclosure />
            <MortgageAdvertisingDisclosure />
          </div>

          <EqualHousingDisclosure />

          <Link
            href="/licensing-disclosures"
            className="inline-block text-sm font-semibold text-cypress-700 underline underline-offset-2 hover:text-brass-600"
          >
            Full licensing &amp; disclosures →
          </Link>

          <p className="text-xs text-cypress-700/80">
            &copy; {year} {brand.siteName}. This site has not yet completed
            formal legal/compliance review. Information is educational only
            and is not a commitment to lend.
          </p>
        </div>
      </div>
    </footer>
  );
}
