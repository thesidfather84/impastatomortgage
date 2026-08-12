import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { knowledgeBase } from "@/content/ask-dawn/knowledge-base";

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

    expect(
      screen.getByText("Fuggedaboutit — I'm not guessing when your home is involved. Let's get the real Dawn.")
    ).toBeInTheDocument();
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
    // A personality intro line is shown as a distinct, separate line.
    expect(
      screen.getByText(/alphabet soup/i)
    ).toBeInTheDocument();
  });

  it("has no Italian Mode toggle — the personality is always on", () => {
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );
    expect(screen.queryByText(/italian mode/i)).not.toBeInTheDocument();
  });
});
