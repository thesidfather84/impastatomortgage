/**
 * CENTRAL COMPLIANCE CONFIG
 * =========================
 * This is the single source of truth for every regulated fact on the site
 * (NMLS IDs, licensing, required disclosures, etc.).
 *
 * RULES FOR EDITING THIS FILE:
 * 1. Never invent a value. If a fact isn't confirmed by Dawn/the company,
 *    leave `value: null` and `status: "todo"`.
 * 2. Compliance-facing components (ComplianceFooter, LicensingDisclosure,
 *    EqualHousingDisclosure, MortgageAdvertisingDisclosure,
 *    ReverseMortgageDisclosure) must render something visible for every
 *    field — either the real value or a clearly labeled "pending" notice.
 *    They must never silently omit a disclosure because the value is null.
 * 3. This site has NOT completed a legal/compliance verification pass.
 *    Nothing here should be treated as final until that review happens.
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
  /** Dawn Impastato's individual NMLS ID. */
  dawnNmlsId: todo<string>(),

  /** The mortgage company's NMLS ID (if Dawn operates under a company). */
  companyNmlsId: todo<string>(),

  /** Full legal name of the mortgage company/entity Dawn operates under. */
  legalCompanyName: todo<string>(),

  /** Whether Dawn/the company operates as a broker, lender, or loan originator. */
  brokerOrLenderStatus: todo<string>(),

  /** Louisiana Office of Financial Institutions license number(s), if applicable. */
  louisianaLicenseNumber: todo<string>(),

  /** States where Dawn/the company is licensed to originate. */
  licensingStates: todo<string[]>(),

  /** Physical office address, if one should be publicly disclosed. */
  officeAddress: todo<string>(),

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

  /** Dawn's years of real-estate experience — approximate, not a regulated figure. */
  yearsRealEstateExperience: confirmed("approximately 30 years"),

  /**
   * Years specifically originating mortgages (distinct from real estate
   * experience). Must not be assumed equal to real-estate years.
   */
  yearsMortgageOriginationExperience: todo<string>(),
} as const;

/** True once every regulated field above has a confirmed, non-null value. */
export const complianceFieldKeys = Object.keys(compliance) as Array<
  keyof typeof compliance
>;

export const missingComplianceFields = complianceFieldKeys.filter(
  (key) => compliance[key].status === "todo"
);

export const isComplianceComplete = missingComplianceFields.length === 0;
