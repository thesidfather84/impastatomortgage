import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { compliance } from "@/config/compliance";
import { LicensingDisclosure } from "@/components/compliance/LicensingDisclosure";

describe("compliance config", () => {
  it("has not been filled in with a fabricated NMLS ID", () => {
    expect(compliance.dawnNmlsId.status).toBe("todo");
    expect(compliance.dawnNmlsId.value).toBeNull();
    expect(compliance.companyNmlsId.status).toBe("todo");
    expect(compliance.companyNmlsId.value).toBeNull();
  });
});

describe("LicensingDisclosure", () => {
  it("renders a visible pending notice instead of a fake NMLS ID", () => {
    render(<LicensingDisclosure />);

    // No numeric-looking NMLS ID should ever render as if it were real.
    const nmlsIdPattern = /NMLS ID:\s*\d/i;
    expect(screen.queryByText(nmlsIdPattern)).not.toBeInTheDocument();

    // Every missing field should surface as a visible "Pending" notice.
    const pendingNotices = screen.getAllByText(/Pending:/i);
    expect(pendingNotices.length).toBeGreaterThan(0);
  });
});
