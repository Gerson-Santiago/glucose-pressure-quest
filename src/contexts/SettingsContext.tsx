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
  // Chart guide settings
  showChartGuides: boolean;
  toggleShowChartGuides: () => void;
  glucoseGuideValue: number;
  setGlucoseGuideValue: (v: number) => void;
  pressureLowValue: number;
  setPressureLowValue: (v: number) => void;
  pressureHighValue: number;
  setPressureHighValue: (v: number) => void;
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

  // Chart guide defaults
  const [showChartGuides, setShowChartGuides] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored).showChartGuides ?? true;
    }
    return true;
  });

  const [glucoseGuideValue, setGlucoseGuideValueState] = useState<number>(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return Number(JSON.parse(stored).glucoseGuideValue ?? 100);
    }
    return 100;
  });

  const [pressureLowValue, setPressureLowValueState] = useState<number>(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return Number(JSON.parse(stored).pressureLowValue ?? 80);
    }
    return 80;
  });

  const [pressureHighValue, setPressureHighValueState] = useState<number>(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return Number(JSON.parse(stored).pressureHighValue ?? 120);
    }
    return 120;
  });

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        showStatus,
        showDeleteButtons,
        googleSheetUrl,
        showChartGuides,
        glucoseGuideValue,
        pressureLowValue,
        pressureHighValue,
      })
    );
  }, [showStatus, showDeleteButtons, googleSheetUrl, showChartGuides, glucoseGuideValue, pressureLowValue, pressureHighValue]);

  const toggleShowStatus = () => setShowStatus(!showStatus);
  const toggleShowDeleteButtons = () => setShowDeleteButtons(!showDeleteButtons);
  const setGoogleSheetUrl = (url: string) => setGoogleSheetUrlState(url);
  const toggleShowChartGuides = () => setShowChartGuides((s) => !s);
  const setGlucoseGuideValue = (v: number) => setGlucoseGuideValueState(v);
  const setPressureLowValue = (v: number) => setPressureLowValueState(v);
  const setPressureHighValue = (v: number) => setPressureHighValueState(v);

  return (
    <SettingsContext.Provider
      value={{
        showStatus,
        showDeleteButtons,
        googleSheetUrl,
        toggleShowStatus,
        toggleShowDeleteButtons,
        setGoogleSheetUrl,
        // chart guide settings
        showChartGuides,
        toggleShowChartGuides,
        glucoseGuideValue,
        setGlucoseGuideValue,
        pressureLowValue,
        setPressureLowValue,
        pressureHighValue,
        setPressureHighValue,
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
