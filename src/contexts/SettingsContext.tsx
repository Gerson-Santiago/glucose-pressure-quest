// src/contexts/SettingsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const SETTINGS_KEY = "health-app-settings";

interface SettingsContextType {
  showStatus: boolean;
  showDeleteButtons: boolean;
  googleSheetUrl: string;
  toggleShowStatus: () => void;
  toggleShowDeleteButtons: () => void;
  setGoogleSheetUrl: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showStatus, setShowStatus] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored).showStatus ?? true;
    }
    return true;
  });

  const [showDeleteButtons, setShowDeleteButtons] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored).showDeleteButtons ?? true;
    }
    return true;
  });

  const [googleSheetUrl, setGoogleSheetUrlState] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored).googleSheetUrl ?? "";
    }
    return "";
  });

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ showStatus, showDeleteButtons, googleSheetUrl })
    );
  }, [showStatus, showDeleteButtons, googleSheetUrl]);

  const toggleShowStatus = () => setShowStatus(!showStatus);
  const toggleShowDeleteButtons = () => setShowDeleteButtons(!showDeleteButtons);
  const setGoogleSheetUrl = (url: string) => setGoogleSheetUrlState(url);

  return (
    <SettingsContext.Provider
      value={{
        showStatus,
        showDeleteButtons,
        googleSheetUrl,
        toggleShowStatus,
        toggleShowDeleteButtons,
        setGoogleSheetUrl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
