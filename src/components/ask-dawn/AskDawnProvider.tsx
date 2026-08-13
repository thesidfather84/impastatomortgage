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
import {
  pick,
  pickAnswerIntro,
  pickLogoEasterEggLine,
  sensitiveTopicEscalation,
} from "@/content/ask-dawn/personality";
import { isSensitiveTopic } from "@/lib/ask-dawn/sensitive";
import { containsJargon } from "@/lib/ask-dawn/jargon";
import { matchEasterEgg } from "@/lib/ask-dawn/easter-eggs";
import { easterEggs } from "@/content/ask-dawn/easter-eggs";
import {
  detectTriviaCategory,
  isLagniappeRequest,
  looksLikeTriviaAsk,
  matchTriviaTrigger,
  pickRandomTrivia,
} from "@/lib/ask-dawn/trivia";
import { louisianaTrivia } from "@/content/ask-dawn/louisiana-trivia";
import { ASK_DAWN_EASTER_EGG_EVENT, ASK_DAWN_OPEN_EVENT } from "./events";
import type { KnowledgeItem } from "@/content/ask-dawn/types";
import type { TriviaFact } from "@/content/ask-dawn/louisiana-trivia";

export type ConversationMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; kind: "answer"; text: string; intro: string; item: KnowledgeItem }
  | { id: string; role: "assistant"; kind: "escalation"; text: string }
  | {
      id: string;
      role: "assistant";
      kind: "trivia";
      text: string;
      intro: string;
      more: string | null;
      fact: TriviaFact;
    }
  | { id: string; role: "assistant"; kind: "system"; text: string };

type AskDawnContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggleOpen: () => void;
  messages: ConversationMessage[];
  askQuestion: (question: string) => void;
  openWithQuestion: (question: string) => void;
  /** Injects a fixed system-style line directly into the conversation — for Easter eggs (logo tap, music) that aren't a typed question and so must never go through askQuestion's KB/trivia/escalation routing. */
  announceSystemLine: (text: string) => void;
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
  const lastMatchedItemId = useRef<string | null>(null);
  const lastTriviaFactId = useRef<string | null>(null);

  const ensureGreeting = useCallback(() => {
    if (greeted.current) return;
    greeted.current = true;
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "assistant", kind: "system", text: pick("greeting") },
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

    // Sensitive topics (foreclosure, bereavement, hardship, etc.) always
    // get a calm, controlled hand-off. This check runs before every other
    // routing decision so a sensitive query can never accidentally land on
    // a joke, an Easter egg, or trivia.
    if (isSensitiveTopic(trimmed)) {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", kind: "escalation", text: sensitiveTopicEscalation },
      ]);
      return;
    }

    // Fixed, non-mortgage Easter eggs take priority over trivia so a
    // specific canned joke never gets shadowed by a broader trivia match.
    const egg = matchEasterEgg(trimmed, easterEggs);
    if (egg) {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", kind: "system", text: egg.answer },
      ]);
      return;
    }

    // Explicit "surprise me" trivia request ("lagniappe", "give me
    // trivia") always returns a random fact, honoring a detected category.
    if (isLagniappeRequest(trimmed)) {
      const category = detectTriviaCategory(trimmed);
      const fact = pickRandomTrivia(louisianaTrivia, {
        category,
        excludeIds: lastTriviaFactId.current ? [lastTriviaFactId.current] : undefined,
      });
      lastTriviaFactId.current = fact.id;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          kind: "trivia",
          text: fact.fact,
          // Sensitive history (e.g. the 1891 lynchings) is presented
          // plainly — no jokey intro or "want another?" nudge around it.
          intro: fact.sensitive ? "" : pick("triviaIntro"),
          more: fact.sensitive ? null : pick("triviaMore"),
          fact,
        },
      ]);
      return;
    }

    // Specific trivia trigger, e.g. "why does new orleans have balconies".
    const triviaFact = matchTriviaTrigger(trimmed, louisianaTrivia);
    if (triviaFact) {
      lastTriviaFactId.current = triviaFact.id;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          kind: "trivia",
          text: triviaFact.fact,
          intro: triviaFact.sensitive ? "" : pick("triviaIntro"),
          more: triviaFact.sensitive ? null : pick("triviaMore"),
          fact: triviaFact,
        },
      ]);
      return;
    }

    const match = findBestMatch(trimmed, knowledgeBase);

    if (match) {
      const isRepeat = lastMatchedItemId.current === match.item.id;
      lastMatchedItemId.current = match.item.id;

      let intro: string;
      if (isRepeat) {
        intro = pick("repeatQuestion");
      } else if (match.item.topic === "Reverse Mortgage") {
        // Reverse mortgages deserve a careful answer, not a sales pitch —
        // never the jokey jargon framing, even when the query has acronyms.
        intro = pick("reverseMortgageIntro");
      } else if (containsJargon(trimmed)) {
        intro = pick("confusingJargon");
      } else if (match.item.escalationRequired) {
        intro = pick("seriousModeIntro");
      } else {
        intro = pickAnswerIntro();
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          kind: "answer",
          // The factual text is always exactly the approved-answer string —
          // the personality intro is a separate field, never merged in.
          text: match.item.approvedAnswer,
          intro,
          item: match.item,
        },
      ]);
      return;
    }

    // No approved mortgage answer. If it reads like a trivia ask we just
    // don't have a specific fact for, soften the miss with lagniappe
    // instead of a flat escalation.
    if (looksLikeTriviaAsk(trimmed)) {
      const category = detectTriviaCategory(trimmed);
      const fact = pickRandomTrivia(louisianaTrivia, {
        category,
        excludeIds: lastTriviaFactId.current ? [lastTriviaFactId.current] : undefined,
      });
      lastTriviaFactId.current = fact.id;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          kind: "trivia",
          text: fact.fact,
          intro: fact.sensitive ? "" : pick("triviaMiss"),
          more: fact.sensitive ? null : pick("triviaMore"),
          fact,
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "assistant", kind: "escalation", text: pick("unknown") },
    ]);
  }, []);

  const openWithQuestion = useCallback(
    (question: string) => {
      open();
      askQuestion(question);
    },
    [open, askQuestion]
  );

  const announceSystemLine = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: "assistant", kind: "system", text }]);
  }, []);

  useEffect(() => {
    function handleEasterEgg() {
      open();
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", kind: "system", text: pickLogoEasterEggLine() },
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
        announceSystemLine,
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
