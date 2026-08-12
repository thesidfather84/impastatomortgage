import { describe, expect, it } from "vitest";
import { findBestMatch } from "@/lib/ask-dawn/match";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";

describe("Ask Dawn matcher", () => {
  it("matches a known approved question", () => {
    const result = findBestMatch("What is a reverse mortgage?", knowledgeBase);
    expect(result).not.toBeNull();
    expect(result?.item.id).toBe("what-is-reverse-mortgage");
  });

  it("matches a short acronym question", () => {
    const result = findBestMatch("What's FHA?", knowledgeBase);
    expect(result?.item.id).toBe("what-is-fha");
  });

  it("returns null for a question with no approved answer", () => {
    const result = findBestMatch(
      "What will mortgage rates be next year on the moon?",
      knowledgeBase
    );
    expect(result).toBeNull();
  });

  it("never matches an item that isn't marked approved", () => {
    const unapproved = [
      {
        id: "fake",
        questionVariants: ["what is a fake rate"],
        approvedAnswer: "This should never be returned.",
        topic: "Test",
        reviewDate: null,
        approved: false,
        escalationRequired: false,
      },
    ];
    const result = findBestMatch("what is a fake rate", unapproved);
    expect(result).toBeNull();
  });
});
