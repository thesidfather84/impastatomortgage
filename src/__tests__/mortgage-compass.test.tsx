import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CompassWizard } from "@/components/mortgage-compass/CompassWizard";

describe("CompassWizard", () => {
  it("walks through a basic flow to an informational result", async () => {
    const user = userEvent.setup();
    render(<CompassWizard />);

    expect(screen.getByText("What are you trying to do?")).toBeInTheDocument();
    await user.click(screen.getByText("I'm not sure yet"));

    expect(screen.getByText("Do you currently own a home?")).toBeInTheDocument();
    await user.click(screen.getByText("No"));

    expect(screen.getByText("Where are you in the process?")).toBeInTheDocument();
    await user.click(screen.getByText("Just exploring"));

    expect(screen.getByText("Let's find your starting point")).toBeInTheDocument();
    expect(
      screen.getByText(/informational only/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not a loan approval, offer, commitment to lend, or guarantee/i)
    ).toBeInTheDocument();
  });

  it("never asks for SSN or bank account information", () => {
    render(<CompassWizard />);
    expect(screen.queryByText(/social security/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/routing number/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/account number/i)).not.toBeInTheDocument();
  });
});
