/**
 * A wide, low live-oak canopy silhouette — the sprawling asymmetric shape
 * that reads instantly as Southeast Louisiana. Filled shape, single color.
 */
export function LiveOak({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M200 190v-46M200 144c-30-4-48-24-46-46M200 144c26-2 46-20 46-42M170 108c-18 4-34-6-38-22M234 104c16 4 30-8 34-22M150 88c-14-2-24-14-22-28M256 86c12-2 20-14 18-26"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 108c-6-30 16-56 46-58 6-24 30-40 56-36 10-22 34-34 58-28 22-18 54-14 70 8 26-2 50 16 54 42 20 8 32 30 26 52-6 24-30 38-54 34-14 18-40 24-60 12-18 14-44 12-60-4-20 10-44 4-56-14-24 6-48-6-56-28-24 2-44-14-24-38Z"
      />
    </svg>
  );
}
