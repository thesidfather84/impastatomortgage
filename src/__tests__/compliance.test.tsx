import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { compliance } from "@/config/compliance";
import { LicensingDisclosure } from "@/components/compliance/LicensingDisclosure";
import { PublicLicenseSummary } from "@/components/compliance/PublicLicenseSummary";
import { ComplianceFooter } from "@/components/compliance/ComplianceFooter";

describe("compliance config", () => {
  it("has the verified mortgage NMLS data confirmed, not fabricated", () => {
    expect(compliance.mortgage.loanOriginatorNmlsId).toEqual({
      status: "confirmed",
      value: "2354629",
    });
    expect(compliance.mortgage.companyNmlsId).toEqual({
      status: "confirmed",
      value: "2342251",
    });
    expect(compliance.mortgage.currentCompanyLegalName.value).toBe("Argent Lending LLC");
  });

  it("has the verified Louisiana real estate license confirmed", () => {
    expect(compliance.realEstate.licenseNumber).toEqual({
      status: "confirmed",
      value: "BROK.73582-ASA",
    });
    expect(compliance.realEstate.firstIssueDate.value).toBe("1991");
  });

  it("uses durable 'since 1991' wording for real-estate experience, not a stale year count, and leaves mortgage origination tenure unverified", () => {
    expect(compliance.realEstateExperienceStatement).toEqual({
      status: "confirmed",
      value: "Licensed in Louisiana real estate since 1991",
    });
    expect(compliance.yearsMortgageOriginationExperience.status).toBe("todo");
  });

  it("still leaves unverified fields as pending rather than guessing", () => {
    expect(compliance.mortgage.officeAddress.status).toBe("todo");
    expect(compliance.mortgage.licensingStates.status).toBe("todo");
  });

  it("reflects Dawn's current real-estate affiliation, not the stale one", () => {
    expect(compliance.realEstate.supervisingBrokerage).toEqual({
      status: "confirmed",
      value: "ERA Top Agent Realty",
    });
    expect(compliance.realEstate.supervisingBrokerage.value).not.toBe("Celestino Investment Group LLC");
    expect(compliance.realEstate.sponsoringBrokerCityState).toEqual({
      status: "confirmed",
      value: "Slidell, Louisiana",
    });
    expect(compliance.realEstate.sponsoringBrokerOfficeAddress).toEqual({
      status: "confirmed",
      value: "1846 Front St, Slidell, LA 70458",
    });
    expect(compliance.realEstate.sponsoringBrokerFranchiseStatus).toEqual({
      status: "confirmed",
      value: true,
    });
    expect(compliance.realEstate.independentlyOwnedAndOperatedDisclosure).toEqual({
      status: "confirmed",
      value: "Each office is independently owned and operated.",
    });
  });

  it("still does not guess the broker phone or jurisdiction — not shown on the verified ERA profile", () => {
    expect(compliance.realEstate.sponsoringBrokerPhone.status).toBe("todo");
    expect(compliance.realEstate.sponsoringBrokerJurisdiction.status).toBe("todo");
  });
});

describe("LicensingDisclosure (full licensing page)", () => {
  it("renders the real, verified NMLS IDs and license number", () => {
    render(<LicensingDisclosure />);
    expect(screen.getByText(/NMLS #2354629/)).toBeInTheDocument();
    expect(screen.getByText(/NMLS #2342251/)).toBeInTheDocument();
    expect(screen.getByText(/BROK\.73582-ASA/)).toBeInTheDocument();
    expect(screen.getByText(/Licensed in Louisiana real estate since 1991/)).toBeInTheDocument();
  });

  it("never shows internal Pending/TODO language to the public", () => {
    render(<LicensingDisclosure />);
    expect(screen.queryByText(/Pending:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/has not been confirmed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/COMPLIANCE REVIEW REQUIRED/i)).not.toBeInTheDocument();
  });

  it("shows the current real-estate affiliation and franchise disclosure, never the stale brokerage", () => {
    render(<LicensingDisclosure />);
    expect(screen.getByText("ERA Top Agent Realty")).toBeInTheDocument();
    expect(screen.getByText("1846 Front St, Slidell, LA 70458")).toBeInTheDocument();
    expect(screen.getByText("Each office is independently owned and operated.")).toBeInTheDocument();
    expect(screen.queryByText(/Celestino/i)).not.toBeInTheDocument();
  });
});

describe("PublicLicenseSummary (footer)", () => {
  it("renders the compact public disclosure line", () => {
    render(<PublicLicenseSummary />);
    expect(screen.getByText(/Dawn Bullard Impastato \| NMLS #2354629/)).toBeInTheDocument();
    expect(
      screen.getByText(/Mortgage services through Argent Lending LLC \| NMLS #2342251/)
    ).toBeInTheDocument();
  });

  it("never shows internal Pending/TODO language", () => {
    render(<PublicLicenseSummary />);
    expect(screen.queryByText(/Pending:/i)).not.toBeInTheDocument();
  });
});

describe("ComplianceFooter", () => {
  it("never exposes internal launch-state or pending language publicly", () => {
    render(<ComplianceFooter />);
    expect(screen.queryByText(/Pending:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/has not been confirmed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/must be completed before production launch/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/has not yet completed formal legal\/compliance review/i)
    ).not.toBeInTheDocument();
  });

  it("shows the compact public disclosure and a link to full licensing details", () => {
    render(<ComplianceFooter />);
    expect(screen.getByText(/Dawn Bullard Impastato \| NMLS #2354629/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Licensing & Disclosures/i })).toBeInTheDocument();
  });

  it("does not render real-estate brokerage details site-wide — the threshold question is still unresolved, so that detail stays on the dedicated licensing page", () => {
    render(<ComplianceFooter />);
    expect(screen.queryByText(/ERA Top Agent Realty/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/independently owned and operated/i)).not.toBeInTheDocument();
  });
});
