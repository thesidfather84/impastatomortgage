import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { AskDawnProvider } from "@/components/ask-dawn/AskDawnProvider";
import { AskDawnMusicProvider } from "@/components/ask-dawn/AskDawnMusicProvider";
import { AskDawnWidget } from "@/components/ask-dawn/AskDawnWidget";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ComplianceFooter } from "@/components/compliance/ComplianceFooter";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { siteMetadata } from "@/config/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = siteMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        <AccessibilityProvider>
          <AskDawnProvider>
            <AskDawnMusicProvider>
              <SiteHeader />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <ComplianceFooter />
              <AskDawnWidget />
            </AskDawnMusicProvider>
          </AskDawnProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
