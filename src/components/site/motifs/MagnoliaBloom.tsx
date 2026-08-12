export function MagnoliaBloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3">
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x = 30 + Math.cos(angle) * 16;
        const y = 30 + Math.sin(angle) * 16;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="9"
            ry="15"
            transform={`rotate(${i * 60} ${x} ${y})`}
          />
        );
      })}
      <circle cx="30" cy="30" r="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
