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
 * Get all case studies for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of case studies
 */
export async function getUserCaseStudies(userId) {
  try {
    const q = query(
      collection(db, "caseStudies"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
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
export async function getCaseStudy(caseStudyId) {
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
export async function createCaseStudy(caseStudyData) {
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
export async function updateCaseStudy(caseStudyId, caseStudyData) {
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
export async function deleteCaseStudy(caseStudyId) {
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
export async function uploadCaseStudyImage(userId, caseStudyId, file) {
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
export async function deleteCaseStudyImage(imageUrl) {
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
export async function getPublicCaseStudies(username) {
  try {
    // First get the user ID from the username
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      throw new Error("User not found");
    }

    const userId = userSnapshot.docs[0].id;

    // Then get the case studies
    const caseStudiesQuery = query(
      collection(db, "caseStudies"),
      where("userId", "==", userId),
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
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
