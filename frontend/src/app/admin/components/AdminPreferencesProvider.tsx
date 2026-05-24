"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ADMIN_ACCENT_STORAGE_KEY,
  type AdminAccent,
} from "./adminTheme";

type AdminPreferencesContextValue = {
  accent: AdminAccent;
  setAccent: (accent: AdminAccent) => void;
  ready: boolean;
};

const AdminPreferencesContext = createContext<AdminPreferencesContextValue | null>(null);

function readStoredAccent(): AdminAccent {
  if (typeof window === "undefined") return "brand";
  const saved = localStorage.getItem(ADMIN_ACCENT_STORAGE_KEY);
  if (saved === "ocean" || saved === "slate" || saved === "brand") return saved;
  return "brand";
}

export function AdminPreferencesProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AdminAccent>("brand");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAccentState(readStoredAccent());
    setReady(true);
  }, []);

  const setAccent = useCallback((next: AdminAccent) => {
    setAccentState(next);
    localStorage.setItem(ADMIN_ACCENT_STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ accent, setAccent, ready }), [accent, setAccent, ready]);

  return (
    <AdminPreferencesContext.Provider value={value}>
      <div
        className="admin-dashboard"
        data-admin-accent={ready ? accent : undefined}
        suppressHydrationWarning
      >
        {children}
      </div>
    </AdminPreferencesContext.Provider>
  );
}

export function useAdminPreferences() {
  const ctx = useContext(AdminPreferencesContext);
  if (!ctx) {
    throw new Error("useAdminPreferences must be used within AdminPreferencesProvider");
  }
  return ctx;
}
