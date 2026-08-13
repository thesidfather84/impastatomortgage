import Link from "next/link";
import { ContactButtonRow } from "@/components/ui/ContactButtons";
import { DawnMonogram } from "./DawnMonogram";
import type { ConversationMessage } from "./AskDawnProvider";

export function AskDawnMessageBubble({ message }: { message: ConversationMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-cypress-800 px-4 py-2 text-sm text-ivory">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.kind === "escalation") {
    return (
      <div className="flex items-start gap-2.5">
        <DawnMonogram className="mt-0.5" />
        <div className="flex flex-1 flex-col gap-2">
          <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-burgundy-500/20 bg-burgundy-500/10 px-4 py-2 text-sm text-burgundy-600">
            {message.text}
          </p>
          <ContactButtonRow />
        </div>
      </div>
    );
  }

  if (message.kind === "trivia") {
    return (
      <div className="flex items-start gap-2.5">
        <DawnMonogram className="mt-0.5" />
        <div className="flex flex-1 flex-col gap-2">
          {message.intro && (
            <p className="text-xs italic text-burgundy-500/80">{message.intro}</p>
          )}
          <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-brass-400/25 bg-ivory-deep px-4 py-3 text-sm text-charcoal-900">
            <p>{message.text}</p>
            <p className="mt-2 text-xs text-cypress-700">
              Source:{" "}
              <a
                href={message.fact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cypress-800"
              >
                {message.fact.sourceTitle}
              </a>
            </p>
          </div>
          {message.more && (
            <p className="text-xs italic text-cypress-700">{message.more}</p>
          )}
        </div>
      </div>
    );
  }

  if (message.kind === "answer") {
    return (
      <div className="flex items-start gap-2.5">
        <DawnMonogram className="mt-0.5" />
        <div className="flex flex-1 flex-col gap-2">
          {message.intro && (
            <p className="text-xs italic text-burgundy-500/80">{message.intro}</p>
          )}
          <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-brass-400/25 bg-ivory-deep px-4 py-3 text-sm text-charcoal-900">
            <p>{message.text}</p>
            {message.item.escalationRequired && (
              <p className="mt-2 text-xs italic text-cypress-700">
                This is general education, not individual advice. Talk with
                Dawn about your specific situation.
              </p>
            )}
          </div>
          {message.item.relatedLinks && message.item.relatedLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.item.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-brass-400/40 px-3 py-1 text-xs font-medium text-cypress-700 hover:bg-brass-100/40"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
          {message.item.escalationRequired && <ContactButtonRow />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <DawnMonogram className="mt-0.5" />
      <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-brass-400/25 bg-ivory-deep px-4 py-2 text-sm italic text-charcoal-900">
        {message.text}
      </p>
    </div>
  );
}
