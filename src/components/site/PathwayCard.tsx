import Link from "next/link";
import type { Pathway } from "@/config/pathways";
import { PathwayIcon } from "./PathwayIcon";
import { cn } from "@/lib/cn";

const TONES = [
  "bg-tomato-800",
  "bg-cypress-800",
  "bg-burgundy-800",
  "bg-tomato-700",
  "bg-cypress-900",
  "bg-burgundy-600",
];

export function PathwayCard({ pathway, index }: { pathway: Pathway; index: number }) {
  return (
    <Link
      href={pathway.href}
      className={cn(
        "group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-sm p-8 text-ivory transition-transform hover:-translate-y-1",
        TONES[index % TONES.length]
      )}
    >
      <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-white/10">
        0{index + 1}
      </span>

      <PathwayIcon icon={pathway.icon} className="h-9 w-9 text-brass-300" />

      <div className="mt-8">
        <p className="font-display text-[1.75rem] font-semibold leading-snug">{pathway.title}</p>
        <p className="mt-2.5 text-base italic text-ivory/70">{pathway.line}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-300 opacity-0 transition-opacity group-hover:opacity-100">
          Explore
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
