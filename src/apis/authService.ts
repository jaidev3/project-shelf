import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { doc, collection, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export interface UserProfile {
  displayName?: string;
  photoURL?: string;
  profession?: string;
  description?: string;
  [key: string]: any;
}

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<UserCredential>} - Firebase user credential
 */
export async function registerUser(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Log in an existing user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<UserCredential>} - Firebase user credential
 */
export async function loginUser(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export async function logoutUser(): Promise<void> {
  return signOut(auth);
}

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function to handle auth state changes
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Update user profile in Firestore and Auth if applicable
 * @param {string} uid - User ID
 * @param {Partial<UserProfile>} data - Profile data to update
 * @returns {Promise<void>}
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
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
    if (auth.currentUser && (data.displayName || data.photoURL)) {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * Get the current authenticated user
 * @returns {User | null} - Current user or null if not authenticated
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
