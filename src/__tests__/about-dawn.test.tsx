import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutDawnPage from "@/app/about-dawn/page";
import { AskDawnProvider } from "@/components/ask-dawn/AskDawnProvider";
import { ARGENT_APPLICATION_URL } from "@/config/application";

function renderPage() {
  return render(
    <AskDawnProvider>
      <AboutDawnPage />
    </AskDawnProvider>
  );
}

describe("About Dawn — portrait", () => {
  it("shows Dawn's real portrait, not a placeholder, with meaningful alt text", () => {
    renderPage();
    const portrait = screen.getByAltText(/portrait of dawn bullard impastato/i);
    expect(portrait).toBeInTheDocument();
    expect(portrait.tagName).toBe("IMG");
    expect(screen.queryByText(/portrait coming soon/i)).not.toBeInTheDocument();
  });
});

describe("About Dawn — top intro section", () => {
  it("shows the prominent heading and the durable, real-estate-only credential", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Dawn Bullard Impastato", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Licensed in Louisiana real estate since 1991.")).toBeInTheDocument();
  });

  it("never implies Dawn has been originating mortgages since 1991", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/mortgage.{0,40}since 1991/i);
    expect(text).not.toMatch(/originat\w+.{0,40}since 1991/i);
  });
});

describe("About Dawn — value section", () => {
  it("shows all four value points from the approved direction", () => {
    renderPage();
    expect(screen.getByText("Real Estate Expertise Since 1991")).toBeInTheDocument();
    expect(screen.getByText("One Home. Every Stage.")).toBeInTheDocument();
    expect(screen.getByText("Local Knowledge. Lasting Relationships.")).toBeInTheDocument();
    expect(screen.getByText("Guidance You Can Trust")).toBeInTheDocument();
  });
});

describe("About Dawn — licensing", () => {
  it("shows the verified mortgage NMLS summary and keeps real-estate detail pointed at the dedicated licensing page", () => {
    renderPage();
    expect(screen.getByText(/Dawn Bullard Impastato \| NMLS #2354629/)).toBeInTheDocument();
    expect(
      screen.getByText(/Mortgage services through Argent Lending LLC \| NMLS #2342251/)
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /licensing & disclosures/i });
    expect(link).toHaveAttribute("href", "/licensing-disclosures");
  });

  it("does not fabricate a real-estate brokerage logo or affiliation name on this page", () => {
    renderPage();
    expect(screen.queryByText(/ERA Top Agent Realty/i)).not.toBeInTheDocument();
  });
});

describe("About Dawn — final CTA band", () => {
  it("offers Talk to Dawn, Ask Dawn, and Start Application", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Talk to Dawn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ask Dawn" })).toBeInTheDocument();
    const applyLink = screen.getByRole("link", { name: "Start Application" });
    expect(applyLink).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    expect(applyLink).toHaveAttribute("target", "_blank");
    expect(applyLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the readable phone line without outsizing the page heading", () => {
    renderPage();
    expect(screen.getByText(/call or text dawn/i)).toBeInTheDocument();
    const phoneLink = screen.getByRole("link", { name: "985-502-6600" });
    expect(phoneLink.className).toMatch(/font-bold/);
    expect(phoneLink.className).not.toMatch(/text-4xl|text-5xl|text-3xl/);
  });
});
