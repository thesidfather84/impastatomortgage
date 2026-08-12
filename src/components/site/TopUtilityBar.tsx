import { contact } from "@/config/contact";
import { TextSizeControl } from "@/components/accessibility/TextSizeControl";
import { ReadThisPage } from "@/components/accessibility/ReadThisPage";
import { ScheduleConversationButton } from "./ScheduleConversationButton";

export function TopUtilityBar() {
  return (
    <div className="bg-cypress-900 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <p className="font-medium tracking-wide">Proudly Serving Louisiana</p>

        <div className="flex flex-wrap items-center gap-4">
          <a href={contact.phoneHref} className="font-semibold underline-offset-2 hover:underline">
            Call Dawn
          </a>
          <a href={contact.smsHref} className="font-semibold underline-offset-2 hover:underline">
            Text Dawn
          </a>
          <ScheduleConversationButton className="hidden sm:block" />
          <div className="flex items-center gap-3 border-l border-ivory/20 pl-4">
            <ReadThisPage />
            <TextSizeControl />
          </div>
        </div>
      </div>
    </div>
  );
}
