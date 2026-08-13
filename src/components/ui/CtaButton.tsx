import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light" | "featured";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brass-500 text-charcoal-900 hover:bg-brass-600 border border-transparent",
  secondary:
    "bg-cypress-600 text-ivory hover:bg-cypress-700 border border-transparent",
  ghost:
    "bg-transparent text-cypress-600 hover:bg-cypress-50 border border-cypress-100",
  "outline-light":
    "bg-transparent text-ivory hover:bg-white/10 border border-ivory/60",
  /** Reserved for a page's single standout feature CTA (e.g. the Home
   * Payment Explorer teaser) — the brand's signature tomato accent, not
   * meant to be the default button color everywhere. */
  featured:
    "bg-tomato-600 text-ivory hover:bg-tomato-700 border border-transparent",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  /** Opens in a new tab with rel="noopener noreferrer" — only meaningful for a real http(s) href, never for tel:/sms:/mailto:. Use for handoffs to an external partner system where the visitor should keep their place on this site. */
  newTab?: boolean;
};

/**
 * Renders as a real anchor for tel:/sms:/mailto:/external links, and as a
 * Next.js Link for internal routes — so every CTA is genuinely functional.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  newTab,
}: CtaButtonProps) {
  const isSpecialProtocol = /^(tel:|sms:|mailto:)/.test(href);
  const isExternalHttp = href.startsWith("http");
  const classes = cn(
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors focus-visible:outline-offset-4",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  if (isSpecialProtocol || isExternalHttp) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab && isExternalHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
