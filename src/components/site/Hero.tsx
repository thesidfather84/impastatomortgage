import Image from "next/image";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { AskDawnHeroButton } from "@/components/ask-dawn/AskDawnHeroButton";
import { WroughtIronRail } from "./motifs/WroughtIronRail";

const HERO_IMAGE_SRC = "/images/impastato-new-orleans-hero.png";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden text-ivory lg:min-h-[720px]">
      <Image
        src={HERO_IMAGE_SRC}
        alt="A New Orleans street at dusk — live oak and Spanish moss framing a lamplit view of St. Louis Cathedral and a wrought-iron balcony."
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_45%] sm:object-[58%_45%] lg:object-[50%_42%]"
      />

      {/* Dark gradient concentrated on the left for text legibility — the
          right side (cathedral, lit balcony) stays comparatively bright. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(90deg, rgba(23,14,10,0.92) 0%, rgba(23,14,10,0.72) 32%, rgba(23,14,10,0.28) 58%, rgba(23,14,10,0.05) 78%)",
            "linear-gradient(0deg, rgba(23,14,10,0.55) 0%, rgba(23,14,10,0) 30%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <WroughtIronRail className="mb-6 h-3.5 w-40 text-brass-400/70" />

        <p className="mb-4 font-display text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-brass-200">
          Louisiana Roots.
          <br />
          Italian Heritage.
        </p>

        <h1 className="max-w-2xl font-display text-[2.5rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.3rem]">
          Every Chapter.
          <br />
          Every Home.
          <br />
          <span className="text-brass-200">One Trusted Guide.</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg text-ivory/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          {brand.heroSupportingCopy}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={contact.phoneHref}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-brass-400 px-7 py-3.5 font-display text-lg font-semibold text-charcoal-900 transition-colors hover:bg-brass-300"
          >
            Talk to Dawn
          </a>
          <AskDawnHeroButton variant="filled" />
        </div>

        <p className="mt-5 text-sm text-ivory/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          Or call directly:{" "}
          <a href={contact.phoneHref} className="font-semibold text-brass-200 hover:text-brass-100">
            {contact.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
