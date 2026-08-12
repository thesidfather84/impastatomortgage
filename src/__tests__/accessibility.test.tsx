import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { TextSizeControl } from "@/components/accessibility/TextSizeControl";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-text-size");
});

describe("TextSizeControl", () => {
  it("defaults to standard text size", () => {
    render(
      <AccessibilityProvider>
        <TextSizeControl />
      </AccessibilityProvider>
    );

    expect(document.documentElement.getAttribute("data-text-size")).toBe("");
  });

  it("switches to large text and updates the html attribute", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityProvider>
        <TextSizeControl />
      </AccessibilityProvider>
    );

    await user.click(screen.getByTitle("Large text"));
    expect(document.documentElement.getAttribute("data-text-size")).toBe("large");
  });

  it("switches to extra large text and updates the html attribute", async () => {
    const user = userEvent.setup();
    render(
      <AccessibilityProvider>
        <TextSizeControl />
      </AccessibilityProvider>
    );

    await user.click(screen.getByRole("button", { name: /extra large text/i }));
    expect(document.documentElement.getAttribute("data-text-size")).toBe("xl");
  });
});
