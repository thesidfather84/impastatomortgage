import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResourcesDropdown } from "@/components/site/ResourcesDropdown";

describe("ResourcesDropdown", () => {
  it("is closed by default", () => {
    render(<ResourcesDropdown />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on hover and has no margin-created gap between trigger and panel", () => {
    render(<ResourcesDropdown />);
    const trigger = screen.getByRole("button", { name: /resources/i });
    const wrapper = trigger.parentElement!;

    fireEvent.mouseEnter(wrapper);
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // The gap between the trigger and panel must live as padding on the
    // positioned wrapper (part of the hoverable box), never as a margin
    // (which sits outside every element's hit-box and breaks hover).
    const positionedWrapper = menu.parentElement!;
    expect(positionedWrapper.className).toMatch(/\bpt-3\b/);
    expect(positionedWrapper.className).not.toMatch(/\bmt-3\b/);
    expect(menu.className).not.toMatch(/\bmt-3\b/);
  });

  it("stays open while the pointer moves from the trigger onto the panel itself", () => {
    render(<ResourcesDropdown />);
    const trigger = screen.getByRole("button", { name: /resources/i });
    const wrapper = trigger.parentElement!;

    fireEvent.mouseEnter(wrapper);
    const menu = screen.getByRole("menu");

    // Moving onto the panel is still moving within the same wrapper — it
    // must not close.
    fireEvent.mouseEnter(menu);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes when the pointer leaves the whole component", () => {
    render(<ResourcesDropdown />);
    const trigger = screen.getByRole("button", { name: /resources/i });
    const wrapper = trigger.parentElement!;

    fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on keyboard focus so keyboard users can reach it without hovering", async () => {
    const user = userEvent.setup();
    render(<ResourcesDropdown />);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: /resources/i })).toHaveFocus();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("every resource link is present and clickable inside the menu", () => {
    render(<ResourcesDropdown />);
    const trigger = screen.getByRole("button", { name: /resources/i });
    fireEvent.mouseEnter(trigger.parentElement!);

    expect(screen.getByRole("menuitem", { name: /glossary/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /areas we serve/i })).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<ResourcesDropdown />);
    const trigger = screen.getByRole("button", { name: /resources/i });
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
