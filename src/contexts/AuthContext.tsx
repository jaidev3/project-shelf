import React, { createContext, useContext, ReactNode } from "react";
import { UseAuthReturn } from "../hooks/useAuth";
import { useAuth as useAuthHook } from "../hooks/useAuth";

// Create a context with a more specific type
const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// Define props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
}

// Export the auth context consumer hook
export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
