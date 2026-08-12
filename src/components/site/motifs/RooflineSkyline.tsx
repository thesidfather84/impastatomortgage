/**
 * A low silhouette of New Orleans rooflines — shotgun houses, a Creole
 * cottage gable, chimneys, and a hint of a balcony rail — used along the
 * base of the hero to suggest a streetscape without needing a photograph.
 */
export function RooflineSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M0 220V150l60-38h90l40 24V90l70-46 70 46v70l50-30h80l45 28v-50l90-52 90 52v56l40-24h100l55 34v10l60-38h90l40 24v20l70-40 70 40v14l60-30h90l55 30v10l70-36h100l50 28V220Z"
      />
      <g opacity="0.55">
        <rect x="118" y="70" width="10" height="30" />
        <rect x="470" y="46" width="10" height="34" />
        <rect x="905" y="60" width="10" height="26" />
        <rect x="1180" y="72" width="10" height="24" />
      </g>
    </svg>
  );
}
