import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { HomePaymentCalculator } from "@/components/calculators/HomePaymentCalculator";

/** Surfaces Ask Dawn provider state so the handoff button can be verified
 * without rendering AskDawnWidget (which depends on next/navigation's
 * router context, unavailable in this unit-test environment). */
function AskDawnStateProbe() {
  const { isOpen, messages } = useAskDawn();
  return (
    <div data-testid="ask-dawn-probe" data-open={isOpen}>
      {messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
    </div>
  );
}

function renderCalculator() {
  return render(
    <AskDawnProvider>
      <HomePaymentCalculator />
      <AskDawnStateProbe />
    </AskDawnProvider>
  );
}

describe("HomePaymentCalculator", () => {
  it("renders a live estimate with the full breakdown by default (real picture on)", () => {
    renderCalculator();

    expect(screen.getByText("Estimated monthly payment")).toBeInTheDocument();
    expect(screen.getByText("Principal & interest")).toBeInTheDocument();
    expect(screen.getByText("Property taxes")).toBeInTheDocument();
    expect(screen.getByText("Homeowners insurance")).toBeInTheDocument();
    expect(screen.getByText("Mortgage insurance (PMI)")).toBeInTheDocument();
    expect(screen.getByText("HOA")).toBeInTheDocument();
    expect(screen.getByText("Loan amount")).toBeInTheDocument();
  });

  it("updates the estimate when the home price changes", async () => {
    const user = userEvent.setup();
    renderCalculator();

    const before = screen.getByText("Estimated monthly payment").parentElement!.textContent;

    const homePriceInput = screen.getByLabelText("Home price");
    await user.clear(homePriceInput);
    await user.type(homePriceInput, "800000");

    const after = screen.getByText("Estimated monthly payment").parentElement!.textContent;
    expect(after).not.toBe(before);
  });

  it("toggling off 'the real monthly picture' hides the extra costs and shrinks the total to P&I only, and toggling back on restores the entered values", async () => {
    const user = userEvent.setup();
    renderCalculator();

    const totalFigure = () => screen.getByText("Estimated monthly payment").nextElementSibling!.textContent;
    const totalBefore = totalFigure();

    const toggle = screen.getByRole("switch", { name: /show me the real monthly picture/i });
    await user.click(toggle);

    expect(screen.queryByText("Property taxes")).not.toBeInTheDocument();
    expect(screen.queryByText("HOA")).not.toBeInTheDocument();
    expect(totalFigure()).not.toBe(totalBefore);

    await user.click(toggle);
    expect(screen.getByText("Property taxes")).toBeInTheDocument();
    expect(totalFigure()).toBe(totalBefore);
  });

  it("a down payment preset chip updates both the dollar amount and the displayed percentage", async () => {
    const user = userEvent.setup();
    renderCalculator();

    await user.click(screen.getByRole("button", { name: "10%" }));

    expect(screen.getByText("10.0% down")).toBeInTheDocument();
    const downPaymentInput = screen.getByLabelText("Down payment") as HTMLInputElement;
    expect(Number(downPaymentInput.value)).toBeCloseTo(0.1 * 350000, 0);
  });

  it("a loan term preset chip updates the term used in the results", async () => {
    const user = userEvent.setup();
    renderCalculator();

    await user.click(screen.getByRole("button", { name: "15 yr" }));

    const loanTermInput = screen.getByLabelText("Loan term (years)") as HTMLInputElement;
    expect(loanTermInput.value).toBe("15");
  });

  it("shows a clear validation message instead of results when the down payment exceeds the home price", async () => {
    const user = userEvent.setup();
    renderCalculator();

    const downPaymentInput = screen.getByLabelText("Down payment");
    await user.clear(downPaymentInput);
    await user.type(downPaymentInput, "999999999");

    expect(screen.getByText(/let's fix a few numbers first/i)).toBeInTheDocument();
    expect(screen.getByText(/down payment cannot exceed home price/i)).toBeInTheDocument();
    expect(screen.queryByText("Estimated monthly payment")).not.toBeInTheDocument();
  });

  it("shows the concise estimates-only disclaimer with a link to full disclosures", () => {
    renderCalculator();

    expect(screen.getByText(/estimates only/i)).toBeInTheDocument();
    expect(
      screen.getByText(/not a loan offer, approval, or rate quote/i)
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /full disclosures/i });
    expect(link).toHaveAttribute("href", "/legal");
  });

  it("never turns a calculated result into a joke — no personality copy appears inside the results card", () => {
    renderCalculator();
    const resultsCard = screen.getByText("Estimated monthly payment").closest("div")!.parentElement!;
    expect(within(resultsCard).queryByText(/mamma mia|fuggedaboutit|lagniappe/i)).not.toBeInTheDocument();
  });

  it("'Ask Dawn about these numbers' opens Ask Dawn with a generic question and never includes the entered dollar figures", async () => {
    const user = userEvent.setup();
    renderCalculator();

    await user.click(screen.getByRole("button", { name: /ask dawn about these numbers/i }));

    const probe = screen.getByTestId("ask-dawn-probe");
    expect(probe.getAttribute("data-open")).toBe("true");
    expect(within(probe).getByText(/talk through my numbers with dawn/i)).toBeInTheDocument();
    // No dollar figures from the form leak into the handed-off question.
    expect(within(probe).queryByText(/\$\d/)).not.toBeInTheDocument();
  });

  it("provides real Call Dawn and Text Dawn actions in the handoff area", () => {
    renderCalculator();
    expect(screen.getByRole("link", { name: /call dawn/i })).toHaveAttribute(
      "href",
      expect.stringContaining("tel:")
    );
    expect(screen.getByRole("link", { name: /text dawn/i })).toHaveAttribute(
      "href",
      expect.stringContaining("sms:")
    );
  });

  it("offers a secondary, secure application CTA beneath the results, without gating the results behind it", () => {
    renderCalculator();

    // Results are already visible (asserted in the first test) — the
    // application CTA is an addition, never a requirement to see them.
    expect(screen.getByText("Estimated monthly payment")).toBeInTheDocument();
    const applyLink = screen.getByRole("link", { name: /start your secure application/i });
    expect(applyLink).toHaveAttribute("href", "https://argent.my1003app.com/2354629/register");
    expect(applyLink).toHaveAttribute("target", "_blank");
  });
});
