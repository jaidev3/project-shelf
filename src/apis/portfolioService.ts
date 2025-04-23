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
import { db } from "../lib/firebase";

export interface Portfolio {
  id: string;
  userId: string;
  style: "designer" | "developer" | "writer";
  userData: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    caseStudies: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
    }>;
  };
  username: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Get all portfolios for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of portfolios
 */
export async function getUserPortfolios(userId: string): Promise<any[]> {
  try {
    const q = query(
      collection(db, "portfolios"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    console.log("Docs found:", querySnapshot.docs.length);
    querySnapshot.docs.forEach((doc) => console.log(doc.id, doc.data()));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Portfolio[];
  } catch (error) {
    console.error("Error getting portfolios:", error);
    throw error;
  }
}

/**
 * Get a single portfolio by ID
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<Object>} - Portfolio data
 */
export async function getPortfolio(portfolioId: string): Promise<Portfolio> {
  try {
    const portfolioDoc = await getDoc(doc(db, "portfolios", portfolioId));

    if (!portfolioDoc.exists()) {
      throw new Error("Portfolio not found");
    }

    return {
      id: portfolioDoc.id,
      ...portfolioDoc.data(),
    } as Portfolio;
  } catch (error) {
    console.error("Error getting portfolio:", error);
    throw error;
  }
}

/**
 * Create a new portfolio
 * @param {Object} portfolioData - The portfolio data
 * @returns {Promise<Object>} - The created portfolio
 */
export async function createPortfolio(
  portfolioData: Omit<Portfolio, "id" | "createdAt" | "updatedAt">
) {
  try {
    const newPortfolio = {
      ...portfolioData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "portfolios"), newPortfolio);
    return {
      id: docRef.id,
      ...newPortfolio,
    };
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
}

/**
 * Update an existing portfolio
 * @param {string} portfolioId - The portfolio ID
 * @param {Object} portfolioData - The updated portfolio data
 * @returns {Promise<void>}
 */
export async function updatePortfolio(
  portfolioId: string,
  portfolioData: Partial<Portfolio>
) {
  try {
    const portfolioRef = doc(db, "portfolios", portfolioId);

    await updateDoc(portfolioRef, {
      ...portfolioData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  }
}

/**
 * Delete a portfolio
 * @param {string} portfolioId - The portfolio ID
 * @returns {Promise<void>}
 */
export async function deletePortfolio(portfolioId: string) {
  try {
    await deleteDoc(doc(db, "portfolios", portfolioId));
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw error;
  }
}
