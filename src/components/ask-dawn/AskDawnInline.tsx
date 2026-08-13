"use client";

import { useEffect, useRef, useState } from "react";
import { useAskDawn } from "./AskDawnProvider";
import { AskDawnMessageBubble } from "./AskDawnMessageBubble";
import { VoiceInputButton } from "./VoiceInputButton";
import { DawnMonogram } from "./DawnMonogram";
import { poolOptions } from "@/content/ask-dawn/personality";
import { LAGNIAPPE_TRIGGER_TEXT } from "@/lib/ask-dawn/trivia";

// A single fixed line (not randomized) so server and client render the
// same idle placeholder with no hydration mismatch.
const IDLE_GREETING = poolOptions("greeting")[0];

const EXAMPLE_QUESTIONS = [
  "What is a reverse mortgage?",
  "How much house can I afford?",
  "What's FHA?",
  "I'm helping my parents.",
  "Can I refinance?",
  "What is closing cost?",
  "I don't understand APR.",
];

export function AskDawnInline() {
  const { messages, askQuestion } = useAskDawn();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    askQuestion(input);
    setInput("");
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-brass-400/40 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-brass-400/30 bg-burgundy-800 px-5 py-4">
        <DawnMonogram className="h-10 w-10 text-base" />
        <div>
          <p className="font-display text-lg font-semibold text-ivory">Ask Dawn</p>
          <p className="text-xs italic text-ivory/60">
            Mortgages don&apos;t have to sound like alphabet soup.
          </p>
        </div>
      </div>

      <div ref={listRef} className="max-h-[50vh] min-h-[280px] space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <p className="text-sm italic text-cypress-700">{IDLE_GREETING}</p>
        )}
        {messages.map((message) => (
          <AskDawnMessageBubble key={message.id} message={message} onAskQuestion={askQuestion} />
        ))}

        <div className="flex flex-wrap gap-2 pt-2">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => askQuestion(q)}
              className="rounded-full border border-brass-400/50 bg-brass-100/40 px-3 py-1.5 text-xs font-medium text-cypress-700 hover:bg-brass-100"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <p className="border-t border-cypress-100 px-5 pt-3 text-center text-xs leading-snug text-cypress-600">
        General info only — not a loan approval or live rates. Talk with
        Dawn about your specific situation.
      </p>

      <div className="px-5 pt-3">
        <button
          type="button"
          onClick={() => askQuestion(LAGNIAPPE_TRIGGER_TEXT)}
          className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-brass-400/50 bg-brass-100/40 px-4 text-sm font-medium text-cypress-700 hover:bg-brass-100"
        >
          🎲 Random Louisiana fact
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
        <VoiceInputButton />
        <label htmlFor="ask-dawn-inline-input" className="sr-only">
          Type your question
        </label>
        <input
          id="ask-dawn-inline-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to know?"
          className="min-h-[44px] flex-1 rounded-md border border-cypress-100 px-3 text-base text-charcoal-900 placeholder:text-cypress-400 focus-visible:outline-brass-500"
        />
        <button
          type="submit"
          className="flex min-h-[44px] items-center justify-center rounded-md bg-brass-500 px-5 text-sm font-semibold text-charcoal-900 hover:bg-brass-600"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
