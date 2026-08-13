import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePaymentExplorerBanner } from "@/components/site/HomePaymentExplorerBanner";
import { AskDawnProvider } from "@/components/ask-dawn/AskDawnProvider";
import AskDawnPage from "@/app/ask-dawn/page";

// jsdom doesn't implement Element.scrollTo — AskDawnInline calls it on
// mount to keep the message list pinned to the bottom. Harmless no-op
// shim scoped to this test file; the real behavior only matters in an
// actual scrollable browser viewport.
beforeAll(() => {
  Element.prototype.scrollTo = Element.prototype.scrollTo || (() => {});
});

describe("HomePaymentExplorerBanner (homepage entry point)", () => {
  it("shows the feature name, hook, and supporting copy", () => {
    render(<HomePaymentExplorerBanner />);

    expect(screen.getByText("Dawn's Home Payment Explorer")).toBeInTheDocument();
    expect(screen.getByText("See the real monthly picture.")).toBeInTheDocument();
    expect(
      screen.getByText(/adds the costs people forget.*taxes, insurance, PMI, and HOA/i)
    ).toBeInTheDocument();
  });

  it("links the CTA directly to the calculator route with a large tap target", () => {
    render(<HomePaymentExplorerBanner />);

    const cta = screen.getByRole("link", { name: /explore your payment/i });
    expect(cta).toHaveAttribute("href", "/calculators/home-payment");
    // CtaButton's base class guarantees a real, accessible 44px+ tap target.
    expect(cta.className).toMatch(/min-h-\[44px\]/);
  });

  it("never shows a real or example dollar figure — only the placeholder pattern", () => {
    render(<HomePaymentExplorerBanner />);

    // The preview card intentionally uses "$X,XXX" as a placeholder, never
    // an actual number, so nothing on the homepage can be mistaken for a
    // real estimate before a visitor uses the calculator themselves.
    expect(screen.getByText(/\$X,XXX/)).toBeInTheDocument();
    expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument();
  });
});

describe("Ask Dawn page — secondary discovery link", () => {
  it("points visitors to the Home Payment Explorer without cluttering the chat itself", () => {
    render(
      <AskDawnProvider>
        <AskDawnPage />
      </AskDawnProvider>
    );

    const link = screen.getByRole("link", { name: /try dawn's home payment explorer/i });
    expect(link).toHaveAttribute("href", "/calculators/home-payment");
  });
});
