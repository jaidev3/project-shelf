import { useAuth } from "../contexts/AuthContext";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

export const useProtectedRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!currentUser) {
      navigate("/login");
    }
    return children;
  };

  return ProtectedRoute;
};
