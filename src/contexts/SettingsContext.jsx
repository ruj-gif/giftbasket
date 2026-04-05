import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  const loadSettings = async () => {
    try {
      const res = await api.settings.get();
      console.log("SETTINGS FETCH:", res);

      if (res.success) {
        setSettings(res.data || {});
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // ✅ THIS IS THE IMPORTANT FIX
  // ensures components update after save
  const refreshSettings = async () => {
    await loadSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loadSettings: refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);