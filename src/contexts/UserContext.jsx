import React, { createContext, useState, useEffect, useContext } from 'react';

const STORAGE_KEY = 'qobo-ecommerce-user';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Load user on app start
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user:', e);
        localStorage.removeItem(STORAGE_KEY); // 🔥 clean corrupted data
      }
    }
  }, []);

  // ✅ Save user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // ✅ Manual login (optional use)
  const login = (userData) => {
    setUser(userData && typeof userData === 'object' ? userData : null);
  };

  // ✅ MAIN FIX: normalize API user properly
  const setUserFromApi = (apiUser) => {
    if (!apiUser) return;

    const normalizedUser = {
      id: apiUser.id,
      email: apiUser.email,
      name:
        apiUser.name ||
        apiUser.email?.split('@')[0] ||
        'User',
      phone: apiUser.phone || null,
    };

    setUser(normalizedUser); // 🔥 triggers localStorage save automatically
  };

  // ✅ logout
  const logout = () => {
    setUser(null);
  };

  // ✅ login check
  const isLoggedIn = !!user?.email;

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        setUserFromApi,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// ✅ hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};