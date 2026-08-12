/**
 * A repeating French Quarter balcony-rail scroll pattern, used as a thin
 * decorative divider strip between sections.
 */
export function WroughtIronRail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0" y1="4" x2="240" y2="4" />
      <line x1="0" y1="20" x2="240" y2="20" />
      {Array.from({ length: 8 }).map((_, i) => {
        const cx = 15 + i * 30;
        return (
          <g key={cx}>
            <line x1={cx} y1="4" x2={cx} y2="20" />
            <circle cx={cx} cy="12" r="4.5" />
            <path d={`M${cx - 9} 12a9 9 0 0 1 18 0`} />
          </g>
        );
      })}
    </svg>
  );
}
