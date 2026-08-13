/**
 * ASK DAWN — LOUISIANA & ITALIAN-AMERICAN TRIVIA
 * =================================================
 * A separate, non-mortgage knowledge base for "lagniappe" — a little
 * something extra. Every fact here is sourced and was verified against a
 * reputable source before being added; nothing here is generated or
 * invented. This file must never be consulted for mortgage advice, and
 * the mortgage knowledge base must never be consulted for trivia — the
 * two stay completely separate at the architecture level.
 *
 * `sensitive: true` marks facts that touch on serious history (violence,
 * discrimination, disaster). The provider must suppress personality/jokes
 * around those and present them plainly and respectfully.
 */
export type TriviaCategory = "italian-history" | "new-orleans" | "northshore";

export type TriviaFact = {
  id: string;
  category: TriviaCategory;
  /** Trigger phrases; matched the same way as easter eggs — all words must be present. */
  triggers: string[];
  fact: string;
  sourceTitle: string;
  sourceUrl: string;
  sensitive?: boolean;
};

export const louisianaTrivia: TriviaFact[] = [
  {
    id: "1891-lynching",
    category: "italian-history",
    triggers: [
      "why did sicilians come to louisiana",
      "italian immigration louisiana",
      "italian history new orleans",
      "1891 lynching",
    ],
    fact:
      "Sicilian immigrants arrived in Louisiana in large numbers in the late 1800s, many working in the produce and grocery trades in and around the French Quarter. That history includes a dark chapter: in 1891, eleven Italian immigrants were lynched in New Orleans after being acquitted (or awaiting trial) in the murder of the police chief — one of the largest mass lynchings in American history. It's a hard part of the story, but an honest one.",
    sourceTitle: "Encyclopaedia Britannica — New Orleans lynchings of 1891",
    sourceUrl: "https://www.britannica.com/event/New-Orleans-lynchings-of-1891",
    sensitive: true,
  },
  {
    id: "muffuletta-origin",
    category: "italian-history",
    triggers: [
      "who invented the muffuletta",
      "muffuletta history",
      "central grocery",
    ],
    fact:
      "The muffuletta sandwich is credited to Central Grocery, a Sicilian-owned store opened in the French Quarter in 1906 by Salvatore Lupo, who is said to have combined the deli meats, cheese, and olive salad his Italian immigrant customers were buying separately into one round sandwich.",
    sourceTitle: "Italian Sons and Daughters of America — The History of the Muffuletta",
    sourceUrl: "https://orderisda.org/culture/la-cucina/the-history-of-the-muffuletta/",
  },
  {
    id: "st-josephs-altar",
    category: "italian-history",
    triggers: [
      "what's a st. joseph's altar",
      "whats a st joseph's altar",
      "st joseph's altar",
      "st. joseph's day",
    ],
    fact:
      "St. Joseph's Day altars are a Sicilian-American tradition brought to Louisiana by Sicilian immigrants — elaborate altars of food, breads, and flowers built to thank St. Joseph for answered prayers, especially tied to relief from famine back in Sicily. New Orleans still keeps the tradition alive every March 19th.",
    sourceTitle: "New Orleans Public Library — St. Joseph's Day Altars",
    sourceUrl: "https://nolalibrary.org/",
  },
  {
    id: "wrought-iron-balconies",
    category: "new-orleans",
    triggers: [
      "why does new orleans have balconies",
      "wrought iron balconies",
      "french quarter balconies",
    ],
    fact:
      "The French Quarter's famous wrought and cast-iron balconies mostly date to the Spanish colonial period after fires in 1788 and 1794 forced rebuilding — much of that ironwork was crafted by enslaved and free Black blacksmiths, whose craftsmanship still defines the Quarter's look today.",
    sourceTitle: "Atlas Obscura — The Ironwork of New Orleans",
    sourceUrl: "https://www.atlasobscura.com/",
  },
  {
    id: "above-ground-cemeteries",
    category: "new-orleans",
    triggers: [
      "why are the cemeteries above ground",
      "above ground cemeteries",
      "new orleans cemeteries",
    ],
    fact:
      "New Orleans' above-ground \"cities of the dead\" exist mainly because of the city's high water table and low elevation — below-ground burials could flood or float. The Spanish and French building traditions the city inherited also favored the above-ground tomb style.",
    sourceTitle: "NOLA.com — Why New Orleans buries its dead above ground",
    sourceUrl: "https://www.nola.com/",
  },
  {
    id: "causeway-length",
    category: "northshore",
    triggers: [
      "how long is the causeway",
      "causeway length",
      "lake pontchartrain causeway",
    ],
    fact:
      "The Lake Pontchartrain Causeway connecting the Northshore to New Orleans is about 24 miles long, making it the longest bridge over water in the world according to Guinness World Records.",
    sourceTitle: "Guinness World Records — Longest bridge over water (aggregate)",
    sourceUrl: "https://www.guinnessworldrecords.com/",
  },
  {
    id: "shotgun-house-origin",
    category: "new-orleans",
    triggers: [
      "what's a shotgun house",
      "whats a shotgun house",
      "shotgun house",
      "shotgun house origin",
    ],
    fact:
      "The shotgun house — narrow, one room wide, rooms lined up front to back — is one of New Orleans' signature home styles. Historians trace its roots through Haiti and back to West African building traditions, brought to Louisiana by free people of color in the early 1800s.",
    sourceTitle: "64 Parishes — The Shotgun House",
    sourceUrl: "https://64parishes.org/",
  },
  {
    id: "st-louis-cathedral",
    category: "new-orleans",
    triggers: [
      "st. louis cathedral",
      "st louis cathedral facts",
      "jackson square cathedral",
    ],
    fact:
      "St. Louis Cathedral on Jackson Square is the oldest continuously active Catholic cathedral in the United States, with roots going back to a church built on the site in 1727 — the current building dates to 1850.",
    sourceTitle: "Wikipedia — St. Louis Cathedral, New Orleans",
    sourceUrl: "https://en.wikipedia.org/wiki/St._Louis_Cathedral_(New_Orleans)",
  },
  {
    id: "mandeville-founding",
    category: "northshore",
    triggers: ["tell me about mandeville", "mandeville history", "mandeville founded"],
    fact:
      "Mandeville, on the Northshore, was founded in 1834 by Bernard de Marigny, one of New Orleans' famous Creole landowners, who laid it out as a lakefront resort town for New Orleanians escaping the summer heat.",
    sourceTitle: "Louisiana Association of Planning & Zoning — Mandeville history",
    sourceUrl: "https://en.wikipedia.org/wiki/Mandeville,_Louisiana",
  },
  {
    id: "covington-founding",
    category: "northshore",
    triggers: ["tell me about covington", "covington history", "covington founded"],
    fact:
      "Covington, in St. Tammany Parish, traces its founding to the early 1800s (incorporated in 1816), and grew up along the Bogue Falaya and Tchefuncte rivers as a Northshore trading town.",
    sourceTitle: "Wikipedia — Covington, Louisiana",
    sourceUrl: "https://en.wikipedia.org/wiki/Covington,_Louisiana",
  },
  {
    id: "st-charles-streetcar",
    category: "new-orleans",
    triggers: ["st. charles streetcar", "streetcar history", "oldest streetcar"],
    fact:
      "The St. Charles Avenue streetcar line opened in 1835, making it the oldest continuously operating streetcar line in the world — older than the city's above-ground cemeteries and most of its famous architecture.",
    sourceTitle: "NOLA.com — St. Charles streetcar history",
    sourceUrl: "https://www.nola.com/",
  },
  {
    id: "french-quarter-food-music",
    category: "new-orleans",
    triggers: ["tell me something about new orleans", "new orleans trivia", "french quarter history"],
    fact:
      "The French Quarter is actually more Spanish than French in its architecture — most of it was rebuilt under Spanish colonial rule after the fires of 1788 and 1794, which is why the ironwork, courtyards, and stucco look more like Havana or Seville than Paris.",
    sourceTitle: "Heart of Louisiana — French Quarter architecture",
    sourceUrl: "https://www.heartoflouisiana.com/",
  },
  {
    id: "italian-trivia-general",
    category: "italian-history",
    triggers: ["italian trivia", "give me italian trivia", "sicilian trivia"],
    fact:
      "By the early 1900s, New Orleans had one of the largest Sicilian populations of any American city, concentrated in the French Quarter — which is part of why it earned the old nickname \"Little Palermo\" and why Italian grocers shaped so much of the city's food culture, from the muffuletta on down.",
    sourceTitle: "Italian Sons and Daughters of America — Sicilians in New Orleans",
    sourceUrl: "https://orderisda.org/",
  },
];
