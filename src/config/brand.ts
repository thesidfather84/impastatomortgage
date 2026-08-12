/**
 * Brand/positioning copy lives here so taglines and messaging can change
 * without hunting through components. Swap values here, not in JSX.
 */

export const brand = {
  siteName: "Impastato Mortgage",
  ownerName: "Dawn Impastato",
  ownerFirstName: "Dawn",

  /** Primary tagline, used in the hero and page titles. */
  tagline: "Every Chapter. Every Home. One Trusted Guide.",

  /** Alternate tagline, available for secondary placements/testing. */
  taglineAlternate: "Louisiana Roots. Home Financing for Every Generation.",

  /** Short description of Dawn's differentiator. */
  positioningStatement:
    "Nearly 30 years understanding homes, real estate, families, and financing — before Dawn ever helped anyone with a mortgage.",

  experienceHeadline: "30 Years of Real Estate Experience",

  heroSupportingCopy:
    "Whether you're buying a first home, refinancing, using equity, moving across the lake, helping your parents, downsizing, or simply learning about a reverse mortgage — Dawn helps you understand your options in plain English.",

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
