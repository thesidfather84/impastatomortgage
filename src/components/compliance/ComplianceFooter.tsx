import Link from "next/link";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { primaryNav, resourcesNav } from "@/config/nav";
import { WroughtIronRail } from "@/components/site/motifs/WroughtIronRail";
import { IMMonogram } from "@/components/site/motifs/IMMonogram";
import { RooflineSkyline } from "@/components/site/motifs/RooflineSkyline";
import { EqualHousingDisclosure } from "./EqualHousingDisclosure";
import { PublicLicenseSummary } from "./PublicLicenseSummary";

export function ComplianceFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="relative overflow-hidden bg-cypress-900 text-ivory">
        <RooflineSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-ivory/[0.04]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <IMMonogram className="h-8 w-8 text-xs" />
                Impastato <span className="text-brass-300">Mortgage</span>
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-ivory/70">{brand.tagline}</p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brass-300">
                Explore
              </h3>
              <ul className="space-y-2.5 text-base text-ivory/80">
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
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brass-300">
                Resources
              </h3>
              <ul className="space-y-2.5 text-base text-ivory/80">
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
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brass-300">
                Contact
              </h3>
              <ul className="space-y-2.5 text-base text-ivory/80">
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
            </div>
          </div>

          <WroughtIronRail className="mx-auto mt-14 h-4 w-44 text-brass-400/40" />
        </div>
      </div>

      <div className="border-t border-cypress-100 bg-ivory-deep">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <PublicLicenseSummary className="space-y-1.5 text-base text-cypress-700" />
              <EqualHousingDisclosure />
            </div>

            <nav
              aria-label="Legal"
              className="flex flex-wrap gap-x-5 gap-y-2 text-base text-cypress-700 lg:justify-end"
            >
              <Link href="/licensing-disclosures" className="underline underline-offset-2 hover:text-burgundy-600">
                Licensing &amp; Disclosures
              </Link>
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-burgundy-600">
                Privacy
              </Link>
              <Link href="/terms" className="underline underline-offset-2 hover:text-burgundy-600">
                Terms
              </Link>
              <Link href="/accessibility-statement" className="underline underline-offset-2 hover:text-burgundy-600">
                Accessibility
              </Link>
            </nav>
          </div>

          <p className="mt-6 max-w-2xl text-sm italic text-cypress-700/70">
            General educational information only — not a loan approval, a
            commitment to lend, or an offer of credit.
          </p>

          <p className="mt-3 text-sm text-cypress-700/60">
            &copy; {year} {brand.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
