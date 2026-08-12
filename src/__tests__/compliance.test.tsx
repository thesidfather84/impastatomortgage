import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { compliance } from "@/config/compliance";
import { LicensingDisclosure } from "@/components/compliance/LicensingDisclosure";

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

describe("LicensingDisclosure", () => {
  it("renders the real, verified NMLS IDs", () => {
    render(<LicensingDisclosure />);
    expect(screen.getByText(/2354629/)).toBeInTheDocument();
    expect(screen.getByText(/2342251/)).toBeInTheDocument();
    expect(screen.getByText(/BROK\.73582-ASA/)).toBeInTheDocument();
  });

  it("still shows a pending notice for fields that remain unconfirmed", () => {
    render(<LicensingDisclosure />);
    const pendingNotices = screen.getAllByText(/Pending:/i);
    expect(pendingNotices.length).toBeGreaterThan(0);
  });
});
