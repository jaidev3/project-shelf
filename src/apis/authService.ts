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
 * @param {string} username - User username
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<UserCredential>} - Firebase user credential
 */
export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<UserCredential> {
  // create user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  // update userProfile
  updateProfile(userCredential.user, {
    displayName: data.username,
  });

  const userDocRef = doc(collection(db, "users"), userCredential.user.uid);

  await setDoc(userDocRef, {
    email: data.email,
    photoURL: "",
    displayName: data.username, // Use the provided displayName
    profession: "",
    description: "",
  });

  return userCredential;
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
 * Get user profile from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<UserProfile>} - User profile
 */
export async function getUserProfile(uid: string): Promise<UserProfile> {
  const userDocRef = doc(collection(db, "users"), uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    throw new Error("User profile not found");
  }
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
