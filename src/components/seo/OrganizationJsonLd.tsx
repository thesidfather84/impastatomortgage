import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { SITE_URL } from "@/config/seo";

/**
 * Deliberately minimal — only fields we can actually confirm today
 * (name, url, contact info). Do NOT add NMLS IDs, license numbers,
 * aggregate ratings, or MortgageBroker/FinancialService-specific fields
 * until src/config/compliance.ts has those confirmed. See that file for
 * what's still pending.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.siteName,
    url: SITE_URL,
    email: contact.emailAddress,
    telephone: contact.phoneDisplay,
    areaServed: brand.primaryMarket.areas,
    founder: {
      "@type": "Person",
      name: brand.ownerName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
