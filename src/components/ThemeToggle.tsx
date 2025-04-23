import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </Button>
  );
};
