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
    expect(compliance.realEstate.firstIssueDate.value).toBe("2005-07-01");
  });

  it("still leaves unverified fields as pending rather than guessing", () => {
    expect(compliance.mortgage.officeAddress.status).toBe("todo");
    expect(compliance.mortgage.licensingStates.status).toBe("todo");
  });
});

describe("LicensingDisclosure (full licensing page)", () => {
  it("renders the real, verified NMLS IDs and license number", () => {
    render(<LicensingDisclosure />);
    expect(screen.getByText(/NMLS #2354629/)).toBeInTheDocument();
    expect(screen.getByText(/NMLS #2342251/)).toBeInTheDocument();
    expect(screen.getByText(/BROK\.73582-ASA/)).toBeInTheDocument();
    expect(screen.getByText(/First issued 07\/01\/2005/)).toBeInTheDocument();
  });

  it("never shows internal Pending/TODO language to the public", () => {
    render(<LicensingDisclosure />);
    expect(screen.queryByText(/Pending:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/has not been confirmed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/COMPLIANCE REVIEW REQUIRED/i)).not.toBeInTheDocument();
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
});
