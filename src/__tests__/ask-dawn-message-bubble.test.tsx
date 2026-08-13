import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AskDawnMessageBubble } from "@/components/ask-dawn/AskDawnMessageBubble";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";
import { ARGENT_APPLICATION_URL } from "@/config/application";
import type { ConversationMessage } from "@/components/ask-dawn/AskDawnProvider";

describe("AskDawnMessageBubble — relatedLinks rendering", () => {
  it("renders an external relatedLink (e.g. the Argent application portal) as a real new-tab anchor, not a Next.js Link", () => {
    const item = knowledgeBase.find((k) => k.id === "how-to-apply")!;
    const message: ConversationMessage = {
      id: "test-1",
      role: "assistant",
      kind: "answer",
      text: item.approvedAnswer,
      intro: "",
      item,
    };

    render(<AskDawnMessageBubble message={message} />);

    const link = screen.getByRole("link", { name: /start your secure application/i });
    expect(link).toHaveAttribute("href", ARGENT_APPLICATION_URL);
    // The external destination is never disguised: real anchor, new tab, safe rel.
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders an internal relatedLink as a same-tab Next.js Link with no target attribute", () => {
    const item = knowledgeBase.find((k) => k.id === "what-is-reverse-mortgage")!;
    const message: ConversationMessage = {
      id: "test-2",
      role: "assistant",
      kind: "answer",
      text: item.approvedAnswer,
      intro: "",
      item,
    };

    render(<AskDawnMessageBubble message={message} />);

    const link = screen.getByRole("link", { name: /reverse mortgage overview/i });
    expect(link).toHaveAttribute("href", "/reverse-mortgage");
    expect(link).not.toHaveAttribute("target");
  });
});
