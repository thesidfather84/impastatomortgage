/**
 * "How can Dawn help?" homepage editorial tiles, in plain English — no
 * jargon (HECM, DTI, LTV, ARM) at this layer.
 */

export type Pathway = {
  id: string;
  title: string;
  line: string;
  href: string;
  icon: "home" | "bridge" | "arrow-down" | "sunset" | "family" | "compass";
};

export const pathways: Pathway[] = [
  {
    id: "buy",
    title: "Buy My First Home",
    line: "Let's get you the keys.",
    href: "/buy-a-home",
    icon: "home",
  },
  {
    id: "across-the-lake",
    title: "Move Across the Lake",
    line: "Northshore or Southshore — let's make the move work.",
    href: "/locations/northshore",
    icon: "bridge",
  },
  {
    id: "lower-payment",
    title: "Lower My Payment",
    line: "See whether refinancing makes sense.",
    href: "/refinance",
    icon: "arrow-down",
  },
  {
    id: "retirement",
    title: "Use My Home for Retirement",
    line: "Understand your reverse-mortgage options.",
    href: "/reverse-mortgage",
    icon: "sunset",
  },
  {
    id: "help-parents",
    title: "Help Mom or Dad",
    line: "Straight answers for the whole family.",
    href: "/family/helping-mom-or-dad",
    icon: "family",
  },
  {
    id: "not-sure",
    title: "I'm Not Sure",
    line: "That's exactly what Ask Dawn is for.",
    href: "/mortgage-compass",
    icon: "compass",
  },
];
