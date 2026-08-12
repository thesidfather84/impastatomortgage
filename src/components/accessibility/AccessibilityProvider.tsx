"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TextSize = "standard" | "large" | "xl";

const STORAGE_KEY = "impastato-text-size";

type AccessibilityContextValue = {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSizeState] = useState<TextSize>("standard");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "standard" || stored === "large" || stored === "xl") {
      // Restoring a persisted preference after mount is intentional here:
      // the server always renders "standard" to avoid a hydration
      // mismatch, then this one-time effect syncs the real value in.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTextSizeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-text-size",
      textSize === "standard" ? "" : textSize
    );
  }, [textSize]);

  const setTextSize = useCallback((size: TextSize) => {
    setTextSizeState(size);
    window.localStorage.setItem(STORAGE_KEY, size);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return ctx;
}
