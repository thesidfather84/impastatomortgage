/**
 * "What can Dawn help you do?" homepage tap targets, in plain English —
 * no jargon (HECM, DTI, LTV, ARM) at this layer.
 */

export type Pathway = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: "home" | "arrow-down" | "sunset" | "move" | "family" | "compass" | "bridge";
};

export const pathways: Pathway[] = [
  {
    id: "buy",
    title: "Buy a Home",
    subtitle: "First home or next home",
    href: "/buy-a-home",
    icon: "home",
  },
  {
    id: "lower-payment",
    title: "Lower My Payment",
    subtitle: "Explore refinance options",
    href: "/refinance",
    icon: "arrow-down",
  },
  {
    id: "retirement",
    title: "Use My Home for Retirement",
    subtitle: "Learn about reverse mortgages",
    href: "/reverse-mortgage",
    icon: "sunset",
  },
  {
    id: "next-home",
    title: "Buy My Next Home",
    subtitle: "Move up, relocate, or downsize",
    href: "/buy-a-home",
    icon: "move",
  },
  {
    id: "help-parents",
    title: "Help My Parents",
    subtitle: "Information for adult children and family",
    href: "/family/helping-mom-or-dad",
    icon: "family",
  },
  {
    id: "not-sure",
    title: "I'm Not Sure",
    subtitle: "Let Dawn help identify the next step",
    href: "/mortgage-compass",
    icon: "compass",
  },
];

export const acrossTheLakePathway: Pathway = {
  id: "across-the-lake",
  title: "Moving Across the Lake",
  subtitle: "Northshore and Southshore relocation basics",
  href: "/locations/northshore",
  icon: "bridge",
};
