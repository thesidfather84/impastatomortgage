import { CtaButton } from "./CtaButton";
import { ARGENT_APPLICATION_URL } from "@/config/application";

/**
 * Reusable "Start Your Secure Application" handoff. Always links to
 * Dawn's verified Argent Lending application portal (ARGENT_APPLICATION_URL)
 * and nothing else — this component never collects any application data
 * itself. Opens in a new tab so a visitor never loses their place on this
 * site (e.g. mid-calculator).
 */
export function ApplicationCta({
  className,
  note,
  compact = false,
}: {
  className?: string;
  /** Extra clarifying line appended after the standard "you'll continue on Argent's system" note — e.g. a HECM-specific eligibility disclaimer. */
  note?: string;
  /** Smaller, quieter treatment for use beneath calculator results, where this must read as a secondary, optional link — never as dominant as the results themselves. */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className={className}>
        <CtaButton href={ARGENT_APPLICATION_URL} variant="secondary" size="md" newTab>
          Start Your Secure Application →
        </CtaButton>
        <p className="mt-2 text-xs leading-relaxed text-cypress-600">
          You&apos;ll continue on Argent Lending&apos;s secure application system.
          {note ? ` ${note}` : ""}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-display text-xl font-semibold text-cypress-900 sm:text-2xl">
        Ready to move forward?
      </p>
      <p className="mt-2 max-w-xl text-cypress-700">
        Continue to Dawn&apos;s secure Argent Lending application portal.
      </p>
      <div className="mt-5">
        <CtaButton href={ARGENT_APPLICATION_URL} variant="featured" size="lg" newTab>
          Start Your Secure Application →
        </CtaButton>
      </div>
      <p className="mt-4 max-w-xl text-sm text-cypress-600">
        You&apos;ll continue on Argent Lending&apos;s secure application system.
        {note ? ` ${note}` : ""}
      </p>
    </div>
  );
}
