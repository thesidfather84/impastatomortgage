import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { HomeEquityExplorer } from "@/components/calculators/HomeEquityExplorer";
import { calculateHecmPreliminaryEstimate } from "@/lib/calculators/hecm/engine";
import { CURRENT_HECM_MCA_LIMIT } from "@/lib/calculators/hecm/mca-limit";
import ReverseMortgagePage from "@/app/reverse-mortgage/page";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Surfaces Ask Dawn provider state without rendering AskDawnInline (which needs a router context this test environment doesn't provide). */
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

function renderExplorer() {
  return render(
    <AskDawnProvider>
      <HomeEquityExplorer />
      <AskDawnStateProbe />
    </AskDawnProvider>
  );
}

// The component's own default scenario — used to independently derive the
// expected engine output as the test oracle, rather than hardcoding a PLF
// value from memory.
const DEFAULT_ENGINE_INPUTS = {
  parties: [{ role: "borrower" as const, age: 72 }],
  propertyValue: 400_000,
  expectedRatePercent: 6.5,
  existingLienBalance: 0,
  otherClosingCosts: 0,
};

describe("HomeEquityExplorer — renders and calculates", () => {
  it("renders the calculator", () => {
    renderExplorer();
    expect(screen.getByText("Estimated net principal limit")).toBeInTheDocument();
    expect(screen.getByLabelText(/your age/i)).toBeInTheDocument();
  });

  it("displays a full, engine-backed result immediately, with no interaction required", () => {
    renderExplorer();

    const expected = calculateHecmPreliminaryEstimate(DEFAULT_ENGINE_INPUTS);
    expect(expected.ok).toBe(true);
    if (!expected.ok) return;

    expect(
      screen.getByText(usdFormatter.format(expected.result.estimatedNetPrincipalLimitBeforeSetAsides))
    ).toBeInTheDocument();
    // Default scenario has home value == Maximum Claim Amount (both below
    // the HUD cap), so this figure legitimately appears twice — once for
    // "estimated home value used" and once for "Maximum Claim Amount".
    expect(
      screen.getAllByText(usdFormatter.format(expected.result.maximumClaimAmount)).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(usdFormatter.format(expected.result.initialPrincipalLimit))
    ).toBeInTheDocument();
  });

  it("renders the full mandatory-obligation breakdown", () => {
    renderExplorer();

    const expected = calculateHecmPreliminaryEstimate(DEFAULT_ENGINE_INPUTS);
    expect(expected.ok).toBe(true);
    if (!expected.ok) return;

    expect(screen.getByText("Existing mortgage / liens")).toBeInTheDocument();
    expect(screen.getByText("Estimated upfront MIP")).toBeInTheDocument();
    expect(screen.getByText("Estimated origination fee")).toBeInTheDocument();
    expect(screen.getByText("Other closing costs entered")).toBeInTheDocument();
    expect(screen.getByText("Total mandatory obligations")).toBeInTheDocument();
    expect(
      screen.getByText(usdFormatter.format(expected.result.mandatoryObligations.upfrontMip))
    ).toBeInTheDocument();
    expect(
      screen.getByText(usdFormatter.format(expected.result.mandatoryObligations.originationFee))
    ).toBeInTheDocument();
  });

  it("a spouse's younger age changes the youngest applicable age and the resulting figures", async () => {
    const user = userEvent.setup();
    renderExplorer();

    const before = calculateHecmPreliminaryEstimate(DEFAULT_ENGINE_INPUTS);
    expect(before.ok).toBe(true);
    if (!before.ok) return;

    const spouseAgeInput = screen.getByLabelText(/spouse's age/i);
    await user.type(spouseAgeInput, "58");

    const after = calculateHecmPreliminaryEstimate({
      ...DEFAULT_ENGINE_INPUTS,
      parties: [
        { role: "borrower", age: 72 },
        { role: "non-borrowing-spouse", age: 58 },
      ],
    });
    expect(after.ok).toBe(true);
    if (!after.ok) return;

    expect(after.result.youngestApplicableAge).toBe(58);
    expect(after.result.principalLimitFactor).not.toBe(before.result.principalLimitFactor);
    expect(
      screen.getByText(usdFormatter.format(after.result.initialPrincipalLimit))
    ).toBeInTheDocument();
  });

  it("caps the Maximum Claim Amount at the 2026 HUD limit when home value is entered above it", async () => {
    const user = userEvent.setup();
    renderExplorer();

    const homeValueInput = screen.getByLabelText(/estimated home value/i);
    await user.clear(homeValueInput);
    await user.type(homeValueInput, "3000000");

    expect(
      screen.getByText(usdFormatter.format(CURRENT_HECM_MCA_LIMIT.maximumClaimAmount))
    ).toBeInTheDocument();
  });

  it("shows a clear validation message instead of results for invalid input, without crashing", async () => {
    const user = userEvent.setup();
    renderExplorer();

    const ageInput = screen.getByLabelText(/your age/i);
    await user.clear(ageInput);

    expect(screen.getByText(/let's fix a few numbers first/i)).toBeInTheDocument();
    expect(screen.queryByText("Estimated net principal limit")).not.toBeInTheDocument();
  });
});

describe("HomeEquityExplorer — privacy / no lead capture", () => {
  it("has no name, email, phone, or address input anywhere", () => {
    renderExplorer();

    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/address/i)).not.toBeInTheDocument();
    expect(document.querySelector('input[type="email"]')).not.toBeInTheDocument();
    expect(document.querySelector('input[type="tel"]')).not.toBeInTheDocument();
  });

  it("never asks the visitor to sign in, create an account, or unlock results", () => {
    renderExplorer();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/create an account/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unlock/i)).not.toBeInTheDocument();
  });

  it("results are visible on first render — nothing is gated behind a submit step", () => {
    renderExplorer();
    // Results are already asserted present in the "renders" test; here we
    // specifically confirm there is no submit/unlock button gating them.
    expect(screen.queryByRole("button", { name: /submit|unlock|get my results|see results/i })).not.toBeInTheDocument();
  });
});

