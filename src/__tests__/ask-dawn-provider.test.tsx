import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";

function TestHarness() {
  const { messages, askQuestion, italianMode, setItalianMode } = useAskDawn();
  return (
    <div>
      <button onClick={() => askQuestion("What is a reverse mortgage?")}>
        Ask approved question
      </button>
      <button onClick={() => askQuestion("asdkfj random gibberish xyz")}>
        Ask unknown question
      </button>
      <button onClick={() => setItalianMode(!italianMode)}>Toggle Italian Mode</button>
      <ul>
        {messages.map((m) => (
          <li key={m.id} data-role={m.role} data-kind={"kind" in m ? m.kind : undefined}>
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
  it("answers a known approved question from the knowledge base", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask approved question"));

    expect(
      screen.getByText(/A reverse mortgage is a loan for homeowners/i)
    ).toBeInTheDocument();
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
      screen.getByText(
        "I don't want to guess about something this important. Let's get Dawn involved."
      )
    ).toBeInTheDocument();
  });

  it("does not change the factual approved answer when Italian Mode is on", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Toggle Italian Mode"));
    await user.click(screen.getByText("Ask approved question"));

    // The factual answer text must be identical regardless of personality mode.
    expect(
      screen.getByText(/A reverse mortgage is a loan for homeowners/i)
    ).toBeInTheDocument();
  });

  it("changes the escalation phrasing (not the facts) when Italian Mode is on", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <TestHarness />
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Toggle Italian Mode"));
    await user.click(screen.getByText("Ask unknown question"));

    expect(
      screen.getByText("Fuggedaboutit — I'm not guessing on that one. Let's ask Dawn.")
    ).toBeInTheDocument();
  });
});
