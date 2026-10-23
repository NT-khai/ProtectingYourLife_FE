"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi, UserData, AuthResponse } from "../lib/api";

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, matkhau: string) => Promise<AuthResponse>;
  register: (
    hovaten: string,
    email: string,
    matkhau: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await authApi.getMe();
      setUser(res?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const res = await authApi.getMe();
        if (!cancelled) {
          setUser(res?.user ?? null);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, matkhau: string) => {
    const res = await authApi.login({ email, matkhau });
    if (res?.user) {
      setUser(res.user);
    } else {
      await refreshUser();
    }
    return res;
  };

  const register = async (hovaten: string, email: string, matkhau: string) => {
    return await authApi.register({ hovaten, email, matkhau });
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // bỏ qua lỗi, vẫn xóa user phía client
    } finally {
      setUser(null);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