describe("HomeEquityExplorer — no qualification or approval language", () => {
  it("never uses forbidden phrases anywhere in the rendered output", () => {
    const { container } = renderExplorer();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/you qualify for/i);
    expect(text).not.toMatch(/you are eligible/i);
    expect(text).not.toMatch(/cash you can get/i);
    expect(text).not.toMatch(/guaranteed proceeds/i);
    expect(text).not.toMatch(/approved amount/i);
  });
});

describe("HomeEquityExplorer — Ask Dawn handoff", () => {
  it("sends only a fixed, generic question with no calculator financial values", async () => {
    const user = userEvent.setup();
    renderExplorer();

    await user.click(screen.getByRole("button", { name: /ask dawn about how a hecm works/i }));

    const probe = screen.getByTestId("ask-dawn-probe");
    expect(probe.getAttribute("data-open")).toBe("true");
    expect(
      within(probe).getByText("I used the Home Equity Explorer and have questions about how a HECM works.")
    ).toBeInTheDocument();
    // No dollar figures from the form leak into the handed-off question.
    expect(within(probe).queryByText(/\$\d/)).not.toBeInTheDocument();
  });

  it("provides real Call Dawn and Text Dawn actions, both optional", () => {
    renderExplorer();
    expect(screen.getByRole("link", { name: /call dawn/i })).toHaveAttribute(
      "href",
      expect.stringContaining("tel:")
    );
    expect(screen.getByRole("link", { name: /text dawn/i })).toHaveAttribute(
      "href",
      expect.stringContaining("sms:")
    );
  });
});

describe("HomeEquityExplorer — mobile / accessibility basics", () => {
  it("every input has an accessible label", () => {
    renderExplorer();
    expect(screen.getByLabelText(/your age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/spouse's age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated home value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current mortgage or liens/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expected interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/other closing costs/i)).toBeInTheDocument();
  });

  it("the Call Dawn and Text Dawn actions meet the 44px minimum touch target", () => {
    renderExplorer();
    expect(screen.getByRole("link", { name: /call dawn/i }).className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole("link", { name: /text dawn/i }).className).toMatch(/min-h-\[44px\]/);
  });
});

describe("Reverse Mortgage page — primary discovery point for the Home Equity Explorer", () => {
  it("prominently links to the calculator, high on the page, not just in Resources", () => {
    const { container } = render(<ReverseMortgagePage />);

    const links = Array.from(container.querySelectorAll('a[href="/calculators/home-equity"]'));
    expect(links.length).toBeGreaterThanOrEqual(1);

    // "High on the page": the discovery banner must appear before the
    // "Common Questions" section further down the page.
    const commonQuestionsHeading = screen.getByText("Common Questions");
    const firstExplorerLink = links[0];
    // DOCUMENT_POSITION_FOLLOWING means commonQuestionsHeading comes after
    // firstExplorerLink in document order.
    expect(
      firstExplorerLink.compareDocumentPosition(commonQuestionsHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(screen.getByRole("link", { name: /explore my home equity/i })).toBeInTheDocument();
    expect(screen.getByText("See what your home could make possible in retirement.")).toBeInTheDocument();
  });
});
