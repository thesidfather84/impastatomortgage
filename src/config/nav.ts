export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Top-level desktop nav links, shown directly in the header. */
export const primaryNav: NavItem[] = [
  { label: "Buy", href: "/buy-a-home" },
  { label: "Refinance", href: "/refinance" },
  { label: "Reverse Mortgage", href: "/reverse-mortgage" },
  { label: "About Dawn", href: "/about-dawn" },
];

/** Secondary destinations, tucked into the "Resources" dropdown on desktop. */
export const resourcesNav: NavItem[] = [
  { label: "Home Payment Explorer", href: "/calculators/home-payment", description: "See your real monthly picture" },
  { label: "Home Equity / Options", href: "/home-equity", description: "What your equity can do for you" },
  { label: "Dawn's Mortgage Compass", href: "/mortgage-compass", description: "Find your starting point" },
  { label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad", description: "A guide for the whole family" },
  { label: "Glossary", href: "/resources/glossary", description: "Plain-English mortgage terms" },
  { label: "Areas We Serve", href: "/locations", description: "Southshore to Northshore" },
  { label: "All Resources", href: "/resources" },
];

/** Short, simple list for the mobile menu — not a dump of every route. */
export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
  { label: "Home Equity / Options", href: "/home-equity" },
  { label: "Resources", href: "/resources" },
  { label: "Ask Dawn", href: "/ask-dawn" },
];

/** Full route list, used for the footer. */
export const fullNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
  { label: "Home Equity / Options", href: "/home-equity" },
  { label: "Resources", href: "/resources" },
  { label: "Ask Dawn", href: "/ask-dawn" },
  { label: "Dawn's Mortgage Compass", href: "/mortgage-compass" },
  { label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad" },
  { label: "Areas We Serve", href: "/locations" },
];

export const footerNav: NavItem[] = [
  ...fullNav,
  { label: "Legal Information", href: "/legal" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility-statement" },
];
