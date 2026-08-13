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
import { pick } from "@/content/ask-dawn/personality";
import { useAskDawn } from "./AskDawnProvider";

/**
 * ASK DAWN — "A LITTLE MUSICA?" EASTER EGG
 * ============================================
 * An optional, off-by-default Ask Dawn personality feature — NOT global
 * site background music. Nothing here ever autoplays: the `<audio>`
 * element carries no `autoPlay` attribute, and `.play()` is only ever
 * called from inside the toggle's own click/keydown handler, so it is
 * always a direct result of a user gesture.
 *
 * Mounted once, above SiteHeader/main/AskDawnWidget in layout.tsx (inside
 * AskDawnProvider, so it can inject the one-time personality line into
 * the same conversation) — this keeps the single <audio> element, and its
 * play state, alive across client-side navigation between pages and
 * between AskDawnPanel (floating widget) and AskDawnInline (the
 * /ask-dawn page), which mount/unmount independently. A hard reload
 * remounts this provider and resets to paused — deliberately: nothing
 * here tries to resume audible playback on a fresh page load, since that
 * would risk violating browser autoplay policy and the "never autoplay"
 * requirement. If a resume attempt is ever added, a failed play() must
 * fail silently (see toggle()) rather than surfacing anything intrusive.
 */
const MUSIC_SRC = "/audio/courtyard-in-palermo.mp3";
const LOW_BACKGROUND_VOLUME = 0.18;

type AskDawnMusicContextValue = {
  isPlaying: boolean;
  toggle: () => void;
};

const AskDawnMusicContext = createContext<AskDawnMusicContextValue | null>(null);

export function AskDawnMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasAnnouncedFirstPlay = useRef(false);
  const { announceSystemLine } = useAskDawn();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = LOW_BACKGROUND_VOLUME;
    }
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // This only ever runs inside a click/keydown handler, so it's always
    // a direct user gesture — but browsers may still reject play() (e.g.
    // an unusual autoplay-policy edge case). Fail silently either way:
    // this is a purely optional flourish, never worth an intrusive error.
    const playResult = audio.play();
    if (playResult && typeof playResult.then === "function") {
      playResult
        .then(() => {
          setIsPlaying(true);
          if (!hasAnnouncedFirstPlay.current) {
            hasAnnouncedFirstPlay.current = true;
            announceSystemLine(pick("musicFirstPlay"));
          }
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(true);
      if (!hasAnnouncedFirstPlay.current) {
        hasAnnouncedFirstPlay.current = true;
        announceSystemLine(pick("musicFirstPlay"));
      }
    }
  }, [isPlaying, announceSystemLine]);

  return (
    <AskDawnMusicContext.Provider value={{ isPlaying, toggle }}>
      {children}
      {/* No autoPlay, no controls (a bare native player would look like
          "an ugly HTML audio control", which is explicitly unwanted) —
          purely an audio source driven by the toggle button elsewhere. */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </AskDawnMusicContext.Provider>
  );
}

export function useAskDawnMusic() {
  const ctx = useContext(AskDawnMusicContext);
  if (!ctx) throw new Error("useAskDawnMusic must be used within an AskDawnMusicProvider");
  return ctx;
}
