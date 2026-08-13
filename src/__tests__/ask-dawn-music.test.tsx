import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AskDawnProvider, useAskDawn } from "@/components/ask-dawn/AskDawnProvider";
import { AskDawnMusicProvider } from "@/components/ask-dawn/AskDawnMusicProvider";
import { MusicToggle } from "@/components/ask-dawn/MusicToggle";

// jsdom does not implement HTMLMediaElement playback at all — calling the
// real methods throws "Not implemented". These mocks let us verify
// exactly when play()/pause() are invoked, which is the entire point of
// the "never autoplay, only on user action" requirement.
let playMock: ReturnType<typeof vi.fn>;
let pauseMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  playMock = vi.fn().mockResolvedValue(undefined);
  pauseMock = vi.fn();
  HTMLMediaElement.prototype.play = playMock as unknown as () => Promise<void>;
  HTMLMediaElement.prototype.pause = pauseMock as unknown as () => void;
  // AskDawnInline (not used directly here, but rendered by some suites
  // elsewhere) relies on scrollTo — harmless shim kept consistent with
  // other Ask Dawn test files in this repo.
  Element.prototype.scrollTo = Element.prototype.scrollTo || (() => {});
});

/** Surfaces Ask Dawn provider state (messages, isOpen) for assertions. */
function AskDawnStateProbe() {
  const { messages } = useAskDawn();
  return (
    <div data-testid="ask-dawn-probe">
      {messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
    </div>
  );
}

function renderMusicToggle() {
  return render(
    <AskDawnProvider>
      <AskDawnMusicProvider>
        <MusicToggle />
        <AskDawnStateProbe />
      </AskDawnMusicProvider>
    </AskDawnProvider>
  );
}

describe("Ask Dawn music Easter egg — never autoplays", () => {
  it("the underlying <audio> element has no autoplay attribute", () => {
    renderMusicToggle();
    const audio = document.querySelector("audio");
    expect(audio).toBeInTheDocument();
    expect(audio).not.toHaveAttribute("autoplay");
  });

  it("serves the audio locally, not from an external stream", () => {
    renderMusicToggle();
    const audio = document.querySelector("audio")!;
    expect(audio.getAttribute("src")).toBe("/audio/courtyard-in-palermo.mp3");
  });

  it("play() is never called before any user interaction", () => {
    renderMusicToggle();
    expect(playMock).not.toHaveBeenCalled();
  });

  it("the control starts in a paused/off state by default", () => {
    renderMusicToggle();
    const button = screen.getByRole("button", { name: /a little musica/i });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveTextContent("A Little Musica?");
  });
});

describe("Ask Dawn music Easter egg — play/pause/resume", () => {
  it("clicking the control plays the music as a direct result of the click", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    const button = screen.getByRole("button", { name: /a little musica/i });
    await user.click(button);

    expect(playMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /musica playing/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("clicking again pauses it immediately — the same control doubles as an obvious stop", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    await user.click(screen.getByRole("button", { name: /a little musica/i }));
    await user.click(screen.getByRole("button", { name: /musica playing/i }));

    expect(pauseMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /a little musica/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("resumes correctly after a pause", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    await user.click(screen.getByRole("button", { name: /a little musica/i })); // play
    await user.click(screen.getByRole("button", { name: /musica playing/i })); // pause
    await user.click(screen.getByRole("button", { name: /a little musica/i })); // resume

    expect(playMock).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button", { name: /musica playing/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("is keyboard-operable", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    await user.tab();
    expect(screen.getByRole("button", { name: /a little musica/i })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(playMock).toHaveBeenCalledTimes(1);
  });

  it("fails silently if the browser rejects play() — no crash, state stays paused", async () => {
    playMock.mockRejectedValueOnce(new Error("NotAllowedError"));
    const user = userEvent.setup();
    renderMusicToggle();

    await user.click(screen.getByRole("button", { name: /a little musica/i }));
    await act(async () => {}); // flush the rejected play() promise

    expect(screen.getByRole("button", { name: /a little musica/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    const probe = screen.getByTestId("ask-dawn-probe");
    expect(probe.querySelectorAll("p").length).toBe(0);
  });
});

describe("Ask Dawn music Easter egg — first-play personality line", () => {
  it("shows exactly one personality line on first play, and none again on later pause/resume cycles", async () => {
    const user = userEvent.setup();
    renderMusicToggle();
    const probe = screen.getByTestId("ask-dawn-probe");

    await user.click(screen.getByRole("button", { name: /a little musica/i })); // first play
    await act(async () => {}); // flush the resolved play() promise

    expect(probe.querySelectorAll("p").length).toBe(1);

    await user.click(screen.getByRole("button", { name: /musica playing/i })); // pause
    await user.click(screen.getByRole("button", { name: /a little musica/i })); // play again
    await act(async () => {});
    await user.click(screen.getByRole("button", { name: /musica playing/i })); // pause again

    // Still only ever one line, across two full play/pause cycles.
    expect(probe.querySelectorAll("p").length).toBe(1);
  });
});

describe("Ask Dawn music Easter egg — does not interfere with chat", () => {
  function AskQuestionProbe() {
    const { messages, askQuestion } = useAskDawn();
    return (
      <div>
        <button onClick={() => askQuestion("What is a reverse mortgage?")}>Ask a real question</button>
        <ul>
          {messages.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      </div>
    );
  }

  it("Ask Dawn's normal KB answers still work correctly with the music provider mounted", async () => {
    const user = userEvent.setup();
    render(
      <AskDawnProvider>
        <AskDawnMusicProvider>
          <MusicToggle />
          <AskQuestionProbe />
        </AskDawnMusicProvider>
      </AskDawnProvider>
    );

    await user.click(screen.getByText("Ask a real question"));

    expect(
      screen.getByText(/reverse mortgage is a loan for homeowners/i)
    ).toBeInTheDocument();
  });
});

describe("Ask Dawn music Easter egg — accessibility and mobile", () => {
  it("has an accessible label that changes with play state", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    expect(screen.getByLabelText(/a little musica\? play background music/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /a little musica/i }));
    expect(screen.getByLabelText(/musica playing — pause/i)).toBeInTheDocument();
  });

  it("meets the 44px minimum touch target", () => {
    renderMusicToggle();
    expect(screen.getByRole("button", { name: /a little musica/i }).className).toMatch(
      /min-h-\[44px\]/
    );
  });

  it("only animates the note indicator via a reduced-motion-safe utility class", async () => {
    const user = userEvent.setup();
    renderMusicToggle();

    const noteBefore = screen.getByText("♪");
    expect(noteBefore.className).not.toMatch(/animate-pulse/);

    await user.click(screen.getByRole("button", { name: /a little musica/i }));
    const noteAfter = screen.getByText("♪");
    expect(noteAfter.className).toMatch(/motion-safe:animate-pulse/);
  });
});
