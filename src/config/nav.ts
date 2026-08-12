export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Buy a Home", href: "/buy-a-home" },
  { label: "Refinance", href: "/refinance" },
  { label: "Reverse Mortgage", href: "/reverse-mortgage" },
  { label: "Home Equity / Options", href: "/home-equity" },
  { label: "Resources", href: "/resources" },
  { label: "About Dawn", href: "/about-dawn" },
  { label: "Ask Dawn", href: "/ask-dawn" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: "Dawn's Mortgage Compass", href: "/mortgage-compass" },
  { label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility-statement" },
];

