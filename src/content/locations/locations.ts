export type LocationContent = {
  slug: string;
  name: string;
  region: "Northshore" | "Southshore" | "Greater New Orleans";
  blurb: string;
  intro: string;
  characterNotes: string[];
};

/**
 * Local landing-page content. Kept intentionally general and useful rather
 * than keyword-stuffed. Do not add claims about physical offices or
 * "licensed in this parish" language unless confirmed — see
 * src/config/compliance.ts.
 */
export const locations: LocationContent[] = [
  {
    slug: "new-orleans",
    name: "New Orleans",
    region: "Greater New Orleans",
    blurb:
      "Historic architecture, established neighborhoods, and a housing market as distinctive as the city itself.",
    intro:
      "New Orleans homebuyers and homeowners navigate a housing market shaped by historic districts, flood zone considerations, and a wide range of architectural styles — from shotgun houses to Garden District classics. Dawn helps borrowers in and around the city understand financing in the context of the city's unique housing stock.",
    characterNotes: [
      "Historic and architecturally distinctive neighborhoods",
      "A mix of long-established and newer communities",
      "Proximity to the Mississippi River and Lake Pontchartrain",
    ],
  },
  {
    slug: "st-tammany-parish",
    name: "St. Tammany Parish",
    region: "Northshore",
    blurb:
      "Louisiana's Northshore — live oaks, growing communities, and families moving across the lake.",
    intro:
      "St. Tammany Parish has seen steady growth as families move across the lake for more space and a different pace of life. Dawn helps borrowers serving the Northshore understand financing for both new construction and established neighborhoods.",
    characterNotes: [
      "Live oak-lined streets and a growing suburban and small-town mix",
      "A popular destination for families relocating from the Southshore",
      "A range of housing from historic downtowns to newer developments",
    ],
  },
  {
    slug: "northshore",
    name: "Northshore",
    region: "Northshore",
    blurb: "The Northshore communities along Lake Pontchartrain, from Mandeville to Slidell.",
    intro:
      "The Northshore spans several distinct communities along the north side of Lake Pontchartrain, each with its own character. Dawn helps borrowers across the Northshore understand their financing options in plain English.",
    characterNotes: [
      "Communities including Mandeville, Covington, and Slidell",
      "A mix of lakefront, suburban, and rural properties",
      "Connected to the Southshore via the Causeway",
    ],
  },
  {
    slug: "southshore",
    name: "Southshore",
    region: "Southshore",
    blurb: "The Southshore — New Orleans and the surrounding parishes along the lake's south side.",
    intro:
      "The Southshore includes New Orleans and the surrounding parishes on the south side of Lake Pontchartrain. Dawn helps borrowers throughout the Southshore navigate everything from historic city properties to established suburban neighborhoods.",
    characterNotes: [
      "New Orleans and nearby established suburbs",
      "A dense mix of historic and mid-century housing stock",
      "Strong access to the region's employment centers",
    ],
  },
  {
    slug: "slidell",
    name: "Slidell",
    region: "Northshore",
    blurb: "A Northshore community known for its family-friendly neighborhoods and easy access to New Orleans.",
    intro:
      "Slidell offers Northshore living with convenient access to New Orleans via I-10. It's a popular choice for families looking for more space without leaving the region entirely.",
    characterNotes: [
      "Family-friendly neighborhoods",
      "Easy access to New Orleans and the Mississippi Gulf Coast",
      "A mix of established and newer subdivisions",
    ],
  },
  {
    slug: "mandeville",
    name: "Mandeville",
    region: "Northshore",
    blurb: "Lakefront charm and steady community growth on the Northshore.",
    intro:
      "Mandeville combines lakefront charm with a walkable downtown and steady community growth. Dawn helps buyers and homeowners here understand financing for both established and newer properties.",
    characterNotes: [
      "A walkable, well-known lakefront downtown",
      "A mix of established and newer neighborhoods",
      "Strong community identity on the Northshore",
    ],
  },
  {
    slug: "covington",
    name: "Covington",
    region: "Northshore",
    blurb: "Historic downtown character and a strong sense of place on the Northshore.",
    intro:
      "Covington is known for its historic downtown and strong sense of place. Dawn helps borrowers in and around Covington understand their options, whether buying a historic property or a newer home nearby.",
    characterNotes: [
      "A well-preserved, walkable historic downtown",
      "A mix of historic homes and newer development nearby",
      "A strong local arts and small-business community",
    ],
  },
  {
    slug: "metairie",
    name: "Metairie",
    region: "Southshore",
    blurb: "A well-established Southshore community close to New Orleans with a wide range of housing options.",
    intro:
      "Metairie is a well-established Southshore community offering a wide range of housing, from mid-century ranch homes to newer construction, all close to New Orleans.",
    characterNotes: [
      "A dense mix of housing types and eras",
      "Close proximity to New Orleans",
      "A long-established, mature community",
    ],
  },
  {
    slug: "greater-new-orleans",
    name: "Greater New Orleans",
    region: "Greater New Orleans",
    blurb: "The wider New Orleans metro — from the French Quarter to the suburbs on both sides of the lake.",
    intro:
      "The Greater New Orleans area spans both sides of Lake Pontchartrain, from the French Quarter to Northshore and Southshore suburbs. Dawn helps borrowers throughout the metro understand their financing options in plain English.",
    characterNotes: [
      "A wide range of housing markets across both sides of the lake",
      "Deep historic character alongside newer growth areas",
      "A strong regional identity shaped by the river and the lake",
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
