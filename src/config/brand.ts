/**
 * Brand/positioning copy lives here so taglines and messaging can change
 * without hunting through components. Swap values here, not in JSX.
 */

/**
 * The single configurable "years of experience" figure used in marketing
 * copy. Kept conservative and derived from the verified Louisiana
 * real-estate license first-issue date (2005-07-01, see
 * src/config/compliance.ts) — this is NOT a claim about how long Dawn has
 * held a mortgage license. Update this one value (and the sentences that
 * use it) once Dawn confirms a fuller career history.
 */
const EXPERIENCE_YEARS_BADGE = "20+";

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
  experienceHeadline: `${EXPERIENCE_YEARS_BADGE} Years of Louisiana Real Estate Experience`,

  heroSupportingCopy:
    "From first homes to reverse mortgages, Dawn brings decades of Louisiana real estate experience to every conversation about financing.",

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
