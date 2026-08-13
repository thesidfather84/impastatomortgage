import { CtaButton } from "@/components/ui/CtaButton";
import { WroughtIronRail } from "./motifs/WroughtIronRail";
import { RooflineSkyline } from "./motifs/RooflineSkyline";

// Illustrative preview only — deliberately placeholder digits ("X"), never
// a real or example dollar figure, so nothing on the homepage can be
// mistaken for a quote, rate, or estimate before a visitor has entered
// their own numbers on the actual calculator.
const PREVIEW_ROWS = [
  { label: "Principal & interest", swatch: "bg-tomato-500" },
  { label: "Taxes & insurance", swatch: "bg-brass-500" },
  { label: "PMI & HOA", swatch: "bg-cypress-400" },
];

export function HomePaymentExplorerBanner() {
  return (
    <section className="relative overflow-hidden bg-ivory-deep py-20 lg:py-24">
      <RooflineSkyline
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-brass-400/[0.07]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <WroughtIronRail className="h-3 w-32 text-brass-500/70" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brass-600">
            Dawn&apos;s Home Payment Explorer
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-cypress-900 sm:text-4xl lg:text-[2.75rem]">
            See the real monthly picture.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-cypress-700">
            Most calculators only show you principal and interest. This one
            adds the costs people forget — taxes, insurance, PMI, and HOA —
            so you see the full monthly picture before you fall in love
            with a house.
          </p>
          <div className="mt-8">
            <CtaButton href="/calculators/home-payment" variant="featured" size="lg">
              Explore Your Payment →
            </CtaButton>
          </div>
        </div>

        {/* Illustrative preview card — mirrors the real calculator's
            results panel styling so it reads as "a peek inside the tool,"
            not a generic calculator-ad graphic. No real numbers appear. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-brass-400/40 bg-white p-6 shadow-lg sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-cypress-600">
              Estimated monthly payment
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-tomato-600">
              $X,XXX<span className="text-base font-medium text-cypress-600"> /mo</span>
            </p>

            <div
              aria-hidden="true"
              className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-cypress-100"
            >
              <span className="w-[55%] bg-tomato-500" />
              <span className="w-[25%] bg-brass-500" />
              <span className="w-[20%] bg-cypress-400" />
            </div>

            <div className="mt-5 space-y-2.5 border-t border-cypress-100 pt-4 text-sm">
              {PREVIEW_ROWS.map((row) => (
                <div key={row.label} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${row.swatch}`} />
                  <span className="text-cypress-700">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
