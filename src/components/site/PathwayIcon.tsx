import type { Pathway } from "@/config/pathways";

const PATHS: Record<Pathway["icon"], string> = {
  home: "M4 11.5 12 4l8 7.5M6 10v9h12v-9",
  "arrow-down": "M12 4v14m0 0-5-5m5 5 5-5",
  sunset: "M4 16h16M6.5 16a5.5 5.5 0 0 1 11 0M12 6v4M8.5 8.5l1.4 1.4M15.5 8.5l-1.4 1.4",
  move: "M4 12h16m0 0-4-4m4 4-4 4",
  family: "M8 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-2.8 2.2-5 5-5s5 2.2 5 5M11 20c0-2.8 2.2-5 5-5s5 2.2 5 5",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-2 5-5 2 2-5 5-2Z",
  bridge: "M3 15h18M6 15V9m12 6V9M3 9c3-2 15-2 18 0M9 15v3M15 15v3",
};

export function PathwayIcon({ icon, className }: { icon: Pathway["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[icon]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
