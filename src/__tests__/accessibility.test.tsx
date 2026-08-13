import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { AccessibilityMenu } from "@/components/accessibility/AccessibilityMenu";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-text-size");
});

async function openMenu(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /accessibility/i }));
}

describe("AccessibilityMenu", () => {
  it("defaults to standard text size", () => {
    render(
      <AccessibilityProvider>
        <AccessibilityMenu />
      </AccessibilityProvider>
    );

    expect(document.documentElement.getAttribute("data-text-size")).toBe("");
  });

  it("consolidates text size and Read This Page into a single control", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityProvider>
        <AccessibilityMenu />
      </AccessibilityProvider>
    );

    // Only one top-level accessibility control is visible before opening.
    expect(screen.getByRole("button", { name: /accessibility/i })).toBeInTheDocument();
    expect(screen.queryByText("Standard")).not.toBeInTheDocument();

    await openMenu(user);
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Large")).toBeInTheDocument();
    expect(screen.getByText("Extra Large")).toBeInTheDocument();
  });

  it("switches to large text and updates the html attribute", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityProvider>
        <AccessibilityMenu />
      </AccessibilityProvider>
    );

    await openMenu(user);
    await user.click(screen.getByRole("button", { name: "Large" }));
    expect(document.documentElement.getAttribute("data-text-size")).toBe("large");
  });

  it("switches to extra large text and updates the html attribute", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityProvider>
        <AccessibilityMenu />
      </AccessibilityProvider>
    );

    await openMenu(user);
    await user.click(screen.getByRole("button", { name: "Extra Large" }));
    expect(document.documentElement.getAttribute("data-text-size")).toBe("xl");
  });
});
