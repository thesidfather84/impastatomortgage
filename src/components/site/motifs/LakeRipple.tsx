export function LakeRipple({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      preserveAspectRatio="none"
    >
      <path d="M0 8c20 8 40-8 60 0s40 8 60 0 40-8 60 0 40 8 60 0" />
      <path d="M0 20c20 8 40-8 60 0s40 8 60 0 40-8 60 0 40 8 60 0" opacity="0.6" />
      <path d="M0 32c20 8 40-8 60 0s40 8 60 0 40-8 60 0 40 8 60 0" opacity="0.35" />
    </svg>
  );
}
