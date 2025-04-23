import { useState, useEffect } from "react";
import { User, UserCredential } from "firebase/auth";
import {
  registerUser,
  loginUser,
  logoutUser,
  subscribeToAuthChanges,
  updateUserProfile,
  UserProfile,
  getUserProfile,
} from "../apis/authService";

export type { UserProfile } from "../apis/authService";

export interface UseAuthReturn {
  currentUser: User | null;
  loading: boolean;
  signup: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  updateUserProfile: (uid: string, data: Partial<UserProfile>) => Promise<void>;
  getUserProfile: (uid: string) => Promise<UserProfile>;
}

export function useAuth(): UseAuthReturn {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    signup: registerUser,
    login: loginUser,
    logout: logoutUser,
    updateUserProfile,
    getUserProfile,
  };
}
