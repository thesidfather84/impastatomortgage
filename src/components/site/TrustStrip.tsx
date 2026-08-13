import { HeritageSeal } from "./motifs/HeritageSeal";
import { compliance } from "@/config/compliance";
import { brand } from "@/config/brand";

const ICON_PATHS: Record<string, string> = {
  lamp: "M9 3h6l-1 4h-4L9 3Z M7 7h10v8a5 5 0 0 1-10 0V7Z M12 20v1M9.5 21h5",
  fleur: "M12 2c-.6 2-1.8 3.2-3.4 3.9C7.3 4.7 5.6 4.2 4 4.6c.6 2.1 2.2 3.5 4.2 4-1.3.5-2.6.4-3.7-.3C4.9 10.5 6.6 11.6 8.6 12c-.9 1.6-2.5 2.6-4.6 2.6 1.4 1.6 3.5 2.2 5.6 1.7-.3 1.2-.9 2.2-1.8 2.9h8.4c-.9-.7-1.5-1.7-1.8-2.9 2.1.5 4.2-.1 5.6-1.7-2.1 0-3.7-1-4.6-2.6 2-.4 3.7-1.5 4.1-3.7-1.1.7-2.4.8-3.7.3 2-.5 3.6-1.9 4.2-4-1.6-.4-3.3.1-4.6 1.3C13.8 5.2 12.6 4 12 2Z",
  balcony: "M4 21V9l8-5 8 5v12 M4 21h16 M8 21v-6h8v6 M6 9.5h12",
  trumpet: "M2.5 11.5v1.5h3.5l11 3.5v-9.5l-11 3.5H2.5Z M14 8.5v8 M17 9.5v6",
};

function ValueIcon({ type, className }: { type: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      {ICON_PATHS[type].split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : `M${seg}`} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

const values = [
  { icon: "lamp", title: "Local Knowledge", line: "Louisiana neighborhoods. Real guidance." },
  { icon: "fleur", title: "Italian Heritage", line: "Family. Honesty. Hard work." },
  { icon: "balcony", title: "New Orleans Spirit", line: "Resilience. Community. A better way home." },
  { icon: "trumpet", title: "Here For You", line: "Clear answers. Personal service." },
];

export function TrustStrip() {
  const nmls = compliance.mortgage.loanOriginatorNmlsId;

  return (
    <section className="bg-burgundy-800 py-12 text-ivory sm:py-14 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <HeritageSeal className="h-28 w-28 shrink-0 border-brass-300/60" />
          <div>
            <p className="font-display text-xl italic text-brass-100">{brand.ownerName}</p>
            {nmls.status === "confirmed" && (
              <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-ivory/55">NMLS #{nmls.value}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:items-center">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
            >
              <ValueIcon type={v.icon} className="h-7 w-7 text-brass-300" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-200">{v.title}</p>
              <p className="max-w-[11rem] text-sm text-ivory/75">{v.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
