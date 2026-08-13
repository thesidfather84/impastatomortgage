import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApplicationCta } from "@/components/ui/ApplicationCta";
import { ARGENT_APPLICATION_URL } from "@/config/application";

describe("ApplicationCta — verified secure application handoff", () => {
  it("uses the exact verified Argent Lending application URL", () => {
    expect(ARGENT_APPLICATION_URL).toBe("https://argent.my1003app.com/2354629/register");
    render(<ApplicationCta />);
    expect(screen.getByRole("link", { name: /start your secure application/i })).toHaveAttribute(
      "href",
      "https://argent.my1003app.com/2354629/register"
    );
  });

  it("opens the application in a new tab with secure link attributes, never disguising the destination", () => {
    render(<ApplicationCta />);
    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    // The href is the literal, inspectable destination — nothing obscures it.
    expect(link.getAttribute("href")).toBe(ARGENT_APPLICATION_URL);
  });

  it("shows the required primary label, supporting copy, and clarifying note", () => {
    render(<ApplicationCta />);
    expect(screen.getByText("Start Your Secure Application →")).toBeInTheDocument();
    expect(
      screen.getByText(/continue to dawn's secure argent lending application portal/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you'll continue on argent lending's secure application system/i)
    ).toBeInTheDocument();
  });

  it("appends an optional extra note (e.g. a HECM eligibility disclaimer) after the standard note", () => {
    render(<ApplicationCta note="Starting an application is not a determination of eligibility." />);
    expect(
      screen.getByText(/starting an application is not a determination of eligibility/i)
    ).toBeInTheDocument();
  });

  it("compact mode renders a smaller, secondary treatment with the same link and note", () => {
    render(<ApplicationCta compact />);
    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    expect(
      screen.getByText(/you'll continue on argent lending's secure application system/i)
    ).toBeInTheDocument();
  });

  it("meets the accessible tap-target minimum and is a real, keyboard-reachable link", () => {
    render(<ApplicationCta />);
    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link.tagName).toBe("A");
    expect(link.className).toMatch(/min-h-\[44px\]/);
  });

  it("never renders any form field — this component collects nothing itself", () => {
    const { container } = render(<ApplicationCta />);
    expect(container.querySelectorAll("input, textarea, select, form").length).toBe(0);
  });
});
