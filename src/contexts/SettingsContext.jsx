import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../lib/api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await api.settings.getAll();
      if (response.success && response.data) {
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setSettings(data || {});
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSettings(); }, []);

  return (
    <SettingsContext.Provider value={{ settings, loadSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};