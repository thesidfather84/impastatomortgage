/**
 * CENTRAL COMPLIANCE CONFIG
 * =========================
 * This is the single source of truth for every regulated fact on the site
 * (NMLS IDs, licensing, required disclosures, etc.).
 *
 * RULES FOR EDITING THIS FILE:
 * 1. Never invent a value. If a fact isn't confirmed by Dawn/the company,
 *    leave `value: null` and `status: "todo"`.
 * 2. Public-facing components (LicensingDisclosure, EqualHousingDisclosure,
 *    MortgageAdvertisingDisclosure, ReverseMortgageDisclosure,
 *    PublicLicenseSummary) must NEVER render "Pending" / TODO / internal
 *    launch-state language to customers. They silently omit any field
 *    that isn't `confirmed` — never invent wording just to avoid an
 *    empty section. Missing fields are surfaced instead through:
 *      a) a console warning logged when this module loads server-side,
 *      b) tests in src/__tests__/compliance.test.tsx, and
 *      c) the internal /dev/compliance-status page, which 404s in
 *         production and is never linked from public navigation.
 * 3. This site has NOT completed a legal/compliance verification pass.
 *    Nothing here should be treated as final until that review happens —
 *    but that fact belongs in internal tooling, not on public pages.
 *
 * VERIFIED-DATA NOTE (see /licensing-disclosures):
 * Dawn currently originates mortgage business through a third-party
 * company, Argent Lending LLC — Impastato Mortgage is Dawn's own
 * long-term brand, not a licensed mortgage lender/broker in its own
 * right. Do not state or imply otherwise anywhere on the site. If Dawn
 * later operates through her own licensed mortgage company, update the
 * `mortgage` section below and the wording will propagate everywhere it's
 * used.
 */

export type ComplianceField<T> =
  | { status: "confirmed"; value: T }
  | { status: "todo"; value: null };

function todo<T>(): ComplianceField<T> {
  return { status: "todo", value: null };
}

function confirmed<T>(value: T): ComplianceField<T> {
  return { status: "confirmed", value };
}

export const compliance = {
  /**
   * Dawn's mortgage relationship. She originates through Argent Lending
   * LLC today — this is a factual, neutral relationship disclosure, not a
   * claim that Impastato Mortgage itself is a licensed lender/broker.
   */
  mortgage: {
    loanOriginatorLegalName: confirmed("Dawn Bullard Impastato"),
    loanOriginatorNmlsId: confirmed("2354629"),
    currentCompanyLegalName: confirmed("Argent Lending LLC"),
    companyNmlsId: confirmed("2342251"),
    nmlsListedLocation: confirmed("Mandeville, LA 70448"),
    /** Full street office address, if one should be publicly disclosed. */
    officeAddress: todo<string>(),
    /** States where Dawn/the company is licensed to originate mortgages. */
    licensingStates: todo<string[]>(),
    brokerOrLenderStatus: confirmed(
      "Mortgage Loan Originator, licensed through Argent Lending LLC"
    ),
  },

  /**
   * Dawn's Louisiana real-estate license — separate from, and not to be
   * implied as affiliated with, her mortgage relationship above.
   */
  realEstate: {
    licenseeLegalName: confirmed("Dawn Bullard Impastato"),
    licenseType: confirmed("Associate Broker"),
    licenseNumber: confirmed("BROK.73582-ASA"),
    licenseStatus: confirmed("Active"),
    firstIssueDate: confirmed("2005-07-01"),
    /**
     * The supervisor/sponsoring brokerage shown on the Louisiana licensing
     * record. This is a real-estate relationship — do not imply it is
     * affiliated with Dawn's mortgage company (Argent Lending LLC) unless
     * separately verified.
     */
    supervisingBrokerage: confirmed("Celestino Investment Group LLC"),
  },

  /** Required state-specific advertising/disclosure language. */
  requiredStateDisclosures: todo<string[]>(),

  /**
   * Equal Housing Opportunity — this is a standard federal fair-housing
   * statement, not a Dawn-specific fact, so it's safe to include now.
   */
  equalHousingOpportunity: confirmed(
    "Equal Housing Opportunity. We do business in accordance with the Federal Fair Housing Law."
  ),

  /** TCPA-compliant consent language for SMS communications. */
  smsConsentLanguage: todo<string>(),

  /** Consent language for email communications. */
  emailConsentLanguage: todo<string>(),

  /**
   * Reverse mortgage / HECM specific disclosure language. HUD requires
   * HECM counseling and specific advertising disclosures — exact wording
   * must be confirmed against current HUD/company requirements before
   * publishing.
   */
  reverseMortgageDisclosure: todo<string>(),

  /** General mortgage advertising disclosure (APR examples, rate assumptions, etc.) */
  mortgageAdvertisingDisclosure: todo<string>(),

  /**
   * Real-estate experience statement used in marketing copy. Derived
   * conservatively from the verified license issue date above (2005) —
   * NOT a claim that Dawn has been *licensed* for 30 years. Update this
   * single field if/when Dawn confirms a fuller career history, and the
   * change will propagate everywhere it's referenced.
   */
  realEstateExperienceStatement: confirmed(
    "Louisiana real-estate experience dating back more than 20 years"
  ),

  /**
   * Years specifically originating mortgages (distinct from real estate
   * experience). Must not be assumed equal to real-estate years.
   */
  yearsMortgageOriginationExperience: todo<string>(),
} as const;

/** Flattened list of every regulated leaf field, for QA/completeness checks. */
function collectFields(node: unknown, path: string[] = []): { path: string; status: string }[] {
  if (node && typeof node === "object" && "status" in node) {
    const field = node as ComplianceField<unknown>;
    return [{ path: path.join("."), status: field.status }];
  }
  if (node && typeof node === "object") {
    return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) =>
      collectFields(value, [...path, key])
    );
  }
  return [];
}

export const complianceFieldStatuses = collectFields(compliance);

export const missingComplianceFields = complianceFieldStatuses
  .filter((f) => f.status === "todo")
  .map((f) => f.path);

export const isComplianceComplete = missingComplianceFields.length === 0;

// Server-only dev warning — never runs in the browser bundle. This is the
// "development console warnings" surfacing mechanism described above; it
// intentionally does not gate on NODE_ENV so it still shows up in build
// logs (which are internal, not customer-visible).
if (typeof window === "undefined" && missingComplianceFields.length > 0) {
  console.warn(
    `[compliance] ${missingComplianceFields.length} field(s) still pending verification: ${missingComplianceFields.join(", ")}. See src/config/compliance.ts, or run the app in development and visit /dev/compliance-status.`
  );
}
