import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/site/Hero";
import { AskDawnProvider } from "@/components/ask-dawn/AskDawnProvider";
import { ARGENT_APPLICATION_URL } from "@/config/application";

function renderHero() {
  return render(
    <AskDawnProvider>
      <Hero />
    </AskDawnProvider>
  );
}

describe("Hero — CTA hierarchy", () => {
  it("shows all three primary CTAs: Talk to Dawn, Ask Dawn, Start Application", () => {
    renderHero();
    expect(screen.getByRole("link", { name: "Talk to Dawn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ask Dawn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start Application" })).toBeInTheDocument();
  });

  it("Start Application links to the real, verified secure Argent portal in a new tab, without disguising the destination", () => {
    renderHero();
    const link = screen.getByRole("link", { name: "Start Application" });
    expect(link).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("never labels the application CTA as implying eligibility or approval", () => {
    renderHero();
    expect(screen.queryByText(/do i qualify/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/you qualify/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/approved/i)).not.toBeInTheDocument();
  });

  it("meets the accessible tap-target minimum", () => {
    renderHero();
    expect(screen.getByRole("link", { name: "Start Application" }).className).toMatch(/min-h-\[44px\]/);
  });
});

describe("Hero — phone line", () => {
  it("shows the 'Call or text Dawn' wording with a bold, larger phone number", () => {
    renderHero();
    expect(screen.getByText(/call or text dawn/i)).toBeInTheDocument();
    const phoneLink = screen.getByRole("link", { name: "985-502-6600" });
    expect(phoneLink).toHaveAttribute("href", expect.stringContaining("tel:"));
    expect(phoneLink.className).toMatch(/font-bold/);
  });
});

describe("Hero — experience wording", () => {
  it("uses durable 'licensed since 1991' wording instead of a vague decades claim, and never implies decades of mortgage-originating experience", () => {
    renderHero();
    expect(screen.getByText(/licensed since 1991/i)).toBeInTheDocument();
    expect(screen.queryByText(/decades of louisiana real estate experience/i)).not.toBeInTheDocument();
  });
});
