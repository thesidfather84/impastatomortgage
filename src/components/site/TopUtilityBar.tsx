import { contact } from "@/config/contact";
import { TextSizeControl } from "@/components/accessibility/TextSizeControl";
import { ReadThisPage } from "@/components/accessibility/ReadThisPage";
import { ScheduleConversationButton } from "./ScheduleConversationButton";
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
          <span className="hidden text-ivory/25 sm:inline">|</span>
          <a href={contact.smsHref} className="hidden font-semibold text-ivory/90 hover:text-brass-200 sm:inline">
            Text Dawn
          </a>
          <span className="hidden text-ivory/25 sm:inline">|</span>
          <ScheduleConversationButton className="hidden sm:block" />
          <div className="flex items-center gap-3 border-l border-ivory/15 pl-4">
            <ReadThisPage />
            <TextSizeControl />
          </div>
        </div>
      </div>
    </div>
  );
}
