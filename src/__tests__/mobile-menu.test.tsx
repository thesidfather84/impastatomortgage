import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/site/MobileMenu";

describe("MobileMenu", () => {
  it("is closed by default", () => {
    render(<MobileMenu />);
    expect(screen.queryByRole("dialog", { name: /site menu/i })).not.toBeInTheDocument();
  });

  it("opens the panel and lists primary navigation when tapped", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const dialog = screen.getByRole("dialog", { name: /site menu/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Buy a Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ask Dawn" })).toBeInTheDocument();
  });

  it("closes the panel when the close button is tapped", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog", { name: /site menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(screen.queryByRole("dialog", { name: /site menu/i })).not.toBeInTheDocument();
  });
});
