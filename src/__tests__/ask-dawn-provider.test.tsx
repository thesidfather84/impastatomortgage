import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";
import { poolOptions } from "@/content/ask-dawn/personality";
import { louisianaTrivia } from "@/content/ask-dawn/louisiana-trivia";

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Matches any single line from a personality pool, since lines are picked at random. */
function anyOf(pool: string[]): RegExp {
  return new RegExp(pool.map(escapeRegex).join("|"));
}

function TestHarness() {
  const { messages, askQuestion } = useAskDawn();
  return (
    <div>
      <button onClick={() => askQuestion("What is a reverse mortgage?")}>
        Ask approved question
      </button>
      <button onClick={() => askQuestion("What's FHA?")}>Ask jargon question</button>
      <button onClick={() => askQuestion("asdkfj random gibberish xyz")}>
        Ask unknown question
      </button>
      <button onClick={() => askQuestion("I'm behind on payments and worried about foreclosure")}>
        Ask sensitive question
      </button>
      <button onClick={() => askQuestion("are you italian")}>Ask easter egg question</button>
      <button onClick={() => askQuestion("give me some lagniappe")}>Ask for lagniappe</button>
      <ul>
        {messages.map((m) => (
          <li key={m.id} data-role={m.role} data-kind={"kind" in m ? m.kind : undefined}>
            {"intro" in m && <p>{m.intro}</p>}
            {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("AskDawnProvider", () => {
  it("answers a known approved question with the exact knowledge-base text", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask approved question"));

    const expected = knowledgeBase.find((k) => k.id === "what-is-reverse-mortgage")!;
    expect(screen.getByText(expected.approvedAnswer)).toBeInTheDocument();
  });

  it("escalates to Dawn when there is no approved answer", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask unknown question"));

    // The "unknown" pool varies its wording, but every line ends the same way.
    expect(screen.getByText(anyOf(poolOptions("unknown")))).toBeInTheDocument();
  });

  it("the personality intro never replaces or alters the factual answer text", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask jargon question"));

    const expected = knowledgeBase.find((k) => k.id === "what-is-fha")!;
    // The exact approved answer is present, unmodified.
    expect(screen.getByText(expected.approvedAnswer)).toBeInTheDocument();
    // A personality intro line is shown as a distinct, separate line —
    // "FHA" is jargon, so it's drawn from the confusingJargon pool.
    expect(screen.getByText(anyOf(poolOptions("confusingJargon")))).toBeInTheDocument();
  });

  it("has no Italian Mode toggle — the personality is always on", () => {
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );
    expect(screen.queryByText(/italian mode/i)).not.toBeInTheDocument();
  });

  it("never jokes around a sensitive topic — calm, controlled hand-off only", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask sensitive question"));

    expect(
      screen.getByText("This isn't something I'll guess about, and it deserves a real conversation, not a chatbot. Let's get you straight to Dawn.")
    ).toBeInTheDocument();
  });

  it("answers a typed Easter egg with its fixed, canned response", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask easter egg question"));

    expect(
      screen.getByText(
        "Through and through. Louisiana roots, Italian heritage — it's the whole reason mortgages sound like alphabet soup to everyone but me."
      )
    ).toBeInTheDocument();
  });

  it("returns a Louisiana trivia fact on an explicit lagniappe request", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask for lagniappe"));

    expect(
      screen.getByText(anyOf(louisianaTrivia.map((f) => f.fact)))
    ).toBeInTheDocument();
  });
});
