"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";
import { findBestMatch } from "@/lib/ask-dawn/match";
import { greeting, escalation, getAnswerIntro, pickEasterEggLine } from "@/content/ask-dawn/personality";
import { ASK_DAWN_EASTER_EGG_EVENT, ASK_DAWN_OPEN_EVENT } from "./events";
import type { KnowledgeItem } from "@/content/ask-dawn/types";

export type ConversationMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; kind: "answer"; text: string; intro: string; item: KnowledgeItem }
  | { id: string; role: "assistant"; kind: "escalation"; text: string }
  | { id: string; role: "assistant"; kind: "system"; text: string };

type AskDawnContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggleOpen: () => void;
  messages: ConversationMessage[];
  askQuestion: (question: string) => void;
  openWithQuestion: (question: string) => void;
};

const AskDawnContext = createContext<AskDawnContextValue | null>(null);

let messageIdCounter = 0;
function nextId() {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
}

export function AskDawnProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const greeted = useRef(false);

  const ensureGreeting = useCallback(() => {
    if (greeted.current) return;
    greeted.current = true;
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "assistant", kind: "system", text: greeting },
    ]);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    ensureGreeting();
  }, [ensureGreeting]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) ensureGreeting();
      return !prev;
    });
  }, [ensureGreeting]);

  const askQuestion = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);

    const match = findBestMatch(trimmed, knowledgeBase);

    if (match) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          kind: "answer",
          // The factual text is always exactly the approved-answer string —
          // the personality intro is a separate field, never merged in.
          text: match.item.approvedAnswer,
          intro: getAnswerIntro(match.item.topic),
          item: match.item,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", kind: "escalation", text: escalation },
      ]);
    }
  }, []);

  const openWithQuestion = useCallback(
    (question: string) => {
      open();
      askQuestion(question);
    },
    [open, askQuestion]
  );

  useEffect(() => {
    function handleEasterEgg() {
      open();
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", kind: "system", text: pickEasterEggLine() },
      ]);
    }

    function handleOpenEvent(event: Event) {
      const detail = (event as CustomEvent<{ question?: string }>).detail;
      if (detail?.question) {
        openWithQuestion(detail.question);
      } else {
        open();
      }
    }

    window.addEventListener(ASK_DAWN_EASTER_EGG_EVENT, handleEasterEgg);
    window.addEventListener(ASK_DAWN_OPEN_EVENT, handleOpenEvent);
    return () => {
      window.removeEventListener(ASK_DAWN_EASTER_EGG_EVENT, handleEasterEgg);
      window.removeEventListener(ASK_DAWN_OPEN_EVENT, handleOpenEvent);
    };
  }, [open, openWithQuestion]);

  return (
    <AskDawnContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggleOpen,
        messages,
        askQuestion,
        openWithQuestion,
      }}
    >
      {children}
    </AskDawnContext.Provider>
  );
}

export function useAskDawn() {
  const ctx = useContext(AskDawnContext);
  if (!ctx) throw new Error("useAskDawn must be used within an AskDawnProvider");
  return ctx;
}
