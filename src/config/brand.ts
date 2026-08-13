/**
 * Brand/positioning copy lives here so taglines and messaging can change
 * without hunting through components. Swap values here, not in JSX.
 */

/**
 * The durable real-estate tenure phrase used in marketing copy. Sourced
 * from Dawn's confirmed Louisiana real-estate license first-issue year
 * (1991, see `compliance.realEstate.firstIssueDate` in
 * src/config/compliance.ts). Deliberately "since 1991" rather than a
 * recalculated year count (e.g. "35 years") so it never goes stale with
 * the calendar — this is NOT a claim about how long Dawn has held a
 * mortgage license.
 */
const EXPERIENCE_YEARS_BADGE = "Since 1991";

export const brand = {
  siteName: "Impastato Mortgage",
  ownerName: "Dawn Impastato",
  ownerFirstName: "Dawn",

  /** Primary tagline, used in the hero and page titles. */
  tagline: "Every Chapter. Every Home. One Trusted Guide.",

  /** Alternate tagline, available for secondary placements/testing. */
  taglineAlternate: "Louisiana Roots. Italian Heritage. A Better Way Home.",

  /** Small kicker shown under the wordmark in the header. */
  headerTagline: "Rooted in Louisiana. Guided by Experience.",

  /** Short description of Dawn's differentiator. */
  positioningStatement:
    "Decades understanding homes, real estate, families, and financing — before Dawn ever helped anyone with a mortgage.",

  experienceYearsBadge: EXPERIENCE_YEARS_BADGE,
  experienceHeadline: "Licensed in Louisiana Real Estate Since 1991",

  heroSupportingCopy:
    "From first homes to reverse mortgages, Dawn brings Louisiana real estate experience — licensed since 1991 — to every conversation about financing.",

  primaryMarket: {
    region: "Louisiana",
    areas: [
      "New Orleans",
      "St. Tammany Parish",
      "Northshore",
      "Southshore",
      "Greater Southeast Louisiana",
    ],
  },
} as const;
