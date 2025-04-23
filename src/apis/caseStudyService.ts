import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../lib/firebase";

/**
 * Check if a username is unique
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} - True if username is unique, false otherwise
 */
export async function isUsernameUnique(username: string) {
  try {
    const q = query(
      collection(db, "caseStudies"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // True if no documents found with this username
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    throw error;
  }
}

/**
 * Get all case studies for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of case studies
 */
export async function getUserCaseStudies(userId: string) {
  try {
    const q = query(
      collection(db, "caseStudies"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting case studies:", error);
    throw error;
  }
}

/**
 * Get a single case study by ID
 * @param {string} caseStudyId - The case study ID
 * @returns {Promise<Object>} - Case study data
 */
export async function getCaseStudy(caseStudyId: string) {
  try {
    const caseStudyDoc = await getDoc(doc(db, "caseStudies", caseStudyId));

    if (!caseStudyDoc.exists()) {
      throw new Error("Case study not found");
    }

    return {
      id: caseStudyDoc.id,
      ...caseStudyDoc.data(),
    };
  } catch (error) {
    console.error("Error getting case study:", error);
    throw error;
  }
}

/**
 * Create a new case study
 * @param {Object} caseStudyData - The case study data
 * @returns {Promise<Object>} - The created case study
 */
export async function createCaseStudy(caseStudyData: any) {
  try {
    const newCaseStudy = {
      ...caseStudyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "caseStudies"), newCaseStudy);
    return {
      id: docRef.id,
      ...newCaseStudy,
    };
  } catch (error) {
    console.error("Error creating case study:", error);
    throw error;
  }
}

/**
 * Update an existing case study
 * @param {string} caseStudyId - The case study ID
 * @param {Object} caseStudyData - The updated case study data
 * @returns {Promise<void>}
 */
export async function updateCaseStudy(caseStudyId: string, caseStudyData: any) {
  try {
    const caseStudyRef = doc(db, "caseStudies", caseStudyId);

    await updateDoc(caseStudyRef, {
      ...caseStudyData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating case study:", error);
    throw error;
  }
}

/**
 * Delete a case study
 * @param {string} caseStudyId - The case study ID
 * @returns {Promise<void>}
 */
export async function deleteCaseStudy(caseStudyId: string) {
  try {
    await deleteDoc(doc(db, "caseStudies", caseStudyId));
  } catch (error) {
    console.error("Error deleting case study:", error);
    throw error;
  }
}

/**
 * Upload an image for a case study
 * @param {string} userId - The user ID
 * @param {string} caseStudyId - The case study ID
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The download URL
 */
export async function uploadCaseStudyImage(
  userId: string,
  caseStudyId: string,
  file: File
) {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(
      storage,
      `caseStudies/${userId}/${caseStudyId}/${fileName}`
    );

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Delete an image from a case study
 * @param {string} imageUrl - The full URL of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteCaseStudyImage(imageUrl: string) {
  try {
    // Extract the path from the URL
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Get public case studies for a username
 * @param {string} username - The username
 * @returns {Promise<Array>} - Array of case studies
 */
export async function getPublicCaseStudies(username: string) {
  try {
    // Query case studies directly by username
    const caseStudiesQuery = query(
      collection(db, "caseStudies"),
      where("username", "==", username),
      where("isPublished", "==", true),
    );

    const querySnapshot = await getDocs(caseStudiesQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting public case studies:", error);
    throw error;
  }
}
