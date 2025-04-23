import { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
}
