import type { Metadata } from "next";
import { brand } from "./brand";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://impastatomortgage.com";

/** Root metadata — applied site-wide, overridden per-page via pageMetadata(). */
export function siteMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${brand.siteName} — ${brand.tagline}`,
      template: `%s | ${brand.siteName}`,
    },
    description: brand.heroSupportingCopy,
    openGraph: {
      title: brand.siteName,
      description: brand.heroSupportingCopy,
      siteName: brand.siteName,
      locale: "en_US",
      type: "website",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: brand.siteName,
      description: brand.heroSupportingCopy,
    },
    robots: { index: true, follow: true },
  };
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
