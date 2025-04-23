import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

// Define theme presets
export const themePresets = {
  minimalist: {
    name: "Minimalist",
    colors: {
      primary: "#000000",
      secondary: "#333333",
      accent: "#0070f3",
      background: "#ffffff",
      text: "#222222",
      textLight: "#666666",
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    spacing: {
      contentWidth: "max-w-5xl",
      gap: "gap-6",
    },
  },
  bold: {
    name: "Bold & Creative",
    colors: {
      primary: "#ff4d4d",
      secondary: "#2d2d2d",
      accent: "#ffca28",
      background: "#121212",
      text: "#ffffff",
      textLight: "#b3b3b3",
    },
    fonts: {
      heading: "'Montserrat', sans-serif",
      body: "'Open Sans', sans-serif",
    },
    spacing: {
      contentWidth: "max-w-6xl",
      gap: "gap-8",
    },
  },
  professional: {
    name: "Professional",
    colors: {
      primary: "#2c5282",
      secondary: "#4a5568",
      accent: "#38b2ac",
      background: "#f7fafc",
      text: "#1a202c",
      textLight: "#718096",
    },
    fonts: {
      heading: "'Roboto', sans-serif",
      body: "'Lato', sans-serif",
    },
    spacing: {
      contentWidth: "max-w-5xl",
      gap: "gap-5",
    },
  },
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const { currentUser } = useAuth();
  const [currentTheme, setCurrentTheme] = useState(themePresets.minimalist);
  const [isLoading, setIsLoading] = useState(true);

  // Get user theme from Firestore or use default
  useEffect(() => {
    async function getUserTheme() {
      if (currentUser) {
        try {
          const themeDoc = await getDoc(
            doc(db, "users", currentUser.uid, "settings", "theme")
          );

          if (themeDoc.exists()) {
            setCurrentTheme(themeDoc.data());
          } else {
            // Create default theme settings if they don't exist
            await setDoc(
              doc(db, "users", currentUser.uid, "settings", "theme"),
              themePresets.minimalist
            );
          }
        } catch (error) {
          console.error("Error fetching theme:", error);
        }
      } else {
        // Default theme for non-authenticated users
        setCurrentTheme(themePresets.minimalist);
      }
      setIsLoading(false);
    }

    getUserTheme();
  }, [currentUser]);

  // Save theme to Firestore when it changes
  async function saveTheme(theme) {
    if (!currentUser) return;

    try {
      await updateDoc(
        doc(db, "users", currentUser.uid, "settings", "theme"),
        theme
      );
      setCurrentTheme(theme);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }

  // Apply theme preset
  function applyThemePreset(presetName) {
    const preset = themePresets[presetName];
    if (preset) {
      saveTheme(preset);
    }
  }

  // Update a specific theme property
  function updateTheme(property, value) {
    const updatedTheme = {
      ...currentTheme,
      [property]: value,
    };
    saveTheme(updatedTheme);
  }

  const value = {
    currentTheme,
    themePresets,
    applyThemePreset,
    updateTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {!isLoading && children}
    </ThemeContext.Provider>
  );
}
