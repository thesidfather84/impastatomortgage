import Link from "next/link";
import { ContactButtonRow } from "@/components/ui/ContactButtons";
import type { ConversationMessage } from "./AskDawnProvider";

export function AskDawnMessageBubble({ message }: { message: ConversationMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-cypress-600 px-4 py-2 text-sm text-ivory">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.kind === "escalation") {
    return (
      <div className="flex flex-col gap-2">
        <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-burgundy-500/10 px-4 py-2 text-sm text-burgundy-600">
          {message.text}
        </p>
        <ContactButtonRow className="pl-1" />
      </div>
    );
  }

  if (message.kind === "answer") {
    return (
      <div className="flex flex-col gap-2">
        <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-cypress-50 px-4 py-3 text-sm text-charcoal-900">
          <p>{message.text}</p>
          {message.item.escalationRequired && (
            <p className="mt-2 text-xs italic text-cypress-700">
              This is general education, not individual advice. Talk with
              Dawn about your specific situation.
            </p>
          )}
        </div>
        {message.item.relatedLinks && message.item.relatedLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {message.item.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-cypress-100 px-3 py-1 text-xs font-medium text-cypress-700 hover:bg-cypress-50"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        )}
        {message.item.escalationRequired && (
          <ContactButtonRow className="pl-1" />
        )}
      </div>
    );
  }

  return (
    <div className="flex">
      <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-cypress-50 px-4 py-2 text-sm text-charcoal-900">
        {message.text}
      </p>
    </div>
  );
}
