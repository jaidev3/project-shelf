import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, collection, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  displayName?: string;
  photoURL?: string;
  profession?: string;
  description?: string;
  [key: string]: any;
}

export interface UseAuthReturn {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  getUserProfile: (uid: string) => Promise<UserProfile | undefined>;
  updateUserProfile: (uid: string, data: Partial<UserProfile>) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const getUserProfile = async (uid: string) => {
    const docRef = doc(collection(db, "users"), uid);
    const docSnap = await getDoc(docRef);
    console.log("Document data:", docSnap.data());

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log("No such document!");
    }
  };

  const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    try {
      // Update Firestore document
      const userDocRef = doc(collection(db, "users"), uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        await updateDoc(userDocRef, data);
      } else {
        await setDoc(userDocRef, data);
      }

      // Update Firebase Auth profile if displayName or photoURL is provided
      if (currentUser && (data.displayName || data.photoURL)) {
        await updateProfile(currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }

      return;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  return {
    currentUser,
    loading,
    signup,
    login,
    logout,
    getUserProfile,
    updateUserProfile,
  };
}
