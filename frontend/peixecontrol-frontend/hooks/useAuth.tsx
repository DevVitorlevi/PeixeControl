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
  isHydrating: boolean;
}

interface AuthContextValue extends AuthSnapshot {
  isAuthenticated: boolean;
  signIn: (user: AuthUser, token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: AuthSnapshot = Object.freeze({
  user: null,
  token: null,
  isHydrating: true,
});

function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

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

let cachedSnapshot: AuthSnapshot | null = null;
let lastToken: string | null = null;
let lastUserStr: string | null = null;

function getSnapshot(): AuthSnapshot {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (
    cachedSnapshot &&
    storedToken === lastToken &&
    storedUser === lastUserStr
  ) {
    return cachedSnapshot;
  }

  lastToken = storedToken;
  lastUserStr = storedUser;

  if (!storedToken || !storedUser) {
    cachedSnapshot = { user: null, token: null, isHydrating: false };
    return cachedSnapshot;
  }

  try {
    cachedSnapshot = {
      user: JSON.parse(storedUser) as AuthUser,
      token: storedToken,
      isHydrating: false,
    };
    return cachedSnapshot;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    cachedSnapshot = { user: null, token: null, isHydrating: false };
    return cachedSnapshot;
  }
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
  const { user, token, isHydrating } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
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
