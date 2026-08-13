"use client";

import { useEffect, useRef, useState } from "react";
import { useAskDawn } from "./AskDawnProvider";
import { AskDawnMessageBubble } from "./AskDawnMessageBubble";
import { VoiceInputButton } from "./VoiceInputButton";
import { DawnMonogram } from "./DawnMonogram";
import { MusicToggle } from "./MusicToggle";
import { LAGNIAPPE_TRIGGER_TEXT } from "@/lib/ask-dawn/trivia";

const EXAMPLE_QUESTIONS = [
  "What is a reverse mortgage?",
  "What is closing cost?",
  "I'm helping my parents.",
  "What's FHA?",
];

export function AskDawnPanel() {
  const { close, messages, askQuestion } = useAskDawn();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    askQuestion(input);
    setInput("");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ask Dawn"
      className="fixed inset-x-0 bottom-0 z-50 flex h-[75vh] max-h-[560px] w-full flex-col rounded-t-2xl border border-brass-400/40 bg-ivory shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[480px] sm:w-[350px] sm:rounded-2xl"
    >
      <header className="flex items-center justify-between gap-2 rounded-t-2xl border-b border-brass-400/30 bg-burgundy-800 px-4 py-3.5 sm:rounded-t-2xl">
        <div className="flex items-center gap-3">
          <DawnMonogram className="h-9 w-9 text-base" />
          <div>
            <p className="font-display text-base font-semibold text-ivory">Ask Dawn</p>
            <p className="text-xs italic text-ivory/60">
              Mortgages don&apos;t have to sound like alphabet soup.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close Ask Dawn"
          className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md text-ivory hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="text-sm italic text-cypress-700">Ask a question to get started.</p>
        )}
        {messages.map((message) => (
          <AskDawnMessageBubble key={message.id} message={message} onAskQuestion={askQuestion} />
        ))}

        {messages.length <= 1 && (
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
        )}
      </div>

      <p className="border-t border-cypress-100 px-3 pt-2 text-center text-[11px] leading-snug text-cypress-600">
        General info only — not a loan approval or live rates. Talk with
        Dawn about your specific situation.
      </p>

      <div className="flex justify-center px-3 pt-1.5">
        <MusicToggle />
      </div>

      <div className="px-3 pt-2">
        <button
          type="button"
          onClick={() => askQuestion(LAGNIAPPE_TRIGGER_TEXT)}
          className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full border border-brass-400/50 bg-brass-100/40 px-4 text-sm font-medium text-cypress-700 hover:bg-brass-100"
        >
          🎲 Random Louisiana fact
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
        <VoiceInputButton />
        <label htmlFor="ask-dawn-input" className="sr-only">
          Type your question
        </label>
        <input
          ref={inputRef}
          id="ask-dawn-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to know?"
          className="min-h-[44px] flex-1 rounded-md border border-cypress-100 px-3 text-sm text-charcoal-900 placeholder:text-cypress-400 focus-visible:outline-brass-500"
        />
        <button
          type="submit"
          className="flex min-h-[44px] items-center justify-center rounded-md bg-brass-500 px-4 text-sm font-semibold text-charcoal-900 hover:bg-brass-600"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
