import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import {
  getAccessToken,
  setAccessToken,
  loadTokenFromStorage,
} from './tokenStorage';

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const res = await api.post('/login', { email, password });
    const data = res.data as any;
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post('/logout');
    setAccessToken(null);
    setUser(null);
  };

  const refresh = async () => {
    try {
      const res = await api.post('/refresh');
      const data = res.data as any;
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (err) {
      // refresh failed – probably logged out
      setAccessToken(null);
      setUser(null);
    }
  };

  // On app load: try to restore from localStorage + call /refresh
  useEffect(() => {
    const init = async () => {
      loadTokenFromStorage();
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Background refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (getAccessToken()) {
        refresh();
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refresh,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
