import { contact } from "@/config/contact";
import { FleurDeLis } from "./motifs/FleurDeLis";

export function TopUtilityBar() {
  return (
    <div className="bg-cypress-900 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs tracking-wide sm:px-6 lg:px-8">
        <p className="flex items-center gap-1.5 font-medium text-brass-100/90">
          <FleurDeLis className="h-3 w-3 text-brass-400" />
          Proudly Serving Louisiana
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href={contact.phoneHref} className="font-semibold text-ivory/90 hover:text-brass-200">
            Call Dawn
          </a>
          <span className="text-ivory/25">|</span>
          <a href={contact.smsHref} className="font-semibold text-ivory/90 hover:text-brass-200">
            Text Dawn
          </a>
        </div>
      </div>
    </div>
  );
}
