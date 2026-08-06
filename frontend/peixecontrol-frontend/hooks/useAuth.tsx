"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types/auth";

const TOKEN_KEY = "peixecontrol:token";
const USER_KEY = "peixecontrol:user";

interface AuthSnapshot {
  user: AuthUser | null;
  token: string | null;
}

interface AuthContextValue extends AuthSnapshot {
  isHydrating: boolean;
  isAuthenticated: boolean;
  signIn: (user: AuthUser, token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): AuthSnapshot {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedToken || !storedUser) {
    return { user: null, token: null };
  }

  try {
    return { user: JSON.parse(storedUser) as AuthUser, token: storedToken };
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { user: null, token: null };
  }
}

function getServerSnapshot(): AuthSnapshot {
  return { user: null, token: null };
}

function persistAuth(user: AuthUser, token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  emitChange();
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emitChange();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, token } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isHydrating = useSyncExternalStore(
    () => () => {},
    () => false,
    () => true,
  );

  const signIn = useCallback((nextUser: AuthUser, nextToken: string) => {
    persistAuth(nextUser, nextToken);
  }, []);

  const signOut = useCallback(() => {
    clearAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isHydrating,
        isAuthenticated: Boolean(token && user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
