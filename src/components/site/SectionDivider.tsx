import { WroughtIronRail } from "./motifs/WroughtIronRail";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center py-2 text-brass-500/70 ${className ?? ""}`}>
      <WroughtIronRail className="h-4 w-40" />
    </div>
  );
}
