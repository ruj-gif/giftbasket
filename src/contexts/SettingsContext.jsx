import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ phone: "919876543210" }); // Default value

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Safe check: Only call if api.settings exists
        if (api.settings && api.settings.getAll) {
          const res = await api.settings.getAll();
          if (res.success) setSettings(res.data);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);