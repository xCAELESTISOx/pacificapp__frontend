"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Add a higher-order component to safely provide theme context
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Синхронизация темы с localStorage и предпочтениями системы
  useEffect(() => {
    setMounted(true);
    
    // Проверяем сохраненную тему в localStorage
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Проверяем системные предпочтения
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }

      // Отслеживаем изменения в системной теме
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Fallback to light theme
      setTheme("light");
    }
  }, []);

  // Обновляем data-theme атрибут и localStorage при изменении темы
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const root = document.documentElement;
      
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Create a safe context value
  const contextValue = {
    theme,
    toggleTheme,
    setTheme
  };

  // Render children directly during server-side rendering
  // or when not mounted yet to avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 