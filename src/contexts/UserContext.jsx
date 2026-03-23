import React, { createContext, useState, useEffect, useContext } from 'react';

const STORAGE_KEY = 'qobo-ecommerce-user';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData && typeof userData === 'object' ? userData : null);
  };

  const setUserFromApi = (apiUser) => {
    if (apiUser && (apiUser.id || apiUser.email)) {
      setUser({
        id: apiUser.id,
        email: apiUser.email,
        name: apiUser.name || apiUser.email?.split('@')[0] || 'User',
        phone: apiUser.phone,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = Boolean(user?.email);

  return (
    <UserContext.Provider value={{ user, login, logout, setUserFromApi, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
