import type { CompassAnswers } from "@/content/mortgage-compass/questions";

export type CompassResult = {
  headline: string;
  summary: string;
  links: { label: string; href: string }[];
};

/**
 * Purely a routing function — maps answers to educational pages. This is
 * NOT an approval engine and must never state that someone qualifies for
 * anything.
 */
export function getCompassResult(answers: CompassAnswers): CompassResult {
  switch (answers.goal) {
    case "buy":
      return {
        headline: answers.firstHome === "yes" ? "Buying your first home" : "Buying your next home",
        summary:
          "Buying a home involves understanding your options, getting a sense of what fits your budget, and knowing what to expect in the process. Dawn can walk you through it in plain English, whether this is your first home or your fifth.",
        links: [
          { label: "Buy a Home", href: "/buy-a-home" },
          { label: "Explore Louisiana areas", href: "/locations/greater-new-orleans" },
        ],
      };
    case "refinance":
      return {
        headline: "Exploring a refinance",
        summary:
          "Refinancing can mean a lower payment, a different loan term, or tapping into home equity — what fits depends on your current loan and your goals. Dawn can look at your specific situation with you.",
        links: [{ label: "Refinance overview", href: "/refinance" }],
      };
    case "retirement":
      return {
        headline: "Using your home for retirement",
        summary:
          "Homeowners exploring retirement options often look into reverse mortgages, which let you access home equity without monthly payments. Eligibility and suitability depend on your specific situation — this is educational information, not a determination.",
        links: [
          { label: "Reverse Mortgage overview", href: "/reverse-mortgage" },
          { label: "Home Equity / Options", href: "/home-equity" },
        ],
      };
    case "help-family":
      return {
        headline: "Helping a family member",
        summary:
          "If you're helping a parent or family member think through their home and finances, Dawn has a dedicated guide covering common questions in plain language — including what happens to the home and what heirs can expect.",
        links: [{ label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad" }],
      };
    case "unsure":
    default:
      return {
        headline: "Let's find your starting point",
        summary:
          "That's completely fine — a lot of people start here. Based on what you've shared, Ask Dawn or a quick call is the fastest way to get pointed in the right direction.",
        links: [
          { label: "Buy a Home", href: "/buy-a-home" },
          { label: "Refinance", href: "/refinance" },
          { label: "Reverse Mortgage", href: "/reverse-mortgage" },
        ],
      };
  }
}
