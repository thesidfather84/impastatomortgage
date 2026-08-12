import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { compliance } from "@/config/compliance";
import { AskDawnHeroButton } from "@/components/ask-dawn/AskDawnHeroButton";
import { HeritageSeal } from "./motifs/HeritageSeal";
import { LiveOak } from "./motifs/LiveOak";
import { RooflineSkyline } from "./motifs/RooflineSkyline";
import { WroughtIronRail } from "./motifs/WroughtIronRail";

export function Hero() {
  const nmlsId = compliance.mortgage.loanOriginatorNmlsId;

  return (
    <section
      className="relative overflow-hidden text-ivory"
      style={{
        backgroundImage: [
          "radial-gradient(120% 60% at 50% 105%, rgba(199,160,74,0.32) 0%, rgba(146,73,44,0.24) 32%, transparent 62%)",
          "linear-gradient(180deg, #34140f 0%, #24100c 42%, #1a2014 78%, #17150f 100%)",
        ].join(", "),
      }}
    >
      {/* Live oak, anchoring the right side of the composition */}
      <LiveOak className="pointer-events-none absolute -right-16 top-6 h-[280px] w-[420px] text-cypress-800/30 sm:h-[360px] sm:w-[560px] lg:-right-10 lg:top-2" />

      <div className="relative mx-auto max-w-6xl px-4 pb-0 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <WroughtIronRail className="mb-8 h-4 w-44 text-brass-400/70" />

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brass-200/90">
          {brand.taglineAlternate}
        </p>

        <h1 className="max-w-2xl font-display text-[2.6rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
          Every Chapter.
          <br />
          Every Home.
          <br />
          <span className="text-brass-200">One Trusted Guide.</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg text-ivory/80">{brand.heroSupportingCopy}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={contact.phoneHref}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-brass-400 px-7 py-3.5 font-display text-lg font-semibold text-charcoal-900 transition-colors hover:bg-brass-300"
          >
            Talk to Dawn
          </a>
          <AskDawnHeroButton />
        </div>

        <p className="mt-6 text-sm text-ivory/60">
          Or call directly:{" "}
          <a href={contact.phoneHref} className="font-semibold text-brass-200 hover:text-brass-100">
            {contact.phoneDisplay}
          </a>
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
          <HeritageSeal className="border-brass-300/60" />
          <p className="text-xs uppercase tracking-[0.2em] text-ivory/45">
            {brand.ownerName}
            {nmlsId.status === "confirmed" && (
              <>
                {" "}
                &middot; NMLS #{nmlsId.value}
              </>
            )}
          </p>
        </div>

        {/* New Orleans streetscape silhouette anchoring the base of the hero */}
        <div className="relative mt-14 h-24 sm:h-28 lg:h-36">
          <RooflineSkyline className="absolute inset-x-0 bottom-0 h-full w-full text-cypress-900/70" />
        </div>
      </div>
    </section>
  );
}
