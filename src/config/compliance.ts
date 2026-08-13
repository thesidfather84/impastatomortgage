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
   *
   * LREC ADVERTISING SCAFFOLDING (added after the 2026-08 LREC audit):
   * ---------------------------------------------------------------------
   * The `sponsoringBroker*` fields below exist because the Louisiana Real
   * Estate Commission's CURRENT "Advertising Guidelines Checklist"
   * (published at lrec.gov/enforcement/advertising-guidelines, citing LAC
   * Title 46:LXVII Chapter 25, §2515 and §2501(F)) requires that an
   * associate broker/salesperson's own website show, on EVERY page:
   *   - the associate broker's name (already covered: licenseeLegalName)
   *   - the broker/trade name exactly as listed on the licensee's license
   *   - the city and state of the broker's main or branch office
   *   - the regulatory jurisdiction(s) in which the broker holds a license
   * and (via §2501(F), applied to internet advertising by LREC's own
   * guidance) a phone number owned by the brokerage itself that reaches
   * the broker directly — not a line that routes through Dawn.
   *
   * 2026-08 CORRECTION (license first-issue date): `firstIssueDate` below
   * previously read "2005-07-01," sourced from an LREC record that most
   * likely reflected a later license-type change (e.g. an Associate Broker
   * upgrade), not Dawn's original licensure. Dawn has since directly
   * confirmed she first obtained her Louisiana real-estate license in
   * 1991 — only the year is confirmed (no exact month/day), so the field
   * intentionally holds a year-only value now. `realEstateExperienceStatement`
   * below was updated to the durable "since 1991" phrasing for the same
   * reason: a fixed number like "20+ years" goes stale every year, while
   * "since 1991" does not.
   *
   * 2026-08 CORRECTION: `supervisingBrokerage` previously read "Celestino
   * Investment Group LLC," which Dawn has confirmed is stale. Her current
   * official affiliation, per her own ERA.com agent profile
   * (era.com/agent/detail/la/slidell/agents/dawn-impastato/...), is ERA
   * Top Agent Realty, Slidell, LA. That page was fetched directly and
   * verified to source `supervisingBrokerage`, `sponsoringBrokerCityState`,
   * `sponsoringBrokerOfficeAddress`, `sponsoringBrokerFranchiseStatus`, and
   * `independentlyOwnedAndOperatedDisclosure` below (the profile displays
   * that exact franchise-disclosure sentence). Still NOT shown on that
   * page and left `todo`, per explicit instruction not to guess them:
   *   - `sponsoringBrokerPhone` — no brokerage phone number is shown there.
   *   - `sponsoringBrokerJurisdiction` — almost certainly "Louisiana," but
   *     that page doesn't state a jurisdiction, so it stays unconfirmed
   *     rather than inferred.
   * "ERA Top Agent Realty" is the brokerage's public-facing name, verified
   * as Dawn's *current affiliation* — it is not independently confirmed as
   * the exact character-for-character trade name on file with LREC per
   * §2501(D). Treat `supervisingBrokerage` as "who Dawn is currently with"
   * (safe to state), not yet as "the exact LREC-registered advertising
   * name" (a stricter bar `sponsoringBrokerJurisdiction`/`Phone` share).
   *
   * THRESHOLD QUESTION (still unresolved — this correction did not answer
   * it, and is not a `ComplianceField` since it isn't a fact to fill in):
   * TODO: Does ImpastatoMortgage.com constitute Louisiana real-estate
   * advertising under Chapter 25 merely because it promotes Dawn's
   * real-estate experience as a mortgage-business differentiator (see
   * `realEstateExperienceStatement` below and `brand.experienceHeadline`)?
   * If yes, every page of this site would need broker name/city-state/
   * jurisdiction/phone. If no, the existing /licensing-disclosures-only
   * treatment may remain sufficient. Still requires confirmation from
   * Dawn's sponsoring broker, LREC, or qualified legal/compliance
   * counsel — not something to infer from the rule text alone.
   *
   * FUTURE DESIGN NOTE, once/if the above is confirmed to require
   * every-page display AND the phone/jurisdiction gaps are filled: per
   * site design direction, that disclosure belongs in the existing site
   * footer (ComplianceFooter) as a compact, quiet addition next to the
   * mortgage NMLS summary — never as a hero overlay, popup, nav item, or
   * repeated in-page warning block. Until both conditions are met, none
   * of these fields are wired into the footer or any other site-wide
   * component — only into the dedicated /licensing-disclosures page,
   * which has always carried full real-estate detail regardless of the
   * threshold question above.
   */
  realEstate: {
    licenseeLegalName: confirmed("Dawn Bullard Impastato"),
    licenseType: confirmed("Associate Broker"),
    licenseNumber: confirmed("BROK.73582-ASA"),
    licenseStatus: confirmed("Active"),
    /** Year-only — Dawn has directly confirmed 1991 as when she first obtained her Louisiana real-estate license; no exact month/day is confirmed. See the correction note above. */
    firstIssueDate: confirmed("1991"),
    /**
     * The current sponsoring brokerage, per Dawn's own ERA.com agent
     * profile (verified 2026-08). This is a real-estate relationship — do
     * not imply it is affiliated with Dawn's mortgage company (Argent
     * Lending LLC) unless separately verified.
     */
    supervisingBrokerage: confirmed("ERA Top Agent Realty"),
    /** LREC §2501(F)/§2515: a brokerage-owned phone number, not Dawn's. Not shown on the verified ERA profile — do not guess. */
    sponsoringBrokerPhone: todo<string>(),
    /** LREC §2515: city and state of the broker's main or branch office. Verified via Dawn's ERA.com profile. */
    sponsoringBrokerCityState: confirmed("Slidell, Louisiana"),
    /** Full street address of the sponsoring broker's office, per the verified ERA.com profile. Not itself an LREC minimum (city/state is), but more complete for the full licensing-disclosures page. */
    sponsoringBrokerOfficeAddress: confirmed("1846 Front St, Slidell, LA 70458"),
    /** LREC §2515: the regulatory jurisdiction(s) the broker is licensed in. Not stated on the verified ERA profile — do not guess, even though "Louisiana" is likely. */
    sponsoringBrokerJurisdiction: todo<string>(),
    /** LREC §2509: whether the sponsoring brokerage is a franchise. Confirmed true — ERA is a national real-estate franchise, and the office's own profile displays the standard franchise disclosure below. */
    sponsoringBrokerFranchiseStatus: confirmed(true),
    /** LREC §2509: the exact franchise disclosure sentence, verified verbatim on the ERA.com profile itself. Only meaningful — and only ever rendered — when sponsoringBrokerFranchiseStatus is confirmed true. */
    independentlyOwnedAndOperatedDisclosure: confirmed("Each office is independently owned and operated."),
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
   * Real-estate experience statement used in marketing copy. Sourced
   * directly from Dawn's confirmed license first-issue year (1991, see
   * `realEstate.firstIssueDate` above). Uses durable "since 1991" wording
   * rather than a recalculated year count (e.g. "35 years") so it never
   * goes stale with the calendar. This is a REAL-ESTATE licensing fact
   * only — it must never be presented as, or blended with, mortgage
   * origination experience.
   */
  realEstateExperienceStatement: confirmed(
    "Licensed in Louisiana real estate since 1991"
  ),

  /**
   * Year/date Dawn was first licensed as a mortgage loan originator
   * (distinct from her real-estate license above — must never be assumed
   * equal to it, and must never be inferred from it). Remains `todo`
   * because no authoritative licensing source in this project confirms a
   * first-licensed mortgage date. Do NOT fill this in with a guess (e.g.
   * "2022") — leave it `todo` until Dawn or an authoritative NMLS/state
   * record confirms it.
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
