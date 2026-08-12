import { brand } from "@/config/brand";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { CallDawnButton, TextDawnButton } from "@/components/ui/ContactButtons";
import { AskDawnHeroButton } from "@/components/ask-dawn/AskDawnHeroButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cypress-900 text-ivory">
      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-brass-500/10"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M100 20c8 18 6 32-2 40 14-4 28 2 34 16-16-4-28 2-32 14 14-8 30-4 38 8-16 0-28 10-32 24 12-10 28-10 38 0-14 4-24 16-24 30h-40c0-14-10-26-24-30 10-10 26-10 38 0-4-14-16-24-32-24 8-12 24-16 38-8-4-12-16-18-32-14 6-14 20-20 34-16-8-8-10-22-2-40Z"
        />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 inline-block rounded-full border border-brass-400/50 bg-brass-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-brass-100">
            {brand.experienceHeadline}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Every Chapter.
            <br />
            Every Home.
            <br />
            One Trusted Guide.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ivory/85 sm:text-xl">
            {brand.heroSupportingCopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CallDawnButton size="lg" />
            <TextDawnButton size="lg" variant="outline-light" />
            <AskDawnHeroButton />
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs lg:max-w-none">
          <PortraitPlaceholder />
        </div>
      </div>
    </section>
  );
}
