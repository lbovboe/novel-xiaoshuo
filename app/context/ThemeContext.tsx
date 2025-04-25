'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

/**
 * Defines the structure of our theme context.
 * This interface ensures type safety for theme-related operations.
 */
interface ThemeContextType {
  /** Current theme state: either 'light' or 'dark' */
  theme: 'light' | 'dark';
  /** Function that switches between light and dark themes */
  toggleTheme: () => void;
}

/**
 * Creates a React Context for theme management.
 * Initially undefined, it will be populated by the ThemeProvider.
 * This context allows theme information to be accessed throughout the app.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 *
 * This component wraps your application and provides theme functionality to all child components.
 * It handles:
 * - Theme state management
 * - Local storage persistence
 * - DOM class manipulation for theme switching
 * - Theme context distribution
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the theme context
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme state with 'light' as default
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /**
   * On component mount:
   * - Checks local storage for saved theme preference
   * - Applies the saved theme if it exists
   * - Updates DOM classes accordingly
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  /**
   * Toggles between light and dark themes
   * - Updates theme state
   * - Saves new preference to localStorage
   * - Updates DOM classes for styling
   * 
   * Class Toggle Behavior:
   * - When toggling from light → dark: adds the 'dark' class to html element
   * - When toggling from dark → light: removes the 'dark' class from html element
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Custom Hook: useTheme
 *
 * Provides easy access to the theme context anywhere in the application.
 *
 * Usage:
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * ```
 *
 * @returns {ThemeContextType} Object containing:
 *   - theme: Current theme ('light' or 'dark')
 *   - toggleTheme: Function to switch themes
 *
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
