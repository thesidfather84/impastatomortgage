import { CtaButton } from "@/components/ui/CtaButton";
import { LiveOak } from "./motifs/LiveOak";
import { WroughtIronRail } from "./motifs/WroughtIronRail";

// Illustrative preview only — deliberately placeholder digits ("X"), never
// a real or example dollar figure, matching the same convention used on
// the homepage's Home Payment Explorer teaser.
const PREVIEW_ROWS = ["Maximum Claim Amount", "Principal Limit Factor", "Mandatory obligations"];

/**
 * The Reverse Mortgage page's primary discovery point for Dawn's Home
 * Equity Explorer — placed high on that page (right after its hero), not
 * buried under Resources.
 */
export function HomeEquityExplorerBanner() {
  return (
    <section className="relative overflow-hidden bg-ivory-deep py-20 lg:py-24">
      <LiveOak className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-72 text-olive-500/[0.06]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <WroughtIronRail className="h-3 w-32 text-brass-500/70" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brass-600">
            Dawn&apos;s Home Equity Explorer
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl lg:text-[2.75rem]">
            See what your home could make possible in retirement.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-cypress-700">
            Using HUD&apos;s own published HECM rules, get a real starting
            estimate — your Maximum Claim Amount, Principal Limit Factor,
            and mandatory obligations — instantly, with no sign-in and no
            contact information required.
          </p>
          <div className="mt-8">
            <CtaButton href="/calculators/home-equity" variant="featured" size="lg">
              Explore My Home Equity →
            </CtaButton>
          </div>
        </div>

        {/* Illustrative preview card — mirrors the real calculator's
            results panel styling, no real numbers. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-brass-400/40 bg-white p-6 shadow-lg sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-cypress-600">
              Estimated net principal limit
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-tomato-600">$X,XXX,XXX</p>

            <div className="mt-5 space-y-2.5 border-t border-cypress-100 pt-4 text-sm">
              {PREVIEW_ROWS.map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brass-500" />
                  <span className="text-cypress-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
