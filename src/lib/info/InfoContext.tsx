"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { InfoPanel } from "./content";

interface InfoContextValue {
  /** The currently open panel, or null when closed. */
  panel: InfoPanel | null;
  openInfo: (panel: InfoPanel) => void;
  closeInfo: () => void;
}

const InfoContext = createContext<InfoContextValue | null>(null);

export function InfoProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<InfoPanel | null>(null);

  const openInfo = useCallback((p: InfoPanel) => setPanel(p), []);
  const closeInfo = useCallback(() => setPanel(null), []);

  const value = useMemo(
    () => ({ panel, openInfo, closeInfo }),
    [panel, openInfo, closeInfo],
  );

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
}

export function useInfo() {
  const ctx = useContext(InfoContext);
  if (!ctx) throw new Error("useInfo must be used within an InfoProvider");
  return ctx;
}
