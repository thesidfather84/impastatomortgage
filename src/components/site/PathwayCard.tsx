import Link from "next/link";
import type { Pathway } from "@/config/pathways";
import { PathwayIcon } from "./PathwayIcon";
import { cn } from "@/lib/cn";

export function PathwayCard({ pathway, accent = false }: { pathway: Pathway; accent?: boolean }) {
  return (
    <Link
      href={pathway.href}
      className={cn(
        "group flex min-h-[120px] flex-col justify-between rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md",
        accent
          ? "border-brass-400 bg-brass-100/40 hover:bg-brass-100/70"
          : "border-cypress-100 bg-white hover:border-brass-400"
      )}
    >
      <PathwayIcon
        icon={pathway.icon}
        className={cn("h-8 w-8", accent ? "text-brass-600" : "text-cypress-600")}
      />
      <div className="mt-4">
        <p className="font-display text-lg font-semibold text-cypress-900 group-hover:text-brass-600">
          {pathway.title}
        </p>
        <p className="text-sm text-cypress-700">{pathway.subtitle}</p>
      </div>
    </Link>
  );
}
