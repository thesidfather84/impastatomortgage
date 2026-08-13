import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BuyAHomePage from "@/app/buy-a-home/page";
import RefinancePage from "@/app/refinance/page";
import { ARGENT_APPLICATION_URL } from "@/config/application";

describe("Traditional mortgage/buying pages — secure application CTA", () => {
  it("Buy a Home links to the real secure application portal", () => {
    render(<BuyAHomePage />);
    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("Refinance links to the real secure application portal", () => {
    render(<RefinancePage />);
    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
